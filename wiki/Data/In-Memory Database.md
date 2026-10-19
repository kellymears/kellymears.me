---
aliases:
  - Main-memory database
  - In-memory data store
tags:
  - data
summary: A database that keeps its working data in RAM rather than on disk, trading capacity and some durability for speed, an approach that became practical as memory grew cheap and is now common for caches, sessions, and analytics.
---
An **in-memory database** keeps its primary copy of data in a computer's main memory rather than on disk. Reading from memory is many times faster than reading from even a fast solid-state drive, so queries that would wait on storage finish almost immediately; see [[Memory Hierarchy]].

Traditional databases were designed around slow disks. They keep data in fixed-size pages, cache the busiest ones in a pool of memory, and organize indexes to minimize disk reads; see [[B-Tree]]. Researchers have argued that much of a traditional database's time goes to this machinery rather than to useful work. A system that assumes everything fits in memory can drop it, using simpler structures like hash tables and direct pointers.

The idea is old, but memory prices made it practical. In 1987, Jim Gray and Franco Putzolu proposed the five-minute rule: given the prices of the time, data accessed more often than about every five minutes was cheaper to keep in memory than to fetch from disk. As memory became cheaper and larger, more data crossed that threshold. Servers with hundreds of gigabytes or terabytes of memory now hold entire working datasets.

Memory loses its contents when power fails, so durability needs other means:

- **Snapshots** write the whole dataset to disk periodically, risking the changes since the last one; see [[Backup and Restore]].
- **Append-only logs** record each change on disk before or after applying it, and are replayed on restart; see [[Write-Ahead Logging]].
- **Replication** keeps copies on other machines, betting they won't all fail at once; see [[Database Replication]].

How much a system does here determines whether it's a database or a cache. Memcached, released in 2003, is a pure cache: it evicts old entries when full and recovers nothing after a restart; see [[Least Recently Used Cache]] and [[Time to Live]]. Redis, released in 2009, began as a fast store for data structures with optional persistence, and is widely used for sessions, queues, counters, and leaderboards; see [[Key-Value Store]].

In-memory systems also serve analytics. Products such as SAP HANA, launched in 2010, keep columns of business data in memory to run reports without a separate warehouse; see [[Columnar Storage]].

The trade-offs:

- **Capacity and cost.** Memory costs far more per gigabyte than disk, and a dataset that outgrows it has to be split across machines or moved.
- **Restart time.** Reloading a large dataset from disk can take minutes.
- **Memory pressure.** Running out of memory can get a process killed by the operating system; see [[Out-of-Memory Killer]].

Embedded databases often offer an in-memory mode, which is handy for tests; see [[SQLite]]. Applications commonly pair an in-memory store with a durable database behind it; see [[Cache-Aside]] and [[Write-Behind Cache]].

## See also
- [[Dynamic Random-Access Memory]]
- [[ACID]]
