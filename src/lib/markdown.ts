/**
 * Markdown -> safe HTML, done at build time.
 *
 * marked parses, shiki highlights code (colours come from CSS variables that
 * `src/styles/article.css` maps to the site tokens), and sanitize-html has the
 * last word on what ends up in the page. Only build-time code: nothing here is
 * shipped to the browser.
 */
import { Marked, type Tokens } from 'marked';
import sanitizeHtml from 'sanitize-html';
import { bundledLanguages, createCssVariablesTheme, createHighlighter, type HighlighterGeneric } from 'shiki';

export type Heading = { id: string; text: string; depth: 2 | 3 };

export type RenderedMarkdown = {
    html: string;
    /** h2/h3 only, in document order. */
    headings: Heading[];
    readingTimeMinutes: number;
};

export type RenderOptions = {
    /** Article title: a leading `# Title` that repeats it is dropped (the page renders the h1). */
    title?: string;
    /** Used to make root-relative image/link URLs (`/uploads/..`) absolute. */
    baseUrl?: string;
};

const OWN_HOSTS = new Set(['jokholk.dev', 'www.jokholk.dev']);
const WORDS_PER_MINUTE = 220;
const CODE_LINES_PER_MINUTE = 30;

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function decodeEntities(value: string): string {
    return value
        .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) => safeCodePoint(parseInt(hex, 16)))
        .replace(/&#(\d+);/g, (_, dec: string) => safeCodePoint(parseInt(dec, 10)))
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&');
}

function safeCodePoint(code: number): string {
    try {
        return String.fromCodePoint(code);
    } catch {
        return '';
    }
}

/** Plain text of an HTML fragment (tags removed, entities decoded). */
function htmlToText(html: string): string {
    return decodeEntities(html.replace(/<[^>]*>/g, '')).replace(/\s+/g, ' ').trim();
}

/** `Hướng dẫn Git` -> `huong-dan-git`. Handles Vietnamese diacritics (including đ). */
export function slugify(text: string): string {
    return text
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/** Loose comparison key for "is this heading the article title?". */
function titleKey(text: string): string {
    return slugify(text).replace(/-/g, '');
}

function sameTitle(heading: string, title: string): boolean {
    const a = titleKey(heading);
    const b = titleKey(title);
    if (!a || !b) return false;
    if (a === b) return true;
    // The body title is sometimes a slightly different wording of the CMS title: compare the word sets.
    const wordsA = new Set(slugify(heading).split('-').filter(Boolean));
    const wordsB = new Set(slugify(title).split('-').filter(Boolean));
    let shared = 0;
    for (const word of wordsA) if (wordsB.has(word)) shared++;
    return shared / (wordsA.size + wordsB.size - shared) >= 0.7;
}

const LANGUAGE_ALIASES: Record<string, string | null> = {
    sh: 'bash',
    shell: 'bash',
    zsh: 'bash',
    env: 'dotenv',
    yml: 'yaml',
    conf: 'nginx',
    text: null,
    txt: null,
    plain: null,
    plaintext: null,
};

type Highlighter = HighlighterGeneric<any, any>;
let highlighterPromise: Promise<Highlighter> | undefined;

function getHighlighter(): Promise<Highlighter> {
    highlighterPromise ??= createHighlighter({
        // Colours are CSS variables (--shiki-token-*), defined from the site tokens in article.css.
        themes: [createCssVariablesTheme({ name: 'site', variablePrefix: '--shiki-', variableDefaults: {}, fontStyle: false })],
        langs: [],
    });
    return highlighterPromise;
}

/** Highlighted inner HTML of a `<code>` element, or an escaped plain text fallback. */
async function highlightCode(code: string, lang: string | null): Promise<string> {
    if (!lang) return escapeHtml(code);
    const resolved = lang in LANGUAGE_ALIASES ? LANGUAGE_ALIASES[lang] : lang;
    if (!resolved || !(resolved in bundledLanguages)) return escapeHtml(code);
    try {
        const highlighter = await getHighlighter();
        await highlighter.loadLanguage(resolved as never);
        const out = highlighter.codeToHtml(code, { lang: resolved, theme: 'site' });
        const match = out.match(/<code[^>]*>([\s\S]*)<\/code>/);
        if (match) return match[1];
    } catch (error) {
        console.warn(`[markdown] could not highlight "${lang}":`, error instanceof Error ? error.message : error);
    }
    return escapeHtml(code);
}

function isExternal(href: string): boolean {
    if (href.startsWith('//')) return true;
    if (!/^https?:\/\//i.test(href)) return false;
    try {
        return !OWN_HOSTS.has(new URL(href).hostname.toLowerCase());
    } catch {
        return true;
    }
}

function absolutize(url: string, baseUrl?: string): string {
    if (!baseUrl || !url.startsWith('/') || url.startsWith('//')) return url;
    return baseUrl.replace(/\/+$/, '') + url;
}

function sanitizeOptions(baseUrl?: string): sanitizeHtml.IOptions {
    return {
        allowedTags: [
            'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'hr', 'blockquote',
            'ul', 'ol', 'li', 'input',
            'a', 'strong', 'b', 'em', 'i', 'del', 's', 'u', 'mark', 'sub', 'sup', 'small', 'kbd', 'code', 'abbr',
            'pre', 'span', 'div',
            'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'caption',
            'img', 'figure', 'figcaption', 'details', 'summary',
        ],
        // Anything else (e.g. a prose `<your-key>` that looks like a tag) is shown as text, not dropped.
        disallowedTagsMode: 'escape',
        allowedAttributes: {
            a: ['href', 'title', 'target', 'rel'],
            img: ['src', 'alt', 'title', 'width', 'height', 'loading', 'decoding'],
            input: ['type', 'checked', 'disabled'],
            ol: ['start'],
            th: ['align'],
            td: ['align'],
            abbr: ['title'],
            details: ['open'],
            h2: ['id'], h3: ['id'], h4: ['id'], h5: ['id'], h6: ['id'],
            pre: ['tabindex'],
            code: ['class'],
            span: ['class', 'style'],
            div: ['class'],
        },
        // Only what the markup built above needs.
        allowedClasses: {
            code: ['language-*'],
            span: ['line', 'code-lang'],
            div: ['code-block', 'code-head', 'table-wrap'],
        },
        // Shiki's token colours are the only inline style allowed.
        allowedStyles: {
            span: { color: [/^var\(--shiki-[a-z-]+\)$/] },
        },
        allowedSchemes: ['http', 'https', 'mailto', 'tel'],
        allowedSchemesByTag: { img: ['http', 'https'] },
        allowProtocolRelative: true,
        transformTags: {
            h1: 'h2',
            a: (tagName, attribs) => {
                const next = { ...attribs };
                const href = next.href ?? '';
                if (isExternal(href)) {
                    next.target = '_blank';
                    next.rel = 'noopener noreferrer';
                } else {
                    delete next.target;
                    delete next.rel;
                }
                if (next.href) next.href = absolutize(next.href, baseUrl);
                return { tagName, attribs: next };
            },
            img: (tagName, attribs) => ({
                tagName,
                attribs: { ...attribs, src: absolutize(attribs.src ?? '', baseUrl), loading: 'lazy', decoding: 'async' },
            }),
            input: (tagName, attribs) => {
                const next: Record<string, string> = { type: 'checkbox', disabled: 'disabled' };
                if (attribs.checked !== undefined) next.checked = 'checked';
                return { tagName, attribs: next };
            },
        },
    };
}

type HighlightedCode = Tokens.Code & { highlighted?: string };

export async function renderMarkdown(markdown: string, options: RenderOptions = {}): Promise<RenderedMarkdown> {
    const source = markdown.replace(/^﻿/, '').replace(/\r\n?/g, '\n');
    const marked = new Marked({ gfm: true, breaks: false });
    const headings: Heading[] = [];
    const usedIds = new Set<string>();
    let codeLines = 0;

    const tokens = marked.lexer(source);

    // Drop a leading "# Title" that repeats the article title.
    const firstIndex = tokens.findIndex((token) => token.type !== 'space');
    const first = tokens[firstIndex];
    if (first?.type === 'heading' && first.depth === 1 && options.title && sameTitle(first.text, options.title)) {
        tokens.splice(firstIndex, 1);
    }

    // Any other h1 left in the body would be a second h1 on the page: shift the whole outline down one level.
    let hasBodyH1 = false;
    marked.walkTokens(tokens, (token) => {
        if (token.type === 'heading' && token.depth === 1) hasBodyH1 = true;
    });
    const shift = hasBodyH1 ? 1 : 0;

    // Highlight every code block (also those nested in lists and quotes) before rendering.
    const pending: Promise<void>[] = [];
    marked.walkTokens(tokens, (token) => {
        if (token.type !== 'code') return;
        const code = token as HighlightedCode;
        const lang = (code.lang ?? '').trim().split(/\s+/)[0].toLowerCase() || null;
        codeLines += code.text.split('\n').length;
        pending.push(
            highlightCode(code.text, lang).then((inner) => {
                code.highlighted = inner;
            }),
        );
    });
    await Promise.all(pending);

    marked.use({
        renderer: {
            code(token: Tokens.Code) {
                const { text, lang: info, highlighted } = token as HighlightedCode;
                const lang = (info ?? '').trim().split(/\s+/)[0].toLowerCase().replace(/[^\w+#.-]/g, '');
                const label = lang ? `<span class="code-lang">${escapeHtml(lang)}</span>` : '';
                const cls = lang ? ` class="language-${lang}"` : '';
                return `<div class="code-block"><div class="code-head">${label}</div><pre tabindex="0"><code${cls}>${highlighted ?? escapeHtml(text)}</code></pre></div>\n`;
            },
            heading(token: Tokens.Heading) {
                const depth = Math.min(6, token.depth + shift);
                const inner = this.parser.parseInline(token.tokens);
                const text = htmlToText(inner);
                if (depth > 3) return `<h${depth}>${inner}</h${depth}>\n`;
                const base = slugify(text) || 'section';
                let id = base;
                for (let n = 2; usedIds.has(id); n++) id = `${base}-${n}`;
                usedIds.add(id);
                if (depth === 2 || depth === 3) headings.push({ id, text, depth });
                return `<h${depth} id="${id}">${inner}</h${depth}>\n`;
            },
        },
    });

    const rawHtml = marked.parser(tokens);
    let html = sanitizeHtml(rawHtml, sanitizeOptions(options.baseUrl));
    // Wide tables scroll inside their own box instead of widening the page.
    html = html.replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, '</table></div>');

    const proseHtml = html.replace(/<div class="code-block">[\s\S]*?<\/pre><\/div>/g, ' ');
    const words = htmlToText(proseHtml).split(/\s+/).filter(Boolean).length;
    const minutes = words / WORDS_PER_MINUTE + codeLines / CODE_LINES_PER_MINUTE;

    return { html, headings, readingTimeMinutes: Math.max(1, Math.ceil(minutes)) };
}

