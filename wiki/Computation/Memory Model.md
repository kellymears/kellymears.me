---
aliases:
  - Memory ordering
  - Memory barrier
  - Data race
  - Data races
  - Sequential consistency
tags:
  - computation
summary: The rules for what values one thread can see when another writes to shared memory, why hardware and compilers reorder operations, and why data races make programs undefined.
---
A **memory model** defines what values a thread may observe when reading memory that other threads write. It's a contract between programmers, compilers, and hardware about which reorderings are allowed. Without one, multithreaded programs have no reliable meaning.

The intuitive model is **sequential consistency**, defined by Leslie Lamport in 1979: all threads' operations appear in some single order, consistent with each thread's program order. If thread A writes `data = 42` then `ready = true`, any thread that sees `ready` as true must also see `data` as 42.

Real systems don't work that way, for performance:

- **Compilers reorder** independent operations, keep values in registers, and eliminate redundant reads, all safe in a single thread.
- **Processors reorder** too. Store buffers let a core continue before its writes reach memory, and out-of-order execution runs instructions as their inputs become ready; see [[Speculative Execution]].
- **Caches** give each core its own view of memory, kept coherent by protocols that still allow some reorderings; see [[Locality of Reference]].

So another thread might see `ready` before `data`. On x86 processors, which have a relatively strong model, most reorderings are prevented; ARM chips allow many more, so code that worked on a laptop can fail on a phone or an ARM server.

A **data race** occurs when two threads access the same memory at the same time, at least one writes, and nothing orders the accesses. In C, C++, and Rust, a data race is undefined behavior: the program has no guaranteed meaning, and compilers may assume races don't happen when optimizing. Java instead gives racy programs weaker but defined semantics. A data race differs from a [[Race Condition]], which is a logic error about timing that can happen even with properly synchronized accesses.

Languages provide tools to restore order:

- **Locks** and other synchronization guarantee that everything done before releasing a lock is visible after acquiring it; see [[Deadlock]] for their hazards.
- **Atomic operations** read and write without tearing, and take an ordering, from relaxed (no ordering) through acquire-release to sequentially consistent.
- **Memory barriers**, or fences, are instructions that stop reordering across them.

The modern approach, adopted by Java in 2004 and C++ in 2011, is "sequential consistency for data-race-free programs": if you synchronize every shared access properly, your program behaves as if sequentially consistent, and you need not think about reordering. [[Lock-Free Data Structure]] authors give up that comfort and must reason about orderings directly.

Data races are notoriously hard to find. They depend on timing, so they appear as a [[Heisenbug]] or [[Flaky Test]]. ThreadSanitizer, a [[Sanitizer]], detects them at runtime. Rust's [[Ownership and Borrowing]] rules prevent them at compile time, and message-passing designs such as [[Communicating Sequential Processes]] and the [[Actor Model]] avoid shared mutable memory entirely, sidestepping the problem.

## See also
- [[Systematic Concurrency Testing]]
- [[Multithreading]]
- [[Futex]]
