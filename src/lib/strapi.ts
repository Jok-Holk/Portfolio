/**
 * Strapi client for the blog. Strapi 4 nests fields under `attributes` and wraps
 * relations in `{ data }`; Strapi 5 returns them flat. Both are normalised into
 * `Article`, so the rest of the site does not care which one is running.
 * Any failure throws, so a broken CMS fails the build instead of publishing an empty blog.
 */

export type ArticleLang = 'en' | 'vi';

export type Article = {
    id: number | string;
    title: string;
    slug: string;
    description: string;
    /** Markdown source. */
    content: string;
    /** ISO date (`2026-03-16` or a full timestamp). */
    publishDate: string;
    image?: { url: string; width?: number; height?: number; alt?: string };
    categories: { id: number | string; name: string }[];
    localizations: { slug: string; locale: ArticleLang }[];
};

const REQUEST_TIMEOUT_MS = 15_000;
const ATTEMPTS = 3;
const PAGE_SIZE = 100;

type Json = Record<string, any>;

export function getStrapiUrl(): string {
    const fromVite = (import.meta as unknown as { env?: Record<string, string | undefined> }).env?.STRAPI_URL;
    const fromProcess = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env?.STRAPI_URL;
    const url = (fromVite || fromProcess || '').trim().replace(/\/+$/, '');
    if (!url) {
        throw new Error('[strapi] STRAPI_URL is not set. Add it to .env (e.g. STRAPI_URL=https://strapi.jokholk.dev).');
    }
    return url;
}

/** v4 wraps fields in `attributes`, v5 does not. */
function flat(entity: unknown): Json | null {
    if (!entity || typeof entity !== 'object') return null;
    const item = entity as Json;
    return item.attributes && typeof item.attributes === 'object' ? { id: item.id, documentId: item.documentId, ...item.attributes } : item;
}

/** v4 relation `{ data: x }` or `{ data: [x] }`, v5 `x` or `[x]`. */
function unwrap(relation: unknown): unknown {
    if (relation && typeof relation === 'object' && !Array.isArray(relation) && 'data' in (relation as Json)) {
        return (relation as Json).data;
    }
    return relation;
}

function toList(relation: unknown): Json[] {
    const value = unwrap(relation);
    if (Array.isArray(value)) return value.map(flat).filter((x): x is Json => x !== null);
    const single = flat(value);
    return single ? [single] : [];
}

function absoluteMediaUrl(url: string, base: string): string {
    return /^https?:\/\//i.test(url) ? url : new URL(url, base + '/').toString();
}

const asNumber = (value: unknown): number | undefined => (typeof value === 'number' && value > 0 ? value : undefined);
const asString = (value: unknown): string => (typeof value === 'string' ? value : '');

export function normalizeArticle(raw: unknown, base: string): Article {
    const item = flat(raw);
    if (!item) throw new Error('[strapi] article entry is empty');

    const title = asString(item.title).trim();
    const slug = asString(item.slug).trim();
    if (!title || !slug) {
        throw new Error(`[strapi] article ${item.id ?? '?'} is missing a title or slug`);
    }

    const publishDate = asString(item.publish_date || item.publishDate || item.publishedAt || item.createdAt);

    const media = toList(item.image)[0];
    let image: Article['image'];
    if (media && typeof media.url === 'string' && media.url) {
        image = {
            url: absoluteMediaUrl(media.url, base),
            width: asNumber(media.width),
            height: asNumber(media.height),
            alt: asString(media.alternativeText).trim() || undefined,
        };
    }

    const categories = toList(item.categories)
        .filter((c) => typeof c.name === 'string' && c.name)
        .map((c) => ({ id: c.id as number | string, name: c.name as string }));

    const localizations = toList(item.localizations)
        .filter((l) => typeof l.slug === 'string' && (l.locale === 'en' || l.locale === 'vi'))
        .map((l) => ({ slug: l.slug as string, locale: l.locale as ArticleLang }));

    return {
        id: item.id ?? item.documentId,
        title,
        slug,
        description: asString(item.description).trim(),
        content: asString(item.content),
        publishDate,
        image,
        categories,
        localizations,
    };
}

function byNewest(a: Article, b: Article): number {
    const diff = Date.parse(b.publishDate) - Date.parse(a.publishDate);
    if (diff !== 0 && !Number.isNaN(diff)) return diff;
    return Number(b.id) - Number(a.id) || 0;
}

async function fetchJson(url: string): Promise<Json> {
    let lastError: unknown;
    for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
        try {
            const res = await fetch(url, { signal: controller.signal, headers: { Accept: 'application/json' } });
            if (!res.ok) {
                const error = new Error(`[strapi] ${res.status} ${res.statusText} for ${url}`);
                // 4xx will not fix itself on retry.
                if (res.status < 500) throw Object.assign(error, { fatal: true });
                throw error;
            }
            return (await res.json()) as Json;
        } catch (error) {
            lastError = error;
            if ((error as { fatal?: boolean }).fatal) break;
            if (attempt < ATTEMPTS) await new Promise((resolve) => setTimeout(resolve, 500 * attempt));
        } finally {
            clearTimeout(timer);
        }
    }
    const reason =
        lastError instanceof Error
            ? lastError.name === 'AbortError'
                ? `timed out after ${REQUEST_TIMEOUT_MS / 1000}s`
                : lastError.message
            : String(lastError);
    throw new Error(`[strapi] could not load ${url}: ${reason}`, { cause: lastError });
}

async function loadArticles(lang: ArticleLang): Promise<Article[]> {
    const base = getStrapiUrl();
    const articles: Article[] = [];

    for (let page = 1; ; page++) {
        const url =
            `${base}/api/articles?populate=*&locale=${lang}&sort=publish_date:desc` +
            `&pagination[page]=${page}&pagination[pageSize]=${PAGE_SIZE}`;
        const body = await fetchJson(url);
        if (!Array.isArray(body.data)) {
            throw new Error(`[strapi] unexpected response for ${url}: "data" is not a list`);
        }
        for (const entry of body.data) articles.push(normalizeArticle(entry, base));
        const pageCount = Number(body.meta?.pagination?.pageCount ?? 1);
        if (page >= pageCount) break;
    }

    const seen = new Set<string>();
    for (const article of articles) {
        if (seen.has(article.slug)) throw new Error(`[strapi] duplicate slug "${article.slug}" in locale ${lang}`);
        seen.add(article.slug);
    }
    return articles.sort(byNewest);
}

// One request per language per build, shared by every page that needs the list.
const cache = new Map<ArticleLang, Promise<Article[]>>();

/** All published articles for a language, newest first. */
export function getArticles(lang: ArticleLang): Promise<Article[]> {
    let pending = cache.get(lang);
    if (!pending) {
        pending = loadArticles(lang);
        cache.set(lang, pending);
    }
    return pending;
}

export async function getArticle(lang: ArticleLang, slug: string): Promise<Article | undefined> {
    return (await getArticles(lang)).find((article) => article.slug === slug);
}
