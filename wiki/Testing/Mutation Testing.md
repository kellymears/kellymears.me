---
aliases:
  - Mutation Score
tags:
  - testing
summary: A test-of-tests that injects small bugs into code and checks whether the existing suite catches them, exposing tests that assert nothing.
---
**Mutation testing** evaluates a test suite's actual effectiveness by deliberately introducing small, syntactic bugs — "mutants" — into the source code and rerunning the suite against each mutant. A mutant flips `>` to `>=`, changes a `+` to a `-`, deletes a line, or swaps a boolean. If the suite still passes against a mutated line, that line's coverage is a lie: some test executes it, but no assertion depends on what it actually does. If the suite fails, the mutant is "killed," and the ratio of killed to total mutants is the mutation score — a much harder number to game than [[Code Coverage]].

The distinction from ordinary coverage is the whole point of the technique: [[Branch Coverage]] answers "did execution pass through this line," while mutation testing answers "would a test suite notice if this line were wrong." A test that calls a function and asserts nothing about its return value gets full line coverage and a mutation score of zero on that function — coverage rewards execution, mutation testing rewards verification, and the gap between the two numbers is exactly the population of [[Test Fixture|tests that assert nothing]] that a coverage-only gate can't see.

The practical cost is why mutation testing isn't run on every commit the way coverage is: generating and rerunning the suite against hundreds or thousands of mutants is computationally expensive, scaling with both codebase size and suite runtime, so most teams run it periodically or on a targeted subset rather than as a CI gate on every push. Tools (Stryker for JS/TS, PIT for Java, mutmut for Python) also have to work around "equivalent mutants" — a mutation that's syntactically different but semantically identical to the original (multiplying by 1 vs. leaving a value alone) — which can't be killed by any test because there's nothing wrong to detect, and which manual triage still has to distinguish from genuine coverage gaps.

## See also
- [[Code Coverage]]
- [[Branch Coverage]]
- [[Coverage Gate]]
- [[Unit Test]]

## Related
- [[Assertion]]
