---
aliases:
  - Flexible box layout
  - Flex layout
tags:
  - design
summary: The CSS layout mode for arranging items along one axis, distributing space and aligning them without floats or hacks, which finally made vertical centering trivial and powers most component layouts.
---
**Flexbox**, the CSS Flexible Box Layout, arranges a set of items along a single line, horizontal or vertical, and controls how they share space and align. It's the default tool for laying out the parts *inside* a component: the icon and label in a button, the links in a navigation bar, a card's header, body, and footer.

Before flexbox, CSS had no real layout system. Developers built columns with floats, which were meant for wrapping text around images, or with tables and inline-block tricks. Vertically centering something was a running joke. Flexbox was drafted from 2009, stabilized around 2012, and was usable across browsers by the mid-2010s.

The model has two axes:

- **Main axis.** The direction items flow, set by `flex-direction`: row or column.
- **Cross axis.** Perpendicular to it.

`justify-content` distributes items along the main axis, packing them at the start, center, or end, or spreading space between them. `align-items` aligns them on the cross axis. Centering anything in both directions takes two lines. The `gap` property sets fixed spacing between items without margin tricks; see [[Box Model]].

Each item flexes through three values:

- **`flex-basis`.** Its starting size before free space is shared out.
- **`flex-grow`.** Its share of leftover space.
- **`flex-shrink`.** How much it gives up when space runs short.

So a search field can grow to fill a toolbar while its buttons stay fixed, with no widths calculated by hand. `flex-wrap` lets items flow onto new lines when they don't fit, giving simple responsive behavior without a [[Responsive Breakpoint]].

Common traps:

- **Minimum size.** Flex items won't shrink below their content's width by default, so a long word or a wide child overflows its container. Setting `min-width: 0` on the item fixes it.
- **Visual order vs. source order.** The `order` property and reversed directions change what's displayed but not the order in the document. Keyboard focus and screen readers follow the source, so users can find focus jumping around unpredictably; see [[Keyboard Navigation]] and [[Screen Reader]].
- **Two dimensions.** Wrapped flex rows are independent, so items in different rows don't line up in columns. That's a job for [[CSS Grid]].

The usual division of labor: flexbox for one-dimensional, content-sized arrangements, where items determine the layout; grid for two-dimensional page structure, where the layout determines where items go. Most interfaces nest both.

Flexbox reflects a broader shift from fixed pixel layouts to declaring relationships and letting the browser solve for sizes, the same idea as [[Container Query]] and intrinsic sizing. Native app frameworks adopted the flex model too, so the same mental model now describes layout on phones and desktops. A [[Tiling Window Manager]] applies similar rules to whole windows: split the available space among items by rule rather than placing each by hand.

## See also
- [[Masonry Layout]]
- [[Optical Alignment]]
- [[Bento Grid]]
