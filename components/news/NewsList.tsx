'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import ArticleCard from '@/components/shared/ArticleCard'
import type { Article } from '@/data'

export default function NewsList({ articles }: { articles: Article[] }) {
  const [category, setCategory] = useState('Toutes')
  const [query, setQuery] = useState('')
  const categories = useMemo(() => ['Toutes', ...Array.from(new Set(articles.map((a) => a.category).filter(Boolean)))], [articles])

  const q = query.toLowerCase()
  const filtered = articles.filter((a) =>
    (category === 'Toutes' || a.category === category) &&
    (a.title.toLowerCase().includes(q) || (a.excerpt || '').toLowerCase().includes(q))
  )

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="search" placeholder="Rechercher un article…" value={query} onChange={(e) => setQuery(e.target.value)}
            aria-label="Rechercher un article"
            className="w-full pl-10 pr-4 py-3 bg-white border border-navy-100 rounded-full focus:border-navy focus:outline-none text-sm" />
        </div>
        <div className="flex gap-2 flex-wrap justify-center">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${category === cat ? 'bg-navy text-white' : 'bg-white text-navy/70 border border-navy-100 hover:border-navy-200'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((a) => <ArticleCard key={a.id} article={a} />)}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-slate-400 text-lg">Aucun article ne correspond à votre recherche.</p>
          <button onClick={() => { setCategory('Toutes'); setQuery('') }} className="mt-4 text-navy-600 text-sm font-semibold hover:underline">
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </>
  )
}
