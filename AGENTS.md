# AGENTS.md

Questo file descrive l'architettura e le convenzioni del progetto per sviluppatori e agenti AI.

## Panoramica

Archivio digitale pubblico dei documenti sindacali dell'Istituto Nazionale di Statistica (ISTAT). I contenuti sono file Markdown validati con Zod tramite Content Collections. L'interfaccia è interamente in italiano. Trasformato dal template "Blog" di TanStack Start.

### Stack tecnico

| Layer | Tecnologia |
|-------|-----------|
| Framework | TanStack Start (React 19, SSR) |
| Routing | TanStack Router v1 (file-based) |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 |
| Contenuti | Content Collections (Markdown + Zod) |
| Linguaggio | TypeScript 5.7 (strict mode) |
| Deploy | Netlify |

## Struttura directory

```
content/posts/           ← Documenti sindacali (Markdown + frontmatter)
src/
  routes/
    __root.tsx           ← Layout root: header, footer, <html lang="it">
    index.tsx            ← Homepage: archivio con ricerca e filtri client-side
    posts.$slug.tsx      ← Dettaglio singolo documento
    category.$category.tsx ← Filtro per categoria
  components/
    document-archive.tsx ← Archivio con ricerca/filtri (ricerca client-side)
    blog-posts.tsx       ← Componente lista originale (non usato attivamente)
    ui/card.tsx          ← Card UI (Radix-based)
  lib/
    utils.ts             ← cn() helper
  styles.css             ← Tailwind 4 + stili .prose per i corpi Markdown
content-collections.ts   ← Schema Zod documenti
netlify.toml             ← Config build e dev Netlify
```

## Schema documento (content-collections.ts)

| Campo | Tipo | Obbligatorio | Note |
|-------|------|:---:|------|
| `title` | string | ✓ | |
| `summary` | string | ✓ | |
| `categories` | string[] | ✓ | |
| `date` | string | ✓ | formato YYYY-MM-DD |
| `documentType` | enum | – | Circolare, Delibera, Verbale, Comunicato, Accordo, Regolamento, Altro (default) |
| `author` | string | – | |
| `referenceNumber` | string | – | es. "12/2024" |
| `image` | string | – | non usato nell'UI attuale |
| `slug` | string | – | derivato automaticamente dal titolo |
| `year` | string | – | derivato automaticamente dalla data |

## Routing

| Route | File | Descrizione |
|-------|------|-------------|
| `/` | `index.tsx` | Archivio completo con ricerca e filtri |
| `/posts/:slug` | `posts.$slug.tsx` | Dettaglio documento |
| `/category/:category` | `category.$category.tsx` | Documenti per categoria |

## Convenzioni

- **Lingua UI:** tutto in italiano
- **Componenti:** PascalCase
- **Utilities:** camelCase
- **Stili prose:** la classe `.prose` in `styles.css` gestisce la formattazione del corpo Markdown
- **Badge colori per documentType:** definiti in mappa in `document-archive.tsx` e `posts.$slug.tsx` — aggiornare entrambe se si aggiungono tipi
- **TypeScript:** strict mode, alias `@/` per `src/`
- **Commenti:** solo se il motivo è non ovvio

## Decisioni architetturali

- La ricerca e il filtraggio sono **client-side**: tutto il contenuto è nel bundle via Content Collections. Adatto per archivi di dimensioni moderate (fino a qualche centinaio di documenti). Per archivi più grandi considerare un indice lato server.
- Il `slug` è derivato dal titolo (non dal nome file) per URL leggibili con titoli in italiano.

## Comandi di sviluppo

```bash
npm install
npm run dev      # Server di sviluppo su http://localhost:3000
npm run build    # Build di produzione
```
