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

- **Color palette**: Primary hue randomized per page load (`PaletteScript`); cool blue-slate grays (hue ~250–265, OKLCH in `css/tailwind.css`). Light-mode page background is the `paper` token (`bg-paper`, `from-paper`, `var(--color-paper)`) — never hardcode it
- **Font**: Space Grotesk (weights 300–700); Instrument Serif italic as a one-word display accent (`<Accent>` in `components/home/SectionHeading.tsx`); JetBrains Mono for folios, labels, and figures
- **Dark mode**: `dark:` variant via `next-themes` (system preference default)
- **Animations**: CSS-only `fade-in`, `slide-up`, `fade-slide-up`, `grow-width`, `wave-drift` keyframes; scroll-triggered via `animation-timeline: view()` (progressive enhancement)
- **Tags/pills**: `rounded-full bg-gray-100 px-3 py-0.5` pattern
- **Cards**: `rounded-xl border border-gray-200 hover:border-primary-300` with hover lift (`hover:-translate-y-0.5 hover:shadow-md`)
- **Gradient text**: `bg-gradient-to-br from-primary-500 to-primary-700 bg-clip-text text-transparent` for emphasis numbers

## Home Page

Sections are driven by real repo data, read in `app/page.tsx`: hero vitals (wiki counts, YTD miles, latest post), a work ledger on a shared year axis, the knowledge **constellation**, recent routes (`recentRides` deduped by name), and a writing index.

- **The constellation's static field is an image, not inline SVG.** `/constellation/{light,dark}.svg` (`app/constellation/[file]/route.ts`, force-static) renders every edge and node via `renderConstellationField()`. Inline, the graph landed twice (HTML + RSC payload) and took the page from 15KB to 73KB gzipped. Only hub rings, labels, and signal pulses stay inline — they need the randomized `--color-primary-*`. Both layers share the 1900×1000 viewBox with slice/cover fitting, so they stay registered.
- Hub labels go through `placeLabels()` collision avoidance; the top hubs sit in the dense center.
- **Route heat field** (`lib/route-field.ts`, `components/movement/RouteField.tsx`) — every GPS route for an activity group projected onto one frame centred on the median start point. Used on the `/movement` hero and the home movement section. `/constellation/rides-{cycling,foot}.svg` is applied as a CSS **mask** over a primary gradient, so it follows the random palette and theme with one file. Each route must be its own `<path>`: overlapping strokes inside one path don't compound alpha, and the heat comes from that compounding.

## Navigation

`data/headerNavLinks.ts` feeds the header, mobile menu, and footer. `footerOnly: true` keeps a link in the footer only (Writing, currently). The header's background is a full-bleed frosted backdrop, because full-bleed sections scroll under a column-width header.

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
- **Contribution skyline** (`components/oss/ContributionSkyline.tsx`) — the `/open-source` hero: one isometric building per day, height `8 + sqrt(count) * 18`. Drawn on **canvas**, not SVG. Correct occlusion needs per-building paint order (sorted by base screen-y), so faces can't be batched into a few paths, and per-building SVG would ship ~100KB twice (HTML + RSC). Colors come from the live `--color-*` tokens and are re-read on theme change. Narrow screens show fewer, most recent, weeks rather than shrinking past `MIN_SCALE`. Callouts measure the roofline under the label's full width before placing it.

## Cycling Data (`lib/cycling.ts`)

The `/cycling` page reads from RunGap-imported activity files — no live third-party API.

- **Source**: RunGap iCloud Export (`~/Library/Mobile Documents/iCloud~com~rungap~RunGap/Documents/Export`). `scripts/import-rides.ts` parses FIT files into `public/static/data/activities-metrics.json`, `activities-routes.json`, and per-ride files in `public/static/data/rides/`. The daily `sync-data.sh` launchd job refreshes and commits these.
- **Orchestrator**: `getCyclingPageData()` in `lib/cycling.ts` — module-level cached. Loads activities, filters to rides via `isRide()`, computes `rideStats`, `ytdStats`, `recentStats`, `weeklyMileage`, `recentRides`, `rideCategories`, `terrainCategories`, `powerStats`, `heartRateStats`, etc. Returns `CyclingPageData`.
- **Consumers**: `app/cycling/page.tsx` (page render) and `app/api/cli/route.ts` (CLI JSON endpoint).
- **Strava references that remain are display-only**: backlinks (`https://www.strava.com/activities/{id}`) extracted from per-activity IDs in `layouts/RideLayout.tsx`, plus a profile link on `/cycling`. No API calls, no auth.

## Games (`lib/steam.ts`, `lib/games.ts`, `data/games.ts`)

The `/games` route has been removed from the public site. The Steam import, `lib/games.ts`, and `data/games.ts` remain — they back the `/games` skill. No live API call at request time.

- **Auth**: `STEAM_API_KEY` in `.env.local`. Create at https://steamcommunity.com/dev/apikey. `STEAM_ID` overrides the default SteamID64.
- **Two upstreams**: the keyed Web API returns the whole library and its playtime in one request. The unkeyed store `appdetails` endpoint holds genre/developer/release/description and rate limits to ~200 requests per 5 minutes — `lib/steam.ts` throttles at 1.6s, backs off on 429, and caches each app to `public/static/data/steam/apps/<appid>.json`. **Cached apps are never re-fetched**; shipped-game metadata does not change, so only a first run is slow. Only played games get enriched.
- **`isCountedGame()` in `lib/games.ts` is the single source of truth** for what counts, and `.claude/skills/games/scripts/report.ts` imports it so the skill and the site cannot disagree. Steam sells creative tools through the games storefront and types them `game`, so type alone does not separate playing from making — a `TOOL_GENRES` rule handles those. Delisted apps carry neither type nor genres and default to game, so `NOT_A_GAME` in `data/games.ts` catches delisted tools by hand (GameMaker: Studio, 709h, is the reason this exists).
- **`data/games.ts` is the editorial layer.** `LOVED` is an ordered appid list driving the featured section; playtime is a weak proxy for affection, so until it is populated the page ranks by hours and says so via `featuredIsCurated`. Do not populate it without being asked.
- **Skill**: `/games` (`.claude/skills/games/`) refreshes the import, reports what moved since a watermark in `.claude/skills/games/.sync-state.json`, and folds it into `wiki/Graphics/`. Stamping is the last step — stamping early means that play is never surfaced again.
- Game-design notes live in the existing **Graphics & Games** domain (`wiki/Graphics/`, tag `graphics`). There is no separate games domain; adding one would fragment the graph and force a re-space of the 14-hue topic palette.

## Knowledge Wiki (`lib/knowledge.ts`)

`/knowledge/*` renders the Obsidian vault in `wiki/` as interlinked pages. 559 concept notes across 15 topic folders, ~5k links. Every route is prerendered at build time from the filesystem; the index alone uses ISR (`revalidate = 900`) so its Topic of the Day rotates at Eastern midnight — `getDailyNote(dayKey)` hashes a caller-supplied `America/New_York` date key (FNV-1a over the slug-sorted note list), keeping `lib/knowledge.ts` itself clock-free.

- **Routes**: `/knowledge` (index), `/knowledge/[topic]` (domain), `/knowledge/[topic]/[subject]` (note). `wiki/Home.md` and `wiki/README.md` are data sources, not notes — `Home.md` supplies the per-topic blurbs.
- **Data layer**: `lib/knowledge.ts`, module-cached. Parses frontmatter (`aliases`, `tags`, `summary`), resolves `[[wikilinks]]` by title _or_ alias case-insensitively, derives backlinks, and strips `## See also` / `## Related` out of `body` into separate fields. Exports `getTopics`, `getAllNotes`, `getNote`, `getNoteBySlug`, `resolveWikilink`, `getGraph`, `getLocalGraph`, `getHubs`, `getSearchIndex`, `getKnowledgeStats`, `slugifyNote`.
- **Graph layout is precomputed server-side.** A seeded (mulberry32) Fruchterman-Reingold solver runs at module load in ~180ms and emits fixed `x`/`y`. Positions are byte-identical across processes — never introduce `Math.random()` or `Date.now()` there. `getGraph(aspect = 1.9)` bakes the aspect into the _simulation_ so wide cards fill without distortion; `getLocalGraph(slug, depth = 2, aspect = 1)` stays square for the note-page rail. The client renders positions and runs no physics.
- **`separate()` runs after the FR solve** and enforces a floor on pairwise distance (min nearest-neighbor 16 → 37 units; topic cohesion unchanged). Raising the repulsion constant instead does nothing: `normalize()` rescales the cloud to fill the box, so a denser knot just comes back smaller. Past ~0.7 of `k` the pass jams into an even lattice and further increases are a no-op — real spread comes from the _resting zoom_, not from this.
- **The constellation opens on a region, not on the whole map.** `homeZoomFor()` scales the resting zoom by `sqrt(count / 55)`, capped at 3.2, bottoming out at 1 so a topic map still opens whole. The origin is a random well-connected node, picked **client-side in the camera** (`pickOrigin`) — never in `lib/knowledge.ts`, whose output must stay deterministic. Zooming out to the full vault is still possible; past `LABEL_FADE_RATIO` the root gets `data-far` and resting labels hide, since they were placed for the home region.
- **Never put `vector-effect="non-scaling-stroke"` on the edges.** It made the engine re-derive stroke geometry per element per frame: 35ms/frame unthrottled, 122ms at 4x CPU throttle, with pathological 150ms outliers. `stroke-width: calc(var(--kg-zoom) * 1px)` is visually identical and ~5x cheaper with flat variance. Any edge stroke-width must be expressed in `--kg-zoom` units. `applyView` clamps synchronously but commits on rAF, and skips rewriting `--kg-zoom` when it has not changed (a pan does not change it).
- **Filtering is per element, not an attribute selector on the root** — edges must be judged by _both_ endpoints (`kg-out` / `kg-reach`), which a root selector cannot express. Two modes on `data-mode`: `hard` (legend selection — near-invisible and `pointer-events: none`, also skipped by the keyboard nav) and `soft` (a topic page's `focusTopic` — dimmed but still legible and clickable). Applied imperatively in a layout effect so a chip toggle never reconciles the ~2.7k node and edge elements; the layers are memoized separately for the same reason, and only labels re-render (they must re-place against the selection).
- **Wikilinks in prose**: `lib/remark-wikilink.ts` takes a resolver via plugin options (avoids an import cycle) and emits `data-wikilink="<slug>"`. That attribute is load-bearing — `HoverPreview` delegates on it. Unresolvable links degrade to plain text.
- **Client islands**: `KnowledgeChrome` (mounted once in `app/knowledge/layout.tsx`) owns the ⌘K palette and hover previews; `KnowledgeGraph` owns the SVG. Topic colors live in `components/knowledge/graph-colors.ts` as a fixed per-topic palette — it must stay independent of `--color-primary-*`, since `components/PaletteScript.tsx` randomizes the site's primary hue per page load.
- **Graph a11y**: roving tabindex — the graph is one tab stop, arrows move between nodes, Home/End jump to most/least linked. Escape suspends the roving stop so the next Tab leaves the graph instead of re-entering it.
- **`frame="bleed"`** on `KnowledgeGraph` runs the canvas edge to edge (feathered mask, fluid `clamp()` height) and accepts an `overlay` laid out in the page column. The index and topic pages use it; note-page rails stay `card`.
- **Reveal gate.** The root carries `data-ready` once `measured` is true (camera placed and webfont labels measured). Until then the SVG is `opacity: 0`, inside `@media (scripting: enabled)` so no-JS keeps the server framing. Without the gate the SSR whole-vault fit visibly jumps to the client-picked home region, and the labels pop in when the font lands.
- **Domain cards** draw each topic's silhouette (`components/knowledge/topic-silhouette.ts`): its notes cropped from `getGraph()` positions, aspect preserved, plus the 48 strongest intra-topic edges. **Note pages** get `VaultLocator`, which reuses the prerendered `/constellation/*.svg` with an inline marker, so the 559 pages share one cached image.
- Topic-page rows carry `data-wikilink`, which is all `HoverPreview` needs, so the A–Z index gets previews for free.
- **Frontmatter hazard**: an unquoted colon in a `summary:` breaks YAML. `parseNote()` falls back to a lenient reader and `console.warn`s the filename at build time.
- **Sitemap**: `lib/source-dates.ts` derives `lastModified` from one batched `git log` pass, falling back to file mtime when git is absent or the checkout is shallow.

## Build Notes

- RSS feeds generated as route handlers (`app/feed.xml/route.ts`, `app/tags/[tag]/feed.xml/route.ts`)
- `rehype-preset-minify` is incompatible with Next.js 16 (EBADF error at module evaluation) — do not re-add
- Static export supported via `EXPORT=1` env var
- If build fails with stale cache: `rm -rf .next && npm run build`
