import { Link } from '@tanstack/react-router'
import { useState, useMemo } from 'react'
import { type Post } from 'content-collections'

const DOCUMENT_TYPE_COLORS: Record<string, string> = {
  Circolare: 'bg-blue-100 text-blue-800',
  Delibera: 'bg-purple-100 text-purple-800',
  Verbale: 'bg-green-100 text-green-800',
  Comunicato: 'bg-yellow-100 text-yellow-800',
  Accordo: 'bg-red-100 text-red-800',
  Regolamento: 'bg-orange-100 text-orange-800',
  Altro: 'bg-gray-100 text-gray-700',
}

function Badge({ label }: { label: string }) {
  const color = DOCUMENT_TYPE_COLORS[label] ?? DOCUMENT_TYPE_COLORS['Altro']
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${color}`}>
      {label}
    </span>
  )
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' })
}

export default function DocumentArchive({ posts }: { posts: Post[] }) {
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const allTypes = useMemo(
    () => Array.from(new Set(posts.map((p) => p.documentType).filter(Boolean))).sort(),
    [posts],
  )
  const allCategories = useMemo(
    () => Array.from(new Set(posts.flatMap((p) => p.categories))).sort(),
    [posts],
  )

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return posts
      .filter((p) => {
        const matchesSearch =
          !q ||
          p.title.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          (p.referenceNumber ?? '').toLowerCase().includes(q)
        const matchesType = !selectedType || p.documentType === selectedType
        const matchesCategory =
          !selectedCategory || p.categories.includes(selectedCategory)
        return matchesSearch && matchesType && matchesCategory
      })
      .sort((a, b) => (a.date < b.date ? 1 : -1))
  }, [posts, search, selectedType, selectedCategory])

  return (
    <div>
      {/* Page heading */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Archivio Documenti</h1>
        <p className="text-gray-500 mt-1 text-sm">
          Documenti sindacali dell'Istituto Nazionale di Statistica
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-6 flex flex-col sm:flex-row gap-3">
        <input
          type="search"
          placeholder="Cerca documenti..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Tutti i tipi</option>
          {allTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Tutte le categorie</option>
          {allCategories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {(search || selectedType || selectedCategory) && (
          <button
            onClick={() => {
              setSearch('')
              setSelectedType('')
              setSelectedCategory('')
            }}
            className="text-sm text-blue-600 hover:text-blue-800 whitespace-nowrap"
          >
            Reimposta
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-4">
        {filtered.length === 0
          ? 'Nessun documento trovato.'
          : `${filtered.length} documento${filtered.length !== 1 ? 'i' : ''} trovato${filtered.length !== 1 ? '' : ''}`}
      </p>

      {/* Document list */}
      <div className="space-y-3">
        {filtered.map((post) => (
          <Link
            to={`/posts/${post.slug}`}
            key={post._meta.path}
            className="block bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge label={post.documentType ?? 'Altro'} />
                  {post.categories.map((cat) => (
                    <span
                      key={cat}
                      className="inline-block px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
                <h2 className="text-base font-semibold text-gray-800 leading-snug">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 mt-1">{post.summary}</p>
              </div>
              <div className="text-right text-xs text-gray-400 whitespace-nowrap">
                <div>{formatDate(post.date)}</div>
                {post.referenceNumber && (
                  <div className="mt-1 font-mono text-gray-500">
                    Rif. {post.referenceNumber}
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
