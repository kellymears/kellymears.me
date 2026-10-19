---
aliases:
  - Quasi-experiment
  - Difference-in-differences
  - Regression discontinuity
  - Instrumental variable
tags:
  - method
summary: Learning cause and effect from situations where chance or an arbitrary rule assigned people to different conditions, the main substitute for a randomized trial when one is impossible or unethical.
---
A **natural experiment** is a situation in which some outside force, rather than a researcher, sorts people into different conditions in a way that is close to random. It lets researchers estimate cause and effect when a controlled trial would be impossible, too expensive, or unethical; see [[Randomized Controlled Trial]].

The classic example is John Snow's study of cholera in London in 1854. Two water companies served the same streets, one drawing water from the Thames below the city's sewage outflows and one from cleaner water upstream. Households were assigned to a company by history, not by wealth or habits, so comparing their death rates isolated the effect of the water. Cholera deaths were far higher among customers of the polluted supply, strong evidence that the disease spread through water rather than bad air.

The underlying problem is [[Confounding]]: people who choose a treatment differ from those who don't, so comparing them mixes the treatment's effect with everything else about them; see [[Correlation and Causation]]. A natural experiment helps when the assignment has nothing to do with those differences. Economists and epidemiologists have formalized several designs:

- **Lotteries.** When access to a school, a visa, or health insurance is decided by lottery, winners and losers are comparable, and the gap between them measures the effect. Vietnam-era draft lotteries have been used to study the effects of military service.
- **Regression discontinuity.** When a rule applies above a cutoff, such as a test score for a scholarship or an age for eligibility, people just above and just below are nearly identical, so the jump at the line measures the effect.
- **Difference-in-differences.** Compare how an outcome changed in a place affected by a policy with how it changed in a similar place that wasn't. A 1994 study of a minimum wage rise in New Jersey, compared against neighboring Pennsylvania, is a famous example.
- **Instrumental variables.** Use something that affects the treatment but has no other route to the outcome, such as distance to a hospital, to tease out the treatment's effect.

Each design rests on an assumption that can't be fully tested: that nothing else changed at the cutoff, or that the two places would have moved in parallel. The credibility of a study depends on how convincingly it argues for that assumption, and whether a plausible story connects cause and effect; see [[Plausible Mechanism]].

Natural experiments have limits. They answer the question nature happened to pose, about the people nature happened to sort, which may not generalize. And the flexibility to choose comparison groups and time windows creates room for finding effects that aren't there; see [[Multiple Comparisons Problem]]. Joshua Angrist, Guido Imbens, and David Card shared the 2021 economics Nobel for developing these methods.

## See also
- [[Causal Inference]]
- [[Sensitivity Analysis]]
- [[Observational Study]]
- [[Bradford Hill Criteria]]
