import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
    integrations: [
        vue(),
        tailwind(),
        sitemap({
            i18n: {
                defaultLocale: 'en',
                locales: {
                    en: 'en-US',
                    vi: 'vi-VN',
                },
            },
        }),
    ],
    site: 'https://jokholk.dev',
    output: 'static',
    adapter: vercel(),
    redirects: {
        '/': '/en',
    },
});
