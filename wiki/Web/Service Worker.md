---
aliases:
  - Service Workers
tags:
  - web
summary: A background script the browser runs between a page and the network, able to intercept requests even when no page is open.
---
**Service Worker** is a script the browser installs and runs separately from any page, sitting as a programmable proxy between the page and the network. It can intercept every fetch a page makes, answer from a cache instead of the network, or synthesize a response outright — and, distinctively, it keeps running (briefly) after the page that registered it closes, which is what lets it handle background sync and push notifications with no tab open at all.

The thing that makes it powerful and awkward in equal measure is its lifecycle: a service worker installs, then waits to *activate* until every open tab using the old version has closed, so a page can be running against a stale worker for a surprisingly long time unless the app explicitly calls `skipWaiting()`. Debugging "why isn't my update showing up" in a service-worker-backed app is, overwhelmingly, this lifecycle rather than a caching bug.

Its main application is offline support and precise cache control: a service worker can implement cache-first, network-first, or stale-while-revalidate strategies per request, giving an app control over caching behavior far more fine-grained than [[HTTP Caching]] headers alone provide. This is the mechanism underneath most installable web apps and PWAs — the app shell loads from the service worker's cache instantly, with the network only fetching what's actually changed.

It's a cousin of [[Web Worker]], sharing the same off-main-thread execution model and inability to touch the [[Document Object Model]] directly, but a Web Worker exists to run computation for one page and dies with it; a service worker exists to intercept network traffic and outlives the page entirely, scoped to an origin rather than a tab.

## See also
- [[Web Worker]]
- [[HTTP Caching]]
- [[ETag]]
- [[Progressive Enhancement]]

## Related
- [[Optimistic UI]]
