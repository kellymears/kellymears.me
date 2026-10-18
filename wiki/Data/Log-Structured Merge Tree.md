---
aliases:
  - LSM tree
  - LSM-tree
  - Log-structured storage
  - SSTable
  - Memtable
  - Compaction
tags:
  - data
summary: A storage engine design that turns every write into a fast sequential append and sorts things out later in the background, the basis of RocksDB, Cassandra, and many write-heavy databases.
---
A **log-structured merge tree (LSM tree)** is a way of organizing data on disk that is optimized for writes. Rather than updating records where they sit, it buffers writes in memory and periodically flushes them to disk as new, sorted, immutable files, merging those files together in the background. Patrick O'Neil and colleagues described it in 1996, and Google's Bigtable paper in 2006 made it widely known.

The structure has three layers:

- **The memtable.** New writes go into a sorted structure in memory. They are also appended to a log on disk, through [[Write-Ahead Logging]], so they survive a crash.
- **SSTables.** When the memtable fills, it is written out as a *sorted string table*: an immutable file of keys in order. Writing a whole sorted file at once is a fast sequential operation, far quicker than scattered updates.
- **Compaction.** Over time, SSTables pile up. A background process merges them, much like the merge step of merge sort, keeping only the newest value for each key and dropping deleted ones. Deletes are written as markers called tombstones, which are removed during compaction.

Reads are the cost. A key might be in the memtable or any of several SSTables, so a lookup may check many files, newest first. Two techniques keep this fast: each SSTable has a sparse index, and a [[Bloom Filter]] per file quickly answers "this key is definitely not here," skipping most files without reading them.

The LSM tree's main rival is the [[B-Tree]], which updates pages in place and is used by most traditional relational databases. The trade-off is usually described in terms of three kinds of *amplification*:

- **Write amplification.** How many bytes are written to disk per byte of data. B-trees rewrite whole pages for small changes, while LSM trees rewrite data repeatedly during compaction.
- **Read amplification.** How many places a read must look. B-trees win here.
- **Space amplification.** How much extra disk is used. LSM trees hold outdated values until compaction removes them.

In general, LSM trees handle heavy write loads better and compress well, while B-trees give more predictable reads. Compaction can also cause latency spikes when it competes with foreground traffic, showing up as [[Tail Latency]].

LSM trees power LevelDB and its successor RocksDB, which underlie many other systems, as well as Cassandra, HBase, ScyllaDB, and the time-series and logging stores that ingest data continuously. Their append-only, immutable files reflect the same ideas as [[Immutability]] and [[Event Sourcing]], and work well with [[Database Replication]], since immutable files are easy to copy. The design is also a reminder that sequential disk access beats random access, a principle that outlived spinning disks into the era of SSDs. [[Columnar Storage]] engines often borrow the same immutable-file approach.

## See also
- [[B-Tree]]
- [[Write-Ahead Logging]]
- [[Bloom Filter]]
- [[Database Index]]
- [[Key-Value Store]]
