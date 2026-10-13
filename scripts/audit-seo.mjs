/**
 * SEO audit of the build. Only https://jokholk.dev/en may be indexed: every other
 * page must be `noindex`, the sitemap lists only /en, and robots.txt must not
 * Disallow anything (Google has to crawl a page to see its `noindex`).
 * Usage: node scripts/audit-seo.mjs [buildDir]   (default dist/client). Exits 1 on failure.
 */
import fs from 'node:fs';
import path from 'node:path';

const SITE = 'https://jokholk.dev';
const INDEXABLE = new Set(['/en']);
const dir = path.resolve(process.argv[2] ?? 'dist/client');

if (!fs.existsSync(dir)) {
    console.error(`Build directory not found: ${dir}\nRun \`yarn build\` first or pass the directory.`);
    process.exit(2);
}

const failures = [];
const warnings = [];
const fail = (page, msg) => failures.push(`${page}: ${msg}`);
const warn = (page, msg) => warnings.push(`${page}: ${msg}`);

function walk(d) {
    return fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
        const p = path.join(d, e.name);
        return e.isDirectory() ? (e.name === '_astro' ? [] : walk(p)) : [p];
    });
}

const files = walk(dir);
const htmlFiles = files.filter((f) => f.endsWith('.html'));
const exists = (urlPath) => {
    const clean = decodeURIComponent(urlPath.split('#')[0].split('?')[0]).replace(/\/$/, '');
    const candidates = [clean, `${clean}.html`, `${clean}/index.html`];
    return candidates.some((c) => fs.existsSync(path.join(dir, c)));
};

const attr = (tag, name) => (tag.match(new RegExp(`${name}\\s*=\\s*"([^"]*)"`, 'i')) ?? [])[1];
const tags = (html, re) => html.match(re) ?? [];
const metaContent = (html, key, value) => {
    const t = tags(html, /<meta\b[^>]*>/gi).find((m) => attr(m, key)?.toLowerCase() === value);
    return t ? attr(t, 'content') : undefined;
};

const rows = [];
for (const file of htmlFiles) {
    const rel = path.relative(dir, file).replace(/\\/g, '/');
    const urlPath = '/' + rel.replace(/(^|\/)index\.html$/, '').replace(/\.html$/, '');
    const route = urlPath === '/' ? '/' : urlPath.replace(/\/$/, '');
    const html = fs.readFileSync(file, 'utf8');

    if (/http-equiv=["']refresh["']/i.test(html)) continue; // Astro redirect stub (/ -> /en)

    const title = (html.match(/<title>([\s\S]*?)<\/title>/i) ?? [])[1]?.trim();
    const description = metaContent(html, 'name', 'description');
    const robots = (metaContent(html, 'name', 'robots') ?? '').toLowerCase();
    const canonical = attr(tags(html, /<link\b[^>]*rel=["']canonical["'][^>]*>/gi)[0] ?? '', 'href');
    const h1Count = tags(html, /<h1[\s>]/gi).length;
    const hreflang = tags(html, /<link\b[^>]*hreflang=/gi).length;
    const indexable = INDEXABLE.has(route);
    const isNoindex = /noindex/.test(robots);

    rows.push({ route, title: title?.length ?? 0, desc: description?.length ?? 0, h1: h1Count, robots: robots || '(none)' });

    if (!title) fail(route, 'missing <title>');
    if (!description) fail(route, 'missing meta description');
    if (!/<html[^>]*\blang=/i.test(html)) fail(route, 'missing <html lang>');
    if (hreflang) fail(route, `hreflang present (${hreflang}); only indexable URLs may be listed, and none are alternates`);
    if (/http:\/\/(?!localhost)/i.test(canonical ?? '')) fail(route, 'canonical is not https');

    if (indexable) {
        if (isNoindex) fail(route, 'must be indexable but has noindex');
        if (canonical !== `${SITE}${route}`) fail(route, `canonical should be ${SITE}${route}, got ${canonical}`);
        if (h1Count !== 1) fail(route, `expected exactly 1 <h1>, found ${h1Count}`);
        if (title && (title.length < 15 || title.length > 60)) warn(route, `title length ${title.length} (aim 15-60)`);
        if (description && (description.length < 110 || description.length > 160))
            warn(route, `description length ${description.length} (aim 110-160)`);
        const ogImage = metaContent(html, 'property', 'og:image');
        if (!ogImage || !ogImage.startsWith('https://')) fail(route, 'og:image missing or not absolute');
        else if (ogImage.startsWith(SITE) && !exists(new URL(ogImage).pathname)) fail(route, `og:image file missing in build: ${ogImage}`);
        if (metaContent(html, 'name', 'twitter:card') !== 'summary_large_image') fail(route, 'twitter:card summary_large_image missing');
        if (!metaContent(html, 'property', 'og:title') || !metaContent(html, 'property', 'og:description')) fail(route, 'og:title/og:description missing');

        const ld = tags(html, /<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi);
        const types = [];
        for (const block of ld) {
            const body = block.replace(/^<script[^>]*>/i, '').replace(/<\/script>$/i, '');
            try {
                const data = JSON.parse(body);
                types.push(data['@type']);
            } catch {
                fail(route, 'JSON-LD block is not valid JSON');
            }
        }
        for (const need of ['WebSite', 'Person']) if (!types.includes(need)) fail(route, `JSON-LD ${need} missing`);
    } else if (!isNoindex) {
        fail(route, `must be noindex (robots meta is "${robots || 'missing'}")`);
    }

    // Images need alt text.
    for (const img of tags(html, /<img\b[^>]*>/gi)) {
        // Astro writes an empty alt as a bare `alt` attribute, which is valid.
        if (!/\balt(\s|=|>|\/)/i.test(img)) fail(route, `<img> without alt: ${img.slice(0, 80)}`);
    }

    // Internal links must resolve to a file in the build.
    for (const a of tags(html, /<a\b[^>]*href="[^"]*"[^>]*>/gi)) {
        const href = attr(a, 'href');
        if (!href || !href.startsWith('/') || href.startsWith('//')) continue;
        if (!exists(href)) fail(route, `broken internal link ${href}`);
    }

    // Icon / manifest references must exist.
    for (const l of tags(html, /<link\b[^>]*rel=["'](?:icon|apple-touch-icon|manifest)["'][^>]*>/gi)) {
        const href = attr(l, 'href');
        if (href?.startsWith('/') && !exists(href)) fail(route, `missing asset ${href}`);
    }
}

// Indexable pages must exist.
for (const route of INDEXABLE) if (!rows.some((r) => r.route === route)) fail(route, 'indexable page not found in the build');

// Sitemap: only /en.
const sitemapFiles = files.filter((f) => /sitemap-\d+\.xml$/.test(f));
if (!sitemapFiles.length) fail('sitemap', 'no sitemap-N.xml found');
for (const f of sitemapFiles) {
    const urls = [...fs.readFileSync(f, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    const unexpected = urls.filter((u) => !INDEXABLE.has(new URL(u).pathname));
    if (unexpected.length) fail('sitemap', `contains non-indexable URLs: ${unexpected.join(', ')}`);
    if (!urls.length) fail('sitemap', 'is empty');
}

// robots.txt: no Disallow, and a Sitemap line.
const robotsPath = path.join(dir, 'robots.txt');
if (!fs.existsSync(robotsPath)) fail('robots.txt', 'missing');
else {
    const txt = fs.readFileSync(robotsPath, 'utf8');
    if (/^\s*Disallow:\s*\S+/im.test(txt)) fail('robots.txt', 'has a non-empty Disallow (noindex pages must stay crawlable)');
    if (!/^\s*Sitemap:\s*https:\/\/jokholk\.dev\/sitemap-index\.xml/im.test(txt)) fail('robots.txt', 'Sitemap line missing');
}

console.table(rows.sort((a, b) => a.route.localeCompare(b.route)));
if (warnings.length) console.log('\nWarnings:\n - ' + warnings.join('\n - '));
if (failures.length) {
    console.error('\nFAILED:\n - ' + failures.join('\n - '));
    process.exit(1);
}
console.log(`\nSEO audit passed: ${rows.length} pages, only ${[...INDEXABLE].join(', ')} indexable.`);
