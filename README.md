# 🧠 Second Brain

Il tuo secondo cervello - App Next.js per documenti, journal e note.

## Screenshot

```
┌─────────────────────────────────────────────────────────────┐
│  🧠 Second Brain                                            │
│  [🔍 Cerca documenti...]                                    │
├─────────────────────────────────────────────────────────────┤
│  ▼ 📅 journal           │                                   │
│    └ 30 Gennaio 2026    │   30 Gennaio 2026 - Setup Mac mini│
│  ▼ 📝 notes             │   ═══════════════════════════════ │
│    └ Clawdbot Setup     │                                   │
│    └ AI Food Tools      │   Giornata intensa dedicata al    │
│  ▼ 📁 projects          │   setup dell'infrastruttura...    │
│    └ SWITCH             │                                   │
│    └ Master Carbon      │   ## Cosa è stato fatto           │
│  ▼ 💡 ideas             │   - Clawdbot Gateway installato   │
│    └ Mini-Orto          │   - Tailscale configurato         │
│                         │   - Tool installati               │
└─────────────────────────────────────────────────────────────┘
```

## Quick Start

```bash
# Sviluppo
npm run dev

# Produzione
npm run build
npm run start

# Accedi a http://localhost:3000
```

## Struttura

```
second-brain/
├── app/                  # Next.js App Router
│   ├── page.tsx          # Pagina principale
│   ├── layout.tsx        # Layout con dark mode
│   └── api/documents/    # API per documenti
├── components/           # Componenti React
│   ├── Sidebar.tsx       # Navigazione laterale
│   └── DocumentViewer.tsx# Viewer markdown
├── documents/            # I tuoi documenti (.md)
│   ├── journal/          # Diario giornaliero
│   ├── notes/            # Note generali
│   ├── projects/         # Progetti
│   └── ideas/            # Idee
└── lib/
    └── documents.ts      # Utility per leggere docs
```

## Aggiungere Documenti

Crea file `.md` nelle cartelle appropriate:

```markdown
---
title: "Titolo del documento"
date: "2026-01-30"
tags: [tag1, tag2]
---

# Contenuto

Il tuo contenuto markdown qui...
```

## Features

- ✅ Dark mode (stile Obsidian + Linear)
- ✅ Ricerca full-text
- ✅ Categorie con icone
- ✅ Tag automatici dal frontmatter
- ✅ Markdown rendering completo
- ✅ Responsive design
- ✅ Syntax highlighting per code blocks

## Tech Stack

- Next.js 16 (App Router)
- Tailwind CSS
- react-markdown + remark-gfm
- Lucide React icons
- Inter + JetBrains Mono fonts

---

*Creato con 🧠 da Chat - 30 Gennaio 2026*
