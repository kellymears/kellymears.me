---
aliases:
  - Read-through cache
  - Write-through cache
  - Cache hit ratio
tags:
  - data
summary: The common caching pattern in which the application checks a cache first, loads from the database on a miss, and deletes the cached copy on writes, simple to build and full of subtle races.
---
**Cache-aside** is the most common way to put a cache in front of a database. The application manages the cache itself:

1. **Read.** Look up the key in the cache. On a hit, return the cached value.
2. **Miss.** Otherwise read from the database, store the result in the cache with an expiry time, and return it; see [[Time to Live]].
3. **Write.** Update the database, then delete the cached key, so the next read loads the fresh value.

The cache is usually an in-memory store such as Redis or Memcached; see [[Key-Value Store]]. A cache failure degrades to slower reads rather than errors.

It has several relatives:

- **Read-through.** The cache library loads missing values itself, so the application talks only to the cache.
- **Write-through.** Every write goes to the cache and the database together, keeping the cache current at the cost of slower writes.
- **Write-behind.** Writes go to the cache and reach the database later, in batches; see [[Write-Behind Cache]].

Deleting on write instead of updating the cache is deliberate. If two writers update the cache in a different order than they updated the database, the cache keeps the older value indefinitely. Deletion avoids that, but not every race. A reader can miss, fetch the old value from the database, stall, and then store it in the cache just after a writer has updated the database and deleted the key. The stale value then stays until it expires; see [[Race Condition]]. Expiry times put a bound on how long such errors last, which is why almost every cached value has one. Facebook's 2013 paper on scaling Memcached described leases, tokens that let the cache reject a stale fill. The general problem has its own reputation; see [[Cache Invalidation]].

Load raises other problems. When a popular key expires, thousands of requests can miss at once and all hit the database; see [[Thundering Herd]]. When a whole cache restarts empty, the database suddenly receives the full traffic the cache had been absorbing, which can take it down and keep it down; see [[Cascading Failure]]. Warming the cache first helps.

The **hit ratio**, the share of reads the cache answers, determines whether the cache is worth having. Because popularity in most systems follows a steep curve, a cache holding a small fraction of the data can serve most of the reads; see [[Zipf's Law]].

The same idea at smaller scale is [[Memoization]], caching a function's results in process memory. Copies of the whole database are the alternative when reads must stay consistent; see [[Database Replication]]. A cache-aside system serves data that is slightly stale, which is a form of [[Eventual Consistency]].

## See also
- [[HTTP Caching]]
- [[Hot Partition]]
- [[In-Memory Database]]
- [[Reference Data]]
