---
title: "Setup Chat (Clawdbot)"
date: "2026-02-01"
tags: [note, setup, clawdbot, infrastruttura]
---

# Setup Chat — Infrastruttura

## Dove giro
- **Mac mini** di Virgilio (a casa)
- Sempre acceso, connesso via Tailscale

## Canali attivi
| Canale | Policy | Status |
|--------|--------|--------|
| WhatsApp | allowlist (+393358265082) | ✅ |
| Telegram | pairing | ✅ |

## Tool configurati
- **Brave Search** — 2000 query/mese
- **Exa** — semantic search, $10 crediti
- **Browser** — Chrome headless
- **Memory search** — attivo su sessions

## Cron jobs
| Job | Orario | Cosa fa |
|-----|--------|---------|
| web-monitoring-keywords | 08:00 | Cerca keywords |
| security-daily-check | 07:30 | Audit sicurezza |

## Cartelle importanti
- `~/clawd/` — workspace principale
- `~/clawd/memory/` — note giornaliere
- `~/clawd/projects/` — progetti (second-brain, viaggio-san-sebastian)
- `iCloud/Mac-mini/` — cartella condivisa con Virgilio
- `iCloud/Mac-mini/briefings/` — report giornalieri
- `iCloud/Mac-mini/ricevute-fatture/` — documenti

## Security
- Gateway: loopback + Tailscale serve
- Permessi: 700/600 su ~/.clawdbot
- Modello: Opus (resistente a prompt injection)
- Exec approvals: disabilitate temporaneamente

## Da ricordare
- Aggiornare sempre Second Brain
- Usare `trash` invece di `rm`
- Chiedere prima di azioni esterne (email, tweet)

---

## 📚 Fonti

- ~/.clawdbot/clawdbot.json (config gateway)
- AGENTS.md, SOUL.md, TOOLS.md (workspace)
- docs.openclaw.ai (documentazione)
- Conversazioni WhatsApp (30 Gen - 1 Feb 2026)
