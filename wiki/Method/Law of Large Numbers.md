---
aliases:
  - Law of averages
  - Law of small numbers
tags:
  - method
summary: The theorem that the average of many independent trials settles toward the expected value, which makes insurance and casinos work, does not make short runs even out, and leaves small samples free to produce extremes.
---
The **law of large numbers** says that as you repeat an independent random trial more times, the average of the results gets closer to the expected value. Flip a fair coin ten times and you might see seven heads; flip it ten thousand times and the share of heads will almost certainly be very close to half.

Jacob Bernoulli spent about twenty years proving the first version and called it his golden theorem. It was published in 1713, after his death. Siméon Denis Poisson gave it its present name in 1837.

The law is the reason averages are trustworthy at scale:

- **Insurers** can't predict which house will burn, but they can predict closely how many of a million will, and price policies on that.
- **Casinos** lose individual bets all night and still collect their small edge on the total; see [[Expected Value]].
- **Simulation** estimates hard quantities by averaging many random trials, and accuracy improves with the number of runs; see [[Monte Carlo Method]].
- **Experiments** need enough subjects or traffic for the measured difference to reflect the real one; see [[AB Testing]] and [[Statistical Power]].

The uncertainty shrinks slowly: with the square root of the sample size, so halving the margin of error takes four times the data; see [[Confidence Interval]]. The central limit theorem describes the shape of the leftover scatter, which is why averages tend toward a bell curve; see [[Normal Distribution]].

Its most common misreading goes by the name **law of averages**: the belief that a run of heads makes tails "due." The coin has no memory. The proportion approaches one half because new flips swamp the old streak, not because they correct it. In fact the raw gap between heads and tails tends to grow as flips accumulate, even as its share of the total shrinks; see [[Gambler's Fallacy]].

The reverse error is the **law of small numbers**, named by Amos Tversky and Daniel Kahneman in 1971 for researchers' habit of expecting small samples to look like the population; see [[Representativeness Heuristic]]. Small samples swing widely, so they fill both ends of any ranking. US counties with the lowest kidney cancer rates are mostly small and rural, and so are the counties with the highest. Small schools likewise crowd both ends of school rankings. The statistician Howard Wainer called the formula behind this the most dangerous equation; see [[Regression to the Mean]].

The law also has conditions. Trials must be independent, and a sample that isn't drawn fairly converges, just as confidently, on the wrong answer; see [[Selection Bias]]. The underlying distribution must have a finite average. With heavy tails, rare huge values dominate, and the average can take far longer to settle or never settle at all; see [[Black Swan]].

## See also
- [[Bootstrap Resampling]]
- [[Timing Attack]]
- [[Random Walk]]
- [[Histogram]]
