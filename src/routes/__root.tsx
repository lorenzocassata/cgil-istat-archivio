import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Archivio Sindacale – ISTAT',
      },
      {
        name: 'description',
        content:
          'Archivio digitale dei documenti sindacali dell\'Istituto Nazionale di Statistica.',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <header className="bg-blue-900 text-white shadow-md">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-xs font-medium tracking-widest uppercase text-blue-300">
                Sindacato
              </span>
              <span className="text-lg font-bold leading-tight">
                Archivio Documentale ISTAT
              </span>
            </div>
          </div>
        </header>
        <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
        <footer className="border-t border-gray-200 mt-16 py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Sindacato ISTAT – Tutti i diritti riservati
        </footer>
        <Scripts />
      </body>
    </html>
  )
}
