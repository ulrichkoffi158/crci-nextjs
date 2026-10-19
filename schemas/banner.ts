import { defineField, defineType } from 'sanity'

/** Bannières du carrousel « À la une » de la page d'accueil */
export const bannerSchema = defineType({
  name: 'banniere',
  title: 'Bannière (accueil)',
  type: 'document',
  fields: [
    defineField({ name: 'titre', title: 'Titre', type: 'string', validation: (R) => R.required().max(90) }),
    defineField({ name: 'sousTitre', title: 'Sous-titre (en majuscules sur le site)', type: 'string', validation: (R) => R.max(120) }),
    defineField({ name: 'description', title: 'Texte court', type: 'text', rows: 2, validation: (R) => R.max(220) }),
    defineField({
      name: 'image',
      title: 'Image',
      description: "Photo de fond, ou affiche complète si « Afficher l'image seule » est coché (format large conseillé : 1600 × 500 px).",
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Texte alternatif', type: 'string' })],
    }),
    defineField({
      name: 'imageSeule',
      title: "Afficher l'image seule (affiche déjà mise en page)",
      type: 'boolean',
      initialValue: false,
    }),
    defineField({ name: 'lien', title: 'Lien du bouton', description: 'Ex. : /dons, /volontariat ou https://…', type: 'string' }),
    defineField({ name: 'libelleBouton', title: 'Texte du bouton', type: 'string', initialValue: 'En savoir plus' }),
    defineField({ name: 'ordre', title: "Ordre d'affichage", type: 'number', initialValue: 1 }),
    defineField({ name: 'actif', title: 'Afficher sur le site', type: 'boolean', initialValue: true }),
    defineField({ name: 'dateFin', title: "Retirer automatiquement après le (facultatif)", type: 'date' }),
  ],
  preview: { select: { title: 'titre', subtitle: 'sousTitre', media: 'image' } },
  orderings: [{ title: 'Ordre', name: 'ordreAsc', by: [{ field: 'ordre', direction: 'asc' }] }],
})
