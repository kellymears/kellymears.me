---
aliases:
  - Table partitioning
  - Partition pruning
tags:
  - data
summary: Splitting one large database table into smaller physical pieces by date, category, or hash, so queries skip irrelevant pieces and old data can be dropped whole, while the table still looks like one table to the application.
---
**Database partitioning** divides a large table into smaller physical pieces, called partitions, while queries still treat it as one table. A table of ten years of orders might be stored as 120 monthly partitions. The application writes and reads the orders table as before; the database routes each row to the right piece.

The common schemes:

- **Range partitioning** assigns rows by ranges of a key, most often a date. It's the natural fit for data that arrives over time; see [[Time Series Database]].
- **List partitioning** assigns rows by explicit values, such as one partition per country or product line.
- **Hash partitioning** spreads rows evenly by hashing a key, useful when no natural range exists; see [[Hash Function]].

Partitioning by columns instead of rows, putting rarely used wide columns in a separate table, is sometimes called vertical partitioning; see [[Columnar Storage]].

The main benefit is **partition pruning**. When a query filters on the partition key, the planner skips every partition that can't contain matching rows. A report on last month reads one partition instead of 120; see [[Query Planner]]. Indexes stay smaller too, since each partition has its own; see [[Database Index]].

The other benefit is maintenance. Deleting a year of old rows one by one is slow, bloats the table, and generates heavy logging. Dropping or detaching a partition removes it almost instantly, which makes retention rules cheap to enforce; see [[Data Retention]]. Old partitions can also be moved to cheaper storage, archived, or compressed separately, and vacuuming and backups can proceed partition by partition.

Partitioning isn't the same as spreading data across machines. Partitions usually live inside one database server; splitting data across many servers is sharding, which builds on the same ideas but adds network coordination; see [[Database Sharding]]. Both share a classic failure: if most activity lands on one key range, such as today's date, one piece takes all the load; see [[Hot Partition]].

The costs are real. Queries that don't filter on the partition key must check every partition and can get slower than on an unpartitioned table. Some databases require unique constraints to include the partition key, because uniqueness can only be checked within a partition; see [[Unique constraint]]. Thousands of tiny partitions add planning overhead. And the choice of key is hard to change later, since repartitioning means rewriting the table; see [[Database Migration]].

PostgreSQL added declarative partitioning in version 10, released in 2017, after years in which it was assembled by hand from table inheritance and triggers; see [[Database trigger]].

Partitioning helps when queries and maintenance follow the same boundary as the partitions. It's a way of arranging data to match how it's actually used, the same principle that makes caches work; see [[Locality of Reference]].

## See also
- [[Database Replication]]
- [[Soft Delete]]
