// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless'; // Use serverless for SSR

export default defineConfig({
    integrations: [vue(), tailwind()],
    output: 'server', // SSR mode
    adapter: vercel({
        webAnalytics: { enabled: true }, // Optional: enable Vercel analytics
    }),
});
