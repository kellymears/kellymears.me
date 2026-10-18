---
aliases:
  - Column chart
  - Stacked bar chart
  - Grouped bar chart
tags:
  - design
summary: The chart that compares quantities by the length of bars from a shared baseline, invented by William Playfair in 1786, easy to read accurately, and easy to break by cutting off its zero or stacking too much into one bar.
---
A **bar chart** compares quantities by drawing each as a bar whose length is proportional to its value, all measured from a common baseline. Vertical bars are often called a column chart. It is among the most accurately read charts; see [[Data Visualization]].

William Playfair, a Scottish engineer and political economist, introduced it in his *Commercial and Political Atlas* of 1786, using bars to show Scotland's trade with other countries for a single year when he lacked the time series he used elsewhere in the book. He also introduced the line chart there and, in 1801, the pie chart; see [[Pie Chart]].

Its accuracy has a perceptual basis. In experiments published in 1984, the statisticians William Cleveland and Robert McGill found that people judge position along a common scale and length more accurately than angles, areas, or color intensity. A bar chart encodes values as exactly those, which is why it beats a pie chart for comparing similar values; see [[Preattentive Processing]].

That reliance on length gives it rules a line chart doesn't have:

- **Start at zero.** The bar's whole length is the value, so a truncated axis makes a 5 percent difference look like a doubling. A line chart or dot plot, which encodes position rather than length, can zoom in honestly.
- **Avoid log scales.** A logarithmic axis has no zero, so bar lengths mean nothing; see [[Logarithmic Scale]].
- **Sort meaningfully.** Ordering bars by value, unless the categories have a natural order such as months, lets the eye read rank immediately.
- **Go horizontal for long labels.** Category names stay readable without tilted text.

Variants trade one kind of comparison for another. **Grouped bars** set related values side by side, such as each region's sales in two years. **Stacked bars** show totals and their parts in one bar, but only the bottom segment sits on the common baseline; the rest float, and comparing them across bars is a judgment of length without alignment, which people do poorly. When many related series compete, separate small panels often read better than one crowded chart; see [[Small Multiples]].

Decoration hurts more here than almost anywhere. Three-dimensional bars, shadows, and textures add ink without adding information and make lengths harder to judge; see [[Data-Ink Ratio]]. Color is best reserved for highlighting one bar or encoding a group; see [[Color Scale]] and [[Visual Hierarchy]].

Bar charts summarize, and can hide what they summarize. A bar showing an average, with an error bar, conceals the spread and shape of the data behind it, which statisticians have criticized as a "dynamite plot"; see [[Box Plot]]. For a distribution of a single measurement, bars of counts become a histogram, a different chart with different rules; see [[Histogram]].

## See also
- [[Scatter Plot]]
- [[Benford's Law]]
