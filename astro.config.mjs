// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from "@astrojs/markdown-remark";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

// https://astro.build/config
export default defineConfig({
  output: "static",

  vite: {
    plugins: [{
      name: "experiment-directory-index",
      configureServer(server) {
        // Production static hosts serve index.html for directories; match that in dev.
        server.middlewares.use((request, _response, next) => {
          request.url = request.url?.replace(
            /^(\/experiments\/apps\/[^/?]+\/)(?=\?|$)/,
            "$1index.html",
          );
          next();
        });
      },
    }],
  },

  markdown: {
    processor: unified({
      remarkPlugins: [[remarkMath, { singleDollarTextMath: true }]],
      rehypePlugins: [rehypeKatex],
    }),
  },
});
