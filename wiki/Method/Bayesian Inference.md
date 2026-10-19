---
aliases:
  - Bayesian statistics
  - Posterior
tags:
  - method
summary: Treating unknown quantities as uncertain beliefs and updating them with evidence through Bayes' theorem, an approach older than mainstream statistics that was sidelined for most of the twentieth century and revived once computers could do the math.
---
**Bayesian inference** is a way of reasoning from data in which unknown quantities, such as the effect of a drug or the bias of a coin, are described by probabilities expressing how plausible each value is. Evidence then updates those probabilities using [[Bayes' Theorem]].

Three pieces make up every analysis:

- **The prior** describes what's believed before seeing the data.
- **The likelihood** says how probable the observed data would be under each possible value.
- **The posterior** combines the two into an updated belief, which becomes the prior for the next round of evidence.

The French mathematician Pierre-Simon Laplace developed these methods in the late eighteenth and early nineteenth centuries and used them on problems from astronomy to birth rates. In the twentieth century, statisticians including Ronald Fisher and Jerzy Neyman built a rival, frequentist approach, which treats probability as long-run frequency and avoids priors. They objected that priors were subjective. Frequentist methods, including significance testing, dominated science for most of the century; see [[Statistical Significance]].

Bayesian methods had a practical problem too: for realistic models, computing the posterior was intractable. That changed around 1990, when simulation methods that sample from the posterior instead of calculating it exactly became practical on ordinary computers; see [[Monte Carlo Method]]. Bayesian analysis has since spread through statistics, machine learning, and the sciences.

Its advocates point to several strengths:

- **It answers the question people ask.** A posterior gives the probability that a hypothesis is true given the data. A p-value gives the probability of data at least this extreme if the hypothesis were false, a quantity routinely misread as the former.
- **It uses base rates.** Ignoring how common something is before the evidence leads to famous errors in medical testing and courtrooms; see [[Base Rate Fallacy]].
- **It handles small samples.** A sensible prior keeps estimates from jumping to extremes on thin data, much as regularization prevents [[Overfitting]].
- **Its intervals mean what they seem to.** A Bayesian interval says where the value probably lies, which is how people often misread a frequentist [[Confidence Interval]].

Critics answer that priors can smuggle in conclusions, and that different priors can lead to different answers from the same data. Good practice reports the prior and checks how much the result depends on it.

The habit of updating extends beyond formal statistics. Skilled forecasters adjust probabilities in small steps as news arrives; see [[Superforecasting]] and [[Calibration]]. Some theories of perception treat the brain itself as combining expectations with sensory evidence; see [[Predictive Processing]]. A simple Bayesian classifier long powered spam filters; see [[Naive Bayes]].

## See also
- [[Kalman Filter]]
- [[Ambiguity Aversion]]
- [[Bootstrap Resampling]]
- [[Rubber Hand Illusion]]
- [[McGurk Effect]]
