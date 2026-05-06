import { createFileRoute, Link } from '@tanstack/react-router'
import { marked } from 'marked'

import { allPosts } from 'content-collections'

const DOCUMENT_TYPE_COLORS: Record<string, string> = {
  Circolare: 'bg-blue-100 text-blue-800',
  Delibera: 'bg-purple-100 text-purple-800',
  Verbale: 'bg-green-100 text-green-800',
  Comunicato: 'bg-yellow-100 text-yellow-800',
  Accordo: 'bg-red-100 text-red-800',
  Regolamento: 'bg-orange-100 text-orange-800',
  Altro: 'bg-gray-100 text-gray-700',
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' })
}

export const Route = createFileRoute('/posts/$slug')({
  loader: async ({ params }) => {
    const post = allPosts.find((post) => post.slug === params.slug)
    if (!post) {
      throw new Error('Documento non trovato')
    }
    return post
  },
  component: RouteComponent,
})

function RouteComponent() {
  const post = Route.useLoaderData()
  const badgeColor =
    DOCUMENT_TYPE_COLORS[post.documentType ?? 'Altro'] ?? DOCUMENT_TYPE_COLORS['Altro']

  return (
    <div>
      {/* Back link */}
      <Link
        to="/"
        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 mb-6"
      >
        ← Torna all'archivio
      </Link>

      {/* Document card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
        <div className="flex flex-wrap gap-2 mb-3">
          <span
            className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${badgeColor}`}
          >
            {post.documentType ?? 'Altro'}
          </span>
          {post.categories.map((cat) => (
            <Link
              key={cat}
              to={`/category/${cat}`}
              className="inline-block px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600 hover:bg-gray-200"
            >
              {cat}
            </Link>
          ))}
        </div>

        <h1 className="text-2xl font-bold text-gray-800 leading-snug">{post.title}</h1>
        <p className="text-gray-500 mt-2">{post.summary}</p>

        <div className="mt-4 flex flex-wrap gap-6 text-sm text-gray-500 border-t border-gray-100 pt-4">
          <div>
            <span className="font-medium text-gray-600">Data:</span>{' '}
            {formatDate(post.date)}
          </div>
          {post.referenceNumber && (
            <div>
              <span className="font-medium text-gray-600">Riferimento:</span>{' '}
              <span className="font-mono">{post.referenceNumber}</span>
            </div>
          )}
          {post.author && (
            <div>
              <span className="font-medium text-gray-600">A cura di:</span> {post.author}
            </div>
          )}
        </div>
      </div>

      {/* Document body */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div
          className="prose prose-blue max-w-none"
          dangerouslySetInnerHTML={{ __html: marked(post.content) }}
        />
      </div>
    </div>
  )
}
