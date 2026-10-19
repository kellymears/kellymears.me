---
aliases:
  - Statistical bootstrap
  - Jackknife
tags:
  - method
summary: Estimating how uncertain a statistic is by recomputing it on many random resamples of the data itself, a computer-intensive shortcut that replaced pages of formulas and works as long as the sample resembles the population.
---
**Bootstrap resampling** estimates how much a statistic would vary from sample to sample by treating the one sample you have as a stand-in for the whole population. Draw a new dataset of the same size from your data at random, with replacement, so some points appear twice and others not at all. Compute the statistic on it. Repeat a few thousand times. The spread of those results approximates the uncertainty in the original estimate.

Bradley Efron introduced the method in 1979. The name comes from the impossible feat of pulling yourself up by your own bootstraps: the data seems to be used to judge its own reliability. The trick works because, for a reasonably large and representative sample, the sample's distribution is a decent approximation of the population's; see [[Law of Large Numbers]].

Its appeal is generality. Classical formulas for uncertainty exist for means and a handful of other statistics, usually under assumptions about the shape of the data; see [[Normal Distribution]]. For a median, a ratio, a correlation, or the output of an elaborate model, the math is hard or unknown. The bootstrap replaces derivation with computation and gives the same recipe for all of them; see [[Monte Carlo Method]].

Common uses:

- **Intervals.** The middle 95 percent of the bootstrapped values gives a simple interval for the estimate; see [[Confidence Interval]].
- **Comparisons.** Resampling two groups shows whether a difference between them could plausibly be noise; see [[Statistical Significance]].
- **Model ensembles.** Training many models on bootstrap samples and averaging them, called bagging, reduces how much any one model is swayed by quirks of the data; see [[Random forest]].
- **Model checking.** Resampling shows how stable a fitted model's choices are when the data shifts slightly; see [[Overfitting]].

An older relative, the **jackknife**, recomputes the statistic leaving out one observation at a time. Maurice Quenouille proposed it around 1950 to reduce bias, and John Tukey named it after the all-purpose pocketknife. Efron's paper presented the bootstrap as a generalization of it. Leaving data out in turn also underlies how models are validated; see [[Cross-validation]].

The bootstrap has limits worth knowing. It can't fix a sample that doesn't represent the population, since it only reshuffles what's there; see [[Selection Bias]]. It does poorly with very small samples and with statistics driven by extremes, such as the maximum, because resamples can never exceed the largest value observed. Heavy-tailed data, where rare huge values dominate, can make its intervals far too narrow; see [[Fat tail]]. Data with structure, such as time series where each point depends on the last, needs variants that resample whole blocks.

Resampling depends on cheap random numbers, which is part of why it waited for computers; see [[Pseudorandom Number Generator]].

## See also
- [[Bayesian Inference]]
- [[Statistical Power]]
- [[Conformal Prediction]]
- [[Precision and Accuracy]]
