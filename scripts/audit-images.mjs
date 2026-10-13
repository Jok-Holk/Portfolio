/**
 * Flags large images and raster images that are not WebP or AVIF.
 * Usage: node scripts/audit-images.mjs [buildDir] [--max-kb=150]   (default dist/client). Exits 1 on a problem.
 */
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const dir = path.resolve(args.find((a) => !a.startsWith('--')) ?? 'dist/client');
const maxKb = Number((args.find((a) => a.startsWith('--max-kb=')) ?? '--max-kb=150').split('=')[1]);

// PNGs that browsers and platforms require.
const ALLOWED_PNG = new Set(['og-default.png', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png']);

if (!fs.existsSync(dir)) {
    console.error(`Build directory not found: ${dir}`);
    process.exit(2);
}

const walk = (d) =>
    fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
        const p = path.join(d, e.name);
        return e.isDirectory() ? walk(p) : [p];
    });

const images = walk(dir).filter((f) => /\.(png|jpe?g|gif|webp|avif|svg|ico)$/i.test(f));
const problems = [];
const rows = images
    .map((f) => ({ file: path.relative(dir, f).replace(/\\/g, '/'), kb: +(fs.statSync(f).size / 1024).toFixed(1) }))
    .sort((a, b) => b.kb - a.kb);

let total = 0;
for (const r of rows) {
    total += r.kb;
    const ext = path.extname(r.file).toLowerCase();
    const base = path.basename(r.file);
    if (r.kb > maxKb) problems.push(`${r.file} is ${r.kb} KB (limit ${maxKb} KB)`);
    if (['.png', '.jpg', '.jpeg', '.gif'].includes(ext) && !ALLOWED_PNG.has(base))
        problems.push(`${r.file} is ${ext.slice(1).toUpperCase()}; use AVIF/WebP`);
}

console.table(rows.slice(0, 25));
console.log(`${rows.length} images, ${total.toFixed(1)} KB total`);
if (problems.length) {
    console.error('\nProblems:\n - ' + problems.join('\n - '));
    process.exit(1);
}
console.log('Image audit passed.');
