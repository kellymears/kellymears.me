---
aliases:
  - Key-value database
  - NoSQL
  - Redis
  - Dynamo
  - Embedded database
tags:
  - data
summary: The simplest kind of database, which stores opaque values under unique keys and supports little more than get, put and delete, trading query power for speed and easy scaling.
---
A **key-value store** is a database that does one thing: store a value under a key and return it when asked. The interface is little more than `get`, `put` and `delete`. The database doesn't look inside the value, which may be a string, a JSON document or a blob of bytes. It is the [[Hash Table]] turned into a service, made durable or shared across machines.

Early examples were embedded libraries, such as Berkeley DB in 1991, linked directly into a program. Memcached (2003) was a networked, in-memory cache that sat in front of slower databases. Redis (2009) added persistence and data structures such as lists, sets and sorted sets. Amazon's 2007 Dynamo paper described a highly available key-value store spread across many machines, and it became a founding text of the "NoSQL" movement. Embedded engines such as LevelDB and RocksDB, built on a [[Log-Structured Merge Tree]], now sit underneath many larger databases.

The simplicity buys three things:

- **Speed.** Lookup by key is a single index operation, so in-memory stores answer in well under a millisecond.
- **Easy partitioning.** With no queries across keys, data can be split by key across many machines. [[Consistent Hashing]] decides which machine owns which keys, so adding nodes moves only a small fraction of the data. This is [[Database Sharding]] in its cleanest form.
- **Predictable cost.** Every operation costs about the same, so latency stays flat as data grows.

The price is everything a [[Relational Database]] does for you. There are no queries by value, no [[SQL Join]], and usually no secondary indexes or transactions across keys. You design keys around how the data will be read: `user:42:profile`, `user:42:sessions`. A question nobody planned for may require scanning everything. Data is often duplicated so each access pattern has its own key, a deliberate [[Denormalization]].

Distributed key-value stores must also choose a consistency model. Dynamo-style systems favor availability. Writes go to several replicas, reads and writes use a tunable [[Quorum]], replicas can briefly disagree under [[Eventual Consistency]], and conflicting versions are detected with a [[Logical Clock]]. Others, such as etcd, run a [[Consensus Algorithm]] so every read sees the latest write, at the cost of throughput, which suits configuration and coordination data.

Typical uses:

- **Caching** query results and rendered pages, evicting by [[Least Recently Used Cache]] policy and expiring entries with a time to live.
- **Sessions**, shopping carts and other per-user state looked up by ID.
- **Counters** for [[Rate Limiting]] and quotas, using atomic increments.
- **Configuration** and [[Feature Flag]] values read on every request.

A common failure is the **hot key**: one celebrity's profile or one global counter sends all its traffic to one partition, no matter how many machines the cluster has.

## See also
- [[Eventual Consistency]]
