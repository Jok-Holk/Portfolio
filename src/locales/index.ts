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

export function isLang(value: unknown): value is Lang {
    return typeof value === 'string' && value in supportedLocales;
}

export function getTranslations(lang: string): Dict {
    const key: Lang = isLang(lang) ? lang : defaultLocale;
    return dictionaries[key];
}

export function getStaticLangPaths() {
    return langs.map((lang) => ({ params: { lang } }));
}
