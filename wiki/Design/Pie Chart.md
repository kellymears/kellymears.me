---
aliases:
  - Donut chart
  - Doughnut chart
tags:
  - design
summary: A circle cut into slices to show parts of a whole, instantly recognizable and widely used, but hard to read precisely because people judge angles and areas much less accurately than lengths.
---
A **pie chart** divides a circle into slices whose angles are proportional to the parts of a whole. It is among the most recognized charts in the world and among the most criticized by people who study how charts are read.

William Playfair, who also invented the bar chart and the line graph, published the first known pie chart in 1801, showing the territories of the Ottoman Empire. Florence Nightingale's famous 1858 diagram of soldiers' causes of death is often called a pie chart, but it is a polar-area chart, in which wedges have equal angles and different radii.

The criticism comes from experiments on perception. In 1984 William Cleveland and Robert McGill measured how accurately people compare quantities encoded in different ways. Position along a common scale was most accurate, followed by length; angle and area came well behind. A pie asks readers to compare angles and areas, so slices of 23 and 27 percent look nearly equal, while the same values as bars are clearly different; see [[Preattentive Processing]]. Comparing two pies side by side is worse still, since matching slices sit at different positions.

Pie charts work in a narrow set of cases:

- **Few parts.** Two or three slices, ideally with one clearly dominant.
- **Part-to-whole message.** When the point is "nearly half" or "about a quarter," the circle's familiar fractions help: people judge a half or a quarter well because they are landmarks.
- **Sum matters.** The slices must add to a meaningful whole. Pies of values that don't sum to 100 percent, or that overlap, are simply wrong.

Common failures include too many slices, a rainbow of colors that readers must match against a legend, and 3D tilting, which makes front slices look bigger than back ones of the same size. Labeling slices directly instead of using a legend fixes much of the reading problem; see [[Data Visualization]].

**Donut charts** cut out the center, often to hold a total or a label. Removing the center takes away the angle at the middle, so readers judge arc length instead, which studies suggest is read about as well; the main gain is space for text.

The usual alternatives:

- **Bar charts** sorted by size, which make close values easy to compare.
- **Stacked bars** for parts of a whole across several groups.
- **Waffle charts**, grids of a hundred squares, which make percentages countable.
- **Treemaps** for many parts or nested categories; see [[Treemap]].
- **Small multiples** for comparing compositions across many groups; see [[Small Multiples]].

Edward Tufte called pie charts a poor choice in almost every case, while others defend them for their readability by general audiences. Both sides agree they suit a simple share of a whole and fail at fine comparison; see [[Data-Ink Ratio]].

## See also
- [[Choropleth Map]]
- [[Color Scale]]
- [[Sankey Diagram]]
