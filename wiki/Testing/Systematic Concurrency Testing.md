---
aliases:
  - Stateless model checking
  - Schedule exploration
  - CHESS
tags:
  - testing
summary: Testing concurrent code by taking control of the thread scheduler and deliberately exploring different interleavings, rather than running the code many times and hoping a rare ordering occurs.
---
**Systematic concurrency testing** finds bugs in concurrent programs by controlling the order in which threads run and deliberately exploring different orders, instead of running the program repeatedly and hoping the operating system happens to produce a bad one. It turns concurrency bugs from rare accidents into reproducible test failures.

The problem it solves is that a concurrent program's behavior depends on the interleaving of its threads, and the number of interleavings grows explosively with the number of threads and steps; see [[Combinatorial explosion]]. A bug that appears only when one thread is preempted at one exact instruction might show up once in a million runs, then vanish when anyone tries to debug it; see [[Race Condition]] and [[Heisenbug]]. Ordinary stress testing samples interleavings at random, and the scheduler's habits mean some orderings almost never occur.

Systematic testing replaces the scheduler. The tool intercepts every point where threads interact, such as lock operations, atomic memory accesses, and message sends, and decides itself which thread runs next. It can then run the test again under a different schedule, and again, covering orderings methodically. When a schedule fails, it can be replayed exactly; see [[Record and Replay]].

Exploring every schedule is usually impossible, so tools prune:

- **Preemption bounding.** Microsoft Research's CHESS tool, developed by Madan Musuvathi and Shaz Qadeer in the late 2000s, explored schedules with few forced context switches first. Their finding was that most real concurrency bugs need only one or two preemptions to appear.
- **Partial order reduction.** Many interleavings differ only in the order of independent operations that don't touch the same data, and checking one of each equivalent group suffices.
- **Randomized priorities.** The PCT algorithm, published in 2010, assigns random thread priorities and a few random priority changes, which gives a provable probability of hitting any bug of a given depth; see [[Fuzzing]].

The approach is also called **stateless model checking**, after Patrice Godefroid's VeriSoft of 1997: it explores executions like a model checker but runs real code rather than a model; see [[Formal Verification]]. Modern descendants include Loom for Rust and Coyote for .NET.

Some tools go further and simulate weak memory, in which processors may make one thread's writes visible to others out of order; see [[Memory Model]]. Others watch a single execution and flag unsynchronized accesses that could race under a different schedule; see [[Sanitizer]].

The same idea scales up to whole distributed systems, which run every node, network message, and clock inside one deterministic simulation; see [[Deterministic Simulation Testing]]. Checking that a concurrent data structure's results match some sequential order is the matching correctness criterion; see [[Linearizability Checking]].

Concurrency bugs that slip through tend to surface as intermittently failing tests; see [[Flaky Test]] and [[Deadlock]].

## See also
- [[Peterson's Algorithm]]
- [[Multithreading]]
- [[Northeast Blackout of 2003]]
