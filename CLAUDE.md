# CLAUDE.md

## Project

Personal site for Kelly Mears — [kellymears.me](https://kellymears.me). Built with Next.js 16 (App Router, Turbopack), Tailwind CSS v4, next-mdx-remote (MDX), and deployed on Netlify.

## Commands

Package manager is **npm**.

## Data Sync

Run manually: `scripts/sync-data.sh` — runs `import:rides` + `import:github`, commits changed data files, pushes to `origin/main`. Log: `.sync-data.log` (gitignored). (Former launchd agent removed — it failed nightly.)

## Content Data Layer (`lib/content.ts`)

Replaces contentlayer2. Reads MDX files from `data/`, parses frontmatter via `gray-matter`, computes slug/path/readingTime/toc/structuredData.

## Design System

- **Color palette**: Warm coral/amber primary, warm-toned grays (OKLCH in `css/tailwind.css`)
- **Font**: Space Grotesk (weights 300–700)
- **Dark mode**: `dark:` variant via `next-themes` (system preference default)
- **Animations**: CSS-only `fade-in`, `slide-up`, `fade-slide-up`, `grow-width`, `wave-drift` keyframes; scroll-triggered via `animation-timeline: view()` (progressive enhancement)
- **Tags/pills**: `rounded-full bg-gray-100 px-3 py-0.5` pattern
- **Cards**: `rounded-xl border border-gray-200 hover:border-primary-300` with hover lift (`hover:-translate-y-0.5 hover:shadow-md`)
- **Gradient text**: `bg-gradient-to-br from-primary-500 to-primary-700 bg-clip-text text-transparent` for emphasis numbers

## Code Style

- Functional components, named exports for new components
- `'use client'` only when hooks are needed (e.g., `TimelineItem`, `MobileNav`, `ContributionGrid`)
- Content types from `@/lib/content` — `BlogPost`, `Author`, `CoreContent<T>`
- Next.js 16: route segment config must use `export const dynamic = ...` (direct export), not re-export
- Inline SVGs must have explicit `width`/`height` attributes (not just CSS classes) to prevent sizing issues in flex containers
- Dark mode detection in client components: use MutationObserver on `document.documentElement` class, not `matchMedia('prefers-color-scheme')` (next-themes uses class-based toggling)

## Content

Blog posts live in `data/blog/*.mdx`. Frontmatter fields: `title`, `date`, `tags`, `draft`, `summary`, `images`, `authors`, `layout`. Posts with `draft: true` are hidden in production.

All existing posts are currently drafted. New posts go in `data/blog/`.

## GitHub API Integration (`lib/github.ts`)

The `/open-source` page is fully API-driven from live GitHub data. Key details:

- **Auth**: `GITHUB_TOKEN` in `.env.local` (already gitignored). Regenerate via `gh auth token`.
- **Caching**: All fetches use `{ next: { revalidate: 3600 } }` for 1-hour ISR.
- **Error handling**: `safeFetch<T>(fn, fallback)` wrapper — page renders with fallbacks even if GitHub API is down.
- **Featured repos**: `roots/bud` and `roots/sage` are fetched by full name from org repos with hardcoded role/highlight metadata in `FEATURED_CONFIG`.

## Cycling Data (`lib/cycling.ts`)

The `/cycling` page reads from RunGap-imported activity files — no live third-party API.

- **Source**: RunGap iCloud Export (`~/Library/Mobile Documents/iCloud~com~rungap~RunGap/Documents/Export`). `scripts/import-rides.ts` parses FIT files into `public/static/data/activities-metrics.json`, `activities-routes.json`, and per-ride files in `public/static/data/rides/`. The daily `sync-data.sh` launchd job refreshes and commits these.
- **Orchestrator**: `getCyclingPageData()` in `lib/cycling.ts` — module-level cached. Loads activities, filters to rides via `isRide()`, computes `rideStats`, `ytdStats`, `recentStats`, `weeklyMileage`, `recentRides`, `rideCategories`, `terrainCategories`, `powerStats`, `heartRateStats`, etc. Returns `CyclingPageData`.
- **Consumers**: `app/cycling/page.tsx` (page render) and `app/api/cli/route.ts` (CLI JSON endpoint).
- **Strava references that remain are display-only**: backlinks (`https://www.strava.com/activities/{id}`) extracted from per-activity IDs in `layouts/RideLayout.tsx`, plus a profile link on `/cycling`. No API calls, no auth.

## Build Notes

- RSS feeds generated as route handlers (`app/feed.xml/route.ts`, `app/tags/[tag]/feed.xml/route.ts`)
- `rehype-preset-minify` is incompatible with Next.js 16 (EBADF error at module evaluation) — do not re-add
- Static export supported via `EXPORT=1` env var
- If build fails with stale cache: `rm -rf .next && npm run build`
