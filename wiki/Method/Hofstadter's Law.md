---
aliases:
  - Hofstadter's Rule
tags:
  - method
summary: A task always takes longer than expected, even when you plan for it to take longer than expected.
---
**Hofstadter's Law** states, self-referentially, that "it always takes longer than you expect, even when you take into account Hofstadter's Law." Douglas Hofstadter coined it in *Gödel, Escher, Bach* while discussing chess programs that were perpetually "five to ten years away" from beating a grandmaster, decades in a row. The joke is also the whole content of the law: knowing about the bias does not, by itself, correct for it, because the bias isn't a math error you can patch with a bigger multiplier — it's structural.

The structural reason is that a schedule estimate is really a best-case path through a project, and the number of ways a best-case path can be disrupted grows with the project's complexity while the estimator's imagination for disruptions does not. Every estimate accounts for the delays you can currently picture — the vacation you know about, the review cycle you've budgeted — and none of the ones you can't, because if you could picture them specifically you'd have built them into the plan already. Padding the estimate by a fixed multiplier (doubling it, "engineering time") helps some, but it's still guessing at the size of a category of unknowns whose defining feature is that you don't know what's in it yet.

This is why the practical response isn't "estimate better" so much as "decouple commitments from estimates" — track actual completion rates over many past efforts (a team's own velocity, not the individual estimator's gut) and let that empirical base rate discipline the plan, since a base rate observed across many projects captures the unknown-disruption category in a way no single estimate can. It's also why breaking a task into pieces small enough to each be estimated with some confidence, then summing, tends to beat estimating the whole thing at once — the law bites hardest on estimates that span a long, uncertain single arc.

The law pairs naturally with [[Parkinson's Law]]: one says the work will take longer than planned, the other says it will expand to fill whatever time is available regardless — between the two, a fixed deadline provides almost no information about actual effort.

## See also
- [[Parkinson's Law]]
- [[Base Rate Fallacy]]
- [[Second-System Effect]]
- [[Availability Heuristic]]

## Related
- [[Brooks's Law]]
