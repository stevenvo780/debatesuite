# Debate Suite — Architecture

## Overview

Debate Suite is a single-page PWA (Progressive Web App) that combines two tools from Steven Vallejo's GitHub:

| Source repo | Role in this project |
|---|---|
| `stevenvo780/debatesUtil` | Core debate moderator: timer, turns, scoring, fallacies, i18n, offline |
| `stevenvo780/debates` | `hipergrados.ts` — cellular automaton engine, exposed as opt-in "Simulator" tab |

## Stack

- **Framework**: Vite 5 + React 18 (migrated from CRA / react-scripts)
- **State**: Redux Toolkit + redux-persist (localStorage)
- **UI**: Bootstrap 5 + react-bootstrap + react-icons
- **Drag and drop**: @dnd-kit (participant reordering)
- **PWA**: vite-plugin-pwa (Workbox, service worker, offline cache, installable)
- **Simulator rendering**: Canvas 2D API (no WebGL, no GPU required)
- **Routing**: None — single-page with tab state in React `useState`

## Directory Structure

```
/tmp/revive/debatesuite/
├── index.html                     # SPA entry; references /src/main.jsx
├── vite.config.js                 # Vite + PWA config; manual chunk splits
├── package.json
├── public/
│   ├── favicon.ico
│   ├── logo192.png
│   ├── logo512.png
│   └── robots.txt
├── src/
│   ├── main.jsx                   # ReactDOM root; Redux Provider + PersistGate
│   ├── App.jsx                    # Root layout: GlobalSessionCard + tab switcher
│   │                              #   Tab "moderador" → debate UI + CriteriaSidebar
│   │                              #   Tab "simulador" → <SimuladorDinamicas> (lazy)
│   ├── App.css                    # Global dark theme (café-punk palette) + tab/sim CSS
│   ├── index.css
│   ├── translations.jsx           # i18n strings (es / en)
│   ├── participantVisuals.jsx     # Visual slot assignment for participant icons
│   ├── components/                # All debate UI components (from debatesUtil)
│   │   ├── GlobalSessionCard.jsx  # Top navbar: title, clock, round, actions
│   │   ├── ParticipantsSection.jsx # DnD grid of participant cards
│   │   ├── ParticipantForm.jsx    # Add participant form
│   │   ├── CriteriaSidebar.jsx    # Scoring criteria + fallacy system
│   │   ├── StatsModal.jsx
│   │   ├── EditModal.jsx
│   │   ├── RoundSettingsModal.jsx
│   │   ├── RulesModal.jsx
│   │   ├── ConfirmationModals.jsx
│   │   ├── DragBar.jsx
│   │   └── ...
│   ├── hooks/
│   │   └── useTimerLogic.jsx      # Active timer countdown hook
│   ├── store/
│   │   ├── index.jsx              # Redux store + persistor
│   │   └── debateSlice.jsx        # All debate state reducers
│   └── simulator/                 # NEW — from repo "debates"
│       ├── hipergradosEngine.js   # Pure ES module: Conway-like CA with age memory
│       │                          #   Grid: 80×50 toroidal, Uint8Array flat
│       │                          #   Rules: survive 2-3 neighbors AND age <= 50
│       │                          #          born at exactly 3 neighbors
│       └── SimuladorDinamicas.jsx # Canvas renderer + controls + stats
│                                  #   Lazy-loaded chunk (8 kB); not in initial bundle
└── _sources/                      # Original repos (not deployed)
    ├── debatesUtil/
    └── debates/
```

## Integration of `hipergrados.ts` (repo "debates")

### Original
`hipergrados.ts` was a Node.js CLI script that printed the cellular automaton to stdout using Unicode characters (`•`, `○`, `●`). It used `setInterval` for animation. Not browser-ready.

### What changed
1. **Ported to ES module** (`hipergradosEngine.js`): removed `console.log`, removed global mutable `nodos[]` array, replaced with pure functions (`crearGrid`, `siguienteGeneracion`, `calcularStats`) operating on `Uint8Array` for efficiency.
2. **Renderer** (`SimuladorDinamicas.jsx`): `requestAnimationFrame` loop draws to HTML5 Canvas 2D (10px per cell). Color encodes age tier:
   - Young (age 0-1): `#60a5fa` (blue)
   - Adult (age 2-4): `#34d399` (teal/green)
   - Elder (age 5+): `#fbbf24` (gold)
   - Dead: `#0f172a` (dark background)
3. **Lazy import**: the simulator chunk is code-split and only loaded when the user clicks the tab.
4. **PWA compatibility**: pure canvas, no DB, no network, works fully offline.

## PWA / Offline

Vite-plugin-pwa generates a Workbox service worker that precaches all assets (JS, CSS, HTML, icons). After first load, the app works offline — including the simulator. State persists via `redux-persist` → `localStorage`.

## Build Output (Vercel-ready)

Vite outputs to `dist/`. Vercel auto-detects Vite and serves `dist/` as static. No server required.

Chunk breakdown:
- `bootstrap` (~386 kB raw / ~122 kB gz) — Bootstrap JS
- `index` (~240 kB raw / ~65 kB gz) — App + components
- `vendor` (~75 kB raw / ~26 kB gz) — React, Redux, redux-persist
- `dnd` (~45 kB raw / ~15 kB gz) — @dnd-kit
- `SimuladorDinamicas` (~8 kB raw / ~2.4 kB gz) — lazy simulator

## Deployment

```bash
cd /tmp/revive/debatesuite
vercel --scope stevenvo780s-projects
```

Or push to a GitHub repo and link in Vercel dashboard. No env vars required.
