import { createFileRoute } from '@tanstack/react-router'

import { allPosts } from 'content-collections'

import DocumentArchive from '@/components/document-archive'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return <DocumentArchive posts={allPosts} />
}
