---
aliases:
  - Reversion to the Mean
tags:
  - method
summary: An extreme measurement tends to be followed by a more average one, with no cause required beyond noise.
---
**Regression to the Mean** is the statistical fact that an unusually extreme observation is, on average, followed by one closer to the true average — not because anything changed, but because some of what made the first observation extreme was noise, and noise doesn't repeat in the same direction twice. It requires no story about intervention, learning, or decline; it falls out of the presence of randomness alone.

The trap is that a real event almost always sits between the extreme measurement and the more average one that follows, and it's tempting to credit that event with the whole change. A team has its worst on-call week ever, management holds a retro and introduces a new process, and the following week is calmer — credited to the process. Some credit may be real, but part of the improvement was coming regardless, because "worst week ever" is partly bad luck, and bad luck doesn't luck twice in a row. The classic version is the rookie who has a stellar first month and then a mediocre second one, read as "sophomore slump" when it's substantially just the first month having been the tail of a distribution.

This is one of the more counterintuitive traps in engineering metrics: praise or blame assigned right after an extreme data point will look validated almost no matter what you do, because the next point was likely to move toward average anyway. It's also a documented instructor's fallacy — pilots praised after a great landing fly worse next time, pilots criticized after a bad one fly better, which reads as punishment working and praise backfiring, when both are just regression doing its ordinary thing.

The discipline is to ask, before crediting an intervention: was the starting point already unusually extreme? If so, some reversion was owed independent of anything you did, and only a proper baseline or control group can tell you how much.

## See also
- [[Base Rate Fallacy]]
- [[Correlation and Causation]]
- [[Overfitting]]
- [[Simpson's Paradox]]

## Related
- [[Survivorship Bias]]
