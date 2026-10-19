---
aliases:
  - Gustafson's law
  - Speedup
  - Serial fraction
  - Parallel speedup
tags:
  - computation
summary: The limit that the serial part of a task places on any speedup from parallelism, and Gustafson's answer that bigger machines are used for bigger problems.
---
**Amdahl's law** gives the maximum speedup from improving part of a system. If a fraction of a task can be sped up and the rest can't, the part that can't sets a ceiling. Computer architect Gene Amdahl presented the argument in 1967, as a case against the hope that massively parallel computers would make everything fast.

The arithmetic is simple. Suppose 90 percent of a program can run in parallel and 10 percent must run serially. With infinitely many processors, the parallel part takes no time at all, but the serial 10 percent remains, so the best possible speedup is tenfold. With 8 processors the speedup is under 5, and with 64 about 9. Each additional processor helps less than the last. A program that is 99 percent parallel caps out at 100 times faster, no matter the hardware.

The law applies well beyond processors:

- **Optimization.** Speeding up a function that accounts for 5 percent of runtime can save at most 5 percent. This is why [[Profiling]] before optimizing matters: effort belongs where time is actually spent.
- **Builds and tests.** A parallel test suite still waits on its slowest serial step, such as setup or the longest single test; see [[Build Cache]].
- **Teams.** Adding people to a project helps only with work that can be divided. Coordination and sequential dependencies are the serial fraction, the insight behind [[Brooks's Law]].
- **Pipelines.** A [[Fan-Out and Fan-In]] job is as fast as its slowest branch plus the steps before and after.

In practice the real limit is often worse than Amdahl predicts. Parallel work has overhead: dividing tasks, synchronizing, and combining results. Contention for shared resources, locks, memory bandwidth, or cache lines can make adding threads slow things down; see [[Locality of Reference]] and [[Deadlock]]. Neil Gunther's universal scalability law adds a term for this, explaining why throughput can actually fall past some number of workers.

In 1988 John Gustafson offered a more optimistic view. Amdahl assumes a fixed problem size, but people with bigger machines usually tackle bigger problems: finer simulations, larger datasets, higher resolutions. The serial part often stays roughly constant while the parallel part grows, so the speedup on the scaled problem keeps rising with processor count. **Gustafson's law** describes how supercomputers and GPUs are actually used. Both views are right; they answer different questions, how much faster this job gets versus how much more work fits in the same time.

The law connects to [[Concurrency and Parallelism]] more broadly. Choosing algorithms with small serial fractions, such as [[Divide and Conquer]] approaches that split work evenly, and avoiding shared mutable state, often matters more than adding hardware. [[Queueing Theory]] describes the related limit for systems serving many independent requests.

## See also
- [[Theory of Constraints]]
- [[Thread Pool]]
- [[Hybrid CPU Architecture]]
- [[Baumol's Cost Disease]]
- [[SIMD]]
