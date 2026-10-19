---
aliases:
  - Regression test
  - Regression suite
  - Non-regression testing
  - Retest all
tags:
  - testing
summary: Rerunning existing tests after every change to confirm that what used to work still works, how the suite grows one fixed bug at a time, and how teams keep it fast enough to run.
---
**Regression testing** is rerunning existing tests after a change to confirm that behavior which used to work still works. Its target is the [[Regression]], a previously working feature that a change has broken, often far from the code that was edited. Most automated tests become regression tests the moment they pass: written to drive new behavior, they then spend the rest of their lives guarding it.

A regression suite grows by accretion. The most reliable rule is that **every fixed bug gets a test**: before fixing a defect, write a test that reproduces it, watch it fail, fix the code, and keep the test forever. Bugs cluster, and code that broke once tends to break again, so these tests earn more than their share. A [[Characterization Test]] does the same for legacy code, pinning current behavior before anyone changes it.

Several forms of test do regression work:

- **Functional.** [[Unit Test]], [[Integration Test]], and [[End-to-End Test]] suites check outputs and behavior.
- **Output comparison.** [[Golden File Testing]] and [[Snapshot Testing]] compare whole outputs against saved versions, catching changes nobody thought to assert.
- **Visual.** [[Visual Regression Testing]] compares screenshots pixel by pixel.
- **Performance.** Benchmarks in CI catches a change that makes something slower, a regression no functional test sees.

The cost is time. A suite that grows with every bug eventually takes too long to run on every change, and research since the 1990s, notably by Gregg Rothermel and Mary Jean Harrold, has studied the three strategies:

- **Retest all.** Run everything. Safest, slowest.
- **Selection.** Run only tests affected by the change, using dependency or coverage data, as in [[Test Impact Analysis]].
- **Prioritization.** Run everything, but order tests so those most likely to fail run first, giving faster feedback.

[[Continuous Integration]] made regression testing routine, since every commit triggers the suite. It also exposed the main threat to the practice: a [[Flaky Test]] that fails at random trains people to rerun and ignore red builds, and a regression suite nobody trusts protects nothing. Keeping the suite fast and deterministic is part of its value, not a separate chore, and the [[Test Pyramid]] keeps most of it in cheap, fast layers.

When a regression slips through, [[Git Bisect]] finds the commit that introduced it by binary search over history, provided every commit builds and passes on its own. Some regressions only show in production, which is why canary rollouts compare error rates between old and new versions as a last regression check.

A regression suite is only as good as its assertions. [[Mutation Testing]] checks whether the suite would notice if the code were subtly broken, a stricter measure than coverage.

## See also
- [[Galaxy Note 7 Recall]]
