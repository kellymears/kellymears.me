---
aliases:
  - Horizontal partitioning
tags:
  - data
summary: Splitting one dataset across multiple databases by key, trading a single point of scale for cross-shard complexity.
---
**Database sharding** splits a dataset across multiple independent database instances, each holding a disjoint subset of the rows, chosen by some partitioning key — a customer ID, a tenant ID, a geographic region. Where [[Database Replication|replication]] copies the *same* data to multiple nodes for redundancy and read scale, sharding divides *different* data across nodes so that no single machine has to hold, or serve queries against, the entire dataset. The two are usually combined: each shard is itself replicated.

The appeal is that sharding is close to the only way to scale write throughput past what one machine's disk and CPU can do, since replication multiplies reads but every replica still has to apply the same writes. The cost shows up the moment a query needs data from more than one shard. A join across two customers on two different shards, or an aggregate across the whole dataset, either becomes a fan-out query the application has to stitch together itself, or requires a separate analytical system built for exactly that. Transactions across shards lose the easy [[ACID]] guarantees a single database gives for free, landing back in [[Two-Phase Commit]] or eventual-consistency territory.

The partitioning key is the single decision the whole design hangs on, and it's hard to change later without a live data migration. A key that distributes load evenly ([[Consistent Hashing|hashing]] a customer ID) scales cleanly but kills range queries; a key chosen for query locality (a date range, a region) scales unevenly if one shard's traffic outgrows the rest — the classic "hot shard" problem, where one partition becomes the bottleneck the whole design was meant to avoid.

## See also
- [[Database Replication]]
- [[Two-Phase Commit]]
- [[Multi-Tenancy]]

## Related
- [[CAP Theorem]]
