---
aliases:
  - Forced synchronous layout
  - Forced reflow
  - Reflow
tags:
  - web
summary: Alternating DOM writes and layout reads so the browser has to recompute layout over and over within one frame.
---
**Layout thrashing** happens when script alternates between changing the page and measuring it, which forces the browser to recompute layout repeatedly inside a single frame. Normally the browser is lazy about layout. A style change marks the layout dirty and the work is deferred until the next frame's rendering pass, where all changes are handled together. But reading a geometric property (`offsetHeight`, `getBoundingClientRect()`, `scrollTop`, `getComputedStyle`) has to return a correct answer *now*. If layout is dirty, the browser must perform a **forced synchronous layout** on the spot.

One forced layout is cheap. The trouble is the loop: for each item, read its height (forcing layout), then write a new height (dirtying layout again). Every iteration pays for a full layout of the affected tree. With a hundred items and a large page, a frame that should take a few milliseconds takes hundreds, and the page visibly stutters. The performance panel shows a column of purple "Layout" blocks with a warning about forced reflow.

The fix is to **separate reads from writes**: measure everything first, then change everything. Interleaved code can usually be restructured into two passes. Where reads and writes come from different components that know nothing about each other, a scheduler can batch them per frame, all reads followed by all writes, keyed to [[requestAnimationFrame]]. Several alternatives avoid the measurement altogether. A `ResizeObserver` reports sizes after layout has happened anyway. CSS can usually express what the script was computing ([[Container Query|container queries]], grid, `aspect-ratio`). Animating `transform` and `opacity` instead of `width`, `top`, or `height` changes nothing that layout depends on.

Thrashing is hard to spot in code review because the expensive line looks harmless: a property read has no visible cost. It is the browser's version of the N+1 query problem: a cheap-looking operation inside a loop that hides a full round trip to an expensive system. [[Virtual DOM]] libraries reduce it by batching writes, but they can't see reads made in effects and event handlers, so the problem survives any framework.

## See also
- [[Box Model]]
- [[Browser DevTools]]
- [[Critical Rendering Path]]
- [[Core Web Vitals]]
- [[Long Task]]
- [[Premature Optimization]]
- [[Frame Pacing]]
- [[Compositor]]
- [[N+1 Query Problem]]
- [[Profiling]]
- [[Intersection Observer]]
- [[Scroll-Driven Animations]]
