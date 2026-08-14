---
aliases:
  - LRU cache
  - LRU eviction
tags:
  - computation
summary: A fixed-capacity cache that evicts whichever entry has gone untouched the longest.
---
**Least recently used (LRU) cache** is a bounded store that, when it needs room, discards the entry that has gone untouched the longest. It is the default eviction policy in page caches, database buffer pools, and memoisation, because it is cheap and assumes nothing about the workload.

The standard implementation pairs a [[Hash Table]] with a doubly linked list ordered by recency. The map turns a key — typically a [[Fingerprint]] of the request — into a node in constant time; the list lets that node move to the front and the tail entry be dropped, so get and put are both O(1); see [[Big-O Notation]]. Where the bookkeeping is too costly under concurrency, a clock sweep with one reference bit per entry approximates it.

Recency stands in for future need because of temporal locality: what was touched recently is likely to be touched again. That is a regularity, not a law, and the counterexample is the **scan**. One sequential pass over data larger than the cache touches every entry once, evicts the whole working set, and yields no hits — pollution by data that will never be requested again. Database engines defend against it by admitting scanned pages at low priority or into a separate pool.

The alternatives trade differently. **LFU** evicts by access count, resisting scans but clinging to briefly popular items unless counts are aged. **ARC** and **2Q** keep both recency and frequency lists and shift between them by observing which would have helped.

Eviction is not [[Cache Invalidation]]: dropping an entry is safe because it can be recomputed, while serving a stale one is a correctness bug and a common [[Silent Failure]]. Since a cache changes timing rather than results, a test that passes only when it is warm is a [[Flaky Test]].

## See also
- [[Hash Table]]
- [[Cache Invalidation]]
- [[Big-O Notation]]
- [[Instrumentation]]
- [[Ground Truth]]
