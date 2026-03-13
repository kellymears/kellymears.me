# CLAUDE.md

## Project

Personal site for Kelly Mears — [kellymears.me](https://kellymears.me). Built with Next.js 16 (App Router, Turbopack), Tailwind CSS v4, next-mdx-remote (MDX), and deployed on Netlify.

## Commands

```bash
npm run dev            # Start dev server (Turbopack)
npm run build          # Production build
npm run lint           # ESLint with auto-fix
npm run format         # Prettier (write mode)
npm run import:rides   # Import cycling activities from RunGap FIT files
npm run import:github  # Fetch and cache GitHub profile/repo data
npm run import:all     # Run all import scripts sequentially
```

Package manager is **npm**.

## Data Sync (launchd)

A launchd agent runs `scripts/sync-data.sh` daily at 6 AM to import fresh data and auto-commit changes.

- **Plist**: `~/Library/LaunchAgents/me.kellymears.sync-data.plist`
- **Script**: `scripts/sync-data.sh` — runs `import:rides` + `import:github`, commits changed data files, pushes to `origin/main`
- **Log**: `.sync-data.log` (gitignored)
- **Manage**: `launchctl bootout gui/$(id -u) ~/Library/LaunchAgents/me.kellymears.sync-data.plist` to unload, `launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/me.kellymears.sync-data.plist` to reload

## Path Aliases

- `@/components/*` → `components/*`
- `@/data/*` → `data/*`
- `@/layouts/*` → `layouts/*`
- `@/lib/*` → `lib/*`
- `@/css/*` → `css/*`

## Content Data Layer (`lib/content.ts`)

Replaces contentlayer2. Reads MDX files from `data/`, parses frontmatter via `gray-matter`, computes slug/path/readingTime/toc/structuredData.

Key exports:

- `getAllPosts()` / `getPostBySlug(slug)` — blog posts (async, module-level cached)
- `getAllAuthors()` / `getAuthorBySlug(slug)` — author profiles
- `sortPosts(posts)` — sort by date descending
- `allCoreContent(posts)` — strip `body`, filter drafts in production
- `coreContent(item)` — strip `body` from single item
- `getTagCounts(posts)` — compute tag frequency map

Types: `BlogPost`, `Author`, `CoreContent<T>`

## Design System

- **Color palette**: Warm coral/amber primary, warm-toned grays (OKLCH in `css/tailwind.css`)
- **Font**: Space Grotesk (weights 300–700)
- **Dark mode**: `dark:` variant via `next-themes` (system preference default)
- **Animations**: CSS-only `fade-in`, `slide-up`, `fade-slide-up`, `grow-width`, `wave-drift` keyframes; scroll-triggered via `animation-timeline: view()` (progressive enhancement)
- **Tags/pills**: `rounded-full bg-gray-100 px-3 py-0.5` pattern
- **Cards**: `rounded-xl border border-gray-200 hover:border-primary-300` with hover lift (`hover:-translate-y-0.5 hover:shadow-md`)
- **Gradient text**: `bg-gradient-to-br from-primary-500 to-primary-700 bg-clip-text text-transparent` for emphasis numbers

## Code Style

- Prettier: no semicolons, single quotes, 100-char width, Tailwind plugin sorts classes
- ESLint: flat config (`eslint.config.mjs`), TypeScript + jsx-a11y + prettier integration
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
- **Contributions**: Fetched via GitHub GraphQL API (`contributionsCollection.contributionCalendar`), provides 53 weeks of daily data.
- **ContributionGrid**: Client component with random color palette (6 options), SVG heatmap, dynamic quartile thresholds, tooltip on hover/focus. Responsive (26 weeks on mobile, full 53 on desktop).
- **Language colors**: Static `LANGUAGE_COLORS` map in `lib/github.ts` matching GitHub Linguist.

## Strava API Integration (`lib/strava.ts`)

The `/cycling` page is fully API-driven from live Strava data. Mirrors `lib/github.ts` architecture.

- **Auth**: OAuth2 refresh token flow. `STRAVA_CLIENT_ID`, `STRAVA_CLIENT_SECRET`, `STRAVA_REFRESH_TOKEN` in `.env.local`. Module-level token cache avoids redundant refreshes within a request.
- **Token refresh**: POST `https://www.strava.com/oauth/token` with `grant_type=refresh_token`. Access tokens are short-lived; the refresh token is long-lived.
- **Caching**: All fetches use `{ next: { revalidate: 3600 } }` for 1-hour ISR (same as GitHub).
- **Error handling**: `safeFetch<T>(fn, fallback)` wrapper — page renders with zero-value fallbacks if Strava API is down.
- **Endpoints used**:
  - `GET /api/v3/athlete` — profile (name, city, avatar)
  - `GET /api/v3/athletes/{id}/stats` — all-time/YTD/recent ride totals, biggest ride/climb
  - `GET /api/v3/athlete/activities` — paginated activity list (200 per page)
- **Ride types**: `Ride`, `GravelRide`, `MountainBikeRide`, `VirtualRide`, `EBikeRide` — filtered via `isRide()` helper.
- **Units**: All Strava data is metric (meters, m/s). Converted to imperial (miles, feet, mph) in computation functions.
- **Orchestrator**: `fetchAllStravaData()` — Phase 1: token + parallel fetch (athlete, activities), Phase 2: stats (needs athlete.id), Phase 3: pure computation. Returns `StravaPageData`.
- **Components**: `CyclingStats` (all-time grid), `YearInReview` (YTD card), `WeeklyMileageChart` (SVG bar chart, client component), `RecentRides` (ride list), `RideTypeBreakdown` (stacked bar), `PerformanceMetrics` (power + HR, conditional).
- **Regenerating tokens**: If the refresh token expires, re-authorize via `https://www.strava.com/oauth/authorize?client_id={ID}&response_type=code&redirect_uri=http://localhost&scope=read,activity:read_all&approval_prompt=force`, then exchange the code for new tokens.

## Build Notes

- RSS feeds generated as route handlers (`app/feed.xml/route.ts`, `app/tags/[tag]/feed.xml/route.ts`)
- `rehype-preset-minify` is incompatible with Next.js 16 (EBADF error at module evaluation) — do not re-add
- Static export supported via `EXPORT=1` env var
- If build fails with stale cache: `rm -rf .next && npm run build`
