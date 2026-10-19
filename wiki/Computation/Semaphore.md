---
aliases:
  - Counting semaphore
  - Producer-consumer problem
  - Dining philosophers problem
tags:
  - computation
summary: A counter guarded by two atomic operations, wait and signal, that Dijkstra introduced in the 1960s to coordinate concurrent processes, still used to limit access to scarce resources and the root of the classic synchronization puzzles.
---
A **semaphore** is a synchronization tool for concurrent programs: an integer counter with two atomic operations. **Wait** decrements the counter if it is above zero, and otherwise blocks until it is. **Signal** increments it, waking one waiting process if any. Edsger Dijkstra introduced semaphores in the early 1960s and used them in the THE operating system; he named the operations P and V, from Dutch words. The name comes from railway signals that let one train at a time onto a track.

A semaphore's starting count says how many processes may proceed at once:

- **Binary semaphores** start at 1 and admit one process at a time, providing mutual exclusion around a shared resource; see [[Race Condition]].
- **Counting semaphores** start at N and limit concurrent access to N. A program holding ten database connections can use a semaphore of ten so the eleventh request waits; see [[Connection Pool]]. The same pattern caps parallel downloads or requests to a slow service; see [[Rate Limiting]] and [[Backpressure]].

Unlike a mutex, a semaphore has no owner: one process can wait and a different one signal. That makes semaphores useful for signaling between processes, not just locking, but also easier to misuse.

Dijkstra framed several classic problems that are still used to teach concurrency:

- **Producer-consumer.** Producers add items to a fixed-size buffer while consumers remove them. One semaphore counts empty slots, another counts full ones, and a lock protects the buffer itself; see [[Ring Buffer]].
- **Dining philosophers.** Five philosophers sit around a table with one fork between each pair, and each needs both neighboring forks to eat. If all pick up their left fork at once, each waits forever for the right one; see [[Deadlock]]. Fixes include ordering the resources or limiting how many may sit down at once.
- **Readers-writers.** Many readers can share data safely, but a writer needs it alone. Simple solutions can let a steady stream of readers starve writers forever.

Semaphores are low-level and unforgiving. Forgetting a signal blocks others forever; acquiring two in different orders in different places invites deadlock. A low-priority task holding a semaphore can stall a high-priority one, a problem known as priority inversion. Higher-level tools such as monitors, proposed by C. A. R. Hoare and Per Brinch Hansen in the 1970s, bundle a lock with condition variables so the compiler enforces correct use.

Inside an operating system, blocked processes are taken off the CPU until signaled, so waiting costs no processor time; see [[CPU Scheduler]] and [[Context Switch]]. Some designs avoid shared state altogether, passing messages instead; see [[Communicating Sequential Processes]] and [[Actor Model]]. Others use atomic hardware instructions directly; see [[Lock-Free Data Structure]].

## See also
- [[Mars Pathfinder Priority Inversion]]
- [[Multithreading]]
- [[Inter-Process Communication]]
- [[Distributed Lock]]
