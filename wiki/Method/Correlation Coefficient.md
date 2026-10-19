---
aliases:
  - Pearson correlation
  - Rank correlation
  - Spurious correlation
tags:
  - method
summary: A single number from minus one to plus one that summarizes how closely two quantities move together along a straight line, and hides most of what matters about the relationship.
---
A **correlation coefficient** is a single number summarizing how closely two quantities move together. The most common, **Pearson correlation**, runs from minus one to plus one. Plus one means the points lie exactly on a rising straight line, minus one means they lie exactly on a falling line, and zero means there is no straight-line relationship at all.

Francis Galton developed the idea in the 1880s while studying how traits such as height pass from parents to children, and Karl Pearson gave it its standard mathematical form in the 1890s. Galton's data also produced the observation that tall parents tend to have children closer to average height, which is why fitting a line through points is still called regression; see [[Regression to the Mean]] and [[Linear Regression]]. Squared, the coefficient gives the share of the variation in one variable that a straight line through the other can account for, the R-squared of a simple regression.

The number hides a lot. It measures only linear association, so points arranged in a perfect U-shape can have a correlation near zero. A single extreme value can manufacture a strong correlation or erase one; see [[Outlier]]. In 1973 the statistician Francis Anscombe published four small datasets with nearly identical correlations, means and regression lines that look completely different when plotted, a standing argument for drawing the data before computing anything; see [[Anscombe's quartet]] and [[Scatter Plot]].

When a relationship is consistent in direction but not straight, **rank correlation** methods such as Spearman's compare the order of the values rather than the values themselves, and are less swayed by extremes. For dependence of any shape, measures of shared information go further; see [[Information Theory]].

A correlation is also not a measure of how much one thing matters to another. A weak correlation can hide a large effect concentrated in a few cases, and a strong one can reflect a trivial effect measured very consistently; see [[Effect Size]]. With enough data, even a tiny correlation becomes statistically significant without becoming important.

Then there is the famous warning that correlation doesn't imply causation; see [[Correlation and Causation]]. Two variables can move together because a third drives both, as ice cream sales and drownings both rise in summer; see [[Confounding]]. Searching through enough pairs of variables guarantees some **spurious correlations**, such as a widely shared chart that lines up per-capita cheese consumption with deaths from becoming tangled in bedsheets. Testing many pairs and reporting the hits is a form of [[P-Hacking]]. A correlation can also reverse when groups are pooled, or hold across groups while failing for the individuals within them; see [[Simpson's Paradox]] and [[Ecological Fallacy]].

Used carefully, it's a first look, a prompt to plot the data and ask what else might explain it.

## See also
- [[Causal Inference]]
- [[Statistical Significance]]
