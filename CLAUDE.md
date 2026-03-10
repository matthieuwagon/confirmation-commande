# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (http://localhost:5173)
npm run build      # Build for production to /dist
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

No test suite is configured.

## Architecture

Single-page React + Vite application. Nearly all logic lives in `src/App.jsx` (~37KB), with `src/main.jsx` as the entry point.

### Application Flow

A **4-step configurator wizard** for workplace pod products (Blabla-cube by Structa):

| Step | Name | Purpose |
|------|------|---------|
| 0 | En-tête | Customer/order info (chantier, client, commercial, agent, delivery date) |
| 1 | Modèle | Select product model (8 variants: Solo, Duo, Quattro, Sixo, XL) |
| 2 | Configuration | Choose finishes, accessories, quantity |
| 3 | Récapitulatif | Order summary, add more products, validate |

### Key Data Structures (all in `App.jsx`)

- **`CATALOGUE`** — 8 product models with base prices (€3,200–€15,800), module counts, weights, and configurable options per finish category
- **`FINITIONS`** — Finish database with Three.js material properties (color hex, roughness, metalness) for: structure, exterior, interior, wall backing, interior fabric
- **`BAREME_ECO`** — 4-tier eco/shipping fee table keyed by weight brackets

### State Management

All state is in the root `App` component via React hooks (`useState`, `useCallback`, `useRef`). No Context API or external state library. Key state:
- `etape` — current wizard step (0–3)
- `entete` — header/customer info object
- `config` — current product configuration (model, finishes, accessories, qty)
- `panier` — array of configured products added to the order

### 3D Visualization

Three.js renders a real-time 3D preview of the selected pod. The scene updates reactively when finish selections change (material color/roughness/metalness), and accessories (seats, tables, shelving, LED) are shown/hidden based on selections. Camera is interactive (drag to rotate, scroll to zoom).

### Pricing

`calcPrix()` function computes unit and total price from:
- Base model price
- Per-option surcharges from `CATALOGUE`
- Eco fee from `BAREME_ECO` based on total weight

### Admin Panel

Accessible via a hidden/admin route in the app. Allows editing model properties, prices, weights, finish surcharges, and eco fee brackets.

### Styling

No CSS framework. All component styles are inline using a centralized color palette object `C` defined at the top of `App.jsx`. Global styles in `src/index.css`, component styles in `src/App.css`.

## Notes

- Three.js is used in `App.jsx` but is not listed in `package.json` — verify it's installed before running if starting fresh (`npm install three`)
- The README.md is the default Vite template and does not describe the application
- The app is in French (UI labels, variable names like `entete`, `panier`, `etape`)
