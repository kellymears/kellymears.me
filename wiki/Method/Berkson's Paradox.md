---
aliases:
  - Berkson's bias
  - Collider bias
tags:
  - method
summary: A false correlation, often negative, that appears between two independent traits when only cases with at least one of them are examined, as when hospital patients seem to show that one disease protects against another.
---
**Berkson's paradox** is a false correlation between two traits that appears when the cases studied were selected because they had one trait or the other. Two things that are unrelated in the whole population can look negatively related in the filtered group. The statistician Joseph Berkson described it in 1946, using hospital data.

His example: suppose two diseases occur independently in the general population. People are admitted to hospital if they have either one. Among hospital patients, those who don't have the first disease must almost all have the second, since otherwise they wouldn't be there. So within the hospital, the first disease seems to protect against the second, even though it doesn't.

Everyday versions are common:

- **Attractive people seem less kind.** If someone dates only people who are attractive or kind or both, then among their partners those less attractive must be kinder, and vice versa. The pool was filtered on the combination.
- **Good restaurants in bad locations.** A restaurant in a poor location that survives must have good food; one in a busy spot can survive with mediocre food. Among surviving restaurants, location and quality look inversely related; see [[Survivorship Bias]].
- **Admissions.** Among admitted students, test scores and grades can look inversely related, because a weak result on one had to be offset by a strong one on the other to get in.

The formal name is **collider bias**. In a diagram of causes, a collider is a variable caused by two others, here admission, caused by both diseases. Conditioning on a collider, by selecting on it, controlling for it statistically, or analyzing only cases where it happened, opens a false path between its causes. This is the reverse of [[Confounding]], where a shared cause must be controlled for. Controlling for the wrong variable can create bias as easily as fixing it, which is why choosing what to adjust for requires thinking about causal structure, not just adding every available variable; see [[Correlation and Causation]].

It is a specific form of [[Selection Bias]], and it shows up wherever data comes from a filtered population: patients who sought care, users who stayed, papers that got published, or bugs that were reported; see [[Publication Bias]]. In medical research it produced notorious findings, such as smoking appearing to protect low-birth-weight babies, explained by the fact that the babies were selected on low birth weight, which both smoking and other more serious causes produce.

The practical defense is to ask how the cases in front of you got there. If the filter depends on the traits being compared, any relationship between them is suspect until checked against an unfiltered sample; see [[Simpson's Paradox]] and [[Ground Truth]].

## See also
- [[Streetlight Effect]]
- [[Causal Inference]]
- [[Randomized Controlled Trial]]
- [[Ecological Fallacy]]
- [[Scatter Plot]]
- [[Bayesian Network]]
- [[Correlation Coefficient]]
