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

## Knowledge Wiki (`lib/knowledge.ts`)

`/knowledge/*` renders the Obsidian vault in `wiki/` as interlinked pages. 201 concept notes across 11 topic folders. Fully static — every route is prerendered at build time from the filesystem.

- **Routes**: `/knowledge` (index), `/knowledge/[topic]` (domain), `/knowledge/[topic]/[subject]` (note). `wiki/Home.md` and `wiki/README.md` are data sources, not notes — `Home.md` supplies the per-topic blurbs.
- **Data layer**: `lib/knowledge.ts`, module-cached. Parses frontmatter (`aliases`, `tags`, `summary`), resolves `[[wikilinks]]` by title *or* alias case-insensitively, derives backlinks, and strips `## See also` / `## Related` out of `body` into separate fields. Exports `getTopics`, `getAllNotes`, `getNote`, `getNoteBySlug`, `resolveWikilink`, `getGraph`, `getLocalGraph`, `getHubs`, `getSearchIndex`, `getKnowledgeStats`, `slugifyNote`.
- **Graph layout is precomputed server-side.** A seeded (mulberry32) Fruchterman-Reingold solver runs at module load in ~50ms and emits fixed `x`/`y`. Positions are byte-identical across processes — never introduce `Math.random()` or `Date.now()` there. `getGraph(aspect = 1.9)` bakes the aspect into the *simulation* so wide cards fill without distortion; `getLocalGraph(slug, depth = 2, aspect = 1)` stays square for the note-page rail. The client renders positions and runs no physics.
- **Wikilinks in prose**: `lib/remark-wikilink.ts` takes a resolver via plugin options (avoids an import cycle) and emits `data-wikilink="<slug>"`. That attribute is load-bearing — `HoverPreview` delegates on it. Unresolvable links degrade to plain text.
- **Client islands**: `KnowledgeChrome` (mounted once in `app/knowledge/layout.tsx`) owns the ⌘K palette and hover previews; `KnowledgeGraph` owns the SVG. Topic colors live in `components/knowledge/graph-colors.ts` as a fixed 11-hue palette — it must stay independent of `--color-primary-*`, since `components/PaletteScript.tsx` randomizes the site's primary hue per page load.
- **Graph a11y**: roving tabindex — the graph is one tab stop, arrows move between nodes, Home/End jump to most/least linked. Escape suspends the roving stop so the next Tab leaves the graph instead of re-entering it.
- **Frontmatter hazard**: an unquoted colon in a `summary:` breaks YAML. `parseNote()` falls back to a lenient reader and `console.warn`s the filename at build time.
- **Sitemap**: `lib/source-dates.ts` derives `lastModified` from one batched `git log` pass, falling back to file mtime when git is absent or the checkout is shallow.

## Build Notes

- RSS feeds generated as route handlers (`app/feed.xml/route.ts`, `app/tags/[tag]/feed.xml/route.ts`)
- `rehype-preset-minify` is incompatible with Next.js 16 (EBADF error at module evaluation) — do not re-add
- Static export supported via `EXPORT=1` env var
- If build fails with stale cache: `rm -rf .next && npm run build`
