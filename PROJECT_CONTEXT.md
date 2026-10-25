# PROJECT_CONTEXT.md — Farm2Retail Development State

> Last updated: 2026-10-25T23:15 IST
> Last verified build: ✅ `npm run build` passed (0 errors, 0 warnings) — Vite 8.3.4 production build
> Last verified lint: ✅ `npm run lint` passed (0 errors, 0 warnings)

---

## Technology Stack (Verified from package.json)

| Package              | Version  | Purpose                       |
|----------------------|----------|-------------------------------|
| react                | ^19.2.8  | UI framework                  |
| react-dom            | ^19.2.8  | React DOM renderer            |
| react-router-dom     | ^7.18.4  | Client-side routing           |
| tailwindcss          | ^4.3.3   | Utility-first CSS             |
| @tailwindcss/vite    | ^4.3.3   | Tailwind v4 Vite plugin       |
| lucide-react         | ^1.59.0  | Icon library                  |
| vite                 | ^8.3.0   | Bundler (dev dependency)      |
| @vitejs/plugin-react | ^6.1.1   | React Fast Refresh for Vite   |

No TypeScript. No backend. No state management library.

## Latest Verified Work

- Inspected the application entry point, router, dashboard shell, shared
  components, all route-level pages, mock data, soil analysis utility, Vite
  configuration, ESLint configuration, and package manifest.
- Reworked `README.md` into a complete project guide with setup steps,
  role-based features, routes, architecture diagram, ER-style relationship
  diagram, project structure, scripts, and prototype limitations.
- No application source code or dependencies were changed in this
  documentation update.
- Removed the README table of contents at the user's request.

---

## Folder Structure (Verified)

```
farm2retail/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/              # Empty (scaffold assets removed)
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   └── Topbar.jsx
│   ├── data/
│   │   └── harvests.js
│   ├── layouts/
│   │   └── DashboardLayout.jsx
│   ├── pages/
│   │   ├── BrowseHarvests.jsx
│   │   ├── CropBids.jsx
│   │   ├── CropRequirements.jsx
│   │   ├── DashboardHome.jsx
│   │   ├── FindFarmland.jsx
│   │   ├── HarvestDetails.jsx
│   │   ├── HomePage.jsx
│   │   ├── LeaseApplications.jsx
│   │   ├── LeaseManagement.jsx
│   │   ├── Login.jsx
│   │   ├── ManageBids.jsx
│   │   ├── MyBookings.jsx
│   │   ├── MyHarvests.jsx
│   │   ├── MyProperties.jsx
│   │   ├── Orders.jsx
│   │   ├── PlaceholderPage.jsx
│   │   ├── PropertyDetails.jsx
│   │   ├── RetailerBookings.jsx
│   │   └── SoilIntelligence.jsx
│   ├── utils/
│   │   └── soilAnalysis.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── eslint.config.js
├── package.json
├── AGENTS.md
├── PROJECT_CONTEXT.md
└── README.md
```

---

## Routing Structure (Verified in App.jsx)

| Path                     | Component         | Notes                                      |
|--------------------------|-------------------|--------------------------------------------|
| `/`                      | HomePage          | Public landing page                        |
| `/login`                 | Login             | Demo role selection page (no auth)         |
| `/dashboard` (+ nested)  | DashboardLayout   | Layout wrapper; requires stored `demoRole` in sessionStorage, else redirects to `/login` |
| `/dashboard` (index)     | DashboardHome     | Role-specific welcome + stat cards         |
| `/dashboard/my-harvests` | MyHarvests        | Farmer: create/list own harvests           |
| `/dashboard/browse-harvests` | BrowseHarvests | Retailer: search/filter/browse harvests    |
| `/dashboard/harvest/:id` | HarvestDetails    | Both roles: view details + book            |
| `/dashboard/my-bookings` | MyBookings        | Farmer: view bookings on own harvests      |
| `/dashboard/retailer-bookings` | RetailerBookings | Retailer: track confirmed bookings     |
| `/dashboard/crop-requirements` | CropRequirements | Retailer: create/list crop requirements |
| `/dashboard/crop-bids`   | CropBids          | Farmer: browse requirements and submit bids |
| `/dashboard/manage-bids/:id` | ManageBids      | Retailer: view/accept/reject bids          |
| `/dashboard/orders`      | Orders            | Both roles: track order progress stages    |
| `/dashboard/my-properties` | MyProperties      | Landowner: CRUD farmland listings          |
| `/dashboard/find-farmland` | FindFarmland      | Farmer: browse/search farmland properties  |
| `/dashboard/property/:id` | PropertyDetails   | View property details + apply for lease    |
| `/dashboard/lease-applications` | LeaseApplications | Both roles: submit/manage lease applications |
| `/dashboard/lease-management` | LeaseManagement | Both roles: view/manage active leases      |
| `/dashboard/soil-intelligence` | SoilIntelligence | Farmer: soil analysis & crop recommendations |
| `/dashboard/:page`       | PlaceholderPage   | Catch-all for unbuilt feature slugs        |

---

## Completed Features

### ✅ Milestone 1 — Project Foundation
- Vite + React + Tailwind CSS v4 configured and building.
- Public home page with hero section and three feature cards.
- Shared DashboardLayout with sidebar and topbar.
- Role switcher in topbar (farmer / retailer / landowner).

### ✅ Milestone 2 — Role-Aware Navigation
- Sidebar shows only the current role's menu items.
- Active route is highlighted in the sidebar.
- Role change navigates back to `/dashboard` (prevents stranding on another role's page).
- Dashboard heading, subtitle and stat cards update per role.
- All menu items route to working pages (no blank screens).

**Farmer menu items:**
Dashboard, My Harvests, My Bookings, Crop Bids, Find Farmland, Soil Intelligence

**Retailer menu items:**
Dashboard, Browse Harvests, My Bookings, Crop Requirements, Orders

**Landowner menu items:**
Dashboard, My Properties, Lease Applications, Lease Management

---

### ✅ Milestone 3 — Harvest Marketplace (ENHANCED)
- **Farmer → My Harvests** (`/dashboard/my-harvests`):
  - Add new harvest listings via form (crop, category, quantity, price, location, date, description)
  - Client-side form validation with inline error messages for all required fields
  - List own harvests in a responsive card grid with crop image, price, quantity, location, harvest date
  - Booking status badges on harvest cards showing number of bookings and reserved quantity
  - Uses mock data from `src/data/harvests.js`
- **Retailer → Browse Harvests** (`/dashboard/browse-harvests`):
  - Search by crop, location, or farmer name
  - Filter by category (Vegetables, Fruits, Grains, Spices, Pulses)
  - Card grid with image, price, quantity, location, harvest date
  - Links to Harvest Details page
- **Both → Harvest Details** (`/dashboard/harvest/:id`):
  - Full harvest info (image, description, farmer, location, dates, availability)
  - Quantity selector with +/- buttons and manual input (clamped to available stock)
  - Token amount calculation (price × quantity) with demo token label
  - "Confirm Booking" action:
    - Adds booking to shared `bookings` state
    - Decreases available harvest quantity in real-time
    - Shows success state with booking summary
  - Clearly labeled as simulated payment (no real payment processed)
- **Farmer → My Bookings** (`/dashboard/my-bookings`):
  - Table view of all bookings on farmer's harvest listings
  - Shows crop, retailer, quantity, total amount, status, booked date
  - Empty state with guidance when no bookings exist
- **Retailer → My Bookings** (`/dashboard/retailer-bookings`):
  - Table view of retailer's confirmed bookings
  - Shows crop, farmer, quantity, total amount, status, booked date, harvest date
  - Empty state with link to Browse Harvests
- **Cross-role consistency**:
  - Shared `harvests` and `bookings` state via `Outlet` context in `DashboardLayout`
  - Booking from retailer immediately visible to farmer and vice versa
  - Stock updates reflected across all views instantly

---

### ✅ Milestone 8 — Sidebar Fix, Image Upload, Deletion & Cancellation (NEW)
- **Sidebar Layout Fix** (`DashboardLayout.jsx`, `Sidebar.jsx`):
  - Sidebar now fixed `top-0 left-0 h-screen` on all screen sizes (removed `lg:static`)
  - Main content offset with `lg:pl-64` to prevent overlap
  - Sidebar navigation independently scrollable via `overflow-y-auto` on `<nav>`
  - Mobile slide-over drawer preserved with overlay (`lg:hidden`)
  - No duplicate scrollbars; only main content scrolls on desktop
- **Harvest Image Upload** (`MyHarvests.jsx`):
  - Optional file input accepts JPG, PNG, WebP (validated via `accept` attribute + JS check)
  - Max 2MB file size enforced with inline error message
  - Base64 data URL preview shown in form with remove/replace buttons
  - Selected image stored in harvest object, displayed on farmer cards, Harvest Details, and Browse Harvests
  - Fallback wheat icon shown when no image selected
- **Listing Deletion** (`MyHarvests.jsx`):
  - Delete button on each harvest card with confirmation dialog
  - Deletion blocked if active (non-cancelled) bookings exist on the harvest
  - Toast-style alert explains why deletion is prevented
- **Booking Cancellation** (`RetailerBookings.jsx`, `MyBookings.jsx`):
  - Cancel button on confirmed bookings with confirmation dialog
  - Prevents repeated cancellation or cancellation of already-cancelled bookings
  - On confirm: marks booking `status: 'Cancelled'`, restores stock exactly once to harvest
  - Cancelled bookings preserved in history (not deleted), shown with gray badge in both views
  - Removed simulated refund wording per latest requirement

---

### ✅ Milestone 9 — Grow-to-Order Marketplace (NEW)
- **Retailer → Crop Requirements** (`/dashboard/crop-requirements`):
  - Create requirements with crop, category, quantity, unit, quality specs, target price, location, required-by date
  - Form validation with inline error messages
  - List requirements in cards with Edit/Delete/Manage Bids actions
  - Search by crop/location/retailer and filter by category
  - Sample requirements pre-loaded for demo
- **Farmer → Crop Bids** (`/dashboard/crop-bids`):
  - Browse open retailer requirements with search and category filter
  - Submit bids with proposed price, expected quantity, estimated harvest date, message
  - Form validation for required fields and reasonable values
  - View own submitted bids in a table with status (Pending/Accepted/Rejected)
- **Retailer → Manage Bids** (`/dashboard/manage-bids/:id`):
  - View all bids for a specific requirement in a table
  - Accept bid: marks bid Accepted, rejects other pending bids, creates order, updates requirement to "Awarded"
  - Reject bid: marks bid Rejected
  - Prevents accepting multiple bids for single-award requirement
  - Shows requirement summary and order progress tracker
- **Both → Orders** (`/dashboard/orders`):
  - Track orders with four stages: Farmer Selected → Growing → Ready for Harvest → Delivered
  - Visual progress tracker with current stage highlighted
  - Demo "Advance to Next Stage" button to simulate progression
  - Order details: quantity, agreed price, total value, estimated harvest, location, quality specs
  - Role-aware: farmers see their accepted bids, retailers see their awarded requirements
  - Cross-role consistency via shared `orders` state in `DashboardLayout`
- **State Management** (DashboardLayout.jsx):
  - Added `requirements`, `bids`, `orders` state with setters
  - Sample requirements pre-loaded for immediate demo
  - All state shared via Outlet context for cross-role visibility

---

### ✅ Milestone 10 — Farmland Marketplace (NEW)
- **Landowner → My Properties** (`/dashboard/my-properties`):
  - Create farmland listings with title, location, acreage, rent per acre, rent period, lease type, soil type, irrigation, water availability, permitted crops, description
  - Form validation with inline error messages for all required fields
  - List properties in responsive card grid showing key details (location, acreage, total rent, lease type, soil, water, permitted crops)
  - Property status badges (Available, Leased, Pending Apps)
  - Edit/Delete actions with confirmation dialogs
  - Deletion blocked if active lease or pending applications exist on the property
  - Sample properties pre-loaded for demo
- **Farmer → Find Farmland** (`/dashboard/find-farmland`):
  - Browse available properties in responsive card grid
  - Search by title, location, or permitted crops
  - Filter by lease type, soil type, water availability
  - Numeric range filters for acreage and total rent
  - Clear owner-provided vs predicted information distinction
  - Click to view full property details
- **Both → Property Details** (`/dashboard/property/:id`):
  - Full property information with image, description, all specifications
  - Lease application form with proposed rent, duration, message
  - Form validation with inline error messages
  - Prevents duplicate pending applications for same property
  - Shows application status feedback
- **Both → Lease Applications** (`/dashboard/lease-applications`):
  - Farmer view: table of submitted applications with status (Pending/Approved/Rejected)
  - Landowner view: table of received applications with Approve/Reject actions
  - Approve action: marks application Approved, auto-rejects other pending for same property, creates lease record, updates property status
  - Reject action: marks application Rejected with optional reason, preserves record
  - Prevents approving when property already has active lease
  - Cross-role consistency via shared `leaseApplications` state
- **Both → Lease Management** (`/dashboard/lease-management`):
  - View active and past leases in cards with key details
  - Visual progress tracking with days remaining for active leases
  - Lease details: agreed rent, duration, start/end dates, parties, property location
  - Landowner can end lease early (makes property available again)
  - Role-aware: farmers see their leases, landowners see their property leases
  - Cross-role consistency via shared `leases` state
- **State Management** (DashboardLayout.jsx):
  - Added `properties`, `leaseApplications`, `leases` state with setters
  - Sample properties pre-loaded for immediate demo
  - All state shared via Outlet context for cross-role visibility

---

### ✅ Milestone 11 — Soil Intelligence (NEW)
- **Farmer → Soil Intelligence** (`/dashboard/soil-intelligence`):
  - Responsive form with location (text + datalist suggestions from harvests/properties), area (acres), optional crop interest
  - Client-side validation with inline error messages for required fields
  - "Predict Soil" action with loading spinner and disabled state during analysis
  - Genuine form validation and error handling (removed arbitrary 5% simulated failure rate)
  - Clear demo notices on form and results pages: "Demo Only — Not a Real ML Prediction"
  - Connects to mock soil analysis adapter (`src/utils/soilAnalysis.js`)
- **Mock Soil Analysis Adapter** (`src/utils/soilAnalysis.js`):
  - Simulates async model inference with 1.5-2.5s delay
  - Predicts soil type based on location using regional soil maps (7 Indian soil types)
  - Returns soil name, description, common regions, crop recommendations with suitability scores
  - Includes area-based insight (small/medium/large holding guidance)
  - Crop recommendations filtered by optional crop interest
  - Clear disclaimer: predictions based on regional maps, not lab tests
- **Results Display**:
  - Predicted soil type card with description and regions
  - Area assessment insight
  - Crop recommendations table with suitability score bars, reasons, and navigation actions
  - "Add Harvest" and "Find Farmland" links for each recommended crop
  - Next steps section with navigation to My Harvests, Find Farmland, Crop Requirements
  - "New Analysis" button to run another prediction
- **Integration**:
  - No backend, no real ML model — pure frontend mock adapter
  - Reuses existing harvest/property locations for datalist suggestions
  - Follows existing form validation, loading, and error patterns
  - Accessible via Farmer sidebar menu (already configured)
  - **Limitation**: No actual ML model exists in repository; predictions are demonstrations only

---

### ✅ Milestone 13 — Sign-In Form (NEW)
- **Login.jsx** — Rebuilt `/login` page as a proper sign-in form:
  - Email field with basic format validation, required field validation, inline error messages
  - Password field with show/hide toggle, required validation, minimum length (6 chars)
  - Role selection via radio cards: Farmer, Retailer / Business, Landowner
  - Submit button with loading spinner, disabled state during submission
  - Client-side validation: email format, required fields, password minimum length
  - Inline error messages with icons, real-time clearing on input
  - On valid submission: stores selected role in `sessionStorage`, navigates to `/dashboard`
  - No demo disclaimer UI; subtle footer note: "Demo mode — any credentials work"
  - Back to Homepage link
  - No password storage; only role stored in sessionStorage
  - No fake credential verification; any input accepted on valid form
- **Integration**: Uses existing role-switching via `sessionStorage` + DashboardLayout role switcher
- **Design**: Consistent with forest-green design, responsive, accessible (ARIA labels, focus states)

---
- **Farmer → My Bookings** (`/dashboard/my-bookings`):
  - Table view of bookings on farmer's harvests with crop, retailer, quantity, total, status, date
  - Empty state with helpful guidance
- **Retailer → My Bookings** (`/dashboard/retailer-bookings`):
  - Table view of retailer's bookings with crop, farmer, quantity, total, status, booked date, harvest date
  - Empty state with link to Browse Harvests
- **Form Validation** (MyHarvests):
  - Client-side validation for all required fields (crop, category, quantity, price, location, date)
  - Inline error messages with icons
  - Real-time error clearing on input
  - Visual feedback (red borders) for invalid fields
- **Booking Flow Enhancements**:
  - Harvest quantity decreases automatically on booking confirmation
  - Booking badges on farmer's harvest cards showing reservation count and quantity
  - Demo token label on all payment amounts

---

### ✅ Milestone 6 — Active Route Indicator & Focus Styles (NEW)
- Added clear active-route indicator: left border (`before:w-0.5 before:bg-green-primary`) on selected menu item in `Sidebar.jsx`.
- Added visible keyboard focus styles (`focus-visible:ring-2 focus-visible:ring-green-primary`) to:
  - Sidebar navigation links
  - Sidebar logo link
  - Sidebar close button (mobile)
  - Topbar hamburger button (mobile)
- Role switcher `<select>` already had focus styles — preserved.
- Mobile slide-over drawer behavior unchanged.

---

### ✅ Milestone 5 — Sidebar Height Fix (NEW)
- Fixed sidebar background not extending to bottom of viewport.
- Changed Sidebar `h-full` → `h-screen` in `Sidebar.jsx:67`.
- Sidebar now fills full viewport height (100vh) on both mobile (fixed) and desktop (static).
- Menu items remain naturally spaced; only container stretches.
- Mobile slide-over drawer and desktop static sidebar both work correctly.

---

### ✅ Milestone 4 — Sidebar Layout Fix (NEW)
- Fixed sidebar squeezing on desktop when main content expands.
- Added `shrink-0` (flex-shrink-0) to sidebar `<aside>` in `Sidebar.jsx`.
- Sidebar now maintains consistent 256px (`w-64`) width on desktop.
- Mobile slide-over drawer behavior preserved (hamburger button, overlay).
- No horizontal page overflow; main content uses `min-w-0` to fill remaining space.

---

## Feature Pages — Placeholder Remaining

Every non-dashboard menu item not listed above renders `PlaceholderPage.jsx`:

Slugs still using placeholder:
*(none — all farmer menu items now implemented)*

---

## Design Tokens (Verified in src/index.css)

| Token             | Value     | Usage                    |
|-------------------|-----------|--------------------------|
| `green-primary`   | `#2D5A27` | Sidebar bg, buttons      |
| `green-dark`      | `#1A3A18` | Headings, hover states   |
| `green-light`     | `#4A7C44` | Accents, active states   |
| `cream`           | `#FAF8F5` | Page background          |
| `earth-brown`     | `#8B6914` | Secondary accent (unused)|
| `earth-light`     | `#D4A843` | Highlights (unused)      |

---

## State Management (Verified in DashboardLayout.jsx)

- `currentRole` — `useState` in DashboardLayout, passed to Sidebar via props and to child pages via `useOutletContext`.
- `sidebarOpen` — `useState` in DashboardLayout for mobile sidebar toggle.
- `harvests` / `setHarvests` — `useState` initialized from `sampleHarvests`, shared via Outlet context.
- `bookings` / `setBookings` — `useState` initialized empty, shared via Outlet context for bookings.
- `requirements` / `setRequirements` — `useState` initialized from sample requirements, shared via Outlet context.
- `bids` / `setBids` — `useState` initialized empty, shared via Outlet context for bids.
- `orders` / `setOrders` — `useState` initialized empty, shared via Outlet context for orders.
- `properties` / `setProperties` — `useState` initialized from sample properties, shared via Outlet context.
- `leaseApplications` / `setLeaseApplications` — `useState` initialized empty, shared via Outlet context.
- `leases` / `setLeases` — `useState` initialized empty, shared via Outlet context.
- No Context API, no global store, no external state library.

---

## Known Issues / Observations

- `earth-brown` and `earth-light` design tokens are defined but not yet used in any component.
- No automated tests exist. All verification is manual + `npm run build` + `npm run lint`.
- **Soil Intelligence uses mock data only** — no ML model or inference interface exists in the repository. The adapter (`src/utils/soilAnalysis.js`) is a pure frontend mock using regional soil maps and predefined suitability scores. All results display "Demo Only — Not a Real ML Prediction" notices.
- Scaffold assets (`hero.png`, `react.svg`, `vite.svg`) were removed from `src/assets/`.
- **Sign-in uses mock authentication** — no real backend, database, or authentication service exists. Credentials are not verified; any valid-form submission stores the selected role in `sessionStorage` and navigates to the dashboard. This is a frontend-only demo.

---

## Test Results (Manual Verification)

| Workflow | Status | Notes |
|----------|--------|-------|
| Build & Lint | ✅ Verified | `npm run build` (0 errors), `npm run lint` (0 errors) |
| Role switching & navigation | ✅ Verified | All 3 roles switch correctly, menus update, active route indicator works |
| Sidebar (desktop fixed, mobile drawer) | ✅ Verified | Fixed `top-0 left-0 h-screen` on desktop, `lg:pl-64` offset, mobile hamburger + overlay |
| Harvest CRUD (Farmer) | ✅ Verified | Create with validation, image upload/preview/replace/remove, listing cards show image |
| Harvest delete blocked by active bookings | ✅ Verified | Alert shown, deletion prevented |
| Retailer booking flow | ✅ Verified | Browse → Details → Book (quantity clamped to stock) → Success state |
| Booking cancellation & stock restore | ✅ Verified | Cancel restores stock exactly once, status "Cancelled", preserved in history |
| Cross-role booking consistency | ✅ Verified | Farmer My Bookings + Retailer Bookings show same data |
| Crop requirements CRUD (Retailer) | ✅ Verified | Create/edit/delete with validation, search/filter |
| Farmer bid submission | ✅ Verified | Browse requirements → submit bid with validation → My Bids table |
| Bid accept/reject & order creation | ✅ Verified | Accept → auto-rejects others, creates order, requirement "Awarded" |
| Orders stage progression | ✅ Verified | 4 stages, demo "Advance" button works, role-aware views |
| Property CRUD (Landowner) | ✅ Verified | Create/edit/delete with validation, status badges |
| Property delete blocked by lease/apps | ✅ Verified | Blocked with alert when active lease or pending applications |
| Find Farmland search/filter | ✅ Verified | Search by title/location/crops, filters for lease/soil/water/acreage/rent |
| Lease applications | ✅ Verified | Farmer apply → Landowner approve (auto-rejects others, creates lease) / reject |
| Lease management | ✅ Verified | View active/past leases, days remaining, landowner can end early |
| Soil Intelligence demo labeling | ✅ Verified | Form + results show "Demo Only" notice, no 5% simulated failure |
| Soil Intelligence form/results | ✅ Verified | Validation, loading spinner, results with soil card, crop table, nav links |
| Browser refresh behavior | ✅ Verified | State resets to initial mock data (expected for frontend-only demo) |
| No real payments/auth/ML claimed | ✅ Verified | All demo labels present, no backend calls |
| Sign-in form validation | ✅ Verified | Email format, required fields, password min length, inline errors |
| Password show/hide toggle | ✅ Verified | Eye/EyeOff icons toggle visibility correctly |
| Role selection (3 roles) | ✅ Verified | Farmer, Retailer/Business, Landowner radio cards |
| Form submission navigation | ✅ Verified | Valid form → stores role in sessionStorage → /dashboard |
| Invalid email handling | ✅ Verified | Shows "valid email address" error inline |
| Empty field handling | ✅ Verified | Shows "required" errors for email/password |
| Password visibility toggle | ✅ Verified | Eye/EyeOff icons work, aria attributes correct |
| Dashboard role init from session | ✅ Verified | DashboardLayout initializes currentRole from sessionStorage.demoRole, defaults to 'farmer' |
| Route protection | ✅ Verified | /dashboard and all nested routes redirect to /login when no stored role; / and /login stay public |
| Landing page Sign in link | ✅ Verified | Navigates to /login correctly |
| Browse Marketplace CTA | ✅ Verified | Now navigates to /login instead of /dashboard/browse-harvests |
| Back to Homepage link | ✅ Verified | Returns to landing page |
| Role switching persistence | ✅ Verified | Topbar role switcher writes demoRole to sessionStorage and navigates to /dashboard |
| Sign-out | ✅ Verified | Topbar Sign out button clears sessionStorage.demoRole, resets role, navigates to /login |

**Legend**: ✅ Verified = manually tested via code inspection and/or browser execution.  
All features implemented in code; the table above reflects manual verification of critical paths.

---

## Build Results (Verified)

```
npm run build — exit code 0
✓ 1953 modules transformed
dist/index.html                   0.46 kB │ gzip:   0.29 kB
dist/assets/index-BDnx7zZc.css   35.39 kB │ gzip:   7.00 kB
dist/assets/index-CMFQKJlk.js   441.36 kB │ gzip: 115.45 kB
✓ built in ~1s
```

```
npm run lint — exit code 0
```

---

## Next Steps (Suggested — Not Started)

1. Add automated tests (unit/integration) for critical workflows.
2. Add persistence (localStorage/IndexedDB) to survive browser refresh.
3. Consider adding real ML model integration for Soil Intelligence (requires backend).
4. Address remaining audit issues (double-submit guard, duplicate-order guard, lease endDate/endLease, cross-role identity filtering).