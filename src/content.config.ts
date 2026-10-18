import {
  defineCollection,
} from "astro:content";

import { glob } from "astro/loaders";

import { z } from "astro/zod";

const posts = defineCollection({
  loader: glob({
    base: "./src/content/posts",
    pattern: "**/*.{md,mdx}",
  }),

  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

const experiments = defineCollection({
  loader: glob({ base: "./src/content/experiments", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false),
    app: z.string().startsWith("/experiments/apps/"),
  }),
});

export const collections = { posts, experiments };