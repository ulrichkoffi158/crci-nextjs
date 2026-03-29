import { z } from 'zod'

export const contactSchema = z.object({
  nom: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  prenom: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide'),
  telephone: z.string().optional(),
  sujet: z.string().min(5, 'Le sujet doit contenir au moins 5 caractères'),
  message: z.string().min(20, 'Le message doit contenir au moins 20 caractères'),
})

export const volontariatSchema = z.object({
  nom: z.string().min(2, 'Nom requis'),
  prenom: z.string().min(2, 'Prénom requis'),
  dateNaissance: z.string().min(1, 'Date de naissance requise'),
  email: z.string().email('Email invalide'),
  telephone: z.string().min(8, 'Téléphone requis'),
  adresse: z.string().min(5, 'Adresse requise'),
  ville: z.string().min(2, 'Ville requise'),
  categorie: z.enum(['volontaire', 'membre', 'membre_souscripteur', 'membre_honoraire']),
  domaine: z.string().min(1, 'Domaine requis'),
  experience: z.string().optional(),
  motivation: z.string().min(20, 'Veuillez décrire votre motivation (min. 20 caractères)'),
  disponibilite: z.string().min(1, 'Disponibilité requise'),
  accepteCharte: z.boolean().refine(val => val === true, 'Vous devez accepter la charte du volontaire'),
})

export const formationSchema = z.object({
  nom: z.string().min(2, 'Nom requis'),
  prenom: z.string().min(2, 'Prénom requis'),
  email: z.string().email('Email invalide'),
  telephone: z.string().min(8, 'Téléphone requis'),
  organisation: z.string().optional(),
  formation: z.string().min(1, 'Veuillez sélectionner une formation'),
  session: z.string().min(1, 'Veuillez sélectionner une session'),
  nombrePersonnes: z.number().min(1).max(20),
  besoinsSpecifiques: z.string().optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>
export type VolontariatFormData = z.infer<typeof volontariatSchema>
export type FormationFormData = z.infer<typeof formationSchema>
