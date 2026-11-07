
 // @ts-check
import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import astroTakumi, { presets } from "astro-takumi";

// See Also: https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: "https://choonarine.github.io",

  integrations: [
    mdx(),
    sitemap(),
    solidJs(),
    astroTakumi({
      options: {
        fonts: [
          await Bun.file(
            new URL(
              import.meta.resolve("pretendard/dist/web/static/woff2-subset/Pretendard-Medium.subset.woff2")
            )
          ).bytes(),
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
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "github-dark",
      wrap: true,
    },
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
