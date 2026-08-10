# Changelog

All notable changes to Terra Dashboard are documented here.

## [1.2.0] - 2026-08-10

### Added
- **"Add" pages for every core data type**: `Add Product`, `Add Customer`,
  `Add Order`, `Add Project`, `Add Invoice`, `Add Task`. Each is a real form
  (validated inputs, Select/DatePicker/Textarea where relevant, a success
  toast on submit) reachable from the matching list page's header button
  (`/products/new`, `/customers/new`, `/orders/new`, `/projects/new`,
  `/invoices/new`, `/tasks/new`). Submissions write into the project's
  in-memory mock data (`src/lib/mock-data.ts`) — swap the `setTimeout`
  simulated-save in each page for a real API call once a backend exists.
- `LICENSE.md` — commercial Regular/Extended license terms for template
  buyers, plus a summary of what's always allowed vs. never allowed, and a
  note on third-party open-source dependency licenses.
- Route-level code splitting: every page is now `React.lazy()`-loaded behind
  a shared `<Suspense>` boundary (`src/routes/PageLoader.tsx`), so each route
  ships its own small JS chunk instead of one large upfront bundle. Layouts
  (`DashboardLayout`, `AuthLayout`, etc.) stay eager since they render on
  every navigation.

### Changed
- Main JS bundle dropped from a single **861 KB** chunk to a **283 KB** main
  chunk plus per-route chunks (largest secondary chunk: 397 KB for the chart
  composites), eliminating the "chunks larger than 500 kB" build warning.

### Fixed
- **Broken logo image path.** `siteConfig.logo.src` was set to
  `"public/logo/terra-icon-dark.png"` — a relative path that 404s from any
  route other than `/`, since Vite serves the `public/` folder's contents
  from the site root (`/logo/...`), not from a literal `public/` segment.
  Changed to `"/logo/terra-icon-dark.png"`.
- **`LogoBox` defaulted to the wrong size.** The component's default `size`
  prop was `"lg"`, but `Sidebar` renders `<LogoBox />` without passing
  `size`, expecting the compact `"md"` short-name variant ("Terra") to fit
  the nav rail — it was silently rendering the full app name ("Terra
  Dashboard") instead. Default changed to `"md"`; `AuthLayout` already
  passed `size="lg"` explicitly and is unaffected.
- 2 pre-existing test failures (`LogoBox.test.tsx`, `layout.test.tsx`) caused
  by the two issues above are now passing again — full suite back to
  **182/182 passing**.

## [1.1.0] - prior to 2026-08-10

_Fixes and revisions made during initial development, consolidated from the
README's former "Known issues fixed since the first delivery" section:_

- **Breakpoint override wiped the default Tailwind scale.** `variables.css`
  used to reset `--breakpoint-*` to `initial` before defining custom names,
  which silently broke every `md:`/`lg:`/`xl:` utility in the app (the root
  cause of the sidebar never showing in its desktop/expanded form, and grids
  collapsing to a single column at any viewport width). Fixed by keeping the
  standard breakpoint names and only overriding their pixel values.
- **Mobile sidebar drawer was unclickable.** `Overlay`'s explicit `z-40` was
  painting above the drawer panel (which had no explicit `z-index`), since
  positioned siblings with `z-index: auto` stack below any sibling with a
  positive explicit `z-index` regardless of DOM order. Fixed by giving the
  panel `z-50`.
- **Sidebar's mobile/tablet/desktop breakpoint was inconsistent, then later
  revised.** Originally split across `md:`/`lg:` inconsistently, briefly
  standardized to `lg` (1024px) for all three tiers, then finally moved to
  `md` (768px) once the design doc's breakpoint usage guidance (Tablet =
  persistent collapsed sidebar, not a hidden drawer) was available.
- **Sidebar didn't scroll and could overflow past 100vh.** The nav's
  `flex-1 overflow-y-auto` needed an explicit `min-h-0` to actually scroll
  inside a flex column (the classic flexbox `min-height: auto` gotcha) —
  without it the container just grew past the viewport instead of scrolling.
- **`animate-in`/`fade-in`/`slide-in-from-*` classes did nothing.** These
  utilities come from the `tw-animate-css` package, which was referenced in
  JSX but never installed/imported. Fixed by installing it and importing it
  from `src/styles/animations.css`.
- **Color system went through two revisions before landing on the
  authoritative doc.** First a guessed hex scale, then a pixel-sampled
  approximation from a reference mockup screenshot, and finally the exact
  values transcribed from the Terra Dashboard Design System V1 document —
  including the Primary/Neutral split, the 4-tier semantic colors, and the
  corrected sidebar active/hover colors (`#1D4ED8` / `#172554`).
- **Reference-mockup alignment pass** (spacing, dividers, header search,
  scrollbar):
  - `Spacer` now uses the named scale from the mockup (`xs`=4px, `sm`=8px,
    `md`=16px, `lg`=24px, `xl`=32px, `2xl`=48px, `3xl`=64px) instead of an
    arbitrary numeric multiplier.
  - `Divider` gained the `inset` variant shown in the mockup (alongside
    solid/dashed/dotted).
  - The header search bar now shows a real `⌘K` `Kbd` badge pinned to the
    right edge, instead of it being baked into the placeholder text.
  - `ScrollArea` now has a visible, rounded, colored scrollbar thumb (via a
    `.terra-scrollbar` WebKit rule plus the Firefox `scrollbar-color`
    property).
  - `PageContainer` and `SectionContainer` padding now match the mockup's
    documented spec exactly (`px-6 py-6 lg:px-8 lg:py-8` and `px-6 py-5`
    respectively).

## [1.0.0] - initial release

- Initial release: 48 Atomic components, 18 Layout components, 24 Composite
  components, full page set (dashboard, auth, error, catalog), routing,
  design token system, dark mode, and the Vitest + React Testing Library
  suite.
