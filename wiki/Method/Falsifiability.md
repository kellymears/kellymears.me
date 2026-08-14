---
aliases:
  - Falsification
  - Seeing the test fail
tags:
  - method
summary: A claim is only worth something if you know what observation would refute it.
---
**Falsifiability**, borrowed from philosophy of science, is the property of a claim that some possible observation would show it false. A claim no observation could contradict carries no information, however confident it sounds.

In engineering the idea has an unusually concrete form: **a test is worthless until it has been seen to fail.** A test written after a fix, added to a green suite, proves only that the suite is still green. Revert the fix, watch the test go red, restore the fix — now the test is a real net. Skipping that step is how a suite accumulates assertions that were never wired to anything, which is the same species of problem as [[Vacuous Truth]].

The rule generalizes to any guard. Before trusting a lint rule, a schema check, or a CI gate, delete the thing it protects and confirm the gate reds. Guards that cannot fail read as guarantees, and a guarantee that is not one is worse than a known gap — see [[Silent Failure]].

It also disciplines prose. "This cast is required because the checker demands it" is a falsifiable claim: delete the cast and typecheck. If you have not run that experiment, the honest sentence is that the cause is not established. Writing the confident version instead is the trap described in [[Plausible Mechanism]].

## See also
- [[Root Cause Analysis]]
- [[Assertion]]
- [[Coverage Gate]]
- [[Ground Truth]]
- [[Exhaustive Claim]]

## Related
- [[Glob]]
- [[Truncation Bias]]
