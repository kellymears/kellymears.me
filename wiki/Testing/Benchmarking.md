---
aliases:
  - Benchmark
  - Microbenchmark
  - Performance regression
  - Warmup
tags:
  - testing
summary: Measuring how fast code runs under controlled conditions, which is far harder to do honestly than it looks.
---
**Benchmarking** measures the performance of code, a system, or hardware under controlled, repeatable conditions. A *microbenchmark* times one small piece of code, such as a sort or a parser, in a tight loop. A *macrobenchmark* times a realistic workload end to end. Either way, the goal is a number that reflects reality well enough to compare two versions, and getting there is full of traps.

The common ways a benchmark lies:

- **Warmup.** The first runs are slow while caches fill, JIT compilers optimize hot code, and lazy initialization happens. Measuring them reports startup cost, not steady-state speed. Measuring only after warmup hides the startup cost that real users may pay. Which matters depends on the question.
- **Dead code elimination.** If the benchmark never uses a result, an optimizing compiler may delete the computation entirely and report a miraculous speedup. Benchmark harnesses provide a way to consume results to prevent this.
- **Noise.** CPU frequency scaling, [[Thermal Throttling]], background processes, and the [[CPU Scheduler]] add variance. A single run means little. Results need repetition, a distribution, and a confidence interval. A 2% "improvement" inside 5% noise is nothing.
- **Unrepresentative inputs.** Sorting already-sorted data, hitting a warm cache, or using toy sizes where everything fits in L1 cache. [[Big-O Notation]] predicts growth, but constants, memory access patterns, and cache effects decide real speed at real sizes.
- **Measuring the harness.** Timer overhead and loop bookkeeping can outweigh very fast code.

Benchmarks drive decisions, so they attract optimization aimed at the score rather than real use. GPU drivers and phones have been caught detecting benchmark programs and changing behavior for them. Machine learning leaderboards suffer when models are tuned against fixed test sets, a form of [[Overfitting]]. This is [[Goodhart's Law]] in a lab coat: once a benchmark becomes the target, it stops measuring general performance.

Used well, benchmarks catch performance regressions in [[Continuous Integration]] the way tests catch functional ones, by tracking results over time and flagging significant changes. They also keep optimization honest. [[Premature Optimization]] is often optimization without measurement, and a [[Profiling|profiler]] shows where time actually goes before a benchmark confirms the fix helped. [[Performance Budget]] targets for web pages are benchmarks expressed as limits. [[Frame Pacing]] shows the general lesson: averages hide the stutter, and percentiles reveal it.

## See also
- [[Monotonic Clock]]
- [[Operationalization]]
- [[Garbage In, Garbage Out]]
- [[Cloudflare Outage of 2019]]
- [[Utah Teapot]]
