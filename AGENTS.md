# AGENTS.md — Farm2Retail Project Instructions

This file contains permanent rules for any AI agent or developer working
on the Farm2Retail codebase. Read this file in full before making changes.

---

## Project Purpose

Farm2Retail is a **frontend-only** agricultural marketplace demo that
connects three user roles:

1. **Farmers** — list harvests, manage bookings, bid on crops, find farmland, check soil data.
2. **Retailers** — browse harvests, place bookings, post crop requirements, track orders.
3. **Landowners** — list properties, review lease applications, manage leases.
4. **Shared shell** — role switcher, sidebar navigation and dashboard layout used by all roles.

The app is a demonstration prototype. There is no real backend, database,
authentication or payment system.

---

## Technology Stack (Do Not Change)

| Layer         | Technology                                  |
|---------------|---------------------------------------------|
| Framework     | React 19 with **JavaScript** (.jsx files)   |
| Bundler       | Vite 8                                      |
| Styling       | Tailwind CSS v4 (`@tailwindcss/vite` plugin)|
| Routing       | React Router v7 (`react-router-dom`)        |
| Icons         | lucide-react                                |
| State         | React hooks (`useState`, `useOutletContext`)|

---

## Strict Rules

### Code Style
- Use **JavaScript only**. Never create `.ts` or `.tsx` files.
- Write beginner-friendly code that is easy to read and explain.
- Use simple React function components and hooks.
- Do not add Context API, Redux, Zustand or any state management library
  unless the user explicitly requests it.
- Do not install unnecessary npm packages. Justify every new dependency.

### Frontend-Only Constraints
- Do not build a backend, server, or API layer.
- Do not add a database or ORM.
- Do not implement real authentication (use demo role switching only).
- Do not implement real payment processing.
- Mock data should live in plain JavaScript files, not in a mock API library.

### Preservation
- **Inspect before editing.** Always read a file before modifying it.
- Preserve existing working code, comments, and structure unless the user
  asks you to change it.
- Do not rewrite unrelated files as part of a task.
- Do not remove existing features to add new ones.

### Testing and Building
- Run `npm run build` after every substantial change and fix any errors
  before declaring the task complete.
- Run `npm run lint` when ESLint-related changes are made.
- If a feature cannot be verified automatically, describe manual testing
  steps for the user.

### Design Direction
- Forest green (`#2D5A27`), dark green (`#1A3A18`), warm off-white (`#FAF8F5`).
- Subtle earthy accent colors. Clean, professional, responsive.
- No excessive animations, gradients, or visual clutter.
- Design tokens are defined in `src/index.css` under `@theme`.

---

## Handoff Rule (Mandatory)

**Before any of the following events, update `PROJECT_CONTEXT.md` in the
project root with the latest verified project state:**

1. You finish a substantial task (new feature, refactor, bug fix).
2. The user says their model quota is running low.
3. Work is about to be handed to another agent or session.

When updating `PROJECT_CONTEXT.md`:
- Record only facts you have verified (files inspected, build results).
- Label anything unverified as `[UNVERIFIED]`.
- Do not invent completed features or successful tests.
- Do not claim to know remaining quota or wait until the last moment.
- Keep the file concise and current — overwrite stale sections, do not
  append endlessly.

---

## File Structure Convention

```
farm2retail/
├── public/                  # Static assets
├── src/
│   ├── assets/              # Images and SVGs
│   ├── components/          # Reusable UI components (Sidebar, Topbar, etc.)
│   ├── layouts/             # Page layout shells (DashboardLayout)
│   ├── pages/               # Route-level page components
│   ├── App.jsx              # Router configuration
│   ├── main.jsx             # React entry point
│   └── index.css            # Tailwind CSS import and @theme tokens
├── index.html               # HTML entry point
├── vite.config.js           # Vite + Tailwind plugin config
├── eslint.config.js         # ESLint config
├── AGENTS.md                # This file — permanent project rules
└── PROJECT_CONTEXT.md       # Current state for handoffs (update often)
```
