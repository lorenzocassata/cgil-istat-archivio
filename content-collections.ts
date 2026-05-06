import { defineCollection, defineConfig } from '@content-collections/core'
import { z } from 'zod'

const documentTypes = [
  'Circolare',
  'Delibera',
  'Verbale',
  'Comunicato',
  'Accordo',
  'Regolamento',
  'Altro',
] as const

const posts = defineCollection({
  name: 'posts',
  directory: 'content/posts',
  include: '**/*.md',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    categories: z.array(z.string()),
    slug: z.string().optional(),
    image: z.string().optional(),
    date: z.string(),
    documentType: z.enum(documentTypes).default('Altro'),
    author: z.string().optional(),
    referenceNumber: z.string().optional(),
  }),
  transform: async (doc) => {
    const year = doc.date ? doc.date.split('-')[0] : 'N/A'
    return {
      ...doc,
      slug: doc.title
        .toLowerCase()
        .replace('.md', '')
        .replace(/[^\w-]+/g, '_'),
      year,
    }
  },
})

export default defineConfig({
  collections: [posts],
})
