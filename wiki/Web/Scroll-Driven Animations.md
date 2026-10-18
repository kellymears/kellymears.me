---
aliases:
  - Scroll-driven animation
  - animation-timeline
  - Scroll timeline
  - View timeline
tags:
  - web
summary: CSS animations whose progress follows scrolling instead of a clock, which replaces scroll-listener JavaScript for reveals, progress bars, and parallax and runs smoothly off the main thread.
---
**Scroll-driven animations** are CSS animations whose progress is tied to scrolling rather than to time. Instead of playing over two seconds, an animation advances as the user scrolls: 0 percent at one scroll position, 100 percent at another, and backward when they scroll back up. The CSS property `animation-timeline` assigns the timeline, and existing `@keyframes` animations work unchanged. Chrome shipped the feature in 2023, and Safari added it in 2025.

There are two kinds of timeline:

- **Scroll progress timelines**, set with `scroll()`, follow how far a container has scrolled from top to bottom. A reading progress bar across the top of an article is the classic use.
- **View progress timelines**, set with `view()`, follow an element's journey through the visible area, from entering at the bottom edge to leaving at the top. `animation-range` picks which part of that journey drives the animation, such as `entry`, `exit`, `contain`, or `cover`. Fading and sliding content in as it appears is the common use.

Before this, scroll effects needed JavaScript. Code listened for scroll events, read element positions, and set styles, often with a [[Debounce and Throttle]] wrapper to limit the cost. Reading layout and writing styles in the same handler caused [[Layout Thrashing]], and because scroll handlers run on the main thread, any busy script made the effect stutter or lag behind the finger. The [[Intersection Observer]] made reveal effects cheaper by reporting when elements cross into view, but only as discrete events, not as continuous progress.

Scroll-driven animations avoid all of that. The browser knows the scroll position itself, so animations of `transform` and `opacity` can run entirely on the [[Compositor]] thread, staying smooth even while JavaScript is busy.

Typical uses:

- **Reveals.** Content fading or sliding into place as it enters the viewport.
- **Progress indicators.** Bars and rings that fill as a page or carousel scrolls.
- **Parallax.** Background layers moving slower than the foreground.
- **Sticky storytelling.** Pinned scenes that change as the reader scrolls, common in data journalism.

Care is needed. Motion that is mandatory for comprehension, or that triggers on every scroll, can be disorienting or sickening for people with vestibular disorders, so effects should be disabled or softened under the `prefers-reduced-motion` media query, as described under [[Reduced Motion]]. It should never hijack the scroll itself; *scrolljacking* is widely disliked.

Because unsupported browsers simply ignore the property, the feature is naturally a [[Progressive Enhancement]]. Wrapping it in `@supports (animation-timeline: view())` lets the page show content in its final state everywhere else, rather than leaving it invisible waiting for an animation that never runs. Combined with [[View Transitions]] and good [[Easing]], it lets CSS handle most of the motion that once required animation libraries, the kind of choreography described under [[Motion Design]].

## See also
- [[Intersection Observer]]
- [[Motion Design]]
- [[requestAnimationFrame]]
- [[Reduced Motion]]
- [[Parallax Scrolling]]
