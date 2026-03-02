![kellymears.me](/public/static/images/og-waves.png)

# kellymears.me

Personal site for [Kelly Mears](https://kellymears.me) — software engineer building infrastructure for mission-driven organizations. Former primary maintainer of [bud.js](https://github.com/roots/bud) (854+ PRs), deep in the [Roots](https://roots.io) ecosystem, and comfortable across the full stack from webpack internals to WordPress mu-plugins.

Built with Next.js 16, Tailwind CSS v4, and MDX. Deployed on Netlify via GitHub Actions.

## What's here

- **Blog** — MDX posts with syntax highlighting, math typesetting, GitHub alert blocks, reading time, and table of contents generation
- **Work & Experience** — Interactive career timeline with expandable entries, color-coded by type (employment, consulting, nonprofit, open source)
- **Open Source** — Live GitHub API integration showing contribution heatmaps, featured projects, repository grids, language breakdowns, and commit activity timelines
- **About** — Author profile rendered from MDX

## Stack

| Layer | Tech |
|-------|------|
| Framework | [Next.js 16](https://nextjs.org) — App Router, Turbopack, React Server Components |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) — OKLCH color space, `@theme` tokens |
| Content | [MDX](https://mdxjs.com) via [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) (RSC) |
| Font | [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) (300–700) |
| Deploy | [Netlify](https://netlify.com) via GitHub Actions |
| Package manager | Yarn 3.6.1 (PnP) |

## Highlights

### Holographic wave background

The homepage features an animated canvas background (`components/WaveBackground.tsx`) with 8 layered wave lines driven by spring physics. Each wave responds to cursor position with gravitational pull and ripple effects, with a holographic color gradient that shifts in real time. Falls back to device orientation on mobile. Respects `prefers-reduced-motion`.

### Randomized color palette

Every page load selects one of 6 OKLCH color palettes at random (`components/PaletteScript.tsx`). The script runs before React hydration via inline injection, setting CSS custom properties on `:root` so the entire site recolors — warm coral, teal, purple, emerald, blue, or red — with zero layout shift.

### Live GitHub data

The `/open-source` page is entirely API-driven from live GitHub data (`lib/github.ts`):

- **Profile stats** fetched from REST API
- **Repositories** scored with a logarithmic formula combining stars, forks, and recency, then selected via weighted random sampling
- **Contribution heatmap** via GraphQL (`contributionsCollection`), rendered as an SVG grid with dynamic quartile thresholds and interactive tooltips
- **Commit timeline** groups recent activity by date with event-type icons and private repo masking
- **Language breakdown** with animated percentage bars and GitHub Linguist colors

All fetches cache with 1-hour ISR. A `safeFetch` wrapper ensures the page renders with fallbacks even if the GitHub API is down.

### Custom content layer

No contentlayer, no Velite — `lib/content.ts` reads MDX files from `data/`, parses frontmatter with gray-matter, and computes slug, reading time, table of contents, and JSON-LD structured data. Module-level caching keeps it fast.

### Scroll-triggered animations

CSS-only animations (`fade-in`, `slide-up`, `fade-slide-up`, `grow-width`) triggered by `animation-timeline: view()` for progressive enhancement. No JavaScript intersection observers needed — browsers that don't support it get static content.

### Design system

- **OKLCH palette** with warm coral/amber primaries and warm-undertone grays
- **Dark mode** via `next-themes` with class-based toggling
- **Card pattern**: `rounded-xl` borders with hover lift (`-translate-y-0.5`, `shadow-md`)
- **Gradient text**: `bg-gradient-to-br from-primary-500 to-primary-700 bg-clip-text text-transparent` for emphasis
- **Tag pills**: `rounded-full bg-gray-100 px-3 py-0.5`

### Blog features

- Syntax highlighting via rehype-prism-plus with line numbers and line highlighting
- Code block titles (` ```js:filename.js ` syntax) and copy button
- LaTeX math via KaTeX
- GitHub alert blocks (`[!NOTE]`, `[!WARNING]`, etc.)
- Citation and bibliography support
- Auto-linked headings with slugs
- RSS feeds — main feed and per-tag feeds via route handlers

## Development

```bash
yarn dev          # Start dev server (Turbopack)
yarn build        # Production build
yarn lint         # ESLint with auto-fix
yarn format       # Prettier (write mode)
```

## Project structure

```
app/                Next.js App Router pages
  work/             Career timeline, stats, skills
  open-source/      OSS projects (live GitHub data)
  blog/             Writing index + [slug] posts
  about/            Author bio
  feed.xml/         RSS route handler
  tags/[tag]/       Tag pages + per-tag RSS
components/
  home/             Hero, SelectedWork, RecentWriting
  work/             Timeline, StatsRow, SkillsGrid
  oss/              ContributionGrid, RepositoryGrid, CommitTimeline,
                    LanguageBreakdown, FeaturedProjectCard, ProfileStats
  WaveBackground    Animated holographic canvas (client)
  PaletteScript     Random palette injection (inline script)
  Pre               Code block with copy button (client)
  TOCInline         Table of contents from heading data
layouts/            PostLayout, AuthorLayout, ListLayoutWithTags
lib/
  content.ts        Custom content data layer (MDX, frontmatter, metadata)
  mdx.tsx           MDXContent component (remark/rehype plugin chain)
  github.ts         GitHub API client (REST + GraphQL)
  format-date.ts    Intl.DateTimeFormat wrapper
data/
  blog/             MDX blog posts
  authors/          Author MDX profiles
  experience.ts     Career history
  siteMetadata.js   Site config
css/tailwind.css    Theme tokens, palette, animations, prose overrides
```

## License

[MIT](LICENSE) — originally forked from [tailwind-nextjs-starter-blog](https://github.com/timlrx/tailwind-nextjs-starter-blog).
