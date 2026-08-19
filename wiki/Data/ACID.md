---
aliases:
  - Atomicity Consistency Isolation Durability
tags:
  - data
summary: The four guarantees a transactional database makes so concurrent, interrupted work never leaves data half-done.
---
**ACID** names the four guarantees a transactional database makes about a group of operations wrapped in a transaction: **atomicity** (all of it happens or none of it does — no partial writes survive a crash mid-transaction), **consistency** (a transaction only moves the database between states that satisfy its own declared constraints, like foreign keys and check constraints), **isolation** (concurrent transactions don't see each other's uncommitted, in-progress work), and **durability** (once committed, a transaction survives a crash the instant after, because it was written to a durable log before the client was told it succeeded).

Isolation is where the real subtlety lives, because "isolated" is a spectrum, not a boolean. Full serializability — transactions behave as if run one at a time in some order — is the strongest and most expensive level; most databases default to something weaker, like read committed or snapshot isolation, which permits specific anomalies (a repeated read within one transaction seeing different values, for instance) in exchange for much better concurrency. Choosing an isolation level is choosing which anomalies you can live with, not choosing whether there are any.

ACID is a single-node concept at heart — it describes what one database's transaction log can guarantee about its own state. Stretching those same guarantees across multiple databases or services is a much harder problem, which is why [[Two-Phase Commit]] and consensus protocols exist as separate, heavier machinery rather than ACID simply "scaling up." The opposite pole, BASE (Basically Available, Soft state, Eventually consistent), is the deliberate trade many distributed systems make instead — see [[Eventual Consistency]] and the [[CAP Theorem]] for why.

## See also
- [[CAP Theorem]]
- [[Two-Phase Commit]]
- [[Eventual Consistency]]
- [[Write-Ahead Logging]]

## Related
- [[Relational Database]]
