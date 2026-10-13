import type { Lang } from '../../locales';

/** `2026-03-16` -> "March 16, 2026" / "16 tháng 3, 2026". UTC so the day never shifts with the build machine's time zone. */
export function formatDate(iso: string, lang: Lang): string {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return iso;
    return date.toLocaleDateString(lang, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}

/**
 * Lower case, no diacritics, `đ` -> `d`. The list page script repeats exactly this
 * normalisation for the query, so "huong dan" finds "Hướng dẫn".
 */
export function searchKey(text: string): string {
    return text
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/đ/gi, 'd')
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .trim();
}
