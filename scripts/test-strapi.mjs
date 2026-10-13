/**
 * Checks the Strapi client: v4 and v5 normalisation (offline) and, with --live, the real API.
 *   npx -y tsx scripts/test-strapi.mjs [--live]
 */
import fs from 'node:fs';
import { normalizeArticle, getArticles, getArticle } from '../src/lib/strapi.ts';

const BASE = 'https://strapi.jokholk.dev';
const DIR = process.env.ARTICLES_DIR ?? 'D:/work/backups/articles-20261013';
let failed = 0;
const check = (ok, name, info = '') => {
    if (!ok) failed++;
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${info ? '  - ' + info : ''}`);
};
const valid = (a) =>
    a.title && a.slug && a.content && /^\d{4}-\d{2}-\d{2}/.test(a.publishDate) && (!a.image || /^https:\/\//.test(a.image.url)) &&
    a.categories.every((c) => c.name) && a.localizations.every((l) => l.slug && ['en', 'vi'].includes(l.locale));

for (const lang of ['en', 'vi']) {
    const raw = JSON.parse(fs.readFileSync(`${DIR}/articles-${lang}.json`, 'utf8')).data;
    const list = raw.map((e) => normalizeArticle(e, BASE));
    check(list.length === raw.length && list.every(valid), `v4 backup ${lang}`, `${list.length} articles, images ${list.filter((a) => a.image).length}, ` +
        `with localization ${list.filter((a) => a.localizations.length).length}, tags ${list.reduce((n, a) => n + a.categories.length, 0)}`);
    const a = list[0];
    check(a.image?.url.startsWith(BASE + '/uploads/') && a.image.width > 0 && a.image.height > 0, `v4 ${lang} image absolute + size`, `${a.image?.url} ${a.image?.width}x${a.image?.height}`);
}

// v5-shaped entry (flat, documentId, arrays).
const v5 = normalizeArticle(
    {
        id: 7, documentId: 'abc123', title: 'T', slug: 's', description: 'd', content: '# T', publish_date: '2026-01-02', locale: 'en',
        image: { id: 3, url: '/uploads/x.webp', width: 800, height: 400, alternativeText: 'alt' },
        categories: [{ id: 1, documentId: 'c1', name: 'Git' }],
        localizations: [{ id: 8, slug: 's-vi', locale: 'vi' }],
    },
    BASE,
);
check(
    v5.id === 7 && v5.image?.url === BASE + '/uploads/x.webp' && v5.image.alt === 'alt' && v5.categories[0].name === 'Git' && v5.localizations[0].slug === 's-vi',
    'v5 flat entry',
);
const noImage = normalizeArticle({ id: 1, attributes: { title: 'T', slug: 's', publish_date: '2026-01-01', image: { data: null }, categories: { data: [] }, localizations: { data: [] } } }, BASE);
check(noImage.image === undefined && noImage.categories.length === 0 && noImage.localizations.length === 0, 'v4 entry without image/relations');
let threw = false;
try { normalizeArticle({ id: 1, attributes: { title: '' } }, BASE); } catch { threw = true; }
check(threw, 'entry without title/slug throws');

if (process.argv.includes('--live')) {
    process.env.STRAPI_URL = BASE;
    for (const lang of ['en', 'vi']) {
        const t0 = Date.now();
        const list = await getArticles(lang);
        const again = await getArticles(lang);
        const sorted = list.every((a, i) => i === 0 || Date.parse(list[i - 1].publishDate) >= Date.parse(a.publishDate));
        check(list.length > 0 && valid.call(null, list[0]) && list.every(valid) && sorted && list === again, `live ${lang}`, `${list.length} articles, ${Date.now() - t0}ms, memoized=${list === again}, sorted=${sorted}`);
        check((await getArticle(lang, list[0].slug))?.slug === list[0].slug && (await getArticle(lang, 'nope')) === undefined, `live getArticle ${lang}`);
        console.log('   ', list.map((a) => `${a.publishDate} ${a.slug.slice(0, 30)} -> ${a.localizations.map((l) => l.locale + ':' + l.slug.slice(0, 20)).join()}`).join('\n    '));
    }
    process.env.STRAPI_URL = 'http://127.0.0.1:9';
    const { getArticles: g2 } = await import('../src/lib/strapi.ts?bad');
    try { await g2('en'); check(false, 'unreachable server throws'); } catch (e) { check(/\[strapi\]/.test(e.message), 'unreachable server throws', e.message.slice(0, 90)); }
}
console.log(failed ? `${failed} FAILED` : 'ALL PASS');
process.exit(failed ? 1 : 0);
