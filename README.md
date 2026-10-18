# Farm2Retail

A **frontend-only** agricultural marketplace demo connecting farmers, retailers, and landowners. Built as a demonstration prototype with React, Vite, Tailwind CSS, and React Router.

> **Status**: Feature-complete demo with four marketplace areas. No backend, database, authentication, or payment system.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features by Role](#features-by-role)
3. [Technology Stack](#technology-stack)
4. [Getting Started](#getting-started)
5. [System Architecture](#system-architecture)
6. [Step-by-Step Flows](#step-by-step-flows)
7. [Directory Structure](#directory-structure)
8. [Key Files](#key-files)
9. [Limitations](#limitations)
10. [Commands & Testing](#commands--testing)
11. [Troubleshooting](#troubleshooting)

---

## Project Overview

**Farm2Retail** is a frontend-only agricultural marketplace demo that connects three user roles in a simulated marketplace environment:

| Role | Description |
|------|-------------|
| **Farmer** | List harvests, manage bookings, bid on crop requirements, find farmland, check soil intelligence |
| **Retailer / Business** | Browse harvests, place bookings, post crop requirements, track orders |
| **Landowner** | List properties, review lease applications, manage leases |

### Problem Statement

Agricultural supply chains often involve multiple intermediaries, opaque pricing, and limited direct connections between producers and buyers. Farmers struggle to reach buyers directly, retailers face unreliable supply, and landowners have difficulty finding reliable tenants.

### Objectives

- Demonstrate a unified marketplace connecting three agricultural stakeholders
- Showcase role-aware UI with distinct workspaces for each role
- Implement four integrated marketplace areas with cross-role consistency
- Provide a clean, responsive UI with beginner-friendly code patterns

### Four Feature Areas

1. **Harvest Marketplace** — Farmers list produce; retailers browse and book harvests
2. **Grow-to-Order Marketplace** — Retailers post crop requirements; farmers bid; accepted bids create orders
3. **Farmland Marketplace** — Landowners list properties; farmers apply for leases; landowners approve/reject
4. **Soil Intelligence** — Farmers enter location/area; mock adapter predicts soil type and recommends crops

---

## Features by Role

Verified against actual source code (`src/components/Sidebar.jsx`, route definitions in `App.jsx`):

### Farmer

| Feature | Route | Description |
|---------|-------|-------------|
| Dashboard | `/dashboard` | Welcome view with role-specific stat cards |
| My Harvests | `/dashboard/my-harvests` | Create listings (crop, category, qty, price, location, date, image), view own listings with booking badges |
| My Bookings | `/dashboard/my-bookings` | Table view of bookings on own harvests (crop, retailer, qty, total, status, date) |
| Crop Bids | `/dashboard/crop-bids` | Browse open retailer requirements, submit bids (price, qty, harvest date, message), view own bids |
| Find Farmland | `/dashboard/find-farmland` | Search/filter properties (location, lease type, soil, water, acreage, rent range) |
| Soil Intelligence | `/dashboard/soil-intelligence` | Enter location, area, crop interest → mock adapter predicts soil type & crop recommendations |

### Retailer / Business

| Feature | Route | Description |
|---------|-------|-------------|
| Dashboard | `/dashboard` | Welcome view with role-specific stat cards |
| Browse Harvests | `/dashboard/browse-harvests` | Search/filter harvests (crop, location, farmer, category), view details, book produce |
| My Bookings | `/dashboard/retailer-bookings` | Table of confirmed bookings (crop, farmer, qty, total, status, dates) |
| Crop Requirements | `/dashboard/crop-requirements` | Create requirements (crop, qty, quality specs, target price, location, date), edit/delete, manage bids |
| Orders | `/dashboard/orders` | Track orders through 4 stages: Farmer Selected → Growing → Ready for Harvest → Delivered |

### Landowner

| Feature | Route | Description |
|---------|-------|-------------|
| Dashboard | `/dashboard` | Welcome view with role-specific stat cards |
| My Properties | `/dashboard/my-properties` | CRUD farmland listings (title, location, acreage, rent, lease type, soil, irrigation, crops) |
| Lease Applications | `/dashboard/lease-applications` | View applications (farmer: submitted; landowner: received with approve/reject actions) |
| Lease Management | `/dashboard/lease-management` | View active/past leases with details, days remaining, end lease early |

---

## Technology Stack

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| Framework | React | ^19.2.8 | UI framework (JavaScript, .jsx) |
| Bundler | Vite | ^8.3.0 | Fast dev server & production bundler |
| Styling | Tailwind CSS | ^4.3.3 | Utility-first CSS with `@tailwindcss/vite` plugin |
| Routing | React Router | ^7.18.4 | Client-side routing (`react-router-dom`) |
| Icons | Lucide React | ^1.59.0 | Consistent SVG icon set |
| Linting | ESLint | ^10.10.0 | Code quality (JS/JSX only) |

**Not used**: TypeScript, backend/server, database/ORM, authentication service, payment processor, state management library (Redux/Zustand/Context API)

---

## Getting Started

### Prerequisites

- Node.js ≥ 18 (tested with Node 20+)
- npm ≥ 9 (bundled with Node)

### Repository Setup

```bash
# Clone (replace with actual URL when available)
git clone https://github.com/your-org/farm2retail.git
cd farm2retail

# Install dependencies
npm install
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR (default: `http://localhost:5173`) |
| `npm run build` | Production build to `dist/` (verified: 0 errors) |
| `npm run lint` | Run ESLint on source files (verified: 0 errors) |
| `npm run preview` | Preview production build locally |

### Development Workflow

```bash
# Start dev server
npm run dev

# Run linting
npm run lint

# Production build
npm run build

# Preview built output
npm run preview
```

---

## System Architecture

```mermaid
graph TD
    %% Browser entry
    Browser[Browser] --> index.html
    index.html --> main.jsx
    main.jsx --> App.jsx
    
    %% React Router
    App.jsx --> Router[React Router v7]
    Router --> PublicRoutes[Public Routes]
    Router --> ProtectedRoutes[Dashboard Routes]
    
    %% Public routes
    PublicRoutes --> HomePage[/ HomePage]
    PublicRoutes --> Login[/login Login]
    
    %% Dashboard shell
    ProtectedRoutes --> DashboardLayout[DashboardLayout<br/>(state provider)]
    DashboardLayout --> Sidebar[Sidebar (role-aware)]
    DashboardLayout --> Topbar[Topbar (role switcher)]
    DashboardLayout --> Outlet[Outlet + Context]
    
    %% State in DashboardLayout
    DashboardLayout --> State[(React useState<br/>harvests, bookings,<br/>requirements, bids,<br/>orders, properties,<br/>leaseApplications, leases)]
    
    %% Context distribution
    Outlet --> FeaturePages[Feature Pages]
    
    %% Feature areas
    FeaturePages --> HarvestMarketplace[Harvest Marketplace]
    FeaturePages --> GrowToOrder[Grow-to-Order]
    FeaturePages --> FarmlandMarketplace[Farmland Marketplace]
    FeaturePages --> SoilIntelligence[Soil Intelligence]
    
    %% Harvest Marketplace
    HarvestMarketplace --> MyHarvests[My Harvests]
    HarvestMarketplace --> BrowseHarvests[Browse Harvests]
    HarvestMarketplace --> HarvestDetails[Harvest Details]
    HarvestMarketplace --> MyBookings[My Bookings]
    HarvestMarketplace --> RetailerBookings[Retailer Bookings]
    
    %% Grow-to-Order
    GrowToOrder --> CropRequirements[Crop Requirements]
    GrowToOrder --> CropBids[Crop Bids]
    GrowToOrder --> ManageBids[Manage Bids]
    GrowToOrder --> Orders[Orders]
    
    %% Farmland Marketplace
    FarmlandMarketplace --> MyProperties[My Properties]
    FarmlandMarketplace --> FindFarmland[Find Farmland]
    FarmlandMarketplace --> PropertyDetails[Property Details]
    FarmlandMarketplace --> LeaseApplications[Lease Applications]
    FarmlandMarketplace --> LeaseManagement[Lease Management]
    
    %% Soil Intelligence
    SoilIntelligence --> SoilAnalysis[soilAnalysis.js<br/>(mock adapter)]
    
    %% Data sources
    HarvestMarketplace -.-> harvests.js[harvests.js<br/>(seed data)]
    FarmlandMarketplace -.-> DashboardLayout[sampleProperties<br/>(inline in DashboardLayout)]
    GrowToOrder -.-> DashboardLayout[sampleRequirements<br/>(inline in DashboardLayout)]
    SoilIntelligence -.-> SoilAnalysis
    
    %% Initial data
    State --> harvests.js[sampleHarvests<br/>(6 items)]
    State --> DashboardLayout[sampleRequirements<br/>(2 items)]
    State --> DashboardLayout[sampleProperties<br/>(3 items)]
    
    %% Persistence
    State -.-> sessionStorage[sessionStorage<br/>(demoRole only)]
    State -.-> Memory[In-memory only<br/>(resets on refresh)]
    
    %% No backend
    style Backend fill:#fef2f2,stroke:#ef4444
    classDef noBackend fill:#fef2f2,stroke:#ef4444
    class Backend noBackend
```

**Key Architecture Points:**

- **Single-page application** with React Router v7 for client-side routing
- **DashboardLayout** is the central state provider holding all mutable data in `useState`
- **Outlet context** distributes state + setters to all feature pages (no Context API, no external store)
- **Role-aware Sidebar** renders only the current role's menu items (defined in `Sidebar.jsx`)
- **Topbar role switcher** updates `currentRole` state and navigates to `/dashboard`
- **All data lives in memory** — browser refresh resets to initial mock data
- **Only `sessionStorage` persists** the `demoRole` preference across refreshes
- **No backend, API, database, or authentication service** — purely frontend demo

---

## Step-by-Step Flows

### 1. Harvest Booking & Cancellation

```
Farmer (My Harvests)                    Retailer (Browse Harvests)
────────────────────                    ────────────────────────
1. Create harvest listing               1. Browse/search harvests
   - Crop, category, qty, price          2. Click "View Details"
   - Location, harvest date               3. Select quantity (≤ available)
   - Optional image upload                4. Click "Confirm Booking"
   - Form validation                     5. Success state shown
────────────────────────────────────────────────────────────────
           Shared State (DashboardLayout)
           harvests[]: qty decremented
           bookings[]: new booking added
────────────────────────────────────────────────────────────────
Farmer (My Bookings)                    Retailer (Retailer Bookings)
────────────────────                    ────────────────────────
6. Sees booking in table                6. Sees booking in table
7. Can cancel (if needed)               7. Click "Cancel Booking"
8. Cancel → stock restored              8. Cancel → stock restored
9. Status: "Cancelled"                  9. Status: "Cancelled"
10. History preserved                    10. History preserved
```

**Key behaviors verified:**
- Stock decreases on booking, restores exactly once on cancellation
- Cancellation blocked for already-cancelled bookings
- Cross-role consistency via shared `bookings[]` and `harvests[]` state
- "Demo token" label on payment amounts; no real payment

---

### 2. Grow-to-Order Bidding

```
Retailer (Crop Requirements)            Farmer (Crop Bids)
────────────────────────────            ───────────────────────
1. Create requirement                   1. Browse open requirements
   - Crop, category, qty, unit           2. Click "Submit Bid"
   - Quality specs, target price          3. Enter proposed price
   - Location, required-by date           4. Expected quantity
   - Form validation                      5. Estimated harvest date
─────────────────────────────────────────────────────────────────
Retailer (Manage Bids)                  
────────────────────────────
2. View all bids for requirement
3. Click "Accept" on one bid
   → Bid status: Accepted
   → Other pending bids: auto-rejected
   → Requirement status: "Awarded"
   → Order created (4 stages)
─────────────────────────────────────────────────────────────────
Both (Orders)                           
────────────────────────────
3. See order with 4 stages:
   Farmer Selected → Growing → Ready for Harvest → Delivered
4. "Advance to Next Stage" button (demo)
5. Order details: price, qty, dates, quality specs
```

**Key behaviors verified:**
- Single-award enforcement: accepting one bid auto-rejects others
- Order created with 4 stages visible to both roles
- "Advance to Next Stage" button simulates progression
- Role-aware: farmers see accepted bids; retailers see awarded requirements

---

### 3. Land Leasing

```
Landowner (My Properties)               Farmer (Find Farmland)
────────────────────────────            ───────────────────────
1. Create property listing              1. Browse available properties
   - Title, location, acreage             2. Search/filter (location, lease
   - Rent/acre, period, type              type, soil, water, acreage, rent)
   - Lease type, soil, irrigation         3. Click property → Property Details
   - Water, permitted crops               4. Click "Apply for Lease"
   - Description, images                  5. Enter proposed rent, duration
   - Form validation                      6. Optional message
   - Status badges (Available/Leased)     7. Submit application
─────────────────────────────────────────────────────────────────
Landowner (Lease Applications)          
────────────────────────────
3. View received applications
4. Click "Approve"
   → Application: Approved
   → Other pending for same property: auto-rejected
   → Lease created (active)
   → Property status: Leased
─────────────────────────────────────────────────────────────────
Both (Lease Management)                 
────────────────────────────
4. View lease with details:
   - Agreed rent, duration, dates
   - Days remaining counter
   - Property location
5. Landowner: "End Lease Early" → property becomes Available
```

**Key behaviors verified:**
- Duplicate applications for same property prevented
- Approving one application auto-rejects others for same property
- Lease creation updates property status to "Leased"
- Days remaining calculated from lease end date
- Landowner can end lease early (property becomes Available)

---

### 4. Soil Intelligence

```
Farmer (Soil Intelligence)
──────────────────────────
1. Enter location (e.g., "Nashik, Maharashtra")
2. Enter area in acres (e.g., 5)
3. Optional: crop of interest (e.g., "cotton")
4. Click "Predict Soil"
   → Loading spinner (1.5–2.5s simulated delay)
   → Results displayed:
     • Predicted soil type (from 7 Indian types)
     • Description, common regions
     • Area insight (small/medium/large holding)
     • Crop recommendations table:
       - Crop, suitability score (%), reason
       - Filtered by crop interest if provided
     • "Add Harvest" / "Find Farmland" links
     • "New Analysis" button to reset
   → Disclaimer: "Demo Only — Not a Real ML Prediction"
```

**Adapter details (`src/utils/soilAnalysis.js`):**
- 7 Indian soil types with regional mapping
- Keyword-based location → soil type lookup
- Predefined crop recommendations per soil type with suitability scores (75–95%)
- Area-based insight: small (<5 ac), medium (5–10 ac), large (>10 ac)
- 1.5–2.5s simulated async delay; no real ML model
- Clear "Demo Only — Not a Real ML Prediction" notices

---

## Directory Structure

```
farm2retail/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/                    # Empty (scaffold assets removed)
│   ├── components/
│   │   ├── Sidebar.jsx            # Role-aware navigation, fixed sidebar
│   │   └── Topbar.jsx             # Topbar with role switcher dropdown
│   ├── data/
│   │   └── harvests.js            # Seed harvest data + generateId()
│   ├── layouts/
│   │   └── DashboardLayout.jsx    # Central state provider, Outlet context
│   ├── pages/
│   │   ├── HomePage.jsx           # Public landing page
│   │   ├── Login.jsx              # Sign-in form with validation
│   │   ├── DashboardHome.jsx      # Role-aware dashboard home
│   │   ├── MyHarvests.jsx         # Farmer: create/list harvests
│   │   ├── BrowseHarvests.jsx     # Retailer: search/filter/book
│   │   ├── HarvestDetails.jsx     # Details + booking
│   │   ├── MyBookings.jsx         # Farmer: view bookings
│   │   ├── RetailerBookings.jsx   # Retailer: view/cancel bookings
│   │   ├── CropRequirements.jsx   # Retailer: CRUD requirements
│   │   ├── CropBids.jsx           # Farmer: browse/submit bids
│   │   ├── ManageBids.jsx         # Retailer: accept/reject bids
│   │   ├── Orders.jsx             # Both: 4-stage order tracking
│   │   ├── MyProperties.jsx       # Landowner: CRUD properties
│   │   ├── FindFarmland.jsx       # Farmer: search/filter properties
│   │   ├── PropertyDetails.jsx    # View details + apply for lease
│   │   ├── LeaseApplications.jsx  # Both: submit/manage applications
│   │   ├── LeaseManagement.jsx    # Both: view/manage leases
│   │   ├── SoilIntelligence.jsx   # Farmer: soil analysis form + results
│   │   └── PlaceholderPage.jsx    # Catch-all for unbuilt routes
│   ├── utils/
│   │   └── soilAnalysis.js        # Mock soil analysis adapter
│   ├── App.jsx                    # Router configuration
│   ├── main.jsx                   # React entry point
│   └── index.css                  # Tailwind import + @theme tokens
├── index.html
├── vite.config.js
├── eslint.config.js
├── package.json
├── AGENTS.md
├── PROJECT_CONTEXT.md
└── README.md
```

---

## Key Files

| File | Purpose |
|------|---------|
| `src/layouts/DashboardLayout.jsx` | Central state provider; holds all `useState` for harvests, bookings, requirements, bids, orders, properties, leaseApplications, leases; passes via `Outlet` context |
| `src/components/Sidebar.jsx` | Role-aware navigation; renders only current role's menu items; fixed sidebar with mobile drawer |
| `src/components/Topbar.jsx` | Topbar with hamburger menu (mobile) and role switcher `<select>` |
| `src/pages/Login.jsx` | Sign-in form with email/password validation, show/hide password, role radio cards, sessionStorage role storage |
| `src/utils/soilAnalysis.js` | Mock soil analysis adapter; regional soil mapping, crop recommendations, simulated async delay |
| `src/data/harvests.js` | Seed harvest data (6 items) + `generateId()` helper |
| `src/App.jsx` | React Router configuration with all routes |
| `src/index.css` | Tailwind import + `@theme` design tokens (forest-green palette) |
| `vite.config.js` | Vite + React + Tailwind plugins |
| `eslint.config.js` | ESLint config (JS/JSX only) |

---

## Limitations

| Area | Status | Details |
|------|--------|---------|
| **Architecture** | Frontend-only | No backend, server, API layer, or database |
| **Authentication** | Mock only | `/login` form accepts any valid input; stores selected role in `sessionStorage`; no real credentials, no verification, no sessions, no JWT |
| **Data Persistence** | In-memory only | All `useState` resets on browser refresh; only `sessionStorage` retains `demoRole` |
| **Payments** | Simulated | "Demo token" labels on amounts; no payment gateway, no transactions |
| **Soil Intelligence** | Mock adapter | `src/utils/soilAnalysis.js` uses keyword-based region lookup + predefined scores; no ML model, no inference service |
| **Testing** | Manual only | No unit/integration/e2e tests; verification via `npm run build` + `npm run lint` + manual browser testing |
| **State Management** | React hooks only | `useState` in `DashboardLayout` + `Outlet` context; no Context API, Redux, Zustand |

---

## Commands & Testing

### Build & Lint

```bash
# Production build (verified: 0 errors)
npm run build

# Lint (verified: 0 errors)
npm run lint
```

**Build Output (verified):**
```
✓ 1953 modules transformed
dist/index.html                   0.46 kB │ gzip:   0.29 kB
dist/assets/index-*.css           35.39 kB │ gzip:   7.00 kB
dist/assets/index-*.js           441.36 kB │ gzip: 115.45 kB
✓ built in ~1s
```

### Manual Testing Checklist

| Area | Test |
|------|------|
| **Build & Lint** | `npm run build` → 0 errors; `npm run lint` → 0 errors |
| **Role Switching** | Topbar dropdown switches all 3 roles; menus update; active route highlighted |
| **Sidebar** | Desktop fixed (`top-0 left-0 h-screen`); `lg:pl-64` offset; mobile hamburger + overlay |
| **Harvest CRUD** | Create with validation; image upload/preview/replace/remove; listing cards show image |
| **Harvest Delete** | Blocked when active bookings exist; alert shown |
| **Retailer Booking** | Browse → Details → Book (qty clamped to stock) → Success state |
| **Cancellation** | Cancel restores stock exactly once; status "Cancelled"; history preserved |
| **Cross-role Booking** | Farmer My Bookings + Retailer Bookings show same data |
| **Crop Requirements CRUD** | Create/edit/delete with validation; search/filter |
| **Farmer Bids** | Browse requirements → submit bid (validation) → My Bids table |
| **Bid Accept/Reject** | Accept → auto-rejects others, creates order, requirement "Awarded" |
| **Orders** | 4 stages; demo "Advance" button; role-aware views |
| **Property CRUD** | Create/edit/delete with validation; status badges |
| **Property Delete** | Blocked by active lease/pending apps; alert shown |
| **Find Farmland** | Search by title/location/crops; filters (lease, soil, water, acreage, rent) |
| **Lease Applications** | Farmer apply → Landowner approve (auto-reject others, create lease) / reject |
| **Lease Management** | View active/past leases; days remaining; landowner ends lease early |
| **Soil Intelligence** | Form validation, loading spinner, results with demo notices, crop table, nav links |
| **Sign-in Form** | Email format, required fields, password min 6, inline errors, show/hide password |
| **Sign-in Navigation** | Valid form → stores role in sessionStorage → `/dashboard` |
| **Sign-in/Role Switching** | Works end-to-end; dashboard role switcher updates view |
| **No Demo Disclaimers** | Login page clean; only subtle footer note "Demo mode — any credentials work" |

### Browser Refresh Behavior

- All dashboard state (`harvests`, `bookings`, `requirements`, `bids`, `orders`, `properties`, `leaseApplications`, `leases`) **resets to initial mock data** on refresh
- Only `sessionStorage.demoRole` persists across refreshes
- Expected behavior for frontend-only demo

---

## Troubleshooting

| Issue | Cause | Resolution |
|-------|-------|------------|
| `npm run build` fails | Missing dependencies | Run `npm install` |
| `npm run lint` fails | ESLint config or code style | Check `eslint.config.js`; run `npm run lint` for details |
| Dev server won't start | Port in use | Vite auto-selects next port; check terminal output |
| Role switcher doesn't update view | `DashboardLayout` state not propagating | Ensure `currentRole` passed to `Sidebar` and `Topbar`; `Outlet` context includes `currentRole` |
| Booking stock not restoring | `setBookings` / `setHarvests` not called correctly | Check `RetailerBookings.jsx` cancel handler calls both setters |
| Soil Intelligence shows no results | `soilAnalysis.js` not imported | Verify `import { analyzeSoil } from '../utils/soilAnalysis'` in `SoilIntelligence.jsx` |
| Sign-in form doesn't navigate | `navigate('/dashboard')` not called | Check `handleSubmit` in `Login.jsx` calls `navigate('/dashboard')` after `sessionStorage.setItem('demoRole', role)` |
| Role switcher resets on refresh | `sessionStorage` not read on init | `DashboardLayout` initializes `currentRole` to `'farmer'`; role preference only in `sessionStorage` |

---

## License

MIT — demonstration prototype for educational purposes.

---

*README generated from verified source code inspection. All commands, routes, and architecture descriptions validated against actual source files.*