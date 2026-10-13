import type { Organization, Person, SoftwareSourceCode, WebSite, WithContext } from 'schema-dts';
import { LINKS, PERSON_FULL_NAME, SITE_ALT_NAMES, SITE_NAME, SITE_URL, WORK_EMAIL, absoluteUrl } from './site';

export interface ProjectInfo {
    name: string;
    codeUrl: string;
    demoUrl?: string;
    tags: string[];
}

/**
 * JSON-LD for the (only indexable) English home page: the site, the personal brand as an
 * Organization, the person behind it, and each project as SoftwareSourceCode.
 */
export function homeJsonLd(projects: ProjectInfo[] = []): object[] {
    const person = { '@id': `${SITE_URL}/#person` };
    const organization = { '@id': `${SITE_URL}/#organization` };

    const site: WithContext<WebSite> = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: SITE_NAME,
        alternateName: SITE_ALT_NAMES,
        url: `${SITE_URL}/en`,
        inLanguage: 'en',
        publisher: organization,
    };

    const brand: WithContext<Organization> = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        alternateName: SITE_ALT_NAMES,
        url: `${SITE_URL}/en`,
        logo: absoluteUrl('/icon-512.png'),
        email: WORK_EMAIL,
        description: 'Personal brand of Jok Holk: web development and indie game projects, based in Ho Chi Minh City.',
        founder: person,
        sameAs: [LINKS.github, LINKS.tryhackme, LINKS.facebook],
    };

    const human: WithContext<Person> = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: PERSON_FULL_NAME,
        alternateName: [SITE_NAME, ...SITE_ALT_NAMES, 'Thai Nguyen', 'Nguyen Bui Phuc Thai'],
        url: `${SITE_URL}/en`,
        image: absoluteUrl('/og-default.png'),
        jobTitle: 'Software and game development student',
        homeLocation: { '@type': 'Place', name: 'Ho Chi Minh City, Vietnam' },
        knowsAbout: ['Web development', 'Game development', 'Astro', 'Next.js', 'Node.js', 'Unity', 'C#'],
        affiliation: [
            { '@type': 'EducationalOrganization', name: 'FUNiX Online University', url: 'https://funix.edu.vn/' },
            { '@type': 'EducationalOrganization', name: 'FPT Polytechnic College', url: 'https://caodang.fpt.edu.vn/' },
        ],
        worksFor: organization,
        sameAs: [LINKS.github, LINKS.tryhackme, LINKS.facebook],
    };

    const code: WithContext<SoftwareSourceCode>[] = projects.map((project) => ({
        '@context': 'https://schema.org',
        '@type': 'SoftwareSourceCode',
        name: project.name,
        codeRepository: project.codeUrl,
        url: project.demoUrl ?? project.codeUrl,
        author: person,
        ...(project.tags.includes('C#') ? { programmingLanguage: 'C#' } : {}),
        ...(project.tags.includes('Unity') ? { runtimePlatform: 'Unity' } : {}),
    }));

    return [site, brand, human, ...code];
}

/** Keep titles within a length search engines usually display. */
export function clampText(text: string, max: number): string {
    const clean = text.replace(/\s+/g, ' ').trim();
    if (clean.length <= max) return clean;
    return clean.slice(0, max - 1).replace(/\s+\S*$/, '') + '…';
}
