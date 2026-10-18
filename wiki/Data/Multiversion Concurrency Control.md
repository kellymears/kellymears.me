---
aliases:
  - MVCC
  - Multiversioning
  - Row versioning
  - VACUUM
  - Table bloat
tags:
  - data
summary: Keeping several versions of each row so readers see a consistent snapshot without blocking writers, the design behind PostgreSQL, Oracle, and most modern databases.
---
**Multiversion concurrency control (MVCC)** is a way for a database to let many transactions read and write at once without making readers and writers wait for each other. Instead of overwriting a row in place, an update creates a new version of it and keeps the old one. Each transaction sees the versions that were current when it started, a consistent *snapshot*, so a long report can run while other transactions change the same rows underneath it.

The alternative is locking. In a purely lock-based database, a writer locks a row and readers wait, or a reader locks a row and writers wait, as in classic two-phase locking. MVCC's guiding rule is that readers never block writers and writers never block readers. Writers still conflict with each other when they touch the same row.

The idea goes back to David Reed's 1978 doctoral thesis at MIT and was refined by Philip Bernstein and Nathan Goodman in the early 1980s. Today it underlies PostgreSQL, Oracle, MySQL's InnoDB, SQL Server's snapshot modes, CockroachDB, and many others.

Implementations differ in where old versions live:

- **PostgreSQL** stores every version in the table itself. Each row carries the IDs of the transaction that created it and the one that deleted or replaced it, and a query checks those IDs against its snapshot to decide which version is visible.
- **Oracle and InnoDB** update the row in place and keep the old values in a separate *undo log*, rebuilding older versions on demand for readers that need them.

Old versions pile up, and cleaning them is MVCC's main cost. A version can be removed only once no running transaction could still see it. PostgreSQL does this with a process called VACUUM, and a single transaction left open for hours prevents cleanup across the whole database, producing *table bloat*: tables and indexes that grow while holding mostly dead rows. The work resembles [[Garbage Collection]] in a programming language, with the same tension between keeping up and not stealing time from real work.

MVCC is the natural foundation for snapshot isolation, described under [[Isolation Level]], and it shares ideas with other designs that prefer adding new versions to overwriting old ones. [[Copy-on-Write]] filesystems keep old blocks for [[Filesystem Snapshot]] support, [[Immutability]] in programming makes sharing safe the same way, and [[Event Sourcing]] keeps every past state recoverable. A [[Conflict-Free Replicated Data Type]] tracks versions across machines instead of across transactions.

Versions also interact with durability and replication. New versions are recorded through [[Write-Ahead Logging]] before they are visible, and that same log feeds [[Database Replication]] and [[Change Data Capture]]. Where conflicts between writers are rare, MVCC pairs naturally with [[Optimistic Locking]], letting transactions proceed and checking for a clash only at commit.

## See also
- [[Bitemporal Data]]
- [[ACID]]
- [[Copy-on-Write]]
- [[Distributed SQL]]
