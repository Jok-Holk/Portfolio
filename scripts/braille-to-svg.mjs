// Converts the Braille-art cat (src/assets/mascot/cat.braille.txt) into an SVG of dots.
//
//   node scripts/braille-to-svg.mjs            write src/assets/mascot/cat.svg, then verify it
//   node scripts/braille-to-svg.mjs --verify   decode the existing SVG and compare it with the source
//   node scripts/braille-to-svg.mjs --png      also write review images to docs/baseline/ (needs sharp)
//
// A Braille character is 2 columns x 4 rows of dots. Each set dot becomes a zero-length
// subpath with a round cap ("M x y h0"), so the file stays small and CSS colours it via currentColor.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = resolve(root, 'src/assets/mascot/cat.braille.txt');
const OUT = resolve(root, 'src/assets/mascot/cat.svg');
const REVIEW_DIR = resolve(root, 'docs/baseline');

const PITCH = 2; // distance between neighbouring dot centres, in user units
const DOT = 1.3; // dot diameter (stroke width)

// Braille bit -> [column in cell, row in cell] (Unicode 8-dot Braille: dots 1-3 left, 4-6 right, 7 left, 8 right).
const BITS = [
    [0x01, 0, 0],
    [0x02, 0, 1],
    [0x04, 0, 2],
    [0x08, 1, 0],
    [0x10, 1, 1],
    [0x20, 1, 2],
    [0x40, 0, 3],
    [0x80, 1, 3],
];

/** Source text -> { dots: Set<"x,y"> (global dot grid), lineLengths, cols, rows }. */
function decodeBraille(text) {
    const lines = text.replace(/\r/g, '').split('\n').filter((l) => l.length > 0);
    const dots = new Set();
    const lineLengths = [];
    for (let row = 0; row < lines.length; row++) {
        const chars = [...lines[row]];
        lineLengths.push(chars.length);
        chars.forEach((ch, col) => {
            const mask = ch.codePointAt(0) - 0x2800;
            if (mask < 0 || mask > 0xff) throw new Error(`Not a Braille character on line ${row + 1}, col ${col + 1}: ${ch}`);
            for (const [bit, dx, dy] of BITS) {
                if (mask & bit) dots.add(`${col * 2 + dx},${row * 4 + dy}`);
            }
        });
    }
    const cols = Math.max(...lineLengths) * 2;
    return { dots, lineLengths, cols, rows: lines.length * 4 };
}

/** Dot grid -> Braille text. Trailing empty cells are trimmed so the result is comparable with any padding. */
function encodeBraille(dots, rows) {
    const lines = [];
    for (let row = 0; row < rows / 4; row++) {
        let line = '';
        let maxCol = 0;
        for (const key of dots) {
            const [x, y] = key.split(',').map(Number);
            if (Math.floor(y / 4) === row) maxCol = Math.max(maxCol, Math.floor(x / 2) + 1);
        }
        for (let col = 0; col < maxCol; col++) {
            let mask = 0;
            for (const [bit, dx, dy] of BITS) if (dots.has(`${col * 2 + dx},${row * 4 + dy}`)) mask |= bit;
            line += String.fromCodePoint(0x2800 + mask);
        }
        lines.push(line);
    }
    return lines.join('\n');
}

function trimBlankTails(text) {
    return text
        .split('\n')
        .map((l) => l.replace(/⠀+$/u, ''))
        .join('\n');
}

function buildSvg({ dots, cols, rows }) {
    const keys = [...dots].map((k) => k.split(',').map(Number));
    // Row-major order keeps the path readable and diff-friendly.
    keys.sort((a, b) => a[1] - b[1] || a[0] - b[0]);
    const d = keys.map(([x, y]) => `M${x * PITCH + PITCH / 2} ${y * PITCH + PITCH / 2}h0`).join('');
    const w = cols * PITCH;
    const h = rows * PITCH;
    return (
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" fill="none" stroke="currentColor" ` +
        `stroke-width="${DOT}" stroke-linecap="round" aria-hidden="true" focusable="false">` +
        `<path d="${d}"/></svg>\n`
    );
}

/** SVG -> dot grid, using only what is written in the file (independent of the generator's data). */
function decodeSvg(svg) {
    const vb = svg.match(/viewBox="0 0 (\d+) (\d+)"/);
    const sw = Number(svg.match(/stroke-width="([\d.]+)"/)?.[1]);
    const d = svg.match(/<path d="([^"]*)"/)?.[1];
    if (!vb || !d || !Number.isFinite(sw)) throw new Error('Unexpected SVG structure');
    const dots = new Set();
    const re = /M(\d+) (\d+)h0/g;
    let m;
    let consumed = 0;
    while ((m = re.exec(d))) {
        consumed += m[0].length;
        const px = Number(m[1]);
        const py = Number(m[2]);
        // Dot centres must sit exactly in the middle of a pitch cell.
        if ((px - PITCH / 2) % PITCH !== 0 || (py - PITCH / 2) % PITCH !== 0) throw new Error(`Off-grid dot ${px},${py}`);
        const key = `${(px - PITCH / 2) / PITCH},${(py - PITCH / 2) / PITCH}`;
        if (dots.has(key)) throw new Error(`Duplicate dot ${key}`);
        dots.add(key);
    }
    if (consumed !== d.length) throw new Error('Path contains something other than dot subpaths');
    return { dots, w: Number(vb[1]), h: Number(vb[2]) };
}

function verify(source, svg) {
    const src = decodeBraille(source);
    const back = decodeSvg(svg);
    const problems = [];
    if (back.w !== src.cols * PITCH || back.h !== src.rows * PITCH) problems.push(`viewBox ${back.w}x${back.h} != grid ${src.cols * PITCH}x${src.rows * PITCH}`);
    for (const k of src.dots) if (!back.dots.has(k)) problems.push(`missing dot ${k}`);
    for (const k of back.dots) if (!src.dots.has(k)) problems.push(`extra dot ${k}`);
    // Second, text-level proof: SVG -> Braille text must equal the source text (ignoring blank padding at line ends).
    const rebuilt = trimBlankTails(encodeBraille(back.dots, src.rows));
    const expected = trimBlankTails(source.replace(/\r/g, '').split('\n').filter((l) => l.length > 0).join('\n'));
    const textEqual = rebuilt === expected;
    if (!textEqual) problems.push('re-encoded Braille text differs from the source');
    return { ok: problems.length === 0, problems, dotCount: back.dots.size, srcDots: src.dots.size, textEqual, cols: src.cols, rows: src.rows, bytes: Buffer.byteLength(svg) };
}

async function writeReviewImages(source, svg) {
    const { default: sharp } = await import('sharp');
    mkdirSync(REVIEW_DIR, { recursive: true });
    const src = decodeBraille(source);
    const SCALE = 6; // px per user unit
    const W = src.cols * PITCH * SCALE;
    const H = src.rows * PITCH * SCALE;
    const bg = '#0c0912';

    // A: the generated SVG, coloured like the site's neon token.
    const left = Buffer.from(svg.replace('currentColor', '#fc03fd').replace('<svg ', `<svg width="${W}" height="${H}" `));

    // B: reference rendered straight from the source text with a Braille-capable font (independent of the decoder).
    const lines = source.replace(/\r/g, '').split('\n').filter(Boolean);
    const fs = 60;
    const cell = fs * 0.62; // fixed advance per character so every glyph lands in its own cell
    const text = lines
        .map((l, i) => {
            const xs = [...l].map((_, c) => (c * cell).toFixed(1)).join(' ');
            return `<text x="${xs}" y="${(i + 1) * fs * 1.1}" xml:space="preserve">${l}</text>`;
        })
        .join('');
    const refW = Math.ceil(Math.max(...lines.map((l) => [...l].length)) * cell + 20);
    const refH = Math.ceil(lines.length * fs * 1.1 + 20);
    const ref = Buffer.from(
        `<svg xmlns="http://www.w3.org/2000/svg" width="${refW}" height="${refH}"><g font-family="Segoe UI Symbol, DejaVu Sans, sans-serif" font-size="${fs}" fill="#fc03fd">${text}</g></svg>`,
    );

    const a = await sharp(left).resize({ width: 900 }).flatten({ background: bg }).png().toBuffer();
    const b = await sharp(ref).resize({ width: 900 }).flatten({ background: bg }).png().toBuffer();
    const ah = (await sharp(a).metadata()).height;
    const bh = (await sharp(b).metadata()).height;
    const gap = 20;
    await sharp({ create: { width: 900, height: ah + bh + gap, channels: 3, background: bg } })
        .composite([
            { input: a, top: 0, left: 0 },
            { input: b, top: ah + gap, left: 0 },
        ])
        .png()
        .toFile(resolve(REVIEW_DIR, 'mascot-check.png'));

    // C: small-size render (sm = ~120px wide) to check the dots stay readable.
    await sharp(left).resize({ width: 120 }).flatten({ background: bg }).png().toFile(resolve(REVIEW_DIR, 'mascot-check-sm.png'));
    console.log('Review images written to docs/baseline/ (mascot-check.png: top = SVG, bottom = font render of the source text).');
}

const args = new Set(process.argv.slice(2));
const source = readFileSync(SRC, 'utf8');

if (!args.has('--verify')) {
    writeFileSync(OUT, buildSvg(decodeBraille(source)));
    console.log(`Wrote ${OUT}`);
}

const result = verify(source, readFileSync(OUT, 'utf8'));
console.log(`Grid ${result.cols} x ${result.rows} dots, source dots: ${result.srcDots}, SVG dots: ${result.dotCount}, SVG size: ${result.bytes} bytes`);
console.log(`Dot sets identical: ${result.problems.every((p) => !/dot/.test(p))}; re-encoded Braille text identical: ${result.textEqual}`);
if (!result.ok) {
    console.error('VERIFY FAILED:\n' + result.problems.slice(0, 20).join('\n'));
    process.exit(1);
}
console.log('VERIFY OK: the SVG is 100% identical to the Braille source.');

if (args.has('--png')) await writeReviewImages(source, readFileSync(OUT, 'utf8'));
