---
aliases:
  - Data replication
  - Read Replica
  - Read replicas
tags:
  - data
summary: Copying the same data to multiple database nodes for redundancy and read scale, at the cost of a lag window.
---
**Database replication** keeps copies of the same data on multiple database nodes, typically one primary that accepts writes and one or more replicas that apply the same changes afterward. It solves two problems at once: redundancy (a replica can be promoted via [[Leader Election]] if the primary dies) and read scale (queries can be spread across read replicas instead of all hitting one machine — though only *read* scale, since every replica still has to apply every write), without changing what data exists — every replica eventually holds the same rows, unlike [[Database Sharding]], which splits *different* data across nodes.

Replication is either synchronous or asynchronous, and the difference is the whole ballgame. Synchronous replication waits for a replica to confirm it has the write before telling the client the transaction succeeded, which guarantees no committed data is ever lost to a primary failure but adds the replica's round-trip latency to every write. Asynchronous replication — the far more common default — tells the client success as soon as the primary itself has durably written it, and ships the change to replicas afterward on its own schedule. That gap is **replication lag**: a window, usually milliseconds but sometimes much longer under load, during which a read replica can serve a value that's already stale relative to the primary.

Replication lag is the source of a specific, easy-to-miss class of bug: a user submits a form, the write commits to the primary, the very next request reads from a lagging replica, and the user's own change appears to have vanished. Systems that care about this either route a user's own reads back to the primary for a short window after their write, or accept the staleness as part of the [[Eventual Consistency]] contract and design the UI not to promise otherwise.

## See also
- [[Database Sharding]]
- [[Eventual Consistency]]
- [[CAP Theorem]]

## Related
- [[Write-Ahead Logging]]
