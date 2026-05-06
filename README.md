# Archivio Sindacale ISTAT

Archivio digitale pubblico dei documenti sindacali dell'Istituto Nazionale di Statistica (ISTAT). Il portale permette a colleghi e iscritti di consultare circolari, delibere, verbali, comunicati, accordi e regolamenti emessi dalla Rappresentanza Sindacale Unitaria.

## Tecnologie

| Layer | Tecnologia |
|-------|-----------|
| Framework | TanStack Start (React 19, SSR) |
| Routing | TanStack Router v1 (file-based) |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 |
| Contenuti | Content Collections (Markdown + Zod) |
| Linguaggio | TypeScript 5.7 (strict mode) |
| Deploy | Netlify |

## Avvio locale

```bash
npm install
npm run dev       # Server di sviluppo su http://localhost:3000
npm run build     # Build di produzione
```

## Aggiungere un documento

Creare un file Markdown in `content/posts/` con il seguente frontmatter:

```markdown
---
date: YYYY-MM-DD
title: "Titolo del documento"
summary: "Breve descrizione."
categories:
  - Nome categoria
documentType: Circolare   # Circolare | Delibera | Verbale | Comunicato | Accordo | Regolamento | Altro
author: "Nome autore"     # opzionale
referenceNumber: "12/2024" # opzionale
---

Corpo del documento in Markdown...
```

I tipi di documento supportati sono: **Circolare**, **Delibera**, **Verbale**, **Comunicato**, **Accordo**, **Regolamento**, **Altro**.

## Struttura delle cartelle

```
content/posts/      ← File Markdown dei documenti
src/routes/         ← Pagine e API (TanStack Router)
src/components/     ← Componenti React
src/styles.css      ← Stili globali (Tailwind + prose)
content-collections.ts ← Schema Zod dei documenti
```
