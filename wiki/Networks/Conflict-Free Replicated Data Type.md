---
aliases:
  - CRDT
  - Yjs
tags:
  - networks
summary: A data structure whose replicas can be edited independently and always converge without coordination.
---
A **conflict-free replicated data type** is a data structure designed so that independent replicas, edited concurrently and merged in any order, always converge to the same value — with no central authority and no coordination.

The property that makes this work is that merging is commutative, associative, and idempotent: order and duplication do not matter. Operations can therefore arrive out of order, arrive twice, or arrive after an arbitrary delay, and the result is the same. This is what allows offline editing to be a first-class capability rather than a special mode.

The trade is that convergence is guaranteed and *intent* is not. Two people editing the same word produce a deterministic result that neither may have wanted; the structure guarantees agreement, not satisfaction. Text CRDTs go to considerable lengths — identifiers per character, tombstones for deletions — to make the outcome feel reasonable, at the cost of metadata that grows with edit history.

Mature libraries make them practical for real applications: a shared document type, awareness of who is present, and pluggable transports so the same document can synchronise over a server, over [[WebRTC]], or through a local database. That last property is the interesting one architecturally — it makes a collaborative application possible with no server that anyone has to run.

## See also
- [[Eventual Consistency]]
- [[Peer-to-Peer]]
- [[WebRTC]]
- [[Idempotence]]
- [[Signaling Server]]
