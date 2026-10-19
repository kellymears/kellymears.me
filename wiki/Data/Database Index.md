---
aliases:
  - Secondary index
  - Composite index
  - Covering index
  - Query plan
tags:
  - data
summary: An auxiliary structure that lets a database find rows without scanning the whole table, trading write cost and storage for read speed.
---
A **database index** is a separate data structure that maps values in one or more columns to the rows that contain them, so the database can jump straight to matching rows instead of reading every row in the table. It works like a book's index: to find every mention of "replication," you look it up in the back rather than reading all the pages. Without an index, a query filtering on a column performs a *full table scan*, whose cost grows linearly with the table. With one, a lookup costs roughly logarithmic time.

Most [[Relational Database]] indexes are [[B-Tree]] structures, which keep keys sorted so they support exact matches, ranges, sorting, and prefix searches. [[Hash Table]] indexes handle only exact matches but do them in constant time. Specialized kinds cover other shapes of data: an [[Inverted Index]] for full-text search, spatial indexes for geography, and vector indexes for [[Embedding]] similarity in a [[Vector Database]].

Designing indexes is mostly about matching the queries that actually run:

- **Composite indexes** cover several columns in order. An index on (customer, date) serves "orders for this customer, newest first," but not "all orders on this date," because the sort order is by customer first. Column order matters.
- **Covering indexes** contain every column a query needs, so the database never has to visit the table at all.
- **Selectivity** decides usefulness. An index on a column with two values, like a boolean flag, rarely beats a scan, while one on an email address narrows to a single row.
- **The [[Query Planner|query planner]]** chooses whether to use an index, based on table statistics. Reading the plan, through `EXPLAIN`, shows what actually happens rather than what was assumed.

Indexes are not free. Every insert, update, and delete must update every index on the table, so each one slows writes and takes storage. Unused indexes are pure cost. Adding an index to a large live table can lock it for a long time, so production systems build them concurrently as part of a careful [[Database Migration]]. A missing index is the most common cause of a query that was fast in development, with a few hundred rows of [[Seed Data]], and slow in production with millions, a gap [[Big-O Notation]] predicts and [[Load Testing]] reveals.

## See also
- [[Library Classification]]
- [[Bitmap Index]]
- [[Collation]]
- [[Database Partitioning]]
