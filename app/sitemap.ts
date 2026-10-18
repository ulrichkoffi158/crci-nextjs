import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/data'
import { getArticles } from '@/lib/sanity.queries'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ['', '/qui-sommes-nous', '/actualites', '/galerie', '/volontariat', '/dons', '/contact']
  const articles = await getArticles()
  return [
    ...pages.map((p) => ({ url: `${SITE_URL}${p}`, changeFrequency: 'monthly' as const, priority: p === '' ? 1 : 0.7 })),
    ...articles.map((a) => ({ url: `${SITE_URL}/actualites/${a.slug}`, lastModified: a.date, priority: 0.6 })),
  ]
}
