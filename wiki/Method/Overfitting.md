---
aliases:
  - Overfit
tags:
  - method
summary: A model that fits its training data too well has memorized noise instead of learning the pattern that generalizes.
---
**Overfitting** is what happens when a model captures the noise in its training data along with — or instead of — the underlying signal, so it performs beautifully on data it has seen and poorly on data it hasn't. It's the central failure mode of any process that fits parameters to examples, from a regression line to a neural network to a rule someone writes after looking at exactly one incident.

The mechanism is a tradeoff between flexibility and generalization. A model with enough free parameters can pass through every training point exactly — zero training error — by treating each point's idiosyncratic noise as if it were a real feature of the world. The model isn't wrong about the data it was shown; it's wrong about everything else, because it spent its capacity explaining coincidences instead of the underlying relationship. This is why held-out test data matters: training accuracy alone can't distinguish a model that learned the pattern from one that memorized the noise, and only checking against examples it never saw can.

Overfitting isn't unique to statistics. A postmortem process that adds a new checklist item after every single incident is overfitting an organization's practices to a training set of one — the specific failure gets patched, but the checklist grows without bound and stops generalizing to failures that don't look exactly like the last one. A test suite with a special-cased assertion for every bug ever filed, instead of a property that would have caught the whole class, has the same shape. The tell is the same in both domains: a fix that only explains the exact case in front of you, phrased in terms specific enough that it would need to be re-derived for the next case.

The corrective is [[Occam's Razor]] applied over time — prefer the explanation or rule with fewer free parameters relative to the evidence, and treat perfect performance on the cases you've already seen as a warning sign, not a reward.

## See also
- [[Occam's Razor]]
- [[Goodhart's Law]]
- [[Regression to the Mean]]
- [[Root Cause Analysis]]

## Related
- [[Second-System Effect]]
