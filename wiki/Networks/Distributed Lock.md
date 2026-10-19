---
aliases:
  - Lease
  - Lock service
tags:
  - networks
summary: A lock shared across machines so that only one process does a given job at a time, harder than it looks because a process can pause or lose contact while still believing it holds the lock.
---
**A distributed lock** lets processes on different machines agree that only one of them does a given job at a time: sending a nightly email, writing to a file, or charging a customer. On one machine, a lock is easy, since the operating system knows exactly which thread holds it; see [[Deadlock]]. Across a network, every part of that certainty disappears.

The basic difficulty is that a lock holder can stop without knowing it. A process can pause for seconds during [[Garbage Collection]], be swapped out, or lose its network connection. If the lock never expires, a crashed holder blocks everyone forever. So distributed locks are **leases**: they expire after a set time unless renewed, an idea described by researchers at Stanford in 1989.

Expiry creates the classic bug:

1. Client A acquires a lease for 10 seconds and starts writing.
2. A pauses for 15 seconds.
3. The lease expires, and client B acquires the lock and starts writing.
4. A wakes, still believing it holds the lock, and finishes its write, overwriting B's work.

Nothing in A's code was wrong. Checking the clock before writing doesn't help, because the pause can happen between the check and the write; see [[Race Condition]]. Clocks on different machines also drift and jump; see [[Clock skew]] and [[Timeout]].

The standard fix is a **fencing token**. Each time the lock is granted, the service hands out a number one higher than the last. The storage system remembers the highest number it has seen and rejects writes carrying a lower one, so A's late write fails; see [[Fencing token]]. The storage itself must cooperate.

Where the lock lives matters too. A lock stored on one server vanishes when that server fails. Reliable lock services run on several machines and use a [[Consensus Algorithm]] so that a majority must agree on who holds each lock; see [[Quorum]]. Google described its lock service, Chubby, in 2006, and open-source systems such as ZooKeeper and etcd fill the same role. The same machinery picks a leader among servers; see [[Leader Election]].

The engineer Martin Kleppmann argued in 2016 that it helps to ask why a lock is needed. If it only avoids duplicate work for efficiency, an occasional double run is acceptable and a simple lock is fine. If correctness depends on it, the lock needs consensus and fencing, and often a different design is better:

- make the operation safe to repeat; see [[Idempotence]];
- write only if the data hasn't changed since it was read; see [[Optimistic Locking]];
- give each piece of data a single owner, so no lock is needed.

A scheduled job running on every server in a cluster is the most common place teams first need one; see [[Cron]].

## See also
- [[Failure Detection]]
- [[Fallacies of Distributed Computing]]
- [[Two-Phase Locking]]
