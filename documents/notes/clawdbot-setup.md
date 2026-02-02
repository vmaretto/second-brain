---
title: "Clawdbot Setup Notes"
date: "2026-01-30"
tags: [clawdbot, ai, setup, automazione]
---

# Note su Clawdbot

Appunti tecnici sull'installazione e configurazione di Clawdbot.

## Architettura

```
Mac mini (Gateway principale)
    └── Tailscale
    └── WhatsApp
    └── Cron jobs
    
AWS Instance (Telegram)
    └── Clawdbot secondario
    └── Tailscale
```

## File Importanti

| File | Scopo |
|------|-------|
| `AGENTS.md` | Istruzioni comportamentali |
| `SOUL.md` | Personalità e valori |
| `USER.md` | Info sull'utente |
| `MEMORY.md` | Memoria a lungo termine |
| `TOOLS.md` | Note su tool specifici |
| `HEARTBEAT.md` | Check periodici |

## Comandi Utili

```bash
# Stato gateway
clawdbot gateway status

# Riavvio
clawdbot gateway restart

# Log
journalctl -u clawdbot-gateway -f  # Linux
tail -f ~/Library/Logs/clawdbot/gateway.log  # macOS
```

## Heartbeat

Check automatici configurati per:
- Disco < 10% → avvisa
- RAM > 90% → avvisa
- Servizi down → avvisa
- AWS non raggiungibile → avvisa

## Cron Jobs

| Job | Orario | Descrizione |
|-----|--------|-------------|
| Check mattina | 08:00 | Briefing giornaliero |
| Check pomeriggio | 14:00 | Status update |
| Check sera | 20:00 | Riepilogo giornata |
| Second Brain Build | 23:00 | Build app (questa notte) |

## Use Case dal Video

5 use case ispiranti da "5 insane ClawdBot uses cases":

1. **Morning Brief** - Briefing mattutino automatico
2. **Proactive Vibe Coding** - Clawdbot lavora di notte
3. **Second Brain** - Questa app!
4. **Daily Research Report** - Report su interessi
5. **X/Reddit Research** - Trending topics

## Lezioni Apprese

- Tailscale Serve potrebbe non persistere dopo reboot → verificare
- `pmset` per disabilitare sleep su Mac mini
- Gateway pid cambia dopo ogni riavvio
- Homebrew gestisce Tailscale meglio del LaunchDaemon custom

---

## 📚 Fonti

- docs.clawd.bot / docs.openclaw.ai
- Video Alex Finn: "5 insane ClawdBot uses cases"
- Video Alex Finn: "How to make ClawdBot 10x better"
- ~/.clawdbot/clawdbot.json
- Conversazioni WhatsApp (30 Gen 2026)

*L'automazione libera tempo per pensare.*
