---
aliases:
  - Squarified treemap
  - Tree map
tags:
  - design
summary: A chart that shows a hierarchy as nested rectangles sized by value, invented in 1990 to find what was filling a hard disk and now used for budgets, markets, and code size.
---
A **treemap** shows hierarchical data as nested rectangles. Each item is a rectangle whose area is proportional to a value, and each group's rectangle is divided among its children. A whole hard disk becomes one rectangle, split into folders, split into files, so the largest files show up at a glance as the biggest blocks.

Ben Shneiderman invented the treemap around 1990 for exactly that problem. His lab's shared disk kept filling up, and the usual tree views, with indented folder lists, showed structure but made it hard to see where the space had gone. A treemap uses every pixel to show size; see [[Filesystem]]. Disk-usage tools still use the form.

The construction is recursive: lay out the top-level groups, then lay out each group's children inside its rectangle; see [[Recursion]]. The original **slice-and-dice** algorithm divided rectangles in alternating directions, horizontal at one level and vertical at the next. It was simple but produced long thin slivers that were hard to compare or label. **Squarified treemaps**, introduced in 2000, choose splits that keep rectangles close to square, which makes areas easier to judge and leaves room for labels, at the cost of losing the original order. Other variants keep order or use circles or [[Voronoi Diagram]] cells instead of rectangles.

Treemaps suit data with three properties: a clear hierarchy, a meaningful size measure that can be added up, and many items. Common uses:

- **Market maps.** Stocks sized by market value and colored by daily change, grouped by sector, so a whole market's mood is readable at once.
- **Budgets.** Government spending by department and program.
- **Code and bundle size.** Which dependencies make a web bundle large; see [[Bundler]].

Color carries a second variable, such as growth or change, on top of size. Since color differences are spotted immediately, this pairing makes outliers stand out; see [[Preattentive Processing]] and [[Color Scale]].

They have weaknesses. People judge area less accurately than length, so close values are better compared with a bar chart; see [[Data Visualization]]. Deep hierarchies become hard to read, as borders between levels blur and small items vanish, so interactive treemaps often let people zoom into one branch; see [[Progressive Disclosure]]. Negative values can't be shown as area at all. And without labels or hover details, a treemap can be striking but not informative, decoration rather than data; see [[Data-Ink Ratio]].

Related forms show the same hierarchy differently. Sunburst charts use concentric rings, and icicle plots stacked bars, which show depth more clearly but use space less efficiently. For comparing the same breakdown across many groups, [[Small Multiples]] of simple charts are often clearer than one large treemap.

## See also
- [[Visual Hierarchy]]
- [[Gestalt Principles]]
- [[Choropleth Map]]
