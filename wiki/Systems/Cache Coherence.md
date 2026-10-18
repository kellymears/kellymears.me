---
aliases:
  - Cache coherency
  - MESI protocol
  - Coherence protocol
  - Non-uniform memory access
  - NUMA
tags:
  - systems
summary: How multicore processors keep each core's private cache consistent with the others, the hidden traffic behind contended locks and false sharing, and why shared memory gets slower with more cores.
---
**Cache coherence** is the problem of keeping copies of the same memory consistent across the private caches of several processor cores. Each core has its own small, fast caches; see [[Locality of Reference]]. If two cores both cache a variable and one writes to it, the other's copy is stale. Without coordination, a program would see different values for the same address depending on which core it ran on.

Hardware solves this with a **coherence protocol**. The classic is **MESI**, named for the four states each cache line can be in:

- **Modified.** This core has changed the line; no other cache has a copy, and memory is out of date.
- **Exclusive.** This core alone holds the line, unchanged, and can write it without telling anyone.
- **Shared.** Several cores hold read-only copies.
- **Invalid.** The copy is stale and can't be used.

Before a core writes to a shared line, it broadcasts a request that invalidates every other copy. When another core later reads that line, it must fetch the new version, from the writer's cache or from memory. Cores watch, or *snoop*, each other's requests to keep their states accurate.

All this happens invisibly in hardware, but it has costs that show up in performance:

- **Contention.** When many cores write the same variable, such as a lock or a shared counter, the line bounces between their caches, each transfer taking tens to hundreds of cycles. A heavily contended lock can be slower than a single core doing all the work, one way the serial fraction of [[Amdahl's Law]] grows in practice.
- **False sharing.** Two cores writing *different* variables that happen to share one 64-byte line still invalidate each other constantly; see [[False sharing]]. Padding data onto separate lines fixes it.
- **Scaling.** Coherence traffic grows with core count, which limits how far shared-memory designs scale.

Coherence keeps each memory location consistent, but it doesn't say in what *order* writes to different locations become visible. That's the job of the [[Memory Model]], and processors reorder operations aggressively, so concurrent code needs atomic operations and memory barriers. [[Lock-Free Data Structure]]s depend on both.

Large servers add **non-uniform memory access** (NUMA). Each processor socket has its own memory, and reaching another socket's memory takes longer. Operating systems try to keep a thread and its data on the same node, and [[CPU Affinity]] lets programs pin themselves to cores. Hyperthreads share caches entirely, so they avoid coherence traffic between them; see [[Simultaneous Multithreading]].

The general lesson, that keeping copies consistent is expensive and gets more so with distance, applies at every scale. Distributed systems face the same choice between strong consistency and speed, with network delays in place of nanoseconds; see [[Eventual Consistency]] and [[Database Replication]].

## See also
- [[Concurrency and Parallelism]]
- [[Translation Lookaside Buffer]]
- [[Spinlock]]
- [[Rowhammer]]
