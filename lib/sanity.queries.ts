import { groq } from 'next-sanity'
import { client, urlFor } from './sanity.client'
import type { Article, Photo } from '@/data'

// Les données Sanity sont relues toutes les 5 minutes (ISR)
const REVALIDATE = 300

async function fetchSafe<T>(query: string, params: Record<string, unknown> = {}, fallback: T): Promise<T> {
  if (!client) return fallback
  try {
    return await client.fetch<T>(query, params, { next: { revalidate: REVALIDATE } })
  } catch (err) {
    console.error('[sanity] requête échouée :', err)
    return fallback
  }
}

type RawArticle = {
  _id: string
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime?: string
  author?: string
  image?: any
  content?: any[]
}

export type FullArticle = Article & { content: any[] }

const articleFields = groq`_id, "slug": slug.current, title, excerpt, category, date, readTime, author, image`

function toArticle(a: RawArticle): Article {
  return {
    id: a._id,
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    category: a.category,
    date: a.date,
    readTime: a.readTime,
    author: a.author || "Croix-Rouge de Côte d'Ivoire",
    image: a.image ? urlFor(a.image).width(1200).height(750).url() : '/images/crci/secours-evacuation.jpg',
  }
}

export async function getArticles(): Promise<Article[]> {
  const data = await fetchSafe<RawArticle[]>(
    groq`*[_type == "article" && defined(slug.current)] | order(date desc) { ${articleFields} }`,
    {},
    []
  )
  return data.map(toArticle)
}

export async function getArticle(slug: string): Promise<FullArticle | null> {
  const a = await fetchSafe<RawArticle | null>(
    groq`*[_type == "article" && slug.current == $slug][0] { ${articleFields}, content }`,
    { slug },
    null
  )
  return a ? { ...toArticle(a), content: a.content ?? [] } : null
}

type RawPhoto = { _id: string; alt?: string; image?: any; category?: string; caption?: string; year?: number }

export async function getPhotos(): Promise<Photo[]> {
  const data = await fetchSafe<RawPhoto[]>(
    groq`*[_type == "photo" && defined(image)] | order(ordre asc, year desc) { _id, alt, image, category, caption, year }`,
    {},
    []
  )
  return data.map((p) => ({
    id: p._id,
    src: urlFor(p.image).width(1200).url(),
    alt: p.alt || p.caption || "Photo de la Croix-Rouge de Côte d'Ivoire",
    category: p.category || 'Divers',
    caption: p.caption || '',
    year: p.year ? String(p.year) : undefined,
  }))
}

// ─── Bannières « À la une » ──────────────────────────────────────────────────
export type Slide = {
  id: string
  title: string
  subtitle?: string
  description?: string
  image?: string
  imageAlt?: string
  imageOnly?: boolean
  href?: string
  cta?: string
}

type RawBanner = {
  _id: string; titre: string; sousTitre?: string; description?: string; image?: any
  imageSeule?: boolean; lien?: string; libelleBouton?: string
}

export async function getBanners(): Promise<Slide[]> {
  const data = await fetchSafe<RawBanner[]>(
    groq`*[_type == "banniere" && actif != false && (!defined(dateFin) || dateFin >= now())] | order(ordre asc, _createdAt desc) {
      _id, titre, sousTitre, description, image, imageSeule, lien, libelleBouton
    }`,
    {},
    []
  )
  return data.map((b) => ({
    id: b._id,
    title: b.titre,
    subtitle: b.sousTitre,
    description: b.description,
    image: b.image ? urlFor(b.image).width(2000).url() : undefined,
    imageAlt: b.image?.alt || b.titre,
    imageOnly: Boolean(b.imageSeule && b.image),
    href: b.lien,
    cta: b.libelleBouton || 'En savoir plus',
  }))
}
