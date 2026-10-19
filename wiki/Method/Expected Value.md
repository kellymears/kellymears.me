---
aliases:
  - Expected utility
  - Kelly criterion
  - St. Petersburg paradox
  - Risk of ruin
tags:
  - method
summary: The probability-weighted average of a choice's outcomes, the basic tool for deciding under uncertainty, and the reasons people rightly depart from it when stakes are large, ruin is possible, or a bet can't be repeated.
---
The **expected value** of a choice is the average of its possible outcomes, each weighted by its probability. A bet that pays $10 with a one-in-five chance and nothing otherwise has an expected value of $2. If it costs $3, it loses a dollar per play on average.

Blaise Pascal and Pierre de Fermat worked it out in letters in 1654 while solving how to divide the stakes of an interrupted game, and Christiaan Huygens published the first book on it in 1657.

Expected value is the starting point for decisions under uncertainty:

- **Comparing options**, such as which project to fund: rough value times rough probability, divided by cost, beats arguing from the best case; see [[Fermi Estimation]].
- **Ignoring the past.** Only future outcomes enter the calculation, which is why money already spent shouldn't sway the choice; see [[Sunk Cost Fallacy]] and [[Opportunity Cost]].
- **Updating** as evidence changes the probabilities; see [[Bayes' Theorem]] and [[Monty Hall Problem]].
- **Learning machines** choose actions to maximize expected reward; see [[Reinforcement Learning]] and [[Multi-Armed Bandit]].

Taken alone, it gives strange answers. In the **St. Petersburg paradox**, posed by Nicolaus Bernoulli in 1713, a coin is flipped until it lands heads, and the prize doubles with every tails. The expected payout is infinite, yet almost no one would pay more than a few dollars to play. Daniel Bernoulli's answer in 1738 was that money's value to a person grows more slowly than the amount: an extra thousand dollars matters more to someone poor than to someone rich. Maximizing **expected utility** instead of expected money became the core of economic decision theory, formalized by John von Neumann and Oskar Morgenstern in 1944. People deviate further, weighting losses more heavily than gains and overweighting small probabilities; see [[Loss Aversion]].

The deeper problem is **risk of ruin**. An expected value describes an average over many repetitions, but a person lives through one sequence of outcomes. A bet with positive expected value that can wipe you out is a bad bet, because after ruin there are no more rounds to average over; see [[Law of Large Numbers]]. Insurance has negative expected value for the buyer and is still sensible, since it trades a small certain loss for protection from a catastrophic one; see [[Margin of Safety]].

In 1956 John Kelly, at Bell Labs, worked out the fraction of a bankroll to stake on a favorable bet to grow it fastest without going broke. Practitioners of the **Kelly criterion** often bet half of it or less, since estimated edges tend to be optimistic.

Rare, extreme outcomes make the estimate fragile, since it depends on probabilities no one can measure well; see [[Black Swan]]. Future payoffs also feel smaller than present ones; see [[Hyperbolic Discounting]].

## See also
- [[Cost-Benefit Analysis]]
- [[Sensitivity Analysis]]
- [[Antifragility]]
