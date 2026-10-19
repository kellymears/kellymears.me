---
aliases:
  - Masonry
  - Pinterest layout
  - Waterfall layout
tags:
  - design
summary: A layout of equal-width columns in which items of different heights stack tightly, each placed under the shortest column, as popularized by Pinterest, simple to see but surprisingly hard to build well on the web.
---
A **masonry layout** arranges items in columns of equal width but lets each item keep its own height, stacking them so there are no gaps, like bricks laid in a wall. Rows don't line up; the result is a staggered wall of cards. Image boards, portfolios, and shopping sites use it to show many pictures of different proportions without cropping them.

The layout became familiar through Pinterest, which launched in 2010 with an endless scrolling wall of pinned images in this arrangement; see [[Infinite scroll]]. A JavaScript library called Masonry, released around the same time by the developer David DeSandro, gave the pattern its common name on the web. In China, it's often called a waterfall layout.

The usual placement rule is greedy: each new item goes into whichever column is currently shortest, which keeps the columns roughly even; see [[Greedy Algorithm]]. Packing items of varied size tightly is a version of the bin-packing problem, which is hard to solve perfectly, but the simple rule works well enough when items are similar in width; see [[Bin packing]].

Masonry has always been awkward to build with web standards. Rows in a regular grid align items across the page, which is exactly what masonry avoids; see [[CSS Grid]]. Flexible rows leave ragged gaps; see [[Flexbox]]. Multi-column text layout produces the look but fills each column top to bottom before moving to the next, so the first items all land in the left column rather than across the top. JavaScript libraries therefore measure every item and position each one absolutely, recalculating when the window resizes or an image finishes loading. Until images load, the script may not know their heights, so items jump around; see [[Layout Shift]].

Browser makers spent years debating native masonry support in CSS. One proposal treated it as a mode of grid, another as a separate layout type, and the discussion turned partly on how it should interact with existing grid features and with accessibility. Native support remained experimental into the mid-2020s, while developers continued to rely on scripts; see [[Web Standards]].

The layout raises reading-order questions. Visually, a viewer scans across the top, but the underlying order of items may run differently, so a person tabbing through links or listening with a screen reader can encounter items in a sequence that doesn't match what sighted users see; see [[Keyboard Navigation]] and [[Screen Reader]]. Because the wall has no clear rows or ranking, it also suits browsing more than finding something specific; see [[Visual Hierarchy]].

Loading items in batches as the user scrolls keeps long walls fast; see [[Lazy Loading]]. Compared with tightly fitted layouts of tiles in varied shapes, masonry keeps a uniform column width and gives up control over height; see [[Bento Grid]].

## See also
- [[Grid System]]
- [[Responsive Web Design]]
- [[De Stijl]]
