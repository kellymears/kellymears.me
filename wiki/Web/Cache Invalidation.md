---
aliases:
  - Invalidation
  - Cache busting
tags:
  - web
summary: Deciding when a cached value has stopped being correct — famously one of the hard problems.
---
**Cache invalidation** is the problem of knowing when a stored copy of a computed value is no longer valid. Phil Karlton's line — that the two hard things in computer science are cache invalidation and naming things — endures because both are about maintaining a correspondence that nothing enforces.

The available strategies are few. *Time-based* expiry is simple and always either too eager or too stale. *Event-based* invalidation is precise and requires every writer to know every cache. *Content-based* keys — a [[Fingerprint]] over the inputs — invalidate exactly when they should and require the inputs to be enumerable. Immutable, content-hashed asset filenames are the last strategy taken to its conclusion: nothing is ever invalidated because nothing is ever overwritten.

Caches also multiply invisibly. A single request may pass through a browser cache, a CDN, a framework's data cache, an application memo, and a database query cache — each with its own lifetime. A change that appears in one and not another produces the characteristic "it works on my machine, and also on yours, but not for anyone else" report.

The subtlest form is a cache whose *scope* is smaller than assumed: a value memoised per process behaves like a cache within one instance and like nothing at all across several. See [[Incremental Static Regeneration]].

## See also
- [[Fingerprint]]
- [[Determinism]]
- [[Naming]]
- [[Static Site Generation]]
- [[Hash Function]]
- [[React Server Components]]
- [[Domain Name System]]

## Related
- [[Server-Side Rendering]]
- [[Record and Replay Testing]]
