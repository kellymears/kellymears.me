---
aliases:
  - Lock-free
  - Compare-and-swap
  - Atomic operation
  - ABA problem
  - Wait-free
tags:
  - computation
summary: Concurrent data structures built on atomic hardware instructions instead of locks, so a stalled thread can never block the others, at the price of some of the hardest code in computing.
---
A **lock-free data structure** lets many threads read and modify it at once without any thread ever holding a lock. Instead of claiming exclusive access, each thread prepares its change and applies it with a single atomic hardware instruction, retrying if another thread got there first.

Locks are simple to reason about, but they have a structural weakness: a thread holding a lock can be paused by the operating system, through a [[Context Switch]], a page fault, or a crash, and every other thread that needs the lock waits too. Locks also enable [[Deadlock]] and priority inversion, where a low-priority thread holding a lock blocks a high-priority one.

The core tool is **compare-and-swap** (CAS), an instruction that says: if this memory location still holds value A, replace it with B, and tell me whether that worked. A lock-free stack push, for instance, reads the current top, builds a new node pointing to it, and uses CAS to swing the top to the new node. If another thread changed the top in between, the CAS fails and the loop tries again with the new value. This is the same idea as [[Optimistic Locking]] in databases, at the level of a single machine word.

Progress guarantees have precise names:

- **Lock-free** means that at every moment, some thread is making progress. One thread may retry repeatedly, but the system as a whole never stalls.
- **Wait-free** is stronger: every thread finishes in a bounded number of steps.

The famous trap is the **ABA problem**. A thread reads value A, gets paused, and meanwhile another thread changes the location to B and then back to A. The first thread's CAS succeeds because it sees A, but the structure it was reasoning about no longer exists. Defenses include pairing pointers with version counters and deferring memory reuse until no thread can still be looking.

That deferral, *safe memory reclamation*, is the hardest part. In a language with [[Garbage Collection]], the collector already guarantees that a node isn't freed while any thread holds a reference, which is why lock-free structures are easier in Java than in C++. Elsewhere, schemes such as hazard pointers and epoch-based reclamation do the job, or plain [[Reference Counting]] at a performance cost.

Lock-free is not automatically faster. Under heavy contention, threads waste effort on failed retries, and many cores hammering one memory location saturate cache traffic, hurting [[Locality of Reference]]. Correctness is also notoriously hard to test, since bugs depend on rare interleavings: a [[Race Condition]] may appear once in billions of runs, and tools like ThreadSanitizer, a [[Sanitizer]], and model checkers are standard. Most programmers should use well-tested library versions, such as a single-producer [[Ring Buffer]] or a concurrent [[Skip List]], rather than write their own.

## See also
- [[Concurrency and Parallelism]]
- [[Immutability]]
- [[Write-Ahead Logging]]
- [[Communicating Sequential Processes]]
