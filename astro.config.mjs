// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: "https://choonarine.github.io",
    integrations: [
        mdx({
            // 오류 발생 시 false로 변환 필요
            optimize: true,
        }),
        sitemap(),
    ],
    vite: {
        plugins: [tailwindcss()],
    },
});