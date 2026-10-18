---
aliases:
  - Dataviz
  - Chart
  - Charts
  - Anscombe's quartet
tags:
  - design
summary: Turning numbers into marks people can see patterns in, which works only when the visual encoding matches what the eye judges accurately and the chart type matches the question being asked.
---
**Data visualization** is the practice of representing data visually so people can see patterns, comparisons, and outliers that tables hide. It works by mapping values to visual properties, called *channels*, such as position, length, angle, area, and color, then relying on the visual system to read them back; see [[Preattentive Processing]].

The case for it is made by **Anscombe's quartet**, four small datasets published by the statistician Francis Anscombe in 1973. All four have nearly identical means, variances, correlations, and regression lines. Plotted, they look nothing alike: one is a clean line, one a curve, one a line with a single outlier, one a vertical stack with one far point. Summary statistics alone would have called them the same; see [[Simpson's Paradox]].

Channels aren't equally accurate. In a 1984 study, William Cleveland and Robert McGill measured how precisely people judge different encodings. Position along a common scale was best, then length, then angle and slope, then area, with color saturation and volume worst. That ranking explains much conventional advice:

- **Bars over pies.** Comparing bar lengths against a shared axis is more accurate than comparing pie slice angles.
- **Avoid 3D.** Perspective distorts lengths and areas, and hides some values behind others.
- **Use color for categories or rough magnitude,** not precise comparison; see [[Color Scale]].

Chart choice follows from the question:

- **Comparison:** bar charts.
- **Change over time:** line charts.
- **Distribution:** histograms and box plots.
- **Relationship:** scatter plots, which invite but don't prove causal readings; see [[Correlation and Causation]].
- **Geography:** maps, with care, since area misleads; see [[Choropleth Map]] and [[Map Projection]].
- **Many comparisons at once:** repeated small charts on shared scales; see [[Small Multiples]].

Many of these forms are old. William Playfair invented the line, bar, and pie chart around 1800. Florence Nightingale's diagrams of soldiers' deaths in the 1850s showed that disease killed far more than battle and helped drive sanitary reform.

Charts can mislead without lying. A truncated axis makes small differences look large; dual axes can make any two series appear correlated; cumulative totals always go up. Edward Tufte's "lie factor" measures how much a graphic exaggerates the change it shows; see [[Data-Ink Ratio]]. Color choices can make a chart unreadable to people with [[Color Vision Deficiency]].

Two purposes differ. *Exploratory* visualization helps an analyst find what's in the data, and is quick and disposable. *Explanatory* visualization communicates one finding to others, so it highlights that finding, labels it directly, and removes everything else; see [[Visual Hierarchy]]. Dashboards sit uneasily between the two, and often fail by showing everything at once; see [[Observability]].

## See also
- [[Gestalt Principles]]
- [[Dimensionality Reduction]]
