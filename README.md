# Terra Dashboard

A reusable dashboard design system built with **React 19 + TypeScript + Tailwind CSS v4 + React Router DOM**.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:5173 — it redirects to `/dashboard`.

```bash
npm run build       # production build (tsc -b && vite build)
npm run preview     # preview the production build
npm run test        # run the test suite once (vitest run)
npm run test:watch  # run tests in watch mode
npm run lint        # oxlint
```

## Rebranding

Everything brand-related (app name, tagline, logo, footer, social links) lives in **one file**:

```
src/config/site.ts
```

Edit it and the whole app (Sidebar, Header, Auth pages, Footer) updates - no need to touch component code.

**Swapping the logo** works the same way. The logo mark is rendered by a single component,
`LogoBox` (`src/components/layout/logo-box/LogoBox.tsx`), used in `Sidebar` and `AuthLayout`. By default it
renders a Hexagon icon mark + the app name. To use a real company logo instead:

1. Drop the logo file in `public/` (e.g. `public/logo.svg`).
2. In `src/config/site.ts`, set `logo.src` to that path (e.g. `"/logo.svg"`) and update `logo.alt`.

`LogoBox` automatically renders an `<img>` from `logo.src` everywhere it's used instead of the icon mark - no
component code needs to change, and both the Sidebar (expanded/collapsed) and the Auth pages pick it up.

## Architecture

```
src/
  styles/
    globals.css            -> entry point: imports Tailwind, variables.css, animations.css, base body rules
    variables.css           -> Foundations: color tokens, breakpoints, radius, shadow, font, dark mode vars
    animations.css          -> imports tw-animate-css + motion tokens (animate-in/fade-in/slide-in-from-*)
  config/site.ts          -> Branding config (single source of truth)
  context/                -> ThemeContext (light/dark/system), SidebarContext (collapse/mobile)
  lib/                     -> cn() utility, mock data
  hooks/                   -> useClickOutside, useMediaQuery
  test/                    -> Vitest setup + renderWithRouter test helper

  components/
    ui/                    -> 48/48 Atomic components (Button, Input, Card, Modal, ...)
    layout/                -> 18/18 Layout components (AppShell, Sidebar, Header, PageHeader, ...)
    composite/              -> Composite components (StatCard, ChartCard, DataTable, ...)

  layouts/                 -> Route-level layouts (DashboardLayout, AuthLayout, BlankLayout, SettingsLayout)
  pages/                   -> Page components, grouped by route area (dashboard/, auth/, error/)
  routes/                  -> routes/index.tsx = single source of truth for all routing
```

### Foundations

Design tokens are defined in `src/styles/variables.css`, transcribed directly from the authoritative Terra
Dashboard Design System V1 document (exact hex values, not approximated from a screenshot):

- **Primary** - Navy Blue, 11-step scale (950 -> 50). **Not a single hue ramp**: 950-800 are neutral slate
  tones (dark surfaces like the sidebar background), while 700-50 shift into vivid blue (buttons, active
  states, focus rings, links).
- **Neutral / Slate** - a *separate* 11-step scale (taken from the doc's Light/Dark Theme sections) that all
  semantic surface/text/border tokens map to. This split exists because Primary 100-300 are light blue, not
  neutral gray — if `border-default` derived from Primary the way it used to, every card border and body of
  text would carry a visible blue tint. Neutral is reserved for exactly that kind of UI chrome; Primary is
  reserved for actual brand-colored elements.
- **Semantic** - success / warning / danger / info / neutral, each as a **4-tier** token: `base` (solid),
  `soft` (background tint), `border`, `text`. Legacy `-100`/`-700` aliases still work (mapped to `soft`/`text`)
  so existing component variants didn't need touching one by one.
- **Accents** - blue, cyan, green, amber, orange, red, pink, purple — matches the doc's Chart Palette too.
- **Typography scale** - 9 levels (Display, H1-H4, Body, Body Small, Label, Caption), each a paired
  `font-size`/`line-height` Tailwind v4 token (e.g. `--text-h1` + `--text-h1--line-height`), generating
  `text-display`, `text-h1`, ... `text-caption` utilities. Font weight is applied separately via
  `font-bold`/`font-semibold`/`font-medium`/`font-normal` per the doc's own split of size vs. weight. See it
  live at `/typography` in the sidebar's General section.
- **Radius** - `xs`(4) `sm`(6) `md`(8) `lg`(12) `xl`(16) `2xl`(20) `3xl`(24), matching the doc's usage
  guidance (Button/Input: 8px, Card: 12px, Large Card/Modal: 16px).
- **Shadow** - single-layer, using the doc's exact formula (e.g. `--shadow-md: 0 4px 12px rgba(15,23,42,.08)`).
- **Gradients** - 6 named gradients from doc section 15, applied via `.gradient-primary`, `.gradient-blue`,
  `.gradient-purple`, `.gradient-ocean`, `.gradient-success`, `.gradient-sunset` utility classes. Used
  sparingly, per the doc's own guidance (hero areas, promotional cards, featured sections) — not wired into
  any page by default.
- **Breakpoints** - standard Tailwind names (`sm`/`md`/`lg`/`xl`) with `md`, `lg`, `xl` overridden to
  768px/1024px/1440px to match the design tokens. We deliberately keep the standard names rather than
  renaming them (e.g. to `tablet`/`desktop`/`wide`) because the whole codebase uses `md:`/`lg:`/`xl:`
  utilities — renaming the breakpoint scale would silently break every responsive class in the app.
- **Dark mode** - class-based (`.dark` on `<html>`), driven by a semantic CSS variable layer
  (`bg-surface`, `text-primary`, `border-default`, etc.) so components never hardcode
  `dark:` variants directly.

Motion lives in `src/styles/animations.css`, which imports **`tw-animate-css`** (the Tailwind v4-compatible
successor to `tailwindcss-animate`) to provide the `animate-in`, `fade-in`, `zoom-in-95`, `slide-in-from-*`
utility classes used by Modal, Drawer, MobileDrawer and Toast. All motion in this project is plain CSS via
Tailwind utilities — there is no Framer Motion or other JS animation library, by design.

`src/styles/globals.css` is just the entry point: it imports Tailwind itself, then `variables.css` and
`animations.css`, then a handful of base `body`/`*` rules.

### Sidebar responsive behavior

Per the doc's breakpoint usage guidance, the sidebar behaves differently at each tier, driven by
`SidebarContext`'s `matchMedia` listener:

- **Mobile** (`<768px`) - hidden behind the hamburger menu, opens as a full `MobileDrawer` slide-over.
- **Tablet** (`768px-1023px`) - persistent and **auto-collapsed** (icon-only) by default — "Adaptive": the
  manual collapse toggle still works if you want to expand it while in this range.
- **Desktop** (`≥1024px`) - persistent and expanded by default.

This required moving the sidebar/hamburger/drawer visibility breakpoint from `lg` (1024px) to `md` (768px)
so the persistent sidebar appears starting at Tablet width instead of only at Desktop width.

### Component layers - 100% complete

| Layer | Location | Count | Notes |
|---|---|---|---|
| Atomic | `components/ui/*` | **48 / 48** | One folder per component, barrel-exported via `components/ui/index.ts` |
| Layout | `components/layout/*` | **18 / 18** | Composable page structure, barrel-exported via `components/layout/index.ts` |
| Composite | `components/composite/*` | **24 / 24** | Built from Atomic + Layout, barrel-exported via `components/composite/index.ts` |

Full Atomic list (48): Button, Icon Button, Button Group, Link, Dropdown Button, Copy Button, Badge, Chip,
Avatar, Avatar Group, Status Indicator, Kbd, Divider, Label, Card, Input, Search Input, Textarea, Select,
Multi Select, Checkbox, Radio, Switch, Slider, Date Picker, Date Range Picker, File Upload, Alert, Toast,
Progress, Spinner, Skeleton, Empty State, Modal/Dialog, Drawer, Popover, Tooltip, Dropdown Menu, Context Menu,
Command Menu, Menu, Navigation Item, Tabs, Breadcrumb, Pagination, Stepper, Timeline Item, Accordion.

Full Layout list (18): App Shell, Header/Topbar, Sidebar (expanded/collapsed), Sidebar with Submenu, Mobile
Drawer, Sidebar Section, Page Container, Page Header, Section Container, Content Grid, Stack/Flex, Spacer,
Split Layout, Container Card, Overlay, Scroll Area, Footer, Safe Area.

Full Composite list (24), grouped as in the original design-system plan:
- **Dashboard (8):** Stat Card, KPI Card, Metric Card, Metric Comparison, Chart Card, Activity Feed,
  Activity Timeline, Quick Actions
- **Data (7):** Data Table, Table Toolbar, Table Filter, Table Column Manager, Table Bulk Actions, List Card,
  User List
- **Analytics (5):** Line Chart Card, Bar Chart Card, Area Chart Card, Donut Chart Card, Progress Chart Card
  (the four typed Chart Card variants are thin presets over the shared, configurable `ChartCard`)
- **Business UI Patterns (4):** Profile Card, Customer Card, Project Card, Invoice Summary

Every composite is wired into at least one real page (not just exported) - e.g. `QuickActions` and
`MetricComparison` on Home, `TableToolbar` + `TableFilter` + `TableColumnManager` + `TableBulkActions` on
Customers, `KpiCard` + the four typed chart cards + `ProgressChartCard` on Analytics, `UserList` on Tasks,
`ProfileCard` on Profile, `ActivityTimeline` + `ListCard` on Project detail, `InvoiceSummary` on Invoice detail.

The Command Menu is wired live too: press **Ctrl/Cmd+K** anywhere in the dashboard, or click the search bar in
the header, to open it.

### Component catalog (starter-kit browsing)

Every one of the 48 Atomic and 18 Layout components has its own dedicated demo page, reachable by URL:

```
/components/:slug              e.g. /components/button, /components/date-range-picker
/layout-components/:slug       e.g. /layout-components/app-shell, /layout-components/sidebar
```

Rather than 66 hand-written page files, these are driven by a small registry (`src/lib/catalog/`) — one entry
per component with a `slug`, `category`, `description`, and a `render()` function — plus a single generic
`ComponentCatalogPage` that looks up the entry by `:slug` and renders it. `/components` and
`/layout-components` are browsable index pages listing every entry grouped by category. Adding a new demo is
one new entry in the relevant `src/lib/catalog/*.tsx` file, not a new route or page component.

### Sidebar navigation structure

The sidebar is grouped into four sections matching the starter-kit purpose of this project:

- **Pages** - the real dashboard pages (Overview, Customers, Products, Orders, Projects, Tasks, Invoices,
  Analytics, Calendar, Messages, Notifications, Profile)
- **Components** - submenus by category (Actions, Data Display, Form Controls, Feedback, Overlay,
  Navigation), each expanding to link every Atomic component's catalog page
- **Layout** - submenus by category (Application, Content, Utility), each expanding to link every Layout
  component's catalog page
- **General** - Settings, Login, Register, Forgot Password, 404, Error

### Routing

All routes are defined in `src/routes/index.tsx` using `createBrowserRouter`, grouped by layout. Every page is
lazy-loaded (`React.lazy` + a shared `<Suspense>` fallback) so each route ships its own JS chunk instead of one
large upfront bundle — layouts stay eager since they render on every navigation.

- **`DashboardLayout`** (protected via `ProtectedRoute`, currently a dummy pass-through guard) - Home, Customers
  (+ detail, + `Add Customer`), Products (+ detail, + `Add Product`), Orders (+ detail, + `Add Order`), Projects
  (+ detail, + `Add Project`), Invoices (+ detail, + `Add Invoice`), Tasks (+ `Add Task`), Analytics,
  Calendar, Messages, Notifications, Profile, Settings (nested tabs: general/security/notifications/billing),
  the Components/Layout catalog index + detail pages
- **`AuthLayout`** (public) - Login, Register, Forgot Password, Reset Password, Onboarding
- **`BlankLayout`** - 404, Error

Each "Add" page (`/products/new`, `/customers/new`, `/orders/new`, `/projects/new`, `/invoices/new`,
`/tasks/new`) is a validated form that writes into the corresponding in-memory mock array in
`src/lib/mock-data.ts` and shows a success toast on submit — replace the simulated save with a real API call
once a backend exists.

Swap the dummy check in `src/routes/ProtectedRoute.tsx` for real auth state when a backend is ready.

### Known issues fixed since the first delivery

See [`CHANGELOG.md`](./CHANGELOG.md) for the full, dated history of fixes and
revisions — including the breakpoint override bug, the mobile drawer z-index
fix, the sidebar breakpoint standardization, the color system revisions, the
logo path/size bug fix, and the code-splitting pass.

## Testing

The project ships with a Vitest + React Testing Library suite (**182 tests, all passing**):

```bash
npm run test
```

- `src/components/ui/__tests__/atomic.test.tsx` - 25 tests across the Atomic layer (Button, Badge, Avatar,
  Input, Checkbox, Switch, Alert, Modal, Tabs, DropdownMenu, Accordion, Pagination, etc.)
- `src/components/layout/__tests__/layout.test.tsx` - 17 tests across the Layout layer (PageHeader,
  SectionContainer, SplitLayout, Overlay, SafeArea, Sidebar + its Section/Submenu/MobileDrawer primitives),
  including regressions for the submenu, scroll, and z-index fixes below
- `src/components/composite/__tests__/composite.test.tsx` - 6 tests across the first 5 composites (StatCard,
  DataTable, ActivityFeed, ProjectCard, ChartCard)
- `src/components/composite/__tests__/composite-extended.test.tsx` - 16 tests across the remaining 19
  composites (KpiCard, MetricCard, MetricComparison, ActivityTimeline, QuickActions, TableToolbar,
  TableFilter, TableColumnManager, TableBulkActions, ListCard, UserList, the 4 typed chart cards,
  ProgressChartCard, ProfileCard, CustomerCard, InvoiceSummary)
- `src/lib/catalog/__tests__/catalog.test.ts` - 8 data-integrity tests (exactly 48 atomic / 18 layout
  entries, unique slugs, every entry has a name/category/description/render fn)
- `src/lib/catalog/__tests__/catalog-render.test.tsx` - 66 tests that smoke-render **every single** catalog
  demo (all 48 atomic + 18 layout components) to guarantee none of them throw
- `src/styles/__tests__/styles.test.ts` - 13 tests locking in the CSS split, the Primary/Neutral color split,
  the 4-tier semantic colors, typography scale, radius/shadow, gradients, and the sidebar hover token
- `src/context/__tests__/SidebarContext.test.tsx` - 3 tests for the tablet auto-collapse `matchMedia`
  behavior (starts collapsed/expanded correctly on mount, and toggles when crossing the tablet breakpoint)
- `src/components/layout/logo-box/__tests__/LogoBox.test.tsx` - 5 tests for `LogoBox`, including the
  company-logo swap path (renders an `<img>` from `siteConfig.logo.src` once it's set, instead of the
  default Hexagon icon mark)
- `src/routes/__tests__/routes.test.tsx` - 17 end-to-end tests that render the **real** router config
  (`src/routes/index.tsx`) and assert on redirects, the 404 fallback, nested Settings tabs, the catalog index
  and detail pages, the four sidebar nav groups, and that composites actually render on their pages

`npm run build` (`tsc -b && vite build`) and `npx oxlint` both pass with zero errors as of this version.

## Tech stack

- React 19 + TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite`)
- React Router DOM v7
- `class-variance-authority` for component variants
- `clsx` + `tailwind-merge` for class composition
- `lucide-react` for icons
- `recharts` for chart composites
- `tw-animate-css` for enter/exit animation utilities (no Framer Motion or JS animation library)
- Vitest + React Testing Library + jsdom for testing
