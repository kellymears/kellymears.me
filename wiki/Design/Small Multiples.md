---
aliases:
  - Sparkline
  - Trellis chart
  - Faceted chart
  - Facet grid
tags:
  - design
summary: A grid of small charts that share the same axes and scale, each showing a different slice of the data, so comparisons happen by moving the eye rather than by remembering.
---
**Small multiples** are a series of small charts that share the same design, axes and scale, each showing a different slice of the data: one chart per region, per year, per product. Edward Tufte popularized the term in 1983, though Eadweard Muybridge's 1878 grid of a galloping horse works the same way.

The strength is comparison. Because every panel is drawn identically, differences between panels must come from the data. The eye can jump from one panel to another and see the change directly. Comparing two charts on different pages, or two frames of an animation, requires holding one in [[Working Memory]] while looking at the other, and memory is far worse than sight at preserving detail. A grid lets perception do the work.

A few rules keep them honest:

- **Shared scales.** Every panel uses the same axis ranges, or comparison breaks: a panel that looks twice as tall may simply have a different scale.
- **Meaningful order.** Arrange panels by time, geography or magnitude rather than alphabetically, so trends across the grid read at a glance. The grid itself follows a [[Grid System]], and alignment does much of the work, as the [[Gestalt Principles]] predict.
- **Label once.** Repeating axis labels on every panel wastes space. Label the outer edges and let the shared design carry the rest, in the spirit of the [[Data-Ink Ratio]].
- **One highlight channel.** A single colored line in each panel, against grey copies of all the others, uses [[Preattentive Processing]] to show each series in the context of the whole.

Statisticians at Bell Labs formalized the approach in the 1990s as *trellis displays*, and plotting libraries now call it faceting. Splitting a dataset into panels by subgroup is also one of the best defenses against [[Simpson's Paradox]], where a trend in the combined data reverses inside every subgroup.

**Sparklines** shrink the idea to the size of a word. Tufte described them in 2006 as "data-intense, design-simple, word-sized graphics": a tiny line chart embedded in a sentence or table cell, with no axes, showing a stock price or a patient's temperature over time. A column of sparklines in a table is a compact set of small multiples.

The contrast with animation is instructive. Animated charts are engaging, but studies found people read trends more accurately from small multiples of the same data. Animation also invites the misses described in [[Inattentional Blindness]], since a change in one corner happens while the eye is elsewhere.

On screens, small multiples reflow naturally. A grid can drop from four columns to one at each [[Responsive Breakpoint]], or adapt to its container with a [[Container Query]]. A single sequential [[Color Scale]] applied across all panels, rather than one per panel, keeps the comparison honest.

## See also
- [[Sankey Diagram]]
- [[Timeline]]
- [[Treemap]]
- [[Pie Chart]]
- [[Line Chart]]
