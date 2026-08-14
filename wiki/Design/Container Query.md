---
aliases:
  - Container queries
tags:
  - design
summary: Styling based on the size of an element's container rather than the viewport.
---
A **container query** applies styles based on the dimensions of a designated ancestor rather than the viewport. It is the answer to a problem that viewport-based [[Responsive Breakpoint]]s cannot solve: a component's correct layout depends on the space it has been given, not on the size of the window.

The distinction becomes urgent as soon as anything else on the page can take space away. A navigation bar sized by viewport breakpoints will crowd and overflow the moment a panel opens beside it, because the viewport did not change but the available width did. Every editing interface that pushes content aside hits this, and it is a container problem across all of that interface's content, not a bug in the one component where it was noticed.

Container queries require declaring a containment context on the ancestor, which has layout implications of its own — a size container cannot be sized by its contents in the queried dimension. That constraint is what delayed the feature for years and is why retrofitting it into an existing layout is more than a find-and-replace.

Where they are not yet practical, the honest fallback is to make components tolerant of narrowness rather than to add more viewport breakpoints, which encode an assumption about available space that is simply wrong.

## See also
- [[Responsive Breakpoint]]
- [[Design System]]
- [[UI Primitive]]

## Related
- [[Utility-First CSS]]
- [[Headless Component]]
- [[Design Token]]
- [[Typographic Scale]]
- [[Silent Failure]]
