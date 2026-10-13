/**
 * Builds the logo, favicons, app icons, OG image and manifest into /public.
 * Inputs: src/assets/logo/source/vector-01.original.svg (copy of the original,
 * never edited) and src/assets/logo/jok-holk-text.json (outlined wordmark, made by
 * scripts/logo/outline-text.py).
 * Run: node scripts/build-icons.mjs
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { optimize } from 'svgo';

const root = process.cwd();
const SOURCE = path.join(root, 'src/assets/logo/source/vector-01.original.svg');
const TEXT = path.join(root, 'src/assets/logo/jok-holk-text.json');
const PUBLIC = path.join(root, 'public');

// Background colour from the logo.
const INK = '#010101';

const original = await fs.readFile(SOURCE, 'utf8');
const wordmark = JSON.parse(await fs.readFile(TEXT, 'utf8'));

/** Outline the wordmark, rename classes and ids, drop Illustrator leftovers. */
function normalise(svg) {
    let out = svg
        .replace(/<\?xml[^>]*\?>\s*/, '')
        .replace(/\s+id="Layer_1"\s+data-name="Layer 1"/, '')
        .replace(/<text class="cls-8"[\s\S]*?<\/text>/, `<path class="cls-8" d="${wordmark.d}"/>`)
        .replace(/\s*font-family:[^;]*;\s*font-size:[^;]*;/, '')
        .replace(/cls-(\d+)/g, 'jh-$1')
        .replace(/linear-gradient/g, 'jh-grad');
    return out;
}

const lines = normalise(original).split('\n');
const isRing = (l) => l.includes('class="jh-5"') && l.includes('M218.65,437.29');
const isDecor = (l) => l.includes('class="jh-6"');
const isText = (l) => l.includes('class="jh-8"');
const isBar = (l) => l.includes('class="jh-2"');

function pick(predicateToDrop) {
    return lines.filter((l) => !predicateToDrop(l)).join('\n');
}

const full = pick(() => false);
// Small sizes drop the white ring, decorations, wordmark and bars.
const mark = pick((l) => isRing(l) || isDecor(l) || isText(l) || isBar(l));

function minify(svg) {
    return optimize(svg, { multipass: true, plugins: ['preset-default'] }).data;
}

const fullSvg = minify(full);
const markSvg = minify(mark);

await fs.writeFile(path.join(PUBLIC, 'logo.svg'), fullSvg);
await fs.writeFile(path.join(PUBLIC, 'logo-mark.svg'), markSvg);
await fs.writeFile(path.join(PUBLIC, 'favicon.svg'), markSvg);

// The logo's dashes, sparkles and diamonds as a standalone motif.
const decorLine = lines.find(isDecor);
const decorPath = decorLine && /\sd="([^"]+)"/.exec(decorLine)?.[1];
if (!decorPath) throw new Error('Could not find the decoration path in the logo');
const motifSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 437.29 437.29"><path fill="#ce2bd4" d="${decorPath}"/></svg>`;
await fs.writeFile(path.join(PUBLIC, 'motif.svg'), minify(motifSvg));

const render = (svg, size) => sharp(Buffer.from(svg), { density: 600 }).resize(size, size).png();

// Square icons on transparent background.
await render(markSvg, 192).toFile(path.join(PUBLIC, 'icon-192.png'));
await render(markSvg, 512).toFile(path.join(PUBLIC, 'icon-512.png'));

// Maskable icon: solid background, mark inside the 80% safe zone.
async function onSolid(svg, canvas, inner) {
    const mark = await render(svg, inner).toBuffer();
    return sharp({ create: { width: canvas, height: canvas, channels: 4, background: INK } })
        .composite([{ input: mark, gravity: 'center' }])
        .png();
}
await (await onSolid(markSvg, 512, 360)).toFile(path.join(PUBLIC, 'icon-maskable-512.png'));
await (await onSolid(markSvg, 180, 156)).toFile(path.join(PUBLIC, 'apple-touch-icon.png'));

// favicon.ico (PNG-compressed entries: 16, 32, 48).
const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map((s) => render(markSvg, s).toBuffer()));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const entries = sizes.map((s, i) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(s, 0);
    e.writeUInt8(s, 1);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(pngs[i].length, 8);
    e.writeUInt32LE(offset, 12);
    offset += pngs[i].length;
    return e;
});
await fs.writeFile(path.join(PUBLIC, 'favicon.ico'), Buffer.concat([header, ...entries, ...pngs]));

// Open Graph image: full logo centred on the ink background.
const ogLogo = await render(fullSvg, 560).toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 4, background: INK } })
    .composite([{ input: ogLogo, gravity: 'center' }])
    .png({ compressionLevel: 9 })
    .toFile(path.join(PUBLIC, 'og-default.png'));

await fs.writeFile(
    path.join(PUBLIC, 'site.webmanifest'),
    JSON.stringify(
        {
            name: 'Jok Holk',
            short_name: 'Jok Holk',
            start_url: '/en',
            display: 'standalone',
            background_color: INK,
            theme_color: INK,
            icons: [
                { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
                { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
                { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
            ],
        },
        null,
        2,
    ) + '\n',
);

const sizeKB = async (f) => ((await fs.stat(path.join(PUBLIC, f))).size / 1024).toFixed(1) + ' KB';
for (const f of ['logo.svg', 'logo-mark.svg', 'motif.svg', 'favicon.svg', 'favicon.ico', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'og-default.png', 'site.webmanifest']) {
    console.log(f.padEnd(24), await sizeKB(f));
}
