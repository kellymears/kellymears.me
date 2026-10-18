---
aliases:
  - Profiler
  - Flame graph
  - Sampling profiler
  - Hot path
  - Hotspot
tags:
  - testing
summary: Measuring where a running program actually spends its time or memory, so optimization goes to the few places that matter instead of where intuition guesses.
---
**Profiling** measures where a program spends its resources while it runs: CPU time, memory, allocations, locks, or input and output. Its main lesson is that programmers are bad at guessing where time goes. A profiler replaces the guess with data, usually showing that a small fraction of the code, the *hot path*, accounts for most of the cost.

Donald Knuth's 1974 remark that "premature optimization is the root of all evil" is usually quoted without its next sentence, which says not to pass up the critical 3 percent. Profiling is how you find that 3 percent; see [[Premature Optimization]].

Profilers gather data in two main ways:

- **Sampling.** Interrupt the program at regular intervals, often around 100 to 1,000 times a second, and record the current call stack. Functions that show up in many samples are where time is spent. Overhead is low and the program runs close to normal speed, but brief functions may be missed.
- **Instrumenting.** Insert code at the entry and exit of every function to record exact counts and times. This catches everything but slows the program and distorts the result, especially for small, frequently called functions, the classic problem described under [[Instrumentation]].

The most useful visualization is the **flame graph**, introduced by Brendan Gregg in 2011. Each box is a function, stacked on top of its caller, and its width is proportional to the share of samples in which it appeared. Wide boxes are expensive. The format makes it easy to spot a single wide tower in thousands of stack traces, and it has spread to browser developer tools, language runtimes, and production monitoring.

Different resources need different profilers. Memory profilers record allocations and show what is keeping objects alive, the starting point for a [[Memory Leak]] or excessive [[Garbage Collection]]. Browser performance panels show time spent on scripting, style, and layout, revealing problems like [[Layout Thrashing]] or long tasks that block the [[Event Loop]]. Off-CPU profiling shows time spent waiting on locks, disks, or the network rather than computing, which ordinary CPU profiles miss entirely.

Profiling and [[Benchmarking]] go together. A benchmark says *how fast* something is and whether a change made it faster; a profile says *why*. The usual loop is benchmark, profile, change the hot spot, benchmark again. Improvements often come from algorithms, changing the [[Big-O Notation]] of a hot loop, more than from small tweaks.

Continuous profiling, which samples production systems at low overhead all the time, has become part of [[Observability]], since some problems appear only under real load and data. The measurement should still be treated with care: a profile shows where time went for one workload on one machine, and a program throttled by the [[CPU Scheduler]] or by heat may look different elsewhere.

## See also
- [[eBPF]]
- [[Pareto Principle]]
- [[Call Stack]]
- [[Observability]]
- [[Theory of Constraints]]
