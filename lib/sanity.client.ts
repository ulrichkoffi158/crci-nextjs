import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
export const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET     || 'production'
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

// Le client n'est créé QUE si le projectId est défini
// → le site fonctionne normalement avec les données statiques sans .env.local
export const client = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null

const builder = projectId && client ? imageUrlBuilder(client) : null

export function urlFor(source: SanityImageSource) {
  if (!builder) return { url: () => '' } as any
  return builder.image(source)
}

export const isSanityConfigured = Boolean(projectId)
