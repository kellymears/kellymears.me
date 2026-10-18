---
aliases:
  - Perverse incentive
  - Perverse incentives
  - Campbell's Law
tags:
  - method
summary: When a reward meant to fix a problem makes it worse, because people find it cheaper to produce what's being paid for than to produce what was wanted.
---
The **cobra effect** is what happens when an incentive designed to solve a problem makes the problem worse. The name comes from a story, possibly apocryphal, set in colonial Delhi: worried about venomous snakes, the British government offered a bounty for every dead cobra. Residents started breeding cobras to collect it. When the government cancelled the program, the breeders released their now-worthless snakes, and Delhi ended up with more cobras than before.

Whether or not the cobra story happened, well-documented versions did:

- **Hanoi's rats, 1902.** The French colonial government paid for rat tails. Officials soon saw tailless rats running through the city: people were cutting off tails and releasing the rats to breed more.
- **Refrigerant credits.** Under a UN climate program, factories were paid to destroy HFC-23, a potent greenhouse gas produced as a byproduct of making refrigerant. Some factories increased production of the refrigerant to generate more byproduct to destroy for credit.
- **Software metrics.** Paying for bugs fixed can encourage writing bugs; a 1990s *Dilbert* strip showed exactly this. Measuring lines of code rewards verbose code; measuring test coverage rewards tests that run code without checking anything; see [[Code Coverage]].

The common structure: the people being rewarded can produce the measured thing more cheaply than the intended outcome. The incentive pays for dead cobras, not for fewer cobras, and the gap between them is where the money goes. This is a sharp form of [[Goodhart's Law]]. The social scientist Donald Campbell put it even more directly in 1979: the more a quantitative indicator is used for social decision-making, the more it will be corrupted and distort the processes it's meant to monitor.

Designing incentives that resist this:

- **Reward outcomes, not activity.** Pay for fewer cobras in an area, not for carcasses, accepting that outcomes are harder to measure.
- **Think like the person being rewarded.** Ask what the cheapest way to earn the reward is, before launching it; see [[Pre-mortem]].
- **Use several measures.** One number is easy to game; several that pull against each other are harder; see [[DORA Metrics]].
- **Watch the second-order effects.** Check whether the underlying problem is actually shrinking, not just whether the metric is improving.

The cobra effect is a case of a broader pattern, unintended consequences, and connects to how agents optimize: a machine learning system rewarded for a proxy will find the cheapest way to satisfy the proxy; see [[Reward Hacking]]. People given incentives are similar; see [[Principal-Agent Problem]].

It's also a caution against [[Chesterton's Fence]] in reverse: a new intervention deserves as much scrutiny as removing an old one.

## See also
- [[Streisand Effect]]
- [[Normalization of Deviance]]
- [[Moral hazard]]
- [[Risk Compensation]]
- [[Jevons Paradox]]
- [[Gamification]]
