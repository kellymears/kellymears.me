---
aliases:
  - SSG
  - Static export
tags:
  - web
summary: Rendering every page to a file at build time, so serving is just handing over bytes.
---
**Static site generation** produces the complete HTML for every page ahead of time, at build. Serving becomes a file lookup: no application server, no database at request time, nothing to scale under load, and a very small attack surface.

The trade is freshness and combinatorics. Content that changes requires a rebuild, and anything genuinely per-request — personalisation, authenticated views — cannot be baked in. Sites with very large page counts pay build time proportional to that count.

Static generation pairs naturally with a build-time data layer: content in files, read and parsed during the build, with derived values (reading time, table of contents, structured metadata) computed once rather than per request. See [[Markdown]] and [[Frontmatter]].

A pure static export also disables framework features that assume a server — image optimisation on demand, request-time redirects, server-side handlers — so choosing it is a real constraint, not just a deployment flag. Where the constraint is uncomfortable, [[Incremental Static Regeneration]] is the usual middle ground.

For a page whose content is genuinely fixed, static generation dominates on every axis that matters: latency, cost, reliability, and the ability to keep working when everything else is down.

## See also
- [[Server-Side Rendering]]
- [[Incremental Static Regeneration]]
- [[Islands Architecture]]
- [[Performance Budget]]
- [[Cache Invalidation]]
- [[RSS]]

## Related
- [[React Server Components]]
- [[Search Engine Optimization]]
