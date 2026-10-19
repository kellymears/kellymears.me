---
aliases:
  - Dekker's algorithm
  - Lamport's bakery algorithm
  - Mutual exclusion
tags:
  - computation
summary: A short procedure published in 1981 that lets two concurrent processes take turns using a shared resource with nothing but ordinary reads and writes, a classic of concurrency teaching that fails as written on modern processors.
---
**Peterson's algorithm** is a short procedure, published by Gary Peterson in 1981, that lets two concurrent processes share a resource without both using it at once, with only ordinary memory reads and writes. It solves the problem of **mutual exclusion**: guaranteeing that at most one process at a time is inside its critical section, the stretch of code that touches the shared data; see [[Race Condition]].

The problem looks simpler than it is. A naive approach, where each process sets a flag saying it wants to enter and then waits until the other's flag is down, can leave both waiting forever for the other to back off; see [[Deadlock]]. Strictly taking turns fails differently: a process wanting to enter twice in a row waits on one that doesn't want to enter at all.

Peterson's solution combines both ideas. Each process has a flag, and there's one shared variable naming whose turn it is. To enter, a process raises its flag, then politely gives the turn to the other process, then waits as long as the other's flag is up and the turn is still the other's. Whichever process wrote the turn variable last is the one that waits. The algorithm guarantees mutual exclusion, guarantees that some process can always proceed, and guarantees that neither waits indefinitely while the other enters again and again.

The waiting is done by checking the variables in a loop, burning processor time; see [[Spinlock]].

The algorithm had predecessors. The first correct two-process solution is credited to the Dutch mathematician Theodorus Dekker and was written up by Edsger Dijkstra in the 1960s, but **Dekker's algorithm** is noticeably more intricate. Leslie Lamport's **bakery algorithm** of 1974 handles any number of processes: each takes a numbered ticket, like customers in a shop, and the lowest number is served first.

On modern hardware, Peterson's algorithm as written doesn't work. Processors and compilers reorder memory operations for speed, so one process may not see the other's flag in time, and both can enter together. Making it correct requires explicit barriers that force ordering; see [[Memory Model]]. Real systems instead rely on special atomic instructions that read and update a value in one indivisible step, which make locks simpler and faster; see [[Lock-Free Data Structure]]. Higher-level tools such as semaphores are then built on those locks; see [[Semaphore]].

Today it matters mostly as teaching and proof material. It's small enough to reason about completely and a standard test case for tools that check every possible interleaving of a concurrent program; see [[Formal Verification]]. It also shows how hard concurrent reasoning is: a few lines of code, decades of study, and a subtle failure once the hardware changed; see [[Concurrency and Parallelism]].

## See also
- [[Communicating Sequential Processes]]
- [[Software Transactional Memory]]
- [[Mars Pathfinder Priority Inversion]]
