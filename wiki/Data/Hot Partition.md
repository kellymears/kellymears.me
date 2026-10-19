---
aliases:
  - Hot key
  - Data skew
  - Celebrity problem
tags:
  - data
summary: A shard or partition that receives far more traffic than the rest because keys are unevenly popular or ordered, which makes one node the bottleneck of a system designed to scale by adding nodes.
---
A **hot partition** is one piece of a partitioned system that receives far more traffic than the others. Splitting data across machines by key is meant to spread load evenly; see [[Database Sharding]]. When the keys themselves are uneven, one machine works at its limit while the rest sit idle, and the whole system is only as fast as that one machine.

There are two main causes.

**Uneven popularity.** In most systems popularity follows a steep curve: a few keys get most of the traffic; see [[Zipf's Law]] and [[Pareto Principle]]. Social networks call it the celebrity problem. An account with a hundred million followers puts that much read traffic on whichever partition holds its posts, and a post from it can trigger a hundred million feed updates. Large social networks have handled celebrity accounts on separate code paths for this reason, merging their posts into feeds at read time instead of copying them out at write time.

**Ordered keys.** If data is split into ranges of the key and the key increases over time, like a timestamp or an auto-incrementing ID, every new write lands in the last range. One partition takes all the inserts while the others hold only old data. Randomly distributed IDs avoid this; see [[Universally Unique Identifier]].

Hashing keys to choose a partition spreads ordered keys evenly, and is the default in most distributed databases; see [[Consistent Hashing]]. It can't help with a single hot key, though, because one key always hashes to one place. The remedies for that:

- **Salting.** Append a random suffix from 0 to N to the hot key, so its writes spread over N partitions. Readers then fetch all N and combine them. A counter that every request increments is commonly split into many sub-counters this way.
- **Caching.** Serve hot reads from a cache in front of the partition; see [[Cache-Aside]].
- **Replication.** Keep extra copies of hot data for reads; see [[Database Replication]].
- **Adaptive splitting.** Some managed databases detect hot ranges and split or move them automatically.

The problem appears in batch and stream processing as **data skew**. A job that groups records by key sends each key to one worker. If one key has a billion records and the rest have hundreds, the job finishes when that worker does, while the rest of the cluster waits; see [[MapReduce]] and [[Stream Processing]].

Hot partitions are easy to miss with averages. Average load across the cluster looks moderate, while requests touching the hot node are slow or throttled, which shows up in the [[Tail Latency]]. Monitoring per partition, and per key where possible, makes them visible. Write contention on a single hot row has the same shape inside one database, as transactions queue for its lock; see [[Pessimistic Locking]].

## See also
- [[Two-Phase Locking]]
- [[Wide-Column Store]]
- [[Database Partitioning]]
