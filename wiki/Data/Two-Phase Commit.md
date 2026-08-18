---
aliases:
  - 2PC
tags:
  - data
summary: A protocol for committing one transaction across multiple databases atomically, at the cost of blocking if the coordinator dies.
---
**Two-phase commit** is a protocol for making a single transaction succeed or fail atomically across multiple independent databases or services. It splits the commit into two rounds: in the *prepare* phase, a coordinator asks every participant to get ready and durably record that it can commit, and each replies yes or no; only if every participant says yes does the coordinator send a *commit* phase telling everyone to finalize. A single no, or a timeout, aborts the whole transaction everywhere.

The guarantee it buys is real: no participant commits unless all of them can, which is exactly the atomicity half of [[ACID]] extended across a network boundary that a single database's own transaction log can't reach. The cost is what makes it unpopular in practice. Once a participant votes yes in the prepare phase, it is *obligated* to commit and must hold its locks open until the coordinator's final word arrives — and if the coordinator crashes between the two phases, every participant is stuck holding those locks indefinitely, unable to unilaterally decide whether to commit or abort. This is the protocol's well-known blocking problem, and it's why 2PC shows up more in textbooks and legacy enterprise middleware (XA transactions) than in systems built for high availability.

Modern distributed systems mostly route around it rather than fixing it: [[Event Sourcing]] and the [[Change Data Capture|outbox pattern]] achieve cross-service consistency through eventual, retryable delivery instead of a blocking vote, and systems that do need synchronous cross-node agreement typically reach for a [[Consensus Algorithm]] like Raft, which tolerates a failed coordinator without freezing.

## See also
- [[ACID]]
- [[Consensus Algorithm]]
- [[Event Sourcing]]
- [[Eventual Consistency]]

## Related
- [[CAP Theorem]]
