---
aliases:
  - CAP
tags:
  - data
summary: When a network splits a distributed system, it can stay consistent or stay available, but a proven theorem says not both.
---
The **CAP theorem** states that a distributed data system experiencing a network partition must choose between consistency and availability — it cannot guarantee both at once. Consistency here means every read sees the most recent write; availability means every request gets a non-error response; partition tolerance means the system keeps functioning despite dropped or delayed messages between nodes. Since a network can always partition, the real choice CAP describes is what happens *during* one: refuse to answer until the split heals (favor consistency), or answer anyway with possibly stale data (favor availability).

This is easy to overstate, and CAP's original 2000 conjecture has been refined since precisely because of that. Outside of an actual partition — the overwhelmingly common case for most systems most of the time — there's no forced tradeoff at all; a system can be both consistent and available as long as its nodes can talk to each other. CAP only bites during the partition itself, and it says nothing about latency, which is where most of the practical engineering tension actually lives (the related PACELC formulation makes that explicit: partition or not, a system also trades latency against consistency).

In practice, systems pick a lean rather than an absolute: a leader-based [[Database Replication|replicated]] relational database favors consistency, rejecting or stalling writes rather than risk serving stale reads if it can't reach a quorum; a system like DNS or a shopping cart favors availability, always answering and reconciling any conflicting writes later — the same reconciliation problem [[Eventual Consistency]] and [[Conflict-Free Replicated Data Type|CRDTs]] exist to solve.

## See also
- [[Eventual Consistency]]
- [[Conflict-Free Replicated Data Type]]
- [[Database Replication]]
- [[Consensus Algorithm]]

## Related
- [[ACID]]
