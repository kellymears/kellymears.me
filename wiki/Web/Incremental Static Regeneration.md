---
aliases:
  - ISR
  - Revalidation
tags:
  - web
summary: Serving a cached static page while regenerating it in the background after a chosen interval.
---
**Incremental static regeneration** is a hybrid of static and dynamic rendering: a page is generated once and served from cache, and after a configured interval the next request triggers a background regeneration while still being served the stale copy. Visitors always get a fast response; the content converges on fresh.

It is the standard answer for pages built from data that changes on a scale of minutes to hours — a feed of repository activity, a list of recent posts, anything drawn from a third-party API. It removes per-request latency and, just as importantly, removes the API from the critical path: if the upstream is down, the cached page still serves.

Two things are worth designing deliberately. **The interval** encodes how stale you are willing to be, and different data on one page may deserve different intervals. **Invalidation** is the escape hatch for content that must update immediately — tagging cached entries and purging by tag beats waiting for a timer. See [[Cache Invalidation]].

The failure mode to watch for is caching that is not request-aware. A value memoised in module scope looks like a cache and behaves like one within a single process, but it does not participate in the platform's revalidation and does not invalidate across instances — which is a correctness problem, not a performance one.

## See also
- [[Static Site Generation]]
- [[Cache Invalidation]]
- [[Server-Side Rendering]]
- [[React Server Components]]

## Related
- [[Islands Architecture]]
- [[Search Engine Optimization]]
- [[Performance Budget]]
- [[Hydration]]
- [[Client-Server Boundary]]
