---
aliases:
  - Bento layout
  - Bento box layout
tags:
  - design
summary: A layout of rounded tiles of different sizes fitted together in a tight grid, each presenting one idea, named after the compartmentalized Japanese lunch box and popular in product pages and dashboards since the early 2020s.
---
A **bento grid** is a page layout made of rectangular tiles of varying sizes fitted together into a compact grid, each tile presenting one feature, statistic, image, or link. The name comes from the Japanese bento box, a lunch box divided into compartments of different sizes, each holding a different dish.

The pattern became fashionable in the early 2020s, especially on product pages and in keynote presentations summarizing a device's features, where a large tile might show the camera and smaller ones the battery, chip, and colors. It spread quickly to startup landing pages, portfolio sites, and personal link pages. Its ancestors include the live tiles of Windows Phone, introduced in 2010, and the long tradition of magazine layouts mixing large and small modules; see [[Flat Design]] and [[Grid System]].

Size does most of the work. A bigger tile signals greater importance, so the layout expresses a ranking without needing headings or lists; see [[Visual Hierarchy]]. Each tile is self-contained, which suits audiences who skim. Consistent gaps, rounded corners, and shared backgrounds tie the tiles into one object, using the grouping principles of proximity and common region; see [[Gestalt Principles]] and [[White Space]].

Modern CSS makes the layout straightforward. A grid with fixed tracks lets each tile span several rows or columns, so tiles of different shapes interlock without manual positioning; see [[CSS Grid]]. On narrow screens, the grid typically collapses into fewer columns or a single stack; see [[Responsive Breakpoint]]. Tiles that change their own internal layout depending on how much space they get rely on component-level rules; see [[Container Query]].

The pattern has weaknesses. When every tile is decorated and animated, nothing stands out, and visitors may not know where to start. The order in which tiles appear visually can differ from the order in the underlying markup, so people using screen readers or the keyboard may move through tiles in a confusing sequence; see [[Semantic HTML]] and [[Keyboard Navigation]]. Packing varied content into fixed shapes also tempts designers to cut text until it says little.

Bento grids resemble other ways of dividing space. Dashboards arrange widgets in similar tiles, though their tiles usually hold live data rather than marketing claims; see [[Dashboard]]. A treemap divides an area into rectangles sized by value, the data-driven version of the same idea; see [[Treemap]]. Layouts that keep column widths fixed but let heights vary produce a different, staggered look.

Like many web design fashions, the bento grid spread partly because it was easy to copy and photographed well in design showcases. Its staying power will depend on whether it continues to communicate or merely signals that a site is current; see [[Aesthetic-Usability Effect]].

## See also
- [[Small Multiples]]
- [[Masonry Layout]]
