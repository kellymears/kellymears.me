---
aliases:
  - Sampling bias
tags:
  - method
summary: A sample distorted because inclusion in it was never random.
---
**Selection bias** is what happens when the process that put items into a sample is correlated with the thing you are trying to measure, so the sample no longer represents the population it is supposed to stand in for. [[Survivorship Bias]] is one shape of it — inclusion determined by having survived — but the family is broader.

**Self-selection** distorts a survey when the people who bother to respond differ systematically from the people who do not: users who file a bug report are, by definition, the ones patient enough to file one. **Attrition** distorts a longitudinal study when the participants who drop out share a trait related to the outcome, so the group that remains looks healthier, happier, or more successful than the group that started. **Collider bias** is the subtlest form: conditioning analysis on a variable that is itself a common effect of two other variables can manufacture a correlation between causes that have no real relationship, purely from the act of selecting on their shared consequence.

The counterintuitive consequence is that a larger biased sample is not safer than a smaller one — it is worse, because it produces a narrower confidence interval around the wrong number, which reads as more certainty rather than less. Checking for selection effects means asking how a record ends up observed at all, not just what the observed records say, in the same spirit as [[Ground Truth]] and the diagnostic habit behind [[Sensitivity and Specificity]].

## See also
- [[Streetlight Effect]]
- [[Fermi Estimation]]
- [[Truncation Bias]]
- [[Percentage Point]]
- [[Automation Bias]]
