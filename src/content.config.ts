import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const cases = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cases' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      order: z.number(),
      year: z.string(),
      tags: z.array(z.string()),
      summary: z.string(),
      cover: image(),
      role: z.string(),
      duration: z.string(),
      tools: z.string(),
      metrics: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
      sections: z
        .array(
          z.object({
            label: z.string(),
            title: z.string(),
            body: z.string(),
            image: image().optional(),
          }),
        )
        .default([]),
      gallery: z.array(image()).default([]),
    }),
});

export const collections = { cases };
