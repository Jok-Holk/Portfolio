import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://jokholk.dev';

export default defineConfig({
    site: SITE,
    output: 'static',
    adapter: vercel(),
    trailingSlash: 'never',
    redirects: {
        '/': '/en',
    },
    integrations: [
        // Only the English home page is meant to be indexed; every other page is `noindex`.
        sitemap({ filter: (page) => page === `${SITE}/en` }),
    ],
    image: {
        // Strapi media is optimised at build time and served from this site.
        domains: ['strapi.jokholk.dev'],
    },
    vite: {
        plugins: [tailwindcss()],
    },
});
