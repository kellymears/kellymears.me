---
aliases:
  - Deferred loading
tags:
  - web
summary: Deferring the fetch of a resource until it is needed, or until the browser is idle.
---
**Lazy loading** defers fetching a resource — a script, an image, a component, a font — until something establishes that it is needed. It is the most reliable way to reduce what a page costs on first load, because the cheapest byte is the one never requested.

Common forms include images and iframes deferred until near the viewport (now a native HTML attribute), components loaded on interaction or on visibility, and route code fetched when a route is entered. On the server side the equivalent is deferring a slow data fetch behind a streaming boundary so the shell renders immediately.

Two hazards recur. **Deferral changes timing, and timing is observable.** A script that only loads after a genuine user gesture will not load in an automated test that dispatches a synthetic event at an element rather than at the document — a real class of test that passes locally and fails in headless. **Deferral can be undone by accident**, since a single eager import elsewhere in the graph can pull the deferred module back into the initial chunk. See [[Module Graph]].

Lazy loading interacts with perceived performance rather than just measured performance: something loading late is only an improvement if the page is usable meanwhile, which is what skeleton states and streaming boundaries provide.

## See also
- [[Code Splitting]]
- [[Critical Rendering Path]]
- [[Core Web Vitals]]
- [[Islands Architecture]]
- [[React Server Components]]
- [[Streaming Response]]

## Related
- [[Server-Side Rendering]]
- [[Performance Budget]]
