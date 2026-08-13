---
aliases:
  - Fallback default
  - Null coalescing default
tags:
  - method
summary: A substituted value that papers over a missing input and hides the misconfiguration that produced it.
---
A **defensive default** is a value supplied when a real one is missing, so the program can continue. Used well it is ordinary hygiene; used on identity or configuration values it is a way of converting a loud, local failure into a quiet, distant one.

The tell is whether the default can be *wrong*. An empty array standing in for an absent list cannot be wrong — nothing downstream misbehaves. A hostname, port, tenant identifier, API key, or feature-flag value absolutely can be, and a default silently supplies a plausible answer to a question the environment failed to answer. The environment stays broken; only the symptom moves.

Defensive defaults also distort verification. A fallback branch that is unreachable in one environment and reachable in another produces coverage numbers that differ by machine, and a test that never exercises the real path. Removing the fallback often removes the untestable branch along with it — see [[Unreachable Code]] and [[Branch Coverage]].

A related shape is the defensive *guard*: a null check protecting against a state the surrounding invariant makes impossible. It reads as caution and behaves as noise, since no input can reach it and no test can cover it.

## See also
- [[Fail Fast]]
- [[Silent Failure]]
- [[Environment Variable]]
- [[Secret Management]]
- [[Chesterton's Fence]]

## Related
- [[Coverage Gate]]
- [[Schema Validation]]
