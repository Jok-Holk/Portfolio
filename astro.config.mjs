import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
    integrations: [
        vue(),
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
    vite: {
        plugins: [tailwindcss()],
    },
    site: 'https://jokholk.dev',
    output: 'static',
    adapter: vercel(),
    redirects: {
        '/': '/en',
    },
    trailingSlash: 'never',
});
