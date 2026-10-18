---
aliases:
  - NewSQL
  - Spanner
  - TrueTime
  - CockroachDB
tags:
  - data
summary: Relational databases that spread tables across many machines and regions while keeping SQL and serializable transactions, built on consensus groups and careful clocks, starting with Google's Spanner.
---
**Distributed SQL** databases keep what a [[Relational Database]] offers, SQL queries and transactions with full [[ACID]] guarantees, while spreading the data across many machines and often many regions. They exist because the earlier route to scale gave those guarantees up.

In the 2000s, web companies that outgrew one database server either split their data by hand across many servers, leaving cross-shard queries and transactions to the application, or moved to NoSQL stores that scaled out by dropping joins and multi-row transactions; see [[Database Sharding]]. Both pushed consistency problems onto developers. The analyst Matthew Aslett coined the term **NewSQL** in 2011 for systems trying to have both.

The landmark is Google's **Spanner**, described in a 2012 paper. It stores data across data centers on several continents and still gives transactions a single global order, a property it calls external consistency: if one transaction commits before another starts, every reader sees them in that order. Ordering across continents needs agreement on time, and machine clocks drift; see [[Network Time Protocol]]. Spanner's **TrueTime** uses GPS receivers and atomic clocks in every data center to report the current time as an interval with a known error bound, typically a few milliseconds; see [[Global Positioning System]]. A transaction waits out that uncertainty before reporting success, a step called commit-wait, so no later transaction can receive an earlier timestamp.

Open-source systems followed without special clock hardware, among them CockroachDB, YugabyteDB, and TiDB, all started in the mid-2010s. The common design:

- **Ranges.** Tables are split into contiguous key ranges of up to a few hundred megabytes, which split and move between machines automatically.
- **Consensus per range.** Each range is copied to three or five machines that agree on writes through Raft, so losing a minority of copies loses nothing; see [[Consensus Algorithm]] and [[Database Replication]].
- **Distributed transactions.** A transaction touching several ranges commits through a variant of [[Two-Phase Commit]], with each range's consensus group as a participant.
- **Versioned rows.** Reads see a consistent snapshot without blocking writes; see [[Multiversion Concurrency Control]].
- **Hybrid clocks.** Without atomic clocks, timestamps combine physical time with a counter, and a read may restart when clock uncertainty makes the order unclear; see [[Logical Clock]].

The price is latency. Each write waits for a majority of replicas and, if they span regions, for cross-region round trips of tens of milliseconds. During a [[Network Partition]], ranges that lose their majority stop accepting writes: these systems choose consistency under the [[CAP Theorem]]. Defaults are usually serializable rather than a weaker level; see [[Isolation Level]].

Pinning rows to a customer's region cuts that latency and can satisfy residency laws too.

Most applications still fit on one well-run server with a replica, and stay simpler there.

## See also
- [[Atomic Clock]]
- [[Data Sovereignty]]
