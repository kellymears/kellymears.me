---
aliases:
  - Lamport clock
  - Lamport timestamp
  - Vector clock
  - Happens-before
  - Hybrid logical clock
  - Clock skew
tags:
  - networks
summary: Counters that order events across machines by cause and effect rather than wall-clock time, since no two computers' clocks agree exactly.
---
A **logical clock** orders events in a distributed system using counters instead of physical time. Each machine has its own clock, and those clocks disagree: they drift by milliseconds per day, get corrected in jumps by time sync, and can even run backward. *Clock skew* means a timestamp from one machine can't be reliably compared with one from another. If two servers record writes at 10:00:00.003 and 10:00:00.005, the second may well have happened first. Systems that resolve conflicts with "last write wins" by wall-clock time lose data this way.

Leslie Lamport's 1978 paper "Time, Clocks, and the Ordering of Events in a Distributed System" reframed the problem. What matters is usually not when something happened but whether it could have caused something else. He defined the **happens-before** relation: A happens before B if they occurred in that order on the same machine, or if A was the sending of a message and B its receipt, or through a chain of such steps. Events with no such chain between them are *concurrent*. Neither could have influenced the other, whatever the wall clocks say.

Lamport's **logical clock** captures this with a single counter per process:

- Increment the counter before each local event.
- Attach the counter to every message sent.
- On receiving a message, set the counter to the larger of its own value and the message's, then increment.

If A happened before B, A's timestamp is smaller. The reverse doesn't hold, since a smaller timestamp doesn't prove causation, so Lamport clocks give a consistent total order but can't detect concurrency.

**Vector clocks** can. Each process keeps a counter for *every* process, and messages carry the whole vector. Comparing two vectors tells whether one event happened before the other, after it, or concurrently. Concurrent writes are exactly the conflicts a system must resolve, by merging them as in a [[Conflict-Free Replicated Data Type]] or by surfacing both versions, as Amazon's Dynamo returned sibling values. The cost is size, since vectors grow with the number of participants.

**Hybrid logical clocks** combine a physical timestamp with a logical counter, staying close to real time while respecting causality, and are used in databases such as CockroachDB. Google's Spanner took the opposite route, using GPS and atomic clocks to bound uncertainty and waiting it out before committing.

Version control already lives by these ideas. A commit graph is a happens-before graph, and two branches without a path between them are concurrent edits, which is what a [[Three-Way Merge]] reconciles. The same reasoning underlies [[Eventual Consistency]], [[Event Sourcing]] order, and debugging any [[Race Condition]].

## See also
- [[Conflict-Free Replicated Data Type]]
- [[Eventual Consistency]]
- [[Three-Way Merge]]
- [[Race Condition]]
- [[Time Zone]]
- [[Gossip Protocol]]
- [[Consensus Algorithm]]
- [[Formal Verification]]
