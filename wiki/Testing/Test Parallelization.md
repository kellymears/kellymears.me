---
aliases:
  - Test sharding
  - Parallel test execution
  - Test splitting
tags:
  - testing
summary: Running a test suite across many processes or machines at once to cut wall-clock time, which works only as well as the tests are isolated and the split is balanced.
---
**Test parallelization** runs tests simultaneously instead of one after another. A suite that takes forty minutes serially can finish in four across ten workers, and since slow feedback is one of the main reasons developers stop running tests, that speed matters. It happens at two levels:

- **Within a machine**, a test runner starts several worker processes or threads, usually one per CPU core, and hands each a share of the tests.
- **Across machines**, called **sharding**, a [[Continuous Integration]] system splits the suite into shards and runs each on its own runner, then merges the results.

Splitting well is a scheduling problem. Dividing tests evenly by count fails because test durations vary wildly: one shard gets the slow browser tests and finishes last while the others sit idle, and the whole run is only as fast as its slowest shard. Better splitters use recorded timings from previous runs and assign tests to balance total time, a version of the bin-packing problem usually handled with a [[Greedy Algorithm]] that places the longest test first. Others use a shared queue, where each worker pulls the next test when it finishes, which adapts to surprises at the cost of coordination.

There are limits to the gain. Setup that every worker repeats, such as booting a browser, building the app, or migrating a database, doesn't shrink as workers are added, and a single long test sets a floor no split can beat. This is the same diminishing-return arithmetic as Amdahl's law in parallel computing. Combining parallelization with [[Test Impact Analysis]], which skips tests a change can't affect, and a [[Build Cache]] often saves more than adding machines.

The main hazard is shared state. Tests that passed for years in serial start failing when run in parallel, because they relied on running alone:

- Two tests write to the same database rows, file, or [[Port|port]].
- One test changes a global setting, an environment variable, or the clock, and another reads it.
- Tests depend on order, passing only after some other test has seeded data.

These failures are intermittent, depending on which tests happen to overlap, so they show up as a [[Flaky Test]] or a [[Race Condition]] rather than a clean failure. The fix is [[Test Isolation]]: give each worker its own database or schema, random free ports, temporary directories, and fresh [[Test Fixture|fixtures]]. Containers make per-worker databases cheap, and [[Ephemeral Environment|ephemeral environments]] extend the same idea to whole stacks.

Randomizing test order, even when running serially, flushes out hidden dependencies before parallelization does. Many runners print the seed they used, so an order-dependent failure can be replayed with [[Determinism]].

## See also
- [[Test Impact Analysis]]
- [[Merge Train]]
- [[Queueing Theory]]
- [[Test Pyramid]]
