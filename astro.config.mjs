import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

export default defineConfig({
    integrations: [vue(), tailwind()],
    site: 'https://jokholk.dev',
    output: 'static',
    adapter: vercel({
        redirects: [
            {
                source: '/en',
                destination: '/',
                permanent: true,
            },
            {
                source: '/en/:path*',
                destination: '/:path*',
                permanent: true,
            },
        ],
    }),
});
