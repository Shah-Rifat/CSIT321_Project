# Personal Finance Tracker (Finora) — Frontend Prototype

CSIT321 Personal Finance Tracker. Adapted from the team's Figma Make prototype.

## Stack
- React 19 and TypeScript
- Vite
- Tailwind CSS 4

## Run locally
Install Node.js (22+ recommended), then:

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Check production compilation
```bash
npm run build
npm run preview
```

## Current limitations
**Prototype only — not a secure functional finance application.**
- Sign-up / log-in is a visual demo: any nonempty credentials pass; no accounts are actually created.
- Transactions and budgets are sample/in-memory data and reset on page refresh.
- No Python API or MySQL integration is included.
- Account/profile, report, security and persistence functionality must be designed and implemented separately.

Do not enter real passwords or personal financial data into this prototype.

## Figma-specific cleanup
Removed the Figma Make Vite plug-ins, dependency on `.figma/make/site.json`,
and Figma HTML comment placeholders. The React UI source and styling are preserved.

## Suggested next stage
Build a Python backend (e.g., FastAPI/Flask) with MySQL, define transaction and user
APIs, then replace hardcoded sample state with server-backed queries.
