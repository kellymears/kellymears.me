---
aliases:
  - Responsive design
  - Mobile-first
  - Viewport meta tag
  - Fluid layout
tags:
  - web
summary: Building one page that adapts to any screen size, named by Ethan Marcotte in 2010 as fluid grids, flexible images, and media queries, and now increasingly handled by layouts that size themselves.
---
**Responsive web design** is the practice of building a single page that rearranges itself to fit any screen, from a phone to a wide monitor, instead of building separate versions for each kind of device.

Before it, sites that cared about phones often ran a separate mobile site at an address like `m.example.com` and redirected visitors there by inspecting the browser's identification; see [[User Agent String]]. The guesses were often wrong, and the two sites drifted apart. The iPhone in 2007 took another approach: it drew ordinary desktop pages on a virtual canvas about 980 pixels wide and let people pinch to zoom. A page that was actually built for phones had to opt out with the **viewport meta tag**, `width=device-width, initial-scale=1`, which tells the browser to use the screen's real width. Nearly every page built since carries that line, usually copied without a second thought.

Ethan Marcotte named the approach in a 2010 article and gave it three ingredients:

1. **Fluid grids.** Column widths in percentages rather than fixed pixels, so the layout stretches and shrinks.
2. **Flexible images.** Images capped at the width of their container; see [[Responsive Images]].
3. **Media queries.** CSS rules that apply only above or below certain screen widths, to switch layouts where the fluid grid stops working; see [[Responsive Breakpoint]].

**Mobile-first**, argued by Luke Wroblewski around the same time, means designing for the smallest screen first and adding to it as space grows. The small screen forces decisions about what matters most; see [[Visual Hierarchy]]. In CSS it means the base styles serve phones and media queries add the wider layouts, so the simplest device gets the simplest code; see [[Progressive Enhancement]]. Google later began ranking sites by their mobile version; see [[Search Engine Optimization]].

Newer CSS has reduced the need for breakpoints. [[Flexbox]] and [[CSS Grid]] can wrap and size items to fit whatever space exists, and functions like `clamp()` scale type and spacing smoothly between limits; see [[Typographic Scale]]. Some designers call this intrinsic design. When a component's own container matters more than the screen, a [[Container Query]] responds to that instead.

Fitting the screen is not the whole job. Phones have no hover state, and fingers are much less precise than pointers, so controls need room; see [[Touch Target Size]] and [[Fitts's Law]]. Common mistakes include hiding content on small screens instead of reorganizing it, and testing only a few popular device widths. Zoom matters as well. Accessibility guidelines expect content to reflow into one column at 400% zoom without sideways scrolling, which a responsive layout handles for free; see [[Accessibility]].

## See also
- [[Cascading Style Sheets]]
- [[Hamburger Menu]]
