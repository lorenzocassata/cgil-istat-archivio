import { createFileRoute, Link } from '@tanstack/react-router'

import { allPosts } from 'content-collections'

import DocumentArchive from '@/components/document-archive'

export const Route = createFileRoute('/category/$category')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const category = params.category
    const posts = allPosts.filter((post) => post.categories.includes(category))
    return { category, posts }
  },
})

function RouteComponent() {
  const { category, posts } = Route.useLoaderData()
  return (
    <div>
      <Link to="/" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 mb-4">
        ← Torna all'archivio
      </Link>
      <DocumentArchive posts={posts} />
    </div>
  )
}
