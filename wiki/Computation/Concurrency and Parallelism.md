---
aliases:
  - Concurrency vs Parallelism
tags:
  - computation
summary: Concurrency is structuring independent tasks together; parallelism is actually running them at the same instant.
---
**Concurrency and Parallelism** name two distinct properties routinely conflated because both describe "more than one thing going on." Concurrency is a structural property of a program: it's composed of independently progressing tasks whose execution can be interleaved, in any order, without changing the result — one CPU core switching rapidly between two tasks is concurrent even though only one instruction ever executes at any instant. Parallelism is a property of execution: tasks are literally running at the same physical instant, which requires multiple cores (or machines) and cannot happen on a single core no matter how the software is structured.

Rob Pike's formulation — concurrency is about dealing with a lot of things at once, parallelism is about doing a lot of things at once — is the standard way to hold the distinction: a program can be concurrent without being parallel (Node's [[Event Loop]], interleaving many I/O-bound tasks on one thread), and a program can be parallel without being meaningfully concurrent in its logical structure (a single tight numeric loop split across four cores, with no independent tasks in the design at all, just data partitioned four ways).

Concurrency is what makes a [[Race Condition]] possible in the first place — the interleaving is exactly the nondeterminism that lets two operations race — and it's possible on a single core with no parallelism whatsoever, since a context switch mid-operation is enough to interleave two logically independent tasks incorrectly. This is why "single-threaded" doesn't imply "no race conditions": an `async` function that awaits mid-operation yields the single thread to other work, and another task can run and mutate shared state in the gap, producing a race with no second core involved at all.

The practical upshot is that solving a slowdown requires diagnosing which one is actually missing: a CPU-bound bottleneck needs parallelism (more cores actually crunching), while an I/O-bound one usually needs only concurrency (not blocking on each wait), and throwing threads at the second problem burns resources without addressing the real bottleneck.

## See also
- [[Event Loop]]
- [[Race Condition]]
- [[Actor Model]]
- [[Process]]
- [[Determinism]]
