---
aliases:
  - Big O
  - Asymptotic complexity
tags:
  - computation
summary: A coarse language for how an algorithm's cost grows as its input grows.
---
**Big-O notation** describes an upper bound on how a cost — running time or memory — grows with input size, discarding constant factors and lower-order terms. A routine is O(n log n) if, past some size, its cost stays within a constant multiple of n log n.

The coarseness is the point. Constants depend on the processor, the compiler, and the runtime; the growth term does not, so the claim survives a hardware refresh. That is why [[Binary Search]] is called logarithmic without reference to any machine.

**Three columns, not one.** Quicksort is O(n log n) on average and O(n²) on adversarial input; a [[Hash Table]] lookup is constant on average and linear at worst. Quoting only the flattering column is a small [[Exhaustive Claim]] — the workload that produces the bad column is what a reader needs.

**Where it misleads.** At small n the discarded constants dominate, which is why production sort routines fall back to insertion sort below a threshold. The model also assumes every operation costs the same, and memory hierarchies do not oblige: a linear scan over contiguous memory beats an asymptotically better structure chasing scattered pointers, so the behavior of a [[Least Recently Used Cache]] can matter more than the exponent. Amortized bounds hide spikes — appending to a growable array is constant amortized and occasionally linear when it resizes, which is fine for throughput and bad for tail latency.

It is a vocabulary for reasoning, not a measurement. Treating it as a proxy for observed speed is [[Goodhart's Law]] in miniature; the [[Ground Truth]] is [[Instrumentation]] on representative input.

## See also
- [[Binary Search]]
- [[Hash Table]]
- [[Performance Budget]]
- [[Observability]]
- [[Determinism]]
