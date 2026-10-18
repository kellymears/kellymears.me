---
aliases:
  - Scatterplot
  - Overplotting
  - Bubble chart
  - Scatterplot matrix
tags:
  - design
summary: A chart that places one dot per observation on two numeric axes, the standard way to see correlation, clusters, and outliers, and a trap when too many points pile up or a hidden variable splits the cloud.
---
A **scatter plot** places one mark for each observation on two numeric axes, such as height against weight or price against size. It is the standard way to see how two variables relate: whether they rise together, form clusters, or include points far from the rest.

The astronomer John Herschel plotted double-star positions this way in 1833, and Francis Galton used scatter plots of parents' and children's heights in the 1880s to discover that unusually tall parents tend to have children closer to average; see [[Regression to the Mean]].

Scatter plots show what summary numbers hide. Francis Anscombe made the point in 1973 with four small datasets that share the same means, variances, correlation, and fitted line but look completely different when plotted: one a clean line, one a curve, one a line with a single outlier, one a vertical stack with one far point; see [[Anscombe's quartet]].

Reading them takes care:

- **Correlation isn't cause.** A tight cloud says the variables move together, not why; see [[Correlation and Causation]].
- **Hidden groups.** A trend across the whole cloud can reverse inside each subgroup, which coloring points by group reveals; see [[Simpson's Paradox]].
- **Filtered samples.** Plotting only selected cases, such as admitted students or published studies, can create a correlation that isn't there in the population; see [[Berkson's Paradox]].
- **Skewed data.** Incomes, city sizes, and file sizes bunch near zero with a few huge values, so a log axis often reveals the structure; see [[Logarithmic Scale]].

**Overplotting** is the main failure at scale. With thousands of points, the dense regions become solid blobs and the eye can no longer see where most points lie. Fixes include smaller marks, partial transparency so overlaps darken, slight random jitter for values that repeat exactly, and replacing points with counts in hexagonal or square bins, which turns the plot into a [[Heat Map]]; see [[Alpha Compositing]].

A third variable can ride along as color, shape, or size. Sizing the dots makes a **bubble chart**, which Hans Rosling made famous in a 2006 talk by animating countries' income against life expectancy across two centuries. Area is hard to compare precisely, so size works best for rough magnitude; see [[Preattentive Processing]].

For many variables, a **scatterplot matrix** draws every pair in a grid; see [[Small Multiples]]. Data with hundreds of dimensions, such as text or images, is often projected down to two and shown as a scatter plot, where clusters suggest groups but distances between clusters can mislead; see [[Dimensionality Reduction]] and [[K-Means Clustering]].

A fitted line or curve with a shaded band shows the trend and its uncertainty; see [[Confidence Interval]]. Without it, people tend to see patterns in random clouds.

## See also
- [[Bar Chart]]
- [[Box Plot]]
