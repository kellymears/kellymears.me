---
aliases:
  - Windowing
  - List virtualization
tags:
  - web
summary: Rendering only the rows of a long list that are on screen and recycling them as the user scrolls, so a list of a million items costs about as much to display as a list of thirty.
---
**Virtual scrolling**, also called windowing or list virtualization, is a technique for displaying very long lists by creating only the rows currently visible, plus a small buffer, and swapping their contents as the user scrolls.

The problem it solves is that every element on a page has a cost. Each one takes memory and must be styled and laid out, and a table of 100,000 rows can take seconds to appear and makes every later change slow; see [[Document Object Model]] and [[Critical Rendering Path]]. Yet only thirty or so rows fit on screen at once.

The usual implementation has three parts:

- **A spacer.** An empty element sized to the full height of the list, as if every row existed, gives the scrollbar the right length and position.
- **A window.** On each scroll, the code works out which rows are visible. With fixed row heights that is simple division: the scroll offset divided by the row height gives the first index.
- **Recycling.** Only those rows, plus a few above and below so fast scrolling doesn't show gaps, are rendered and positioned within the spacer. Rows that scroll out of view are reused for rows coming in.

Native mobile toolkits built this in from the start; iOS table views and Android's RecyclerView reuse row views the same way. Games do the equivalent with geometry, skipping whatever the camera can't see.

Rows of varying height are the hard case. The code must estimate heights for rows it hasn't rendered, measure them when they appear, and correct the spacer, and each correction can nudge the content under the reader, a [[Layout Shift]]. Very fast scrolling can outrun rendering and show blank space, often filled with [[Skeleton Screen|placeholder rows]].

Virtualization also removes things the browser normally provides. The browser's find-in-page can't see rows that don't exist. A [[Screen Reader]] can't announce how long the list is unless the code says so with [[ARIA]] attributes like `aria-rowcount`. Selecting text across many rows and printing the page both break.

It pairs with [[Infinite scroll]]: infinite scroll loads more items as the reader nears the end, and virtualization unloads the ones they have passed, so memory stays flat. Scroll handlers should batch their work into one update per frame with [[requestAnimationFrame]]. A lighter alternative is the CSS property `content-visibility: auto`, which lets the browser skip rendering off-screen sections while keeping them in the page, so find and screen readers still work.

Spreadsheets and code editors virtualize as a matter of course. For ordinary lists of a few hundred items the plain approach is usually fast enough, so measure before adding the complexity; see [[Premature Optimization]].

## See also
- [[Data Table]]
- [[Long Task]]
