---
aliases:
  - Read-only replica
tags:
  - data
summary: A replicated database copy dedicated to serving reads, scaling query capacity apart from write capacity.
---
A **read replica** is a copy of a database, kept in sync via [[Database Replication]], that serves read queries but never accepts writes directly. Its purpose is scaling reads independently of writes: an application can point its query traffic at several read replicas while all writes still funnel through one primary, which works because most workloads read far more often than they write, so the read side is usually where capacity runs out first.

Read replicas inherit replication's central tradeoff: they lag. A write lands on the primary and is applied to each replica afterward, on a delay that's usually small but is never guaranteed to be zero, so a query against a replica can return data that's already a moment stale relative to the primary. This is the practical, everyday face of [[Eventual Consistency]] — most applications never notice, but the specific case of "I just saved this, and the next page load doesn't show it" is replication lag surfacing directly to a user, and it's common enough that many systems route a user's own immediate follow-up read back to the primary rather than risk it.

Read replicas solve read scale but not write scale — every replica still has to apply the same stream of writes the primary does, so adding more of them does nothing for how fast the system can accept new writes. [[Database Sharding]] is the tool for that different problem, splitting the data itself across multiple independently-writable databases rather than copying all of it everywhere. The two combine in large systems: each shard replicated for read scale and failover, sharding handling write scale.

## See also
- [[Database Replication]]
- [[Database Sharding]]
- [[Eventual Consistency]]
- [[CAP Theorem]]
