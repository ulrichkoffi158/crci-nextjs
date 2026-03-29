import { defineField, defineType } from 'sanity'

export const photoSchema = defineType({
  name: 'photo',
  title: 'Photo / Galerie',
  type: 'document',
  fields: [
    defineField({
      name: 'alt',
      title: 'Description (texte alternatif)',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Secourisme', value: 'Secourisme' },
          { title: 'Formation', value: 'Formation' },
          { title: 'Humanitaire', value: 'Humanitaire' },
          { title: 'Événement', value: 'Événement' },
          { title: 'Don de sang', value: 'Don de sang' },
          { title: 'Partenariat', value: 'Partenariat' },
        ],
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Légende',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'Année',
      type: 'number',
      validation: (R) => R.min(2000).max(2100),
    }),
    defineField({
      name: 'ordre',
      title: "Ordre d'affichage",
      type: 'number',
      description: 'Nombre faible = affiché en premier',
    }),
  ],
  preview: {
    select: { title: 'alt', subtitle: 'category', media: 'image' },
  },
  orderings: [
    { title: 'Ordre', name: 'ordreAsc', by: [{ field: 'ordre', direction: 'asc' }] },
    { title: 'Année (récent)', name: 'yearDesc', by: [{ field: 'year', direction: 'desc' }] },
  ],
})
