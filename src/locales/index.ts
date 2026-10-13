import en from './en.json';
import vi from './vi.json';

export type Lang = 'en' | 'vi';
export type Dict = typeof en;

export const supportedLocales: Record<Lang, { name: string; short: string }> = {
    en: { name: 'English', short: 'EN' },
    vi: { name: 'Tiếng Việt', short: 'VI' },
};

export const defaultLocale: Lang = 'en';
export const langs = Object.keys(supportedLocales) as Lang[];

const dictionaries: Record<Lang, Dict> = { en, vi };

// Draft copy (docs/content-draft) can be previewed locally with CONTENT_DRAFT=1.
// Production never reads these files.
const drafts = import.meta.glob<Dict>('./*.draft.json', { eager: true, import: 'default' });

export function isLang(value: unknown): value is Lang {
    return typeof value === 'string' && value in supportedLocales;
}

export function getTranslations(lang: string): Dict {
    const key: Lang = isLang(lang) ? lang : defaultLocale;
    if (import.meta.env.CONTENT_DRAFT) {
        const draft = drafts[`./${key}.draft.json`];
        if (draft) return draft;
    }
    return dictionaries[key];
}

export function getStaticLangPaths() {
    return langs.map((lang) => ({ params: { lang } }));
}
