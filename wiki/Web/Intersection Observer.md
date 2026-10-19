---
aliases:
  - IntersectionObserver
  - ResizeObserver
  - MutationObserver
  - Viewport detection
  - Infinite scroll sentinel
tags:
  - web
summary: A browser API that reports asynchronously when an element enters or leaves the viewport, replacing scroll listeners that measured element positions on every frame.
---
The **Intersection Observer** API tells a page when an element crosses into or out of view. Code creates an observer with a callback, hands it elements to watch, and the browser reports each time one of them crosses a visibility threshold relative to the viewport or a chosen scroll container. It shipped in 2016 and is universally supported.

Before it, the common approach was a `scroll` listener that called `getBoundingClientRect()` on each element of interest. That runs dozens of times per second, and every measurement can force a synchronous layout, the pattern behind [[Layout Thrashing]]. Throttling with [[Debounce and Throttle]] reduced the cost but made detection late. Intersection Observer moves the geometry calculation into the browser, which already knows where everything is after layout. It delivers results asynchronously, batched once per frame, so the main thread does no measuring.

Three options:

- **root.** The element whose box counts as "visible". By default, the viewport.
- **rootMargin.** Grows or shrinks that box, so `200px` reports elements shortly before they scroll into view.
- **threshold.** The fraction of the element that must be visible to fire, or a list of fractions for progress tracking.

Common uses:

- **[[Lazy Loading]].** Load an image, video or component just before it scrolls into view. Native `loading="lazy"` now covers simple images and [[Responsive Images]], but custom content still uses an observer.
- **Infinite scroll.** Watch an empty sentinel element at the end of a list, and fetch the next page of [[Pagination]] when it appears.
- **Impressions.** Count an ad or item as seen only once enough of it has stayed visible.
- **Reveal effects.** Add a class when a section enters view to start an entrance animation, ideally a [[Staggered Animation]] that respects [[Reduced Motion]]. CSS scroll-driven animations (`animation-timeline: view()`) now handle many of these with no JavaScript at all.
- **Pausing work.** Stop a video, canvas loop or carousel when it leaves view, similar in spirit to [[Background Tab Throttling]].

Intersection Observer has siblings built on the same callback model:

- **ResizeObserver** reports when an element's size changes. Before [[Container Query]] support arrived, it was how components adapted to their own width rather than the viewport's.
- **MutationObserver** reports changes to the [[Document Object Model]]: added or removed nodes, attribute changes and text edits.
- **PerformanceObserver** delivers timing entries such as those behind [[Core Web Vitals]].

A version 2 adds `trackVisibility`, which also reports whether the element is covered or visually altered by other content. It exists to detect clickjacking, where a page hides a real button under a decoy.

Observers are cheap, not free: thousands of targets or many thresholds still cost work each frame. One shared observer per purpose, with `unobserve()` once an element has done its job, keeps it light.

## See also
- [[Scroll-Driven Animations]]
- [[Virtual Scrolling]]
- [[requestAnimationFrame]]
- [[Sticky Header]]
