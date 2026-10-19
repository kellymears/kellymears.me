---
aliases:
  - Anomaly
  - Robust statistics
tags:
  - method
summary: A value far from the rest of the data, which may be a typo, a member of a different population, or the most important observation in the set, and which should be explained before it is ever deleted.
---
An **outlier** is a data point that lies far from the others. There is no single definition of "far." A common rule, from John Tukey, flags anything more than one and a half box-lengths beyond the middle half of the data; see [[Box Plot]]. Another flags values more than three standard deviations from the mean, which assumes the data are roughly bell-shaped; see [[Normal Distribution]]. Both are prompts to look, not verdicts.

Outliers arise for three very different reasons:

1. **Errors.** A typo adds a zero, a sensor glitches, a weight is recorded in pounds instead of kilograms, or a test account leaks into production data. These should be fixed or removed; see [[Data Cleaning]].
2. **A different population.** A customer who orders a thousand units may be a business mixed into consumer data. The point is real but belongs in a separate analysis.
3. **Genuine extremes.** Some processes produce rare huge values as a matter of course: wealth, city sizes, earthquake magnitudes, and request latencies all have long tails. Here the outliers may matter more than everything else; see [[Black Swan]] and [[Tail Latency]].

Telling them apart takes investigation, not a rule. Deleting inconvenient points until a result looks clean is one of the easiest ways to manufacture a finding, especially if the rule for deletion is chosen after seeing the data; see [[P-Hacking]].

The history of the ozone hole is a reminder that the anomaly can be the discovery. NASA's satellite processing flagged unusually low ozone readings over Antarctica as suspect, and it was the British Antarctic Survey's ground measurements, published in 1985, that announced the hole first.

When outliers can't be explained away, **robust statistics** limit their influence. The median moves far less than the mean when one value is extreme; a trimmed mean drops a fixed share of the highest and lowest values; the median absolute deviation measures spread without being dominated by a few points; see [[Mean and Median]].

In operations, outlier detection becomes **anomaly detection**: flagging a spike in errors, an unusual login, or a transaction that doesn't fit a customer's pattern, the basis of fraud and intrusion alerts; see [[Observability]]. Distributed systems use the same idea defensively: network time clients compare several servers and discard ones whose clocks disagree with the majority; see [[Network Time Protocol]].

Outliers also distort models. A single extreme point can tilt a fitted line, and a flexible model may contort itself to fit noise; see [[Overfitting]]. And a value that is extreme once is likely to be less extreme next time; see [[Regression to the Mean]].

The working rule: plot the data, find the outliers, and explain each one before deciding what to do with it; see [[Histogram]].

## See also
- [[Line Chart]]
- [[Pareto Principle]]
- [[Anomaly Detection]]
