import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/static';

export default defineConfig({
    integrations: [vue(), tailwind()],
    output: 'static',
    adapter: vercel(),
});
