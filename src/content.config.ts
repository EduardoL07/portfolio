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
      // Capa do card na home
      cover: image(),
      // Capa da página do case (se faltar, usa a mesma da home)
      detailCover: image().optional(),
      // Link do projeto no Behance (sem ele, o CTA aponta para o perfil)
      behance: z.string().url().optional(),
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
            // Imagem do bloco; imageDark é a versão para o tema escuro (opcional)
            image: image().optional(),
            imageDark: image().optional(),
            // Etapas numeradas do processo, cada uma com a decisão tomada (ícones em src/data/stepIcons.ts)
            steps: z
              .array(
                z.object({
                  icon: z.enum(['briefing', 'pesquisa', 'arquitetura', 'ui']).optional(),
                  title: z.string(),
                  body: z.string(),
                  decision: z.string().optional(),
                }),
              )
              .default([]),
            // Card de destaque com números + mockup de celular
            card: z
              .object({
                tag: z.string().optional(),
                title: z.string(),
                body: z.string(),
                stats: z
                  .array(
                    z.object({
                      value: z.string(),
                      label: z.string(),
                      tone: z.enum(['good', 'warn', 'neutral']).default('neutral'),
                    }),
                  )
                  .default([]),
                phone: image().optional(),
              })
              .optional(),
          }),
        )
        .default([]),
      // Telas finais; "wide" ocupa a largura inteira
      gallery: z
        .array(z.object({ image: image(), imageDark: image().optional(), wide: z.boolean().default(false) }))
        .default([]),
    }),
});

export const collections = { cases };
