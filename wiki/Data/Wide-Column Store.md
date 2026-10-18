---
aliases:
  - Bigtable
  - Cassandra
  - Column family
tags:
  - data
summary: A database that stores sparse rows of named columns grouped by a partition key and kept sorted on disk, built for huge write volumes spread across many machines, as in Bigtable, HBase, and Cassandra.
---
A **wide-column store** is a kind of distributed database that organizes data into rows identified by a key, where each row can hold a different, possibly enormous, set of named columns. Google described the design in its 2006 Bigtable paper. HBase copied it, and Cassandra, released by Facebook in 2008, combined it with the replication design of Amazon's Dynamo. Despite the name, it is a different thing from [[Columnar Storage]], which stores each column contiguously to speed analytical scans.

The data model is best understood as a sorted map of maps. A **partition key** decides which machine holds a row, usually by hashing it onto a ring; see [[Consistent Hashing]] and [[Database Sharding]]. Within a partition, rows are kept sorted by a **clustering key**, and each row is a sparse set of columns: a missing column costs nothing, and a row can grow to millions of columns. Bigtable added time-stamped versions of each cell, so a column can hold its own history.

That shape suits a particular kind of workload:

- **Heavy writes.** Writes go to an in-memory table and an append-only log, then flush to immutable sorted files merged in the background, the [[Log-Structured Merge Tree]] design. Writing never waits on rewriting a page in place.
- **Range reads within a partition.** Because rows sit sorted by the clustering key, "the last hundred readings from this sensor" is one contiguous read.
- **Scale without a leader.** Cassandra has no primary node. Machines find each other via a [[Gossip Protocol]], each write goes to several replicas, and the caller picks how many must answer for a read or write to count; see [[Quorum]] and [[Eventual Consistency]].

The price is that queries must be designed in advance. There are no joins and few secondary indexes; a query that doesn't start from the partition key means scanning the whole cluster. The usual practice is the reverse of [[Database Normalization]]: work out every question the application will ask, then build one table per question, duplicating data freely; see [[Denormalization]]. Changing what the application needs to ask often means a new table and a [[Backfill]].

Other hazards follow from the design:

- **Hot partitions.** A key that draws far more traffic than others, such as one celebrity's timeline, overloads the machines that own it.
- **Tombstones.** Deletes in an append-only store are written as markers that hide older values until compaction removes them. Workloads that delete heavily pile up markers that every read must skip; see [[Soft Delete]].
- **Consistency trade-offs.** Tunable consistency means a careless setting can return stale or conflicting values, and last-write-wins resolution depends on clocks agreeing; see [[CAP Theorem]] and [[Clock synchronization]].

## See also
- [[Key-Value Store]]
- [[Time Series Database]]
