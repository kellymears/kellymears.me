---
aliases:
  - HTTP Cache
tags:
  - web
summary: The set of headers that let a browser or intermediary reuse a previous response instead of re-fetching it.
---
**HTTP Caching** is the family of headers that let a browser, a [[Content Delivery Network|CDN]], or a proxy skip a request entirely, or skip its body, by reusing a response it already has. `Cache-Control` is the modern header doing most of the work: `max-age` sets how long a response is fresh without any revalidation at all, `no-cache` means always revalidate before using it (despite the name, it doesn't forbid caching), and `no-store` means never cache it at all — three genuinely different behaviors that a name like "no-cache" makes easy to mix up.

Once a cached response goes stale, the client doesn't necessarily re-download it — it can *revalidate*: ask the server "has this changed?" with a conditional request carrying an [[ETag]] or a last-modified date, and the server answers `304 Not Modified` with no body if nothing changed, saving the bandwidth of the full response while still confirming freshness. This is the mechanism that makes aggressive caching safe: a `max-age` that expired doesn't mean a wasted round trip, just a cheap one.

Static-asset caching pushes this further by making the URL itself change whenever content does — a hash embedded in the filename (`app.a3f9c1.js`) — so the response can be cached with an effectively infinite `max-age` and no revalidation ever needed; a new deploy simply produces a new URL. That trick is what makes [[Preload and Prefetch]] and long-lived CDN caching viable together: the browser never has to ask whether a hashed-filename asset is stale, because a stale one is, by construction, a different file.

This layer is orthogonal to [[Cache Invalidation]] inside an application's own data layer — HTTP caching governs whether a *response* gets reused, application caching governs whether *computed data* does, and the two commonly disagree about what's fresh at the same moment.

## See also
- [[ETag]]
- [[Cache Invalidation]]
- [[Preload and Prefetch]]
- [[Service Worker]]

## Related
- [[Core Web Vitals]]
