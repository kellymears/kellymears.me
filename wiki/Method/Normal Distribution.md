---
aliases:
  - Gaussian distribution
  - Bell curve
  - Standard deviation
  - Central limit theorem
  - 68-95-99.7 rule
tags:
  - method
summary: The bell-shaped curve that sums of many small independent effects tend toward, which makes it the default model for measurement error and averages, and a dangerous one for anything driven by rare extremes.
---
The **normal distribution** is the symmetric, bell-shaped curve that describes how many measurements scatter around their average. It is defined by two numbers: the **mean**, where the peak sits, and the **standard deviation**, which measures how spread out values are. It is also called the Gaussian distribution, after Carl Friedrich Gauss, who used it in 1809 to describe errors in astronomical observations.

A handy summary is the **68-95-99.7 rule**: about 68 percent of values fall within one standard deviation of the mean, 95 percent within two, and 99.7 percent within three. Values beyond four or five standard deviations are so rare under the curve that seeing one is strong evidence the curve is wrong. Adult heights and measurement errors come close to it.

Its importance comes from the **central limit theorem**: add up many small, independent random effects, and their sum tends toward a normal distribution, whatever the shape of the individual effects. A person's height depends on many genes and environmental factors; a measurement error collects many tiny disturbances. Francis Galton demonstrated the idea with a board of pegs, in which balls bouncing left or right at each peg pile up into a bell at the bottom. The theorem is also why averages of samples are approximately normal even when the data aren't, which underpins [[Confidence Interval]]s and much of [[Statistical Significance]] testing. It also explains why [[Monte Carlo Method]] estimates improve slowly, with error shrinking as the square root of the number of samples.

The curve has been misused. Adolphe Quetelet in the 1830s promoted the "average man" as an ideal, and the bell curve was later enlisted in arguments for ranking people and races, tying it to eugenics. Grading "on a curve" forces a fixed share of students into each grade whatever they actually learned.

The bigger practical danger is assuming normality where it doesn't hold. The theorem needs effects that are many, small, and independent. When one large effect can dominate, or effects reinforce each other, the result has **fat tails**: extreme values far more common than the bell predicts. Wealth, city sizes, and word frequencies follow power laws instead; see [[Pareto Principle]] and [[Zipf's Law]]. Financial returns have tails fat enough that "25-standard-deviation" days, which the bell curve says should never happen in the life of the universe, arrive every few years; see [[Black Swan]]. Server response times are similar, with a long tail that averages hide; see [[Tail Latency]].

The habit worth keeping is to look at the data before assuming its shape. A histogram, or a check of how often extremes occur, reveals whether the bell fits, and summaries such as the median and percentiles hold up when it doesn't; see [[Regression to the Mean]] and [[Effect Size]].

## See also
- [[Gambler's Fallacy]]
- [[Bayes' Theorem]]
