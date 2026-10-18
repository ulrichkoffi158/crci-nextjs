import { z } from 'zod'

const str = (max = 200) => z.string().trim().max(max)

/** Schéma commun à tous les formulaires envoyés par /api/contact */
export const formSchema = z.object({
  type: z.enum(['contact', 'volontariat', 'don']),
  nom: str(100).min(2, 'Nom requis'),
  prenom: str(100).optional().default(''),
  email: z.string().trim().email('Adresse e-mail invalide').max(150),
  telephone: str(40).optional().default(''),
  sujet: str(200).optional().default(''),
  message: str(5000).optional().default(''),
  // Champs complémentaires (volontariat, don) : libellé → valeur
  details: z.record(str(80), str(2000)).optional().default({}),
  // Champ piège anti-robots : doit rester vide
  website: z.string().max(0).optional().default(''),
})

export type FormPayload = z.input<typeof formSchema>
