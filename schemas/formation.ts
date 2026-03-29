import { defineField, defineType } from 'sanity'

export const formationSchema = defineType({
  name: 'formation',
  title: 'Formation',
  type: 'document',
  fields: [
    defineField({
      name: 'code',
      title: 'Code formation (ex: PSC1)',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Durée (ex: "2 jours – 14h")',
      type: 'string',
    }),
    defineField({
      name: 'maxParticipants',
      title: 'Nombre maximum de participants',
      type: 'number',
    }),
    defineField({
      name: 'price',
      title: 'Prix (ex: "45 000 FCFA")',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Lieu',
      type: 'string',
      initialValue: 'Abidjan',
    }),
    defineField({
      name: 'objectives',
      title: 'Objectifs pédagogiques',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'certification',
      title: 'Certification délivrée',
      type: 'string',
    }),
    defineField({
      name: 'nextSessions',
      title: 'Prochaines sessions',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Ex: "15 Avril 2026", "12 Mai 2026"',
    }),
    defineField({
      name: 'ordre',
      title: "Ordre d'affichage",
      type: 'number',
      description: 'Nombre faible = affiché en premier',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'code' },
  },
  orderings: [
    { title: 'Ordre', name: 'ordreAsc', by: [{ field: 'ordre', direction: 'asc' }] },
  ],
})
