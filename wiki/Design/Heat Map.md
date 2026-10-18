---
aliases:
  - Heatmap
  - Calendar heatmap
  - Clustered heatmap
tags:
  - design
summary: A grid that encodes values as color, used for correlation tables, gene expression, calendars of activity, and website click maps, whose usefulness depends on the color scale and the order of rows and columns.
---
A **heat map** shows a grid of values by coloring each cell, so that patterns across a whole table can be seen at once. Rows and columns can be anything: genes and samples, hours and weekdays, or pixels on a web page.

Shaded tables are old. The French statistician Toussaint Loua used one in 1873 to compare social statistics across the districts of Paris. The name came later: the software designer Cormac Kinney trademarked "heat map" in 1991 for a display of financial market activity.

Common forms:

- **Matrix heat maps** color a table of numbers, such as a correlation table or a model's [[Confusion matrix]].
- **Clustered heat maps**, standard in genetics, reorder rows and columns so that similar ones sit together, with tree diagrams in the margins showing the grouping; see [[Clustering]].
- **Calendar heat maps** lay out days in a grid of weeks and shade each by activity. The best-known example is the contribution graph on developer profiles.
- **Density heat maps** count points in bins, a fix for scatter plots too crowded to read; see [[Scatter Plot]].

A heat map colors cells in a regular grid. A map that shades regions such as countries or counties is a different chart; see [[Choropleth Map]].

Websites use heat maps of clicks, scrolling, and gaze to see where attention goes; see [[Eye Tracking]]. They show where people looked or clicked, not why, and an aggregate can hide that different visitors did different things. They often confirm known patterns, such as attention fading below the first screen and skipping anything that looks like an ad; see [[Above the Fold]] and [[Banner Blindness]].

The color scale decides whether a heat map informs or misleads:

- **Sequential** scales, light to dark, suit values from low to high. **Diverging** scales, with two hues meeting at a neutral middle, suit values above and below a meaningful midpoint such as zero; see [[Color Scale]].
- **Rainbow** scales create false boundaries where hues change abruptly and hide real ones in long bands of similar green. Scales designed to be perceptually even, such as viridis, fix this; see [[OKLCH]].
- **Color vision.** Red-green scales fail for many readers; see [[Color Vision Deficiency]].

Even with a good scale, color is one of the least precise ways to show a quantity. People rank lengths and positions far more accurately than shades, so a heat map is better for spotting patterns and outliers than for reading exact values; see [[Preattentive Processing]]. Labeling cells with numbers, or offering them on hover, helps.

Order matters as much as color. The same table sorted alphabetically looks like noise, and sorted by similarity it shows blocks. Large heat maps work well as [[Small Multiples]] and as panels on a [[Dashboard]].

## See also
- [[Box Plot]]
- [[Playtesting]]
