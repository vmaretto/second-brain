---
title: "Mini-Orto - Use Case SCIO"
date: "2026-01-28"
tags: [idea, iot, webapp, orto]
---

# Mini-Orto

Use case per testare integrazione SCIO + webapp.

## Concept

Un piccolo orto domestico monitorato con sensori IoT, con webapp per:
- Visualizzare dati in tempo reale
- Ricevere notifiche (irrigazione, temperatura)
- Tracciare crescita piante

## Componenti

### Hardware
- Sensori umidità terreno
- Sensore temperatura/umidità aria
- Eventuale camera per timelapse
- Microcontroller (ESP32 o simile)

### Software
- Backend: API per ricezione dati
- Frontend: Webapp responsive
- Notifiche: Push/WhatsApp

## Status

**TODO:**
- [ ] Ottenere API endpoint dal contatto
- [ ] Definire schema dati
- [ ] Progettare UI webapp
- [ ] Setup hardware base

## Collaborazione

Progetto in collaborazione con Stefania De Pascale (agricoltura controllata).

## Note

Questo progetto serve anche come demo tangibile per:
- Presentazioni
- Workshop
- Formazione

---

## 📚 Fonti

- Conversazioni WhatsApp (28 Gen 2026)
- Stefania De Pascale (collaborazione)
- ~/clawd/scio-app/ (codice iOS)
- ~/clawd/MiniOrto/ (backend)

*Piccolo orto, grande apprendimento.*
