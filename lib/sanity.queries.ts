import { groq } from '@sanity/client'
import { client } from './sanity.client'

// ─── Types ────────────────────────────────────────────────────────────────────

export type SanityArticle = {
  _id: string
  slug: { current: string }
  title: string
  excerpt: string
  content: any[]
  category: string
  date: string
  readTime: string
  author: string
  image: any
}

export type SanityPhoto = {
  _id: string
  alt: string
  image: any
  category: string
  caption: string
  year: number
  ordre: number
}

export type SanityFormation = {
  _id: string
  code: string
  title: string
  subtitle: string
  description: string
  duration: string
  maxParticipants: number
  price: string
  location: string
  objectives: string[]
  certification: string
  nextSessions: string[]
  ordre: number
}

// ─── Fetchers — retournent [] si Sanity n'est pas configuré ──────────────────

export async function getArticles(): Promise<SanityArticle[]> {
  if (!client) return []
  try {
    return await client.fetch(
      groq`*[_type == "article"] | order(date desc) {
        _id, "slug": slug.current, title, excerpt, content,
        category, date, readTime, author, image
      }`
    )
  } catch {
    return []
  }
}

export async function getArticle(slug: string): Promise<SanityArticle | null> {
  if (!client) return null
  try {
    return await client.fetch(
      groq`*[_type == "article" && slug.current == $slug][0] {
        _id, "slug": slug.current, title, excerpt, content,
        category, date, readTime, author, image
      }`,
      { slug }
    )
  } catch {
    return null
  }
}

export async function getPhotos(): Promise<SanityPhoto[]> {
  if (!client) return []
  try {
    return await client.fetch(
      groq`*[_type == "photo"] | order(ordre asc, year desc) {
        _id, alt, image, category, caption, year, ordre
      }`
    )
  } catch {
    return []
  }
}

export async function getFormations(): Promise<SanityFormation[]> {
  if (!client) return []
  try {
    return await client.fetch(
      groq`*[_type == "formation"] | order(ordre asc) {
        _id, code, title, subtitle, description, duration,
        maxParticipants, price, location, objectives,
        certification, nextSessions, ordre
      }`
    )
  } catch {
    return []
  }
}
