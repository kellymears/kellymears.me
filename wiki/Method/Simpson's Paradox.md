---
aliases:
  - Simpson's Reversal
tags:
  - method
summary: A trend appears in several groups of data but reverses or disappears when the groups are combined.
---
**Simpson's Paradox** occurs when a pattern holds within every subgroup of a dataset but flips when the subgroups are pooled together — both the subgroup view and the aggregate view are computed correctly, and they still point in opposite directions. It isn't a paradox in the logical sense; it's a reminder that an average is only meaningful relative to a fixed population, and combining populations of different sizes and compositions can move the number in ways neither underlying trend predicts.

The most cited real case is a 1973 Berkeley graduate admissions study: women were admitted at a lower overall rate than men, which looked like discrimination, but within almost every individual department, women were admitted at an equal or higher rate. The resolution was that women applied more often to competitive departments with low acceptance rates for everyone — the aggregate number was dominated by which departments people applied to, a variable ("department") the naive comparison had silently averaged over. The paradox is always a symptom of a hidden or unweighted confounding variable; find it and the reversal stops being mysterious.

In engineering terms, this shows up whenever someone compares a metric across two systems, two time periods, or two cohorts without first checking whether the mix underneath changed. A new caching layer can raise the average response time while making every single request type faster, if it also shifted traffic toward a slower request type that used to be filtered out earlier. A/B test results are especially exposed to this: an overall conversion lift can hide a loss in every real segment if the test population's segment mix differs from the control's.

The defense is the same move every time: before trusting an aggregate comparison, check it against the same comparison sliced by whatever variable might differ between the groups being compared, and don't average across categories you haven't confirmed are stable.

## See also
- [[Correlation and Causation]]
- [[Base Rate Fallacy]]
- [[Regression to the Mean]]
- [[Selection Bias]]

## Related
- [[Percentage Point]]
