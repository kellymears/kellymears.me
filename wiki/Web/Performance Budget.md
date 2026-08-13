---
aliases:
  - Route budget
  - Bundle budget
tags:
  - web
summary: A committed numeric ceiling on a page's cost, enforced automatically.
---
A **performance budget** is an explicit limit on a page's cost — kilobytes of JavaScript, number of requests, a timing metric — checked in the build so that exceeding it fails rather than merely being noticed later. It converts performance from an occasional cleanup into a standing constraint.

Budgets work because performance regressions are almost never deliberate. Nobody adds three hundred kilobytes on purpose; it arrives as one import that changed the [[Module Graph]]. A gate catches it at the moment the cause is known and cheap to reverse.

Making one requires deciding what to measure, and that is harder than it sounds. Per-route JavaScript, for instance, may not be reported by the build tool at all, and has to be reconstructed from build manifests: the shared framework chunks plus the entries for the route's segment chain, *minus* legacy polyfill bundles that no modern browser fetches. Including those polyfills makes every number wrong in the same direction, which makes any improvement look bigger than it is. Validate the derived number against something independent — the actual script tags in a prerendered page — before trusting it.

Budgets should also be revisable with reasoning attached. A deliberate, understood increase is fine; the value of the gate is that raising it is a decision rather than an accident.

## See also
- [[Core Web Vitals]]
- [[Code Splitting]]
- [[Continuous Integration]]
- [[Goodhart's Law]]
- [[React Server Components]]
- [[Web Font Loading]]
- [[Islands Architecture]]

## Related
- [[Server-Side Rendering]]
- [[Lazy Loading]]
