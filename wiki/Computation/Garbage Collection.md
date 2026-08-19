---
aliases:
  - GC
  - Automatic Memory Management
tags:
  - computation
summary: A runtime automatically reclaiming memory occupied by objects nothing can reach anymore.
---
**Garbage Collection** is a runtime's automatic reclamation of memory held by objects that the running program can no longer reach — no variable, no field, no still-live object references them, so they can never be used again and their memory can be returned. This replaces manual `malloc`/`free` bookkeeping with a guarantee: a reachable object is never collected, and an unreachable one eventually is, without the programmer tracking either lifetime by hand.

Reachability, not reference count alone, is the load-bearing concept: two objects that only reference each other but that nothing else points to are unreachable together, and a tracing collector (mark-and-sweep, the common family) finds this by walking outward from a set of roots — global variables, the call stack — marking everything reachable and sweeping away what wasn't touched. A pure reference-counting collector (classic Objective-C's `retain`/`release`, Python's primary mechanism) misses exactly this case — a reference cycle — which is why Python backs its refcounting with a supplementary cycle-detecting collector, and why refcounting alone is considered an incomplete GC strategy.

Generational collection is the standard optimization: most objects die young, so the collector scans a small "young generation" frequently and promotes long-lived survivors to an "old generation" scanned rarely, trading a little bookkeeping for far fewer full-heap scans. The visible cost of any tracing collector is a pause — the "stop the world" moment where the program halts so the collector can walk live references without them changing mid-scan — and most GC engineering effort (concurrent collectors, incremental marking, Go's low-latency collector) aims at shrinking or hiding that pause rather than eliminating collection itself.

Rust is the notable outlier: it reclaims memory deterministically via ownership and the borrow checker at compile time, with no runtime collector and no pause, at the cost of a stricter compile-time discipline about who owns what.

## See also
- [[Compiler]]
- [[Immutability]]
- [[Process]]
- [[Closure]]
