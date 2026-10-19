---
aliases:
  - Sticky positioning
  - Fixed header
tags:
  - design
summary: A page header that stays pinned to the top of the screen as the content scrolls beneath it, which keeps navigation within reach but costs space and creates subtle problems with links, focus, and zoom.
---
A **sticky header** stays visible at the top of the window while the rest of the page scrolls under it. Site navigation, a search box, or a table's column headings remain within reach no matter how far down the reader has gone.

Early implementations used scripts that watched the scroll position and switched the header to fixed positioning once it reached the top, which often caused a visible jump as the content beneath it shifted upward; see [[Layout Shift]]. CSS later added sticky positioning, which lets an element scroll normally until it reaches a set offset and then stick there, within the bounds of its container. Browser support became general around 2017.

Benefits are clearest where context is easily lost:

- **Navigation.** Readers of long pages can switch sections without scrolling back to the top; see [[Wayfinding]].
- **Tables.** Column headings that stay visible keep long data tables readable; see [[Data Table]].
- **Actions.** A persistent cart or primary button remains one tap away.

The costs are space and interference. On a phone in landscape orientation, a tall header can take a third of the screen, and at high zoom levels it can cover most of it. A common compromise hides the header as the reader scrolls down and reveals it as soon as they scroll up, on the theory that scrolling up signals looking for something; see [[Responsive Breakpoint]].

Several problems recur:

- **Hidden targets.** Following a link to a section scrolls that heading to the top of the window, directly under the header. CSS provides a scroll padding setting to offset such jumps; see [[Fragment Identifier]].
- **Hidden focus.** Keyboard users tabbing upward through a page can move focus to a link concealed under the header. Accessibility guidelines added a requirement in 2023 that focused elements not be entirely hidden by content the author placed over them; see [[Focus Management]] and [[Accessibility]].
- **Layering.** The header must sit above everything that scrolls under it, which leads to escalating layer values and unexpected overlaps; see [[Stacking Context]].
- **Silent failure.** Sticky positioning stops working if an ancestor element clips its overflow, a frequent source of confusion.

Headers that shrink, change color, or blur what's beneath them as the page scrolls add polish but also motion and rendering work; see [[Scroll-Driven Animations]] and [[Glassmorphism]].

The design question is whether persistent access outweighs the space it occupies on every screen, for every reader, all the time. For short pages or reading-focused layouts, it often doesn't, and a plain header plus a way back to the top serves readers better; see [[Hamburger Menu]].

## See also
- [[Above the Fold]]
- [[Breadcrumb]]
- [[Focus Indicator]]
