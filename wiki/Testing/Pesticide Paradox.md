---
aliases:
  - Defect clustering
  - Test suite saturation
tags:
  - testing
summary: The observation that running the same tests over and over stops finding new bugs, because the code adapts to them the way pests adapt to a pesticide, so test suites need fresh variety to stay useful.
---
The **pesticide paradox** is the observation that a test suite run repeatedly gradually stops finding new bugs. Boris Beizer named it in his 1990 book *Software Testing Techniques*: just as pests that survive a pesticide become resistant to it, the bugs left in a program are precisely the ones the existing tests don't catch. Every bug the tests can find has been found and fixed; what remains is invisible to them.

The paradox doesn't mean old tests are useless. A stable test suite does valuable work as a safety net against regressions, catching old bugs if they return; see [[Regression Testing]]. The point is narrower: a fixed suite measures the same things forever, while the code, its users, and its risks change. A suite that passes every day can give a growing sense of security that it hasn't earned.

The paradox has several sources:

- **Fixed inputs.** The same examples exercise the same paths, leaving the rest untouched.
- **Fitting the tests.** Code evolves to satisfy the tests rather than the requirements behind them, a version of [[Goodhart's Law]].
- **Shared assumptions.** Tests written by the developers who wrote the code share their blind spots; see [[Black-Box and White-Box Testing]].
- **Stale risk.** New features, integrations, and usage patterns bring failures the old tests were never designed for.

Machine learning has a close relative: models tuned repeatedly against the same benchmark eventually learn the benchmark rather than the task; see [[Benchmark Contamination]].

The remedies all add variety:

- **Generate inputs** instead of hand-picking them, so each run explores something new; see [[Property-Based Testing]], [[Fuzzing]], and [[Monkey Testing]].
- **Explore** with human testers who look for what the scripts don't; see [[Exploratory Testing]].
- **Test the tests** by introducing deliberate bugs and checking that the suite catches them; see [[Mutation Testing]].
- **Follow risk**, revising tests toward the areas that are changing or failing; see [[Risk-Based Testing]].
- **Feed back from production**, turning incidents and user reports into new tests; see [[Testing in Production]].

The pesticide paradox is often listed with a related principle, **defect clustering**: bugs aren't spread evenly, but concentrate in a small number of modules, often the most complex or most frequently changed. This is the [[Pareto Principle]] applied to defects. Together they suggest a strategy: keep regression tests as a baseline, but direct fresh testing effort where bugs have clustered and where the existing suite has stopped finding anything.

The broader lesson is that silence from a test suite is ambiguous. No failures can mean the software is good, or that the tests have stopped looking.

## See also
- [[Test Smell]]
- [[Coverage Gate]]
- [[Flaky Test]]
