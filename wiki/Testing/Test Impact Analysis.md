---
aliases:
  - Regression test selection
  - Test selection
  - Affected tests
  - Predictive test selection
tags:
  - testing
summary: Running only the tests a change could plausibly affect, using dependency graphs, coverage maps, or learned models, so large suites stay fast without giving up their safety net.
---
**Test impact analysis** picks which tests to run for a given change instead of running all of them. A large codebase can have tens of thousands of tests taking hours, while a typical change touches a few files. If the system can work out which tests could possibly be affected, it can run those and skip the rest, cutting feedback time in [[Continuous Integration]] from hours to minutes.

There are three main ways to decide what is affected:

- **Dependency graphs.** Build tools such as Bazel know which code each test depends on, directly or through other modules. A change to one file affects only the tests downstream of it in the graph. Finding them is a walk over the same structure a [[Topological Sort]] orders, and in a [[Monorepo]] it is the standard approach.
- **Coverage maps.** Record which lines or functions each test executes, using the same machinery as [[Code Coverage]]. When a change touches a line, run the tests that executed it. This is finer-grained than a dependency graph but goes stale as code changes, and it misses effects that don't show up as executed lines, such as changed configuration files or data.
- **Learned prediction.** Train a model on history: which past changes caused which tests to fail. Facebook described such a system in 2019, reporting that it caught more than 99.9 percent of faulty changes while running about a third of the tests that dependency analysis would have selected.

Every approach trades safety for speed. A missed dependency means a test that should have run didn't, and a [[Regression]] slips through. Common safeguards:

- **Full runs as backstop.** Run the whole suite on a schedule or before release, so anything a selective run missed is caught within hours.
- **Conservative fallbacks.** Treat changes to build files, shared configuration, or the test framework itself as affecting everything.
- **Separate flakiness from selection.** A [[Flaky Test]] that happens to be selected looks like the change broke it; teams track flaky tests separately so selection results stay trustworthy.

Selection also changes how a suite should be shaped. Tests that depend on almost everything, typical of a broad [[End-to-End Test]], are selected by nearly every change and get little benefit, which is one more argument for the [[Test Pyramid]] and for well-isolated tests in general (see [[Test Isolation]]). Fast, narrow tests are both cheaper to run and easier to select precisely.

Test impact analysis is one piece of keeping a [[Deployment Pipeline]] fast as a codebase grows, alongside parallel execution, [[Build Cache|caching]] of test results whose inputs haven't changed, and batching changes through a [[Merge Train]]. All of these rely on the same principle: work that provably can't change the answer doesn't need to be redone.

## See also
- [[Regression Testing]]
- [[Test Parallelization]]
- [[Risk-Based Testing]]
