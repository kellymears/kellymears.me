---
aliases:
  - Resource Hints
  - Preload
  - Prefetch
tags:
  - web
summary: Two resource hints with opposite priorities — preload for what this page needs now, prefetch for what the next page might need.
---
**Preload and Prefetch** are `<link>`-tag hints that tell the browser to fetch a resource before the part of the page or navigation that would normally trigger it, but they carry opposite priority and opposite time horizon. `<link rel="preload">` says: this page needs this resource, at high priority, right now — a hero image referenced only inside CSS `background-image`, a web font the browser wouldn't otherwise discover until it parsed the stylesheet that names it. It exists to close discovery gaps in the [[Critical Rendering Path]], where the resource is needed early but the browser's normal parse order would find it late.

`<link rel="prefetch">` says the opposite: this resource *might* be needed on the *next* navigation, fetch it at low, idle priority when bandwidth is free, and don't let it compete with anything the current page actually needs. A single-page app prefetching the JS chunk for a route the user is likely to click next is the canonical case — it's speculative, so it's priced accordingly.

The trap with `preload` is a mismatched `as` attribute or missing `crossorigin` on font preloads: get either wrong and the browser fetches the resource twice — once for the preload, once when the real reference is discovered — because it can't recognize the two requests as the same resource. A `preload` that isn't actually used within a few seconds also earns a browser console warning, since an unused preload wasted bandwidth and priority that something real needed.

Both hints are advisory, not commands — the browser can decline to act on either under memory or bandwidth pressure — which is part of why they're a [[Performance Budget]] lever, not a correctness guarantee.

## See also
- [[Critical Rendering Path]]
- [[Performance Budget]]
- [[HTTP Caching]]
- [[Core Web Vitals]]

## Related
- [[Lazy Loading]]
- [[Code Splitting]]
