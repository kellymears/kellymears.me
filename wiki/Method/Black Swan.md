---
aliases:
  - Fat tail
  - Heavy-tailed distribution
  - Tail risk
  - Turkey problem
tags:
  - method
summary: A rare, high-impact event that lay outside what past experience suggested was possible and looks predictable only afterward, and the argument that fat-tailed risks deserve robustness rather than forecasts.
---
A **black swan** is a rare event with an enormous impact that lay outside what past experience suggested was possible. The term was popularized by Nassim Nicholas Taleb in *The Black Swan* (2007), and it borrows an old example from philosophy: Europeans long took "all swans are white" as settled fact, until Dutch explorers found black swans in Australia in 1697. No number of white swans could prove the rule; one black swan refuted it; see [[Falsifiability]].

Taleb gives three marks of a black swan: it is an outlier beyond regular expectations, it carries extreme consequences, and after it happens people construct explanations that make it seem predictable all along; see [[Hindsight Bias]]. His examples include the rise of the internet, the September 11 attacks, and the 2008 financial crisis.

The **turkey problem**, adapted from Bertrand Russell, illustrates the trap. A turkey fed every day for a thousand days grows more confident with each meal that humans look after turkeys. Its confidence peaks on the day before Thanksgiving. Past observations gave no warning, and the evidence that felt strongest was most misleading.

The deeper argument concerns the shape of risks. In some domains, outcomes cluster around an average and no single observation changes the total much: heights, calories eaten, most measurement errors; see [[Normal Distribution]]. In others, the distribution has **fat tails**, and one extreme event can outweigh everything else combined: wealth, book sales, pandemics, market crashes, and war casualties. Models that assume a bell curve in a fat-tailed world underestimate disasters badly, which happened in risk models before the 2008 crisis; see [[Map and Territory]].

What follows in practice:

- **Distrust forecasts of rare events.** Precise probabilities for things that have rarely or never happened are mostly guesswork, however confident the model.
- **Focus on exposure.** Rather than predicting the event, ask what it would do to you and limit the damage; see [[Margin of Safety]].
- **Avoid ruin.** A strategy that wins small most of the time but can lose everything eventually will; see [[Survivorship Bias]].
- **Keep redundancy.** Systems optimized for efficiency under normal conditions often have no slack when the tail arrives; see [[Queueing Theory]].

Engineering cultures have similar instincts. Outages are often caused by events nobody had seen, so resilient systems are tested against failures deliberately rather than assumed safe from the absence of incidents; see [[Chaos Engineering]] and [[Murphy's Law]].

Critics argue that the label gets applied to events that were foreseeable and simply ignored, such as pandemics, which experts had warned about for years. Taleb calls those "gray swans." The useful lesson is narrower than the slogan: in fat-tailed domains, a long record of calm says less about the future than it seems to; see [[Lindy Effect]].

## See also
- [[Narrative Fallacy]]
- [[Knightian Uncertainty]]
- [[Leading Indicator]]
- [[Ambiguity Aversion]]
- [[Sensitivity Analysis]]
