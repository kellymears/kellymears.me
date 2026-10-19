---
aliases:
  - A/B testing
  - A/B test
  - Split testing
  - Online controlled experiment
  - Peeking problem
tags:
  - method
summary: Comparing two versions of something by randomly showing each to different users and measuring which performs better, a randomized controlled trial for products.
---
**A/B testing** compares two versions of a product, page, or message by randomly assigning users to see one or the other and measuring a chosen outcome, such as sign-ups, purchases, or clicks. It is a randomized controlled trial applied to software. Randomization is what gives it power: because assignment is random, the groups differ only by chance and by the change being tested, so a reliable difference in outcomes can be attributed to the change. That escapes the trap of [[Correlation and Causation]] that plagues before-and-after comparisons, where seasons, marketing campaigns, and news events all move the numbers at once.

Delivery tooling makes it cheap. A [[Feature Flag]] system assigns users to variants, and analytics count outcomes. Large companies run thousands of experiments a year. Most fail. Many careful organizations report that only a minority of ideas move their target metric at all, which is the strongest argument for testing rather than trusting intuition.

The statistics are easy to misuse:

- **Peeking.** Checking results daily and stopping as soon as the difference looks significant inflates false positives dramatically, since random fluctuations cross the threshold sooner or later. Either fix the sample size in advance or use sequential methods designed for continuous monitoring. Stopping early when results look good is a form of [[P-Hacking]].
- **Too little traffic.** Small effects need large samples. An underpowered test mostly measures noise, and the "winners" it finds tend to shrink on rollout through [[Regression to the Mean]].
- **Many metrics.** Checking twenty metrics guarantees that about one looks significant by chance.
- **Novelty effects.** Users click a new design because it is new. The lift fades after a few weeks.
- **Segment reversals.** A variant can win overall while losing in every segment, or the reverse, as [[Simpson's Paradox]] shows when groups are mixed unevenly.

A/B testing also carries ethical and strategic risks. Optimizing a single metric tends to find [[Dark Pattern]] designs that win the measurement while hurting users, and short-term clicks are a poor proxy for long-term trust. That is [[Goodhart's Law]] applied through statistics. The approach also only compares the options someone thought to build, and local optimization can't find a better design far from the current one. It is the product world's form of [[Falsifiability]]: an idea counts only if it could have lost.

## See also
- [[Multi-Armed Bandit]]
- [[PDCA Cycle]]
- [[Call to Action]]
- [[Clickbait]]
- [[Multiple Comparisons Problem]]
- [[Web Analytics]]
- [[Hawthorne Effect]]
- [[Natural Experiment]]
