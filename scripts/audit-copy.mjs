/**
 * Flags phrases and patterns that read as machine-written or empty marketing.
 * It only suggests; a personal voice can trigger false positives.
 *   node scripts/audit-copy.mjs                  audits src/locales/{en,vi}.json
 *   node scripts/audit-copy.mjs a.json b.md      audits the given .json or .md files
 *   node scripts/audit-copy.mjs --strict         exits 1 on any HARD finding
 */
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const strict = args.includes('--strict');
const inputs = args.filter((a) => !a.startsWith('--'));
const files = inputs.length ? inputs : ['src/locales/en.json', 'src/locales/vi.json'];

// HARD: nearly always a tell. SOFT: worth a look.
const RULES = [
    { id: 'em-dash', severity: 'HARD', re: /—/g, note: 'em dash (the most recognisable LLM punctuation)' },
    { id: 'spaced-dash', severity: 'SOFT', re: / [–-] /g, note: 'spaced dash used as a pause' },
    { id: 'emoji', severity: 'SOFT', re: /\p{Extended_Pictographic}/gu, note: 'emoji (fine in the mascot lines, odd elsewhere)' },
    { id: 'exclaim', severity: 'SOFT', re: /!/g, note: 'exclamation mark' },
    ...[
        'digital realm', 'built with passion', 'passionate', 'crafted', 'seamless', 'leverage', 'delve', 'tapestry',
        'cutting-edge', 'state-of-the-art', 'robust', 'elevate', 'unlock', 'empower', 'game-changer', "in today's",
        'ever-evolving', 'dive into', 'innovative', 'synergy', 'holistic', 'world-class', 'best-in-class',
        "i'd love to hear", 'feel free to', 'reach out', 'next level', "whether you're", 'journey', 'realm',
        'welcome to my', 'valuable real-world', 'modern tools', 'modern, responsive',
    ].map((w) => ({ id: `phrase:${w}`, severity: 'HARD', re: new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'gi'), note: 'stock phrase' })),
    ...['đam mê', 'không ngừng', 'hành trình', 'không gian ảo', 'chắp cánh', 'kiến tạo', 'tối ưu trải nghiệm'].map((w) => ({
        id: `phrase:${w}`,
        severity: 'SOFT',
        re: new RegExp(w, 'gi'),
        note: 'cụm từ sáo rỗng',
    })),
    ...['very', 'really', 'just', 'simply', 'actually', 'basically'].map((w) => ({
        id: `filler:${w}`,
        severity: 'SOFT',
        re: new RegExp(`\\b${w}\\b`, 'gi'),
        note: 'filler word',
    })),
    { id: 'not-x-but-y', severity: 'SOFT', re: /\b(not just|isn't just|aren't just)\b[^.]{0,60}\b(but|it's)\b/gi, note: '"not just X but Y" construction' },
];

function collect(file) {
    const text = fs.readFileSync(file, 'utf8');
    if (file.endsWith('.json')) {
        const out = [];
        const walk = (node, p) => {
            if (typeof node === 'string') out.push({ where: p, text: node });
            else if (Array.isArray(node)) node.forEach((v, i) => walk(v, `${p}[${i}]`));
            else if (node && typeof node === 'object') for (const [k, v] of Object.entries(node)) walk(v, p ? `${p}.${k}` : k);
        };
        walk(JSON.parse(text), '');
        return out;
    }
    return text
        .split(/\r?\n/)
        .map((line, i) => ({ where: `line ${i + 1}`, text: line }))
        .filter((x) => x.text.trim() && !/^\s*(---|```)/.test(x.text));
}

const sentences = (s) => s.split(/(?<=[.!?])\s+/).map((x) => x.trim()).filter((x) => x.split(/\s+/).length >= 2);
const words = (s) => s.split(/\s+/).filter(Boolean);
const syllables = (w) => (w.toLowerCase().replace(/[^a-z]/g, '').replace(/e$/, '').match(/[aeiouy]{1,2}/g) ?? ['a']).length;
const flesch = (text) => {
    const ss = sentences(text);
    const ws = words(text);
    if (!ss.length || !ws.length) return null;
    const syl = ws.reduce((n, w) => n + syllables(w), 0);
    return 206.835 - 1.015 * (ws.length / ss.length) - 84.6 * (syl / ws.length);
};

let hard = 0;
let soft = 0;
for (const file of files) {
    if (!fs.existsSync(file)) {
        console.error(`File not found: ${file}`);
        process.exitCode = 2;
        continue;
    }
    const items = collect(file);
    const findings = [];
    for (const item of items) {
        for (const rule of RULES) {
            const hits = item.text.match(rule.re);
            if (hits) findings.push({ sev: rule.severity, rule: rule.id, where: item.where, count: hits.length, text: item.text.slice(0, 70).replace(/\s+/g, ' ') });
        }
    }

    // Sentence statistics, only over strings long enough to be prose.
    const prose = items.map((i) => i.text).filter((t) => t.length > 60).join(' ');
    const ss = sentences(prose);
    const lens = ss.map((s) => words(s).length);
    const mean = lens.reduce((a, b) => a + b, 0) / (lens.length || 1);
    const sd = Math.sqrt(lens.reduce((a, b) => a + (b - mean) ** 2, 0) / (lens.length || 1));
    const starts = {};
    for (const s of ss) {
        const w = words(s)[0]?.toLowerCase();
        if (w) starts[w] = (starts[w] ?? 0) + 1;
    }
    const topStart = Object.entries(starts).sort((a, b) => b[1] - a[1])[0];

    console.log(`\n== ${path.relative(process.cwd(), file)}`);
    if (findings.length) console.table(findings.sort((a, b) => (a.sev < b.sev ? -1 : 1)));
    else console.log('no pattern findings');
    if (ss.length >= 4) {
        const burst = mean ? sd / mean : 0;
        console.log(
            `prose: ${ss.length} sentences, mean ${mean.toFixed(1)} words, variation ${(burst * 100).toFixed(0)}%` +
                (burst < 0.35 ? '  <- very even sentence length (reads mechanical)' : '') +
                (/[a-z]/i.test(prose) && !/[ạảãàáâậầấẩẫăắằặẳẵéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ]/i.test(prose)
                    ? `, Flesch ${flesch(prose)?.toFixed(0)}`
                    : ''),
        );
        if (topStart && topStart[1] >= 3) console.log(`repeated sentence opener: "${topStart[0]}" x${topStart[1]}`);
    }
    hard += findings.filter((f) => f.sev === 'HARD').reduce((n, f) => n + f.count, 0);
    soft += findings.filter((f) => f.sev === 'SOFT').reduce((n, f) => n + f.count, 0);
}

console.log(`\nTotals: ${hard} hard, ${soft} soft`);
if (strict && hard) process.exit(1);
