import { defineField, defineType } from 'sanity'

export const articleSchema = defineType({
  name: 'article',
  title: 'Article / Actualité',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Santé', value: 'Santé' },
          { title: 'Formation', value: 'Formation' },
          { title: 'Action humanitaire', value: 'Action humanitaire' },
          { title: 'Partenariat', value: 'Partenariat' },
          { title: 'Événement', value: 'Événement' },
          { title: 'Urgence', value: 'Urgence' },
        ],
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date de publication',
      type: 'date',
      options: { dateFormat: 'YYYY-MM-DD' },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'readTime',
      title: 'Temps de lecture (ex : "5 min")',
      type: 'string',
    }),
    defineField({
      name: 'author',
      title: 'Auteur',
      type: 'string',
      initialValue: 'Équipe CRCI',
    }),
    defineField({
      name: 'image',
      title: 'Image principale',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Texte alternatif', type: 'string' }),
      ],
    }),
    defineField({
      name: 'excerpt',
      title: 'Extrait (résumé court)',
      type: 'text',
      rows: 3,
      validation: (R) => R.required().max(300),
    }),
    defineField({
      name: 'content',
      title: 'Contenu complet',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Texte alternatif', type: 'string' }),
            defineField({ name: 'caption', title: 'Légende', type: 'string' }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'image' },
  },
  orderings: [
    { title: 'Date (récent)', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] },
  ],
})
