---
aliases:
  - SSR
tags:
  - web
summary: Producing a page's HTML on the server so the first response is already content.
---
**Server-side rendering** generates a page's HTML on the server and sends it complete, rather than shipping an empty shell and building the page in the browser. The visitor sees content on the first paint instead of after a script has downloaded, parsed, executed, and fetched data.

The benefits are concrete: faster perceived load, content that exists without JavaScript, and markup that crawlers and link previewers can read without executing anything. See [[Core Web Vitals]] and [[Search Engine Optimization]].

The costs are equally concrete. The server does per-request work, so caching becomes load-bearing. Code must run in an environment with no window, no document, and no browser APIs. And any interactivity must be attached to the delivered markup afterward, which is [[Hydration]] — historically the source of most of the complexity, since the client must reproduce exactly what the server produced or the reconciliation goes wrong.

SSR sits on a spectrum with [[Static Site Generation]] (render once at build time) and client rendering (render entirely in the browser). Modern frameworks mix all three within one application, choosing per route or per component, which is why the meaningful question is usually not "is this app server-rendered" but "where is the [[Client-Server Boundary]]".

## See also
- [[React Server Components]]
- [[Islands Architecture]]
- [[Incremental Static Regeneration]]
- [[Progressive Enhancement]]
