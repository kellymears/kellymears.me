---
aliases:
  - Web Vitals
  - LCP
  - CLS
tags:
  - web
summary: Google's small set of user-centred performance metrics: loading, interactivity, and visual stability.
---
**Core Web Vitals** are a standardised set of metrics intended to capture user experience rather than machine timings. The current three are *Largest Contentful Paint* (when the main content appears), *Interaction to Next Paint* (how quickly the page responds to input), and *Cumulative Layout Shift* (how much content moves around unexpectedly while loading).

Their value is that each maps to a felt experience, which makes them arguable with non-engineers. Their limitation is the usual one: they are proxies, and optimising a proxy directly diverges from optimising the experience — see [[Goodhart's Law]]. A page can score well and still feel bad.

Each has a characteristic cause. Largest Contentful Paint is usually dominated by the [[Critical Rendering Path]] and by images. Interaction to Next Paint is usually dominated by main-thread JavaScript, which makes it a [[Code Splitting]] and [[Hydration]] problem. Layout shift is usually caused by content arriving without reserved space — images without dimensions, fonts swapping, banners injected above existing content.

Field data (real visitors) and lab data (a synthetic run) frequently disagree, and the disagreement is informative rather than a measurement error: lab runs use a fixed device and network, and real users do not.

## See also
- [[Performance Budget]]
- [[Critical Rendering Path]]
- [[Web Font Loading]]
- [[Search Engine Optimization]]
- [[Lazy Loading]]

## Related
- [[React Server Components]]
- [[Server-Side Rendering]]
