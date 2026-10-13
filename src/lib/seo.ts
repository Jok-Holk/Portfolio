import type { Person, WebSite, WithContext } from 'schema-dts';
import { LINKS, PERSON_FULL_NAME, SITE_ALT_NAMES, SITE_NAME, SITE_URL, absoluteUrl } from './site';

/** JSON-LD for the (only indexable) English home page. */
export function homeJsonLd(): (WithContext<WebSite> | WithContext<Person>)[] {
    const site: WithContext<WebSite> = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: SITE_NAME,
        alternateName: SITE_ALT_NAMES,
        url: `${SITE_URL}/en`,
        inLanguage: 'en',
    };
    const person: WithContext<Person> = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: PERSON_FULL_NAME,
        alternateName: [SITE_NAME, ...SITE_ALT_NAMES, 'Thai Nguyen', 'Nguyen Bui Phuc Thai'],
        url: `${SITE_URL}/en`,
        image: absoluteUrl('/og-default.png'),
        jobTitle: 'Software and game development student',
        knowsAbout: ['Web development', 'Game development', 'Astro', 'Unity'],
        sameAs: [LINKS.github, LINKS.tryhackme, LINKS.facebook],
    };
    return [site, person];
}

/** Keep titles within a length search engines usually display. */
export function clampText(text: string, max: number): string {
    const clean = text.replace(/\s+/g, ' ').trim();
    if (clean.length <= max) return clean;
    return clean.slice(0, max - 1).replace(/\s+\S*$/, '') + '…';
}
