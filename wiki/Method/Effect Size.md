---
aliases:
  - Effect sizes
  - Cohen's d
  - Practical significance
tags:
  - method
summary: How big a difference or relationship is, as opposed to whether it exists, the number that decides whether a statistically significant result matters at all.
---
**Effect size** is a measure of how large an effect is: how much a drug lowers blood pressure, how much a new design raises sign-ups, how strongly two variables move together. It answers "how much?" where [[Statistical Significance]] answers only "is it probably not zero?" The two are often confused, and the gap between them causes a great deal of bad reasoning.

A result can be significant and trivial. With a large enough sample, almost any difference becomes significant. A study of hundreds of thousands of people might show a supplement lowers blood pressure by a statistically certain 0.3 mmHg, a number no doctor or patient would care about. A result can also be large and non-significant, when a small study measures a big effect too noisily to rule out chance; see [[Statistical Power]].

Effect sizes come in two kinds:

- **Raw, in natural units.** Dollars per user, milliseconds of latency, points on a test, kilograms lost. These are usually the most meaningful to people deciding what to do.
- **Standardized.** Dividing by the variation in the data lets different studies be compared and combined. *Cohen's d* is the difference between two group means divided by their standard deviation. Correlation coefficients and odds ratios are other common forms.

The psychologist Jacob Cohen proposed rough labels for *d*: 0.2 small, 0.5 medium, 0.8 large. He warned they were a last resort when nothing better was known, but they spread as rules. Whether an effect matters depends on context: a small effect on a cheap, safe intervention given to millions can be worth more than a large one on a few people.

Relative and absolute effects mislead differently. "Cuts risk by 50%" sounds dramatic; if the risk goes from two in ten thousand to one in ten thousand, the absolute change is tiny; see [[Percentage Point]] and [[Base Rate Fallacy]].

Effect sizes in published research tend to be inflated. Small studies only reach significance when they happen to overestimate the effect, and those are the studies that get published, a pattern called the *winner's curse*; see [[Publication Bias]] and [[Replication Crisis]]. Replications typically find effects about half as large as the originals. The same thing happens in product experiments: the winning variants of many tests look better than they'll perform after launch; see [[AB Testing]] and [[Regression to the Mean]].

Good practice reports the estimated effect with its [[Confidence Interval]], decides in advance what size would be worth acting on, and sizes the study so it could detect that.

## See also
- [[Correlation and Causation]]
- [[Pareto Principle]]
- [[Goodhart's Law]]
- [[Growth Mindset]]
