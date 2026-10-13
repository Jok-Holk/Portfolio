/**
 * Regression test for src/lib/markdown.ts: npx -y tsx scripts/test-markdown.mjs
 * 1. Renders the real article exports (md-en, md-vi) and compares structure counts with plain
 *    `marked`, plus checks that no raw markup leaks into the output.
 * 2. Runs edge cases (the 22 from the old parser comparison, plus security and heading cases).
 * Exits 1 on any failure.
 */
import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';
import { renderMarkdown } from '../src/lib/markdown.ts';

const EXPORT_DIR = process.env.ARTICLES_DIR ?? 'D:/work/backups/articles-20261013';
let failed = 0;
const log = (ok, name, reason = '') => {
    if (!ok) failed++;
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${reason ? '  - ' + reason : ''}`);
};

const count = (html, re) => (html.match(re) || []).length;
const stripCode = (html) =>
    html.replace(/<div class="code-block">[\s\S]*?<\/pre><\/div>/g, '').replace(/<pre[\s\S]*?<\/pre>/g, '').replace(/<code[\s\S]*?<\/code>/g, '');

const metrics = (html) => ({
    p: count(html, /<p[ >]/g),
    li: count(html, /<li[ >]/g),
    ul: count(html, /<ul[ >]/g),
    ol: count(html, /<ol[ >]/g),
    pre: count(html, /<pre[ >]/g),
    h: count(html, /<h[1-6][ >]/g),
    bq: count(html, /<blockquote[ >]/g),
    table: count(html, /<table[ >]/g),
    img: count(html, /<img[ >]/g),
    hr: count(html, /<hr/g),
    lang: count(html, /<code class="language-/g),
});

function parseFrontmatter(source) {
    const raw = source.replace(/\r\n?/g, '\n');
    const m = raw.match(/^---\n([\s\S]*?)\n---\n?/);
    if (!m) return { meta: {}, body: raw };
    const meta = {};
    for (const line of m[1].split('\n')) {
        const kv = line.match(/^(\w+):\s*(.*)$/);
        if (kv) meta[kv[1]] = kv[2].replace(/^"(.*)"$/, '$1');
    }
    return { meta, body: raw.slice(m[0].length) };
}

console.log('== Real articles ==');
for (const lang of ['en', 'vi']) {
    const dir = path.join(EXPORT_DIR, `md-${lang}`);
    for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.md'))) {
        const { meta, body } = parseFrontmatter(fs.readFileSync(path.join(dir, file), 'utf8'));
        const name = `${lang}/${file.slice(0, 44)}`;
        const mine = await renderMarkdown(body, { title: meta.title });
        const ref = marked.parse(body, { gfm: true });
        const a = metrics(mine.html);
        const b = metrics(ref);

        const firstH1 = body.match(/^\s*# (.+)$/m);
        const titleDropped = b.h - a.h; // heading count difference caused by dropping the duplicate title
        const problems = [];

        // Structure: same as plain marked, except the dropped title heading.
        for (const key of ['p', 'li', 'ul', 'ol', 'pre', 'bq', 'table', 'img', 'hr', 'lang']) {
            if (a[key] !== b[key]) problems.push(`${key}: mine ${a[key]} vs marked ${b[key]}`);
        }
        if (titleDropped < 0 || titleDropped > 1) problems.push(`headings: mine ${a.h} vs marked ${b.h}`);
        if (b.pre !== count(body, /^\s*```/gm) / 2 && b.pre !== Math.ceil(count(body, /^\s*```/gm) / 2)) {
            problems.push(`code fences in source (${count(body, /^\s*```/gm)}) do not match <pre> (${b.pre})`);
        }

        // Every fenced block with a language keeps it.
        const fencedLangs = count(body, /^\s*```[\w+#.-]+/gm);
        if (a.lang !== fencedLangs) problems.push(`language classes ${a.lang} vs fences with language ${fencedLangs}`);

        // Nothing leaked.
        const prose = stripCode(mine.html);
        if (/!<a /.test(mine.html)) problems.push('fake "!" link');
        if (/\*\*|`|\]\(/.test(prose.replace(/<[^>]+>/g, ''))) problems.push('raw markup leaked: ' + (prose.replace(/<[^>]+>/g, '').match(/.{0,20}(\*\*|`|\]\().{0,20}/) || [''])[0]);
        if (count(mine.html, /<h1[ >]/g) !== 0) problems.push('stray <h1>');
        const ids = [...mine.html.matchAll(/<h[1-6] id="([^"]+)"/g)].map((m) => m[1]);
        if (new Set(ids).size !== ids.length) problems.push('duplicate heading ids');
        if (mine.headings.some((h) => !mine.html.includes(`id="${h.id}"`))) problems.push('TOC id missing in html');
        if (/&amp;amp;|&amp;lt;|&amp;gt;/.test(mine.html)) problems.push('double-escaped entity');
        if (/<(script|style|iframe)/i.test(mine.html)) problems.push('dangerous tag present');
        if (firstH1 && titleDropped === 0 && meta.title) problems.push(`leading h1 "${firstH1[1]}" kept (title "${meta.title}")`);

        log(
            problems.length === 0,
            name,
            problems.length
                ? problems.join('; ')
                : `p=${a.p} li=${a.li} pre=${a.pre} lang=${a.lang} h=${a.h}(+${titleDropped} dropped) toc=${mine.headings.length} img=${a.img} table=${a.table} read=${mine.readingTimeMinutes}min`,
        );
    }
}

console.log('\n== Edge cases ==');
const render = async (md, opts) => (await renderMarkdown(md, opts)).html;
const has = (html, re) => (typeof re === 'string' ? html.includes(re) : re.test(html));

const cases = {
    image: ['![alt text](https://x.dev/a.png)', (h) => has(h, /<img src="https:\/\/x\.dev\/a\.png" alt="alt text" loading="lazy" decoding="async"/) && !has(h, '>!<') && !has(h, '!<a')],
    table: ['| a | b |\n|---|---|\n| 1 | 2 |', (h) => count(h, /<th>/g) === 2 && count(h, /<td>/g) === 2 && has(h, '<div class="table-wrap"><table>')],
    'nested-list': ['- one\n  - two\n    - three\n- four', (h) => count(h, /<ul>/g) === 3 && count(h, /<li>/g) === 4 && has(h, /<li>one\s*<ul>\s*<li>two\s*<ul>\s*<li>three/)],
    'code-in-list': ['1. Step one:\n\n   ```bash\n   ls -la\n   ```\n\n2. Step two', (h) => count(h, /<ol>/g) === 1 && count(h, /<li>/g) === 2 && has(h, /<li><p>Step one:<\/p>\s*<div class="code-block">/) && has(h, 'language-bash') && has(h, /<\/pre><\/div>\s*<\/li>\s*<li>/)],
    'multi-line-paragraph': ['line one of a paragraph\nline two of same paragraph', (h) => count(h, /<p>/g) === 1 && has(h, /line one of a paragraph\s+line two/)],
    'list-continuation': ['- item one\n  continues here\n- item two', (h) => count(h, /<li>/g) === 2 && has(h, /<li>item one\s+continues here<\/li>/)],
    strike: ['this is ~~gone~~ text', (h) => has(h, '<del>gone</del>')],
    'bare-url': ['see https://example.com now', (h) => has(h, /<a href="https:\/\/example\.com" target="_blank" rel="noopener noreferrer">https:\/\/example\.com<\/a>/)],
    'link-with-parens': ['[wiki](https://en.wikipedia.org/wiki/Foo_(bar))', (h) => has(h, 'href="https://en.wikipedia.org/wiki/Foo_(bar)"') && has(h, '>wiki</a></p>')],
    'glob-star': [
        'run it with src/*.js and lib/*.js files',
        // CommonMark: both `*` are flanked by punctuation, so a strict parser may emphasise text between them.
        // Accept either; the point is that nothing is lost and no stray markup is left.
        (h) => has(h, 'src/') && has(h, '.js files') && !has(h, '*'),
        'CommonMark treats this as emphasis; write `src/*.js` in backticks',
    ],
    'underscore-bold': ['this is __bold__ and _em_', (h) => has(h, '<strong>bold</strong>') && has(h, '<em>em</em>')],
    'inline-html': ['press <kbd>Ctrl</kbd> + <kbd>C</kbd>', (h) => count(h, /<kbd>/g) === 2 && count(h, /<\/kbd>/g) === 2],
    'task-list': ['- [x] done\n- [ ] todo', (h) => count(h, /<input type="checkbox" disabled="disabled"/g) === 2 && count(h, /checked="checked"/g) === 1],
    'hard-break': ['first  \nsecond', (h) => has(h, /first<br \/>\s*second/)],
    setext: ['Title\n=====', (h) => !has(h, '<h1') && has(h, /<h2 id="title">Title<\/h2>/)],
    'fence-lang': ['```bash\necho hi\n```', (h) => has(h, '<code class="language-bash">') && has(h, '<span class="code-lang">bash</span>') && count(h, /<pre[ >]/g) === 1],
    'unclosed-fence': ['```js\nconst a = 1;\n\ntext after', (h) => count(h, /<pre[ >]/g) === 1 && has(h, 'language-js') && has(h, 'text after') && !has(h, '```')],
    'nested-quote-code': ['> note\n> ```\n> code\n> ```', (h) => has(h, /<blockquote>[\s\S]*<p>note<\/p>[\s\S]*<pre[^>]*><code>code<\/code><\/pre>[\s\S]*<\/blockquote>/)],
    'footnote/dl': ['Term\n: Definition', (h) => has(h, 'Term') && has(h, 'Definition') && !has(h, '<dl')],
    'html-entity': ['A &amp; B &lt; C', (h) => has(h, 'A &amp; B &lt; C') && !has(h, '&amp;amp;')],
    'tab-indent-list': ['- one\n\t- two', (h) => count(h, /<ul>/g) === 2 && has(h, /<li>one\s*<ul>\s*<li>two/)],
    'ol-start-5': ['5. five\n6. six', (h) => has(h, '<ol start="5">') && count(h, /<li>/g) === 2],

    // Added: security, headings, title handling.
    'xss-script': ['hi <script>alert(1)</script> there', (h) => !has(h, '<script') && !has(h, '<script>')],
    'xss-onerror': ['<img src="x" onerror="alert(1)"> <a href="javascript:alert(1)">x</a>', (h) => !/onerror/i.test(h) && !/javascript:/i.test(h)],
    'xss-iframe-style': ['<iframe src="https://evil.test"></iframe><span style="position:fixed;top:0">x</span>', (h) => !has(h, '<iframe>') && !has(h, '<iframe ') && !has(h, 'position:fixed')],
    'unknown-tag-shown-as-text': ['set <your-key> first', (h) => has(h, '&lt;your-key&gt;')],
    'external-vs-internal-link': ['[a](https://github.com/x) [b](/en/blog) [c](#top) [d](https://jokholk.dev/en)', (h) => count(h, /target="_blank"/g) === 1 && count(h, /rel="noopener noreferrer"/g) === 1],
    'relative-image-gets-base': ['![x](/uploads/a.png)', null, undefined, { baseUrl: 'https://strapi.jokholk.dev' }, (h) => has(h, 'src="https://strapi.jokholk.dev/uploads/a.png"')],
    'duplicate-heading-ids': ['## Setup\n\ntext\n\n## Setup\n\n### Setup', async (h, r) => r.headings.map((x) => x.id).join() === 'setup,setup-2,setup-3'],
    'vietnamese-heading-id': ['## Hướng dẫn cài đặt Đầu tiên', async (h, r) => r.headings[0].id === 'huong-dan-cai-dat-dau-tien' && r.headings[0].text === 'Hướng dẫn cài đặt Đầu tiên'],
    'heading-text-entities': ['## Q&A <kbd>Ctrl</kbd> `x`', async (h, r) => r.headings[0].text === 'Q&A Ctrl x' && has(h, 'id="q-a-ctrl-x"')],
    'drop-duplicate-title': ['# My   Title\n\nbody', null, undefined, { title: 'my title' }, (h) => !has(h, '<h') && has(h, '<p>body</p>')],
    'keep-different-h1-as-h2': ['# Something else\n\n## Sub', null, undefined, { title: 'my title' }, (h, r) => !has(h, '<h1') && has(h, '<h2 id="something-else">') && has(h, '<h3 id="sub">') && r.headings.length === 2],
    'h4-not-in-toc': ['## A\n\n#### Deep', async (h, r) => r.headings.length === 1 && has(h, '<h4>Deep</h4>')],
    'code-escapes-html': ['```html\n<div class="x">&amp;</div>\n```', (h) => !has(h, '<div class="x">') && has(h, '&lt;') && has(h, 'language-html')],
    'unknown-language': ['```brainfuck\n+++\n```', (h) => has(h, 'language-brainfuck') && has(h, '+++') && count(h, /<pre[ >]/g) === 1],
    'reading-time-min-1': ['short', null, undefined, {}, async (h, r) => r.readingTimeMinutes === 1],
};

for (const [name, spec] of Object.entries(cases)) {
    const [md, check, note, opts, check2] = spec;
    try {
        const r = await renderMarkdown(md, opts ?? {});
        const fn = check ?? check2;
        const ok = await fn(r.html, r);
        log(Boolean(ok), name, ok ? note ?? '' : 'unexpected output: ' + r.html.replace(/\s+/g, ' ').slice(0, 160));
    } catch (error) {
        log(false, name, 'threw ' + (error instanceof Error ? error.message : error));
    }
}

console.log(`\n${failed === 0 ? 'ALL PASS' : failed + ' FAILED'}`);
process.exit(failed === 0 ? 0 : 1);
