// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import * as fs from "node:fs";
import { fileURLToPath } from "node:url";
import astroTakumi, { presets } from "astro-takumi";

// https://astro.build/config
export default defineConfig({
  site: "https://choonarine.github.io",

  integrations: [
    mdx({
      syntaxHighlight: "shiki",
      shikiConfig: {
        theme: "github-dark",
        wrap: true,
      },
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
    sitemap(),
    solidJs(),
    astroTakumi({
      options: {
        fonts: [
          fs.readFileSync(
            fileURLToPath(
              import.meta
                .resolve("pretendard/dist/web/static/woff2-subset/Pretendard-Medium.subset.woff2"),
            ),
          ),
        ],
      },
      render: presets.blackAndWhite,
    }),
  ],

  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
  },

  markdown: {
    shikiConfig: {
      theme: "github-dark",
      wrap: true,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
