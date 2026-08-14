---
aliases:
  - Hash map
  - Dictionary
tags:
  - computation
summary: A key-value structure that uses a digest of the key to index an array of buckets.
---
**Hash table** maps keys to values by computing a digest of each key with a [[Hash Function]] and using it to index an array of buckets. Insert, lookup, and delete are constant time on average, which makes it the default associative container in most languages. Writing the same key and value twice leaves the table unchanged, so writes are naturally idempotent — see [[Idempotence]].

Collisions are unavoidable, since there are more possible keys than buckets. **Chaining** keeps a list or small tree per bucket: simple, tolerant of a full table, hard on the processor cache. **Open addressing** probes later slots instead, keeping data contiguous and fast, at the cost of tombstone records for deletion and steep degradation as the table fills.

**Load factor** — entries divided by buckets — governs growth. Past a threshold, collisions climb, so the table allocates a larger array and rehashes every entry: a linear operation that surfaces as a latency spike, the amortized caveat from [[Big-O Notation]] in practice. The worst case, every key in one bucket, is reachable deliberately, so runtimes that accept untrusted keys seed the hash per process, trading [[Determinism]] of iteration order for resistance.

**A purpose-built map is not a plain object.** In JavaScript an object coerces every key to a string, so 1 and "1" collide and any object key becomes "[object Object]"; it inherits entries from its prototype chain, so an unguarded lookup for "constructor" succeeds on an empty object, a reliable [[Silent Failure]]; and it iterates integer-like keys first in ascending order regardless of insertion. A Map preserves key identity, holds nothing inherited, and iterates in insertion order.

Hash tables promise no ordering. Where ranges or sorted traversal matter, a sorted array with [[Binary Search]] or a B-tree index in a [[Relational Database]] is the right shape.

## See also
- [[Hash Function]]
- [[Big-O Notation]]
- [[Least Recently Used Cache]]
- [[Relational Database]]
- [[Determinism]]
