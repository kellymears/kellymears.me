---
aliases:
  - Stochastic output
tags:
  - agents
summary: The property that identical inputs may produce different outputs, and what it costs to test around.
---
**Nondeterminism** in language-model systems means the same request can yield different responses. It follows from sampling: generation draws from a probability distribution over next [[Token]]s, and even at the lowest sampling temperature, floating-point and infrastructure variation prevent exact repeatability.

The consequence for engineering is that **a single observation proves very little**. One successful run does not establish that a behavior is reliable; one failure does not establish that it is broken. Anything worth claiming needs repetition, and the number of repetitions needed scales with how rare the failure is — a fault occurring one run in ten needs roughly twenty clean runs before "fixed" means anything. This is exactly the arithmetic that makes a [[Flaky Test]] so expensive.

It also changes what an assertion can say. An evaluation must assert what the *system guarantees* rather than what a good run produces: bounds that hold across rolls, invariants the code enforces, counts the pipeline cannot violate. Numeric expectations tuned to one recording break on the next, and the breakage reads as a regression.

The standard mitigations are to make the deterministic parts genuinely deterministic — [[Record and Replay Testing]] for the model call, fixed seeds for anything random, pinned versions — so that variance is isolated to the one place it is unavoidable. See [[Determinism]].

## See also
- [[Heisenbug]]
- [[Evaluation Harness]]
- [[Large Language Model]]
- [[Flaky Test]]
- [[Assertion]]
- [[LLM-as-Judge]]

## Related
- [[Tool Use]]
- [[Prompt Engineering]]
