---
aliases:
  - Box-and-whisker plot
  - Violin plot
  - Interquartile range
tags:
  - design
summary: John Tukey's compact summary of a distribution, a box spanning the middle half of the data with the median marked and whiskers out to the extremes, ideal for comparing many groups and blind to shapes such as two peaks.
---
A **box plot** summarizes a distribution in a small, standard shape. A box spans the middle half of the values, from the first quartile to the third; a line inside marks the median; **whiskers** extend toward the smallest and largest typical values; and points beyond them are drawn individually as possible outliers. It was popularized by the statistician John Tukey in his 1977 book *Exploratory Data Analysis*.

Each part has a definite meaning:

- **The box.** Its length, the **interquartile range**, measures spread in a way that a few extreme values can't distort, unlike the standard deviation.
- **The median line.** Its position within the box shows skew: off center, the data lean one way.
- **The whiskers.** In Tukey's convention they reach to the furthest value within one and a half box-lengths of the box.
- **Outlier points.** Anything further out is plotted individually, an invitation to check whether it is an error or the most interesting value in the set; see [[Data Cleaning]].

The box plot's strength is comparison. A dozen groups fit side by side in the space of one histogram, and differences in median, spread, and skew stand out immediately; see [[Histogram]] and [[Small Multiples]]. It is more honest than a bar chart of averages, which hides the spread entirely; see [[Bar Chart]].

It describes the data, not the uncertainty of an estimate. A box shows where individual values fall, while a confidence interval shows how precisely a mean is known, and readers confuse them often; see [[Confidence Interval]]. Two boxes overlapping a lot can still have reliably different medians if the samples are large; see [[Effect Size]].

Its main weakness is what five numbers can't capture. A distribution with two separate peaks, or a gap in the middle, can produce exactly the same box as a smooth bell curve; see [[Normal Distribution]]. A 2017 paper showed this vividly with datasets drawn as a dinosaur, a star, and other shapes that share the same summary statistics, extending the older lesson of Anscombe's quartet.

Alternatives address that:

- **Violin plots**, introduced in 1998, mirror a smoothed density curve on both sides, showing the shape as well as the summary.
- **Strip and swarm plots** draw every value as a dot.
- **Combined plots** overlay a thin box on the raw points, keeping both the summary and the detail.

Percentile thinking behind the box, focusing on the median and the upper tail rather than the mean, is the same thinking used to monitor slow requests; see [[Tail Latency]].

Tukey's broader argument was that a graph should help analysts discover what they didn't expect, not only present what they already knew; see [[Data Visualization]].

## See also
- [[Scatter Plot]]
- [[Statistical Significance]]
