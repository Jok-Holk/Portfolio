export const supportedLocales = {
    en: { name: 'English', dir: 'ltr' },
    vi: { name: 'Tiếng Việt', dir: 'ltr' },
};

export const defaultLocale = 'en';

export function getLangFromUrl(url: URL): string {
    const [, lang] = url.pathname.split('/');
    return supportedLocales[lang as keyof typeof supportedLocales] ? lang : defaultLocale;
}
export async function getTranslations(lang: string) {
    try {
        return (await import(`../../public/locales/${lang}.json`)).default;
    } catch {
        return (await import(`../../public/locales/${defaultLocale}.json`)).default;
    }
}
