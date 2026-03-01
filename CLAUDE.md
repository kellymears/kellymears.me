# CLAUDE.md

## Project

Personal site for Kelly Mears — [kellymears.me](https://kellymears.me). Built with Next.js 15 (App Router), Tailwind CSS v4, Contentlayer2 (MDX), and deployed on Netlify.

## Commands

```bash
yarn dev          # Start dev server
yarn build        # Production build (includes contentlayer + postbuild RSS)
yarn lint         # ESLint with auto-fix
yarn format       # Prettier (write mode)
```

Package manager is **yarn 3.6.1** (Yarn PnP). Do not use npm or pnpm.

## Architecture

```
app/              Next.js App Router pages
  work/           Career timeline, stats, skills
  open-source/    OSS projects (bud.js, Roots ecosystem)
  blog/           Writing index + [slug] posts
  about/          Author bio (renders data/authors/default.mdx)
components/       React components
  home/           Hero, SelectedWork, RecentWriting
  work/           StatsRow, Timeline, TimelineItem, MissionCallout, SkillsGrid
  oss/            ProfileStats, FeaturedProjects, FeaturedProjectCard,
                  RepositoryGrid, RepositoryCard, ContributionGrid, LanguageBreakdown
layouts/          Page layout templates (PostLayout, AuthorLayout, ListLayoutWithTags)
lib/              Shared utilities and API clients
  github.ts       GitHub API client (REST + GraphQL), types, data transforms
data/             Content and structured data
  blog/           MDX blog posts
  authors/        Author MDX profiles
  experience.ts   Career history (typed Experience[])
  stats.ts        Key numbers (typed Stat[])
  siteMetadata.js Site config (title, URLs, search, social links)
  headerNavLinks.ts  Navigation items
css/tailwind.css  Theme tokens, color palette, animations, prose overrides
```

## Path Aliases

- `@/components/*` → `components/*`
- `@/data/*` → `data/*`
- `@/layouts/*` → `layouts/*`
- `@/lib/*` → `lib/*`
- `@/css/*` → `css/*`

## Design System

- **Color palette**: Warm coral/amber primary, warm-toned grays (OKLCH in `css/tailwind.css`)
- **Font**: Space Grotesk (weights 300–700)
- **Dark mode**: `dark:` variant via `next-themes` (system preference default)
- **Animations**: CSS-only `fade-in`, `slide-up`, `fade-slide-up`, `grow-width` keyframes; scroll-triggered via `animation-timeline: view()` (progressive enhancement)
- **Tags/pills**: `rounded-full bg-gray-100 px-3 py-0.5` pattern
- **Cards**: `rounded-xl border border-gray-200 hover:border-primary-300` with hover lift (`hover:-translate-y-0.5 hover:shadow-md`)
- **Gradient text**: `bg-gradient-to-br from-primary-500 to-primary-700 bg-clip-text text-transparent` for emphasis numbers

## Code Style

- Prettier: no semicolons, single quotes, 100-char width, Tailwind plugin sorts classes
- ESLint: flat config (`eslint.config.mjs`), TypeScript + jsx-a11y + prettier integration
- Functional components, named exports for new components
- `'use client'` only when hooks are needed (e.g., `TimelineItem`, `MobileNav`, `ContributionGrid`)
- Contentlayer generates types at `.contentlayer/generated` — import as `contentlayer/generated`
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

## Build Notes

- Contentlayer runs during build, generates `.contentlayer/` and `app/tags.generated.json`
- Postbuild script generates RSS feed (`scripts/postbuild.mjs`)
- Static export supported via `EXPORT=1` env var
- If build fails with stale cache: `rm -rf .next && yarn build`
