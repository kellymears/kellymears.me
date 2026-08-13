---
aliases:
  - Partial hydration
  - Islands
tags:
  - web
summary: Rendering a page as static HTML with small independently interactive regions.
---
**Islands architecture** renders a page as static HTML and hydrates only the specific regions that need interactivity — each an independent "island" with its own script, its own state, and its own loading strategy. The rest of the page never becomes a JavaScript concern at all.

The gain is that the cost of interactivity is paid per island rather than per page. A marketing page with one interactive chart ships the chart's code, not a framework instance for the whole document. Islands can also be scheduled: load immediately for something above the fold and required for first interaction, defer until visible for something further down, skip server rendering entirely for something that cannot run on the server.

The trade is coordination. Islands are isolated by design, so sharing state between two of them requires an explicit channel — a store, a custom event on the window, a URL parameter — rather than the ordinary prop passing available inside a single tree. Designing so that islands rarely need to talk is usually better than building the channel.

The pattern is most associated with content-first site frameworks, but the underlying idea — pay for interactivity where it is used — is the same one behind [[React Server Components]] and every serious [[Performance Budget]].

## See also
- [[Hydration]]
- [[Static Site Generation]]
- [[Progressive Enhancement]]
- [[Lazy Loading]]
- [[Server-Side Rendering]]

## Related
- [[Core Web Vitals]]
- [[Module Graph]]
