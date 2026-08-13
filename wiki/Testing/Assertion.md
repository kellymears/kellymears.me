---
aliases:
  - Assertions
tags:
  - testing
summary: The statement in a test that must hold, and the only part that can actually fail.
---
An **assertion** is the check inside a test that decides pass or fail. Everything else in a test is setup; the assertion is the specification.

Several properties separate a useful assertion from a decorative one.

**It must be reachable.** An assertion after a step that can throw never runs on a broken path. An assertion placed outside the claim it supports cannot fail inside that claim — a structural trap in any system where claims are recorded per assertion.

**It must be able to fail.** See [[Falsifiability]] and [[Vacuous Truth]]. Checking that a class is present when the question is whether the class *resolves to anything* is the commonest form of a passing assertion that proves nothing.

**It should assert the invariant, not the incidental.** An assertion pinned to a value that legitimately varies — a token count, an exact sentence, a generated identifier — will break on every unrelated regeneration and be read as a failure.

**Its failure message should identify the problem.** A message naming the expected condition saves more time than any amount of test structure.

A related discipline: when a test is written after a fix, revert the fix and watch the assertion go red before trusting it. The counts confirm it — a suite going from two failing to zero is evidence; a suite that was already green is not.

## See also
- [[Falsifiability]]
- [[Vacuous Truth]]
- [[Test-Driven Development]]
- [[LLM-as-Judge]]
- [[Fail Fast]]
- [[Nondeterminism]]

## Related
- [[Silent Failure]]
- [[Regression]]
- [[Hallucination]]
