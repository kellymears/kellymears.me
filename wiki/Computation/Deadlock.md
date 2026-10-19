---
aliases:
  - Deadlocks
  - Livelock
  - Mutex
  - Lock ordering
  - Dining philosophers
  - Priority inversion
tags:
  - computation
summary: When two or more processes each wait for something another holds, so none can ever proceed, and the four conditions that must all be true for it to happen.
---
A **deadlock** occurs when two or more processes are each waiting for a resource another one holds, so none of them can ever proceed. Thread 1 holds lock A and waits for lock B. Thread 2 holds lock B and waits for lock A. Neither will let go, so both wait forever. Unlike a crash, a deadlock often produces no error, just a program that stops responding.

Edward Coffman and colleagues identified in 1971 four conditions that must all hold for a deadlock to occur:

- **Mutual exclusion.** A resource can be held by only one process at a time, as with a *mutex* (mutual exclusion lock).
- **Hold and wait.** A process holds one resource while waiting for another.
- **No preemption.** Resources can't be taken away, only released voluntarily.
- **Circular wait.** A cycle of processes each waits for the next.

Breaking any one prevents deadlock. The most common practical fix targets circular wait with **lock ordering**: every thread acquires locks in the same global order, so no cycle can form. Others include acquiring all needed locks at once, using timeouts or try-lock so a thread backs off instead of waiting forever, and avoiding shared locks altogether through message passing, as in the [[Actor Model]], or [[Immutability]].

Edsger Dijkstra's **dining philosophers** problem (1965) is the classic illustration: five philosophers around a table share five forks, each needs two to eat, and if each picks up the left fork first, all wait forever for the right. Numbering the forks and always taking the lower-numbered one first breaks the cycle.

Related failures:

- **Livelock.** Processes keep reacting to each other without making progress, like two people repeatedly stepping aside in the same direction in a hallway.
- **Starvation.** A process waits indefinitely because others keep getting the resource first. See [[Resource Starvation]].
- **Priority inversion.** A high-priority task waits on a lock held by a low-priority one, which is itself preempted by medium-priority work. NASA's Mars Pathfinder kept resetting in 1997 for this reason, until engineers enabled priority inheritance remotely. It is a hazard for any [[CPU Scheduler]].

Databases deal with deadlocks constantly under [[Pessimistic Locking]]. They detect them by finding cycles in a graph of which transaction waits for which, the same check a [[Topological Sort]] performs, then abort one transaction as a victim so the rest proceed. [[Optimistic Locking]] avoids waiting altogether and retries on conflict. A subtler version is pool exhaustion: if every request holds one connection from a [[Connection Pool]] while waiting for a second, the pool runs dry and everything stalls.

Deadlocks, like a [[Race Condition]], depend on timing and are hard to reproduce, a classic [[Heisenbug]]. [[Deterministic Simulation Testing]] and lock-order checkers help find them before production does.

## See also
- [[Software Transactional Memory]]
- [[Systematic Concurrency Testing]]
- [[Two-Phase Locking]]
- [[File Locking]]
