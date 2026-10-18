---
aliases:
  - srcset
  - sizes attribute
  - Picture element
  - Art direction
tags:
  - web
summary: Offering the browser several versions of an image so it can download the smallest one that still looks sharp on this screen at this layout size.
---
**Responsive images** let a page offer several versions of one image and leave the choice to the browser, which knows things the author doesn't: the viewport width, the screen's pixel density, and sometimes the connection. A single fixed image is either too large for a phone, wasting bytes and slowing [[Core Web Vitals|Largest Contentful Paint]], or too small for a high-density desktop display, where it looks soft.

The mechanism has two halves, and most mistakes come from supplying only one:

- **`srcset`** lists the available files with their intrinsic widths: `hero-480.jpg 480w, hero-960.jpg 960w, hero-1920.jpg 1920w`.
- **`sizes`** tells the browser how wide the image will be *displayed*, as media conditions: `(min-width: 1024px) 50vw, 100vw`. The browser needs this before layout exists, because it starts image downloads from the preload scanner long before CSS is applied.

With `srcset` but no `sizes`, the browser assumes the image fills the viewport (`100vw`), so a thumbnail in a three-column grid downloads a full-width file. This is the most common responsive-image bug, and it is invisible: the page looks perfect and costs several times what it should. Lighthouse's "properly size images" warning is usually this. The duplication is real. `sizes` restates in HTML what the CSS layout already decides, and it falls out of date when the layout changes, much like a [[Responsive Breakpoint]] copied into two places. Newer browsers accept `sizes="auto"` for lazily loaded images, measuring the laid-out size instead, which closes the gap for [[Container Query|container-driven]] layouts.

**`<picture>`** handles two further jobs. *Art direction* means a different crop at different widths, not only a different resolution. *Format negotiation* means offering AVIF or WebP with a JPEG fallback, chosen by `type`, which is [[Progressive Enhancement]] for codecs.

Related hygiene: explicit `width` and `height` attributes reserve space and prevent layout shift; `loading="lazy"` belongs on images below the fold and never on the main above-the-fold image, which instead deserves `fetchpriority="high"` or a [[Preload and Prefetch|preload]] (see [[Lazy Loading]]). Generating every size by hand doesn't scale, so most sites delegate it to a build step or an image service at a [[Content Delivery Network]] edge that resizes on request and caches the result.

## See also
- [[Core Web Vitals]]
- [[Lazy Loading]]
- [[Responsive Breakpoint]]
- [[Performance Budget]]
- [[Critical Rendering Path]]
- [[Content Delivery Network]]
- [[Progressive Enhancement]]
- [[Mipmapping]]
