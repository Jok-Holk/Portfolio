import type { Lang } from '../locales';

export const SITE_URL = 'https://jokholk.dev';
export const SITE_NAME = 'Jok Holk';
export const SITE_ALT_NAMES = ['JokHolk', 'JokHolk Realm'];
export const PERSON_FULL_NAME = 'Nguyễn Bùi Phúc Thái';
export const WORK_EMAIL = 'jokholk.dev@gmail.com';

export const LINKS = {
    github: 'https://github.com/Jok-Holk',
    tryhackme: 'https://tryhackme.com/p/JokHolk',
    facebook: 'https://facebook.com/jokholk.real',
} as const;

// The CV is rendered on demand by the console service on the VPS.
export function cvUrl(lang: Lang): string {
    return `https://console.jokholk.dev/api/cv/export?lang=${lang}`;
}

export const OG_DEFAULT_IMAGE = '/og-default.png';

export function absoluteUrl(path: string): string {
    return new URL(path, SITE_URL).toString();
}
