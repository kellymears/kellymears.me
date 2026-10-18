---
aliases:
  - Isolated tests
  - Test pollution
  - Order-dependent tests
  - Test interdependence
  - Hermetic test
tags:
  - testing
summary: The property that each test passes or fails on its own, regardless of which other tests run, in what order, or in parallel.
---
**Test isolation** means each test sets up everything it needs, cleans up after itself, and gives the same result whether it runs alone, first, last, or alongside others in parallel. An isolated test can be trusted on its own. A test without isolation passes or fails depending on what ran before it, so its result says as much about the suite as about the code.

Isolation breaks through **shared state** that one test changes and another reads:

- **Global and module state.** A singleton, cache, or configuration object modified by one test and never reset. A [[Memoization]] cache that keeps one test's results for the next.
- **The database.** Rows inserted by one test show up in another's counts. Unique constraints collide when tests run in parallel.
- **The clock and randomness.** Tests that read the real time pass until midnight, a month boundary, or a [[Time Zone]] change. Unseeded randomness produces a different run every time, the reason [[Seeded Randomness]] matters.
- **The filesystem and environment.** Temporary files left behind, a changed working directory, or an [[Environment Variable]] set and never unset.
- **Network and ports.** Two tests binding the same [[Port]], or depending on an external service's state.

The symptoms are recognizable: a test that passes alone but fails in the suite, a suite that fails only when run in a different order, and failures that move around when tests run in parallel. These are a major source of [[Flaky Test]] reports and close cousins of the [[Heisenbug]], since observing the failure (running the test alone) makes it disappear.

The remedies all aim to give each test a fresh world:

- **Fresh fixtures.** Build each test's data in its own setup rather than sharing a [[Test Fixture]] mutated across tests.
- **Transactions.** Wrap each test in a database transaction and roll it back, or give each parallel worker its own database.
- **Injected dependencies.** Pass in clocks, random generators, and services so tests can control them with a [[Test Double]].
- **Randomized order.** Test runners shuffle test order on purpose, with a recorded seed, to expose hidden dependencies early.

The strictest form is a **hermetic** test, which depends on nothing outside its own declared inputs, the same goal as [[Determinism]] in builds. Isolation also makes failures readable: when exactly one test fails, the cause is in that test's code path. The same principle behind [[Pure Function]] design applies here. Code with fewer hidden inputs is easier to test in isolation.

## See also
- [[Test Parallelization]]
- [[Test Fixture]]
- [[Test Double]]
- [[Determinism]]
