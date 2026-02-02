# Second Brain - Specifiche Progetto

## Overview
App Next.js per visualizzare documenti, journal e concetti dalle conversazioni con Virgilio.

## UI/UX
- **Stile:** Mix Obsidian + Linear (clean, minimal, dark mode)
- **Sidebar:** Lista documenti con filtri per tag
- **Main view:** Markdown viewer con syntax highlighting
- **Search:** Ricerca full-text nei documenti

## Funzionalità

### 1. Document Viewer
- Lista documenti in sidebar
- Preview markdown formattato
- Tag automatici (journal, notes, ideas, projects, etc.)
- Data creazione/modifica

### 2. Journal Giornaliero
- Entry automatica per ogni giorno
- Riassunto conversazioni
- Link a documenti correlati

### 3. Concetti/Note
- Documenti separati per idee importanti
- Backlinks tra documenti
- Tag e categorie

### 4. Storage
- Cartella `documents/` con file .md
- Metadata in frontmatter YAML
- Sync automatico con filesystem

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Markdown:** react-markdown + remark-gfm
- **Icons:** Lucide React
- **Font:** Inter / JetBrains Mono

## Struttura Cartelle
```
second-brain/
├── app/
│   ├── page.tsx          # Main view
│   ├── layout.tsx        # Layout con sidebar
│   └── api/
│       └── documents/    # API per leggere docs
├── components/
│   ├── Sidebar.tsx
│   ├── DocumentList.tsx
│   ├── DocumentViewer.tsx
│   └── SearchBar.tsx
├── documents/            # Contenuto (markdown)
│   ├── journal/
│   │   └── 2026-01-30.md
│   ├── notes/
│   └── projects/
├── lib/
│   └── documents.ts      # Utility lettura docs
└── public/
```

## Documenti Iniziali da Creare
1. Journal 30 gennaio (setup Mac mini, briefing, etc.)
2. Progetto SWITCH
3. Progetto Master Carbon Farming
4. Note su Clawdbot setup

## Priorità per v1
1. ✅ Struttura Next.js base
2. ✅ Sidebar con lista documenti
3. ✅ Viewer markdown
4. ✅ Alcuni documenti di esempio
5. ✅ Dark mode

## Timeline
- **Stanotte:** Sviluppo completo v1
- **Domani mattina:** Demo a Virgilio

---
*Creato: 2026-01-30 21:45*
