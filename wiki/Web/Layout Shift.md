---
aliases:
  - Cumulative Layout Shift
  - Scroll anchoring
tags:
  - web
summary: Visible content jumping position after it first appears, usually because something loaded late without reserved space, measured by browsers as Cumulative Layout Shift.
---
A **layout shift** is visible content moving after it has already appeared. The familiar case: you reach for a link or button, an ad or image loads above it, and the page jumps so that your tap lands on something else. Readers lose their place in text, and people sometimes buy or delete the wrong thing.

Browsers measure it. The Layout Instability API reports each unexpected shift, scored by how much of the screen moved multiplied by how far it moved. Shifts within half a second of a click, tap, or key press are excluded, since content moving in response to input is expected. **Cumulative Layout Shift**, one of the [[Core Web Vitals]], originally added up every shift over the life of the page, which unfairly punished long-lived apps; see [[Single-Page Application]]. Since 2021 it takes the worst burst of shifts within a five-second window instead. A score of 0.1 or less counts as good.

Most shifts come from content arriving without space reserved for it:

- **Images and video without dimensions.** If the HTML gives `width` and `height`, the browser computes the aspect ratio and reserves the right box before the file arrives; see [[Responsive Images]]. This matters most for images that load late on purpose; see [[Lazy Loading]].
- **Web fonts.** When the real font replaces the fallback, differences in letter width and line height reflow the text. Descriptors like `size-adjust` tune the fallback to match the real font's metrics; see [[Web Font Loading]].
- **Injected content.** Ads, embeds, cookie notices, and banners inserted above existing content push it down. Reserving a fixed slot, or overlaying instead of inserting, avoids it; see [[Third-Party Script]].
- **Client-side rendering.** Content that renders differently once JavaScript runs moves; see [[Hydration]]. Placeholders help only if they match the size of what replaces them; see [[Skeleton Screen]].
- **Animating layout properties.** Moving elements by changing `top` or `height` shifts their neighbors and forces layout each frame, where `transform` moves only the element itself; see [[Layout Thrashing]].

**Scroll anchoring**, added to Chrome in 2017 and later to Firefox, softens shifts that happen above the visible area. The browser picks an element on screen as an anchor and adjusts the scroll position so that it stays put when content above it grows. The CSS property `overflow-anchor: none` turns it off.

Shifts also hurt aiming. Pointing at a target takes a predictable amount of time and care, and a target that moves after the aim has begun defeats it; see [[Fitts's Law]]. Some ad placements earn money from the accidental clicks that late-loading layouts produce, which edges into [[Dark Pattern]] territory. Most shifts, though, are just the result of nobody checking how the page looks on a slow connection.

## See also
- [[Critical Rendering Path]]
- [[Virtual Scrolling]]
