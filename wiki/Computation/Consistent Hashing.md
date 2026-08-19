---
aliases:
  - Ring hashing
tags:
  - computation
summary: A hashing scheme where adding or removing a node remaps only a small fraction of keys, not nearly all of them.
---
**Consistent Hashing** maps both keys and server nodes onto the same circular hash space, and assigns each key to the next node found walking clockwise from its position — a scheme designed so that adding or removing one node remaps only the keys that fell in that node's slice of the ring, not the entire keyspace. Plain hashing (`hash(key) % N`) is the alternative it replaces, and its failure is that changing N — adding or removing even one server — changes almost every key's assigned server, since the modulus itself changed, which for a distributed cache means a near-total cache-wipe on any scaling event.

The ring construction is what buys the "small fraction" property: each node hashes to one or more points on the ring (virtual nodes — many per physical node, to smooth out uneven load from an unlucky hash placement), and a key belongs to whichever node's point comes next going clockwise. Removing a node only affects the keys between the removed node and its clockwise predecessor — they now belong to that predecessor instead — leaving every other key's assignment completely untouched, since the ring positions of every other node never moved.

This is the standard mechanism behind Amazon's Dynamo, Cassandra's partitioning, and most distributed cache and [[Content Delivery Network|CDN]] request-routing layers, anywhere data or requests need to be spread across a set of nodes that changes size over time without a wholesale reshuffle each time it does. It's a direct answer to the [[Cache Invalidation]] cost of scaling a cache cluster: without consistent hashing, growing a cache fleet from N to N+1 nodes invalidates roughly N/(N+1) of all cached keys in one stroke, purely from the remapping, with no data actually having gone stale.

The trade-off is a small amount of load imbalance even with virtual nodes — the ring positions are still randomly hashed, so no scheme perfectly equalizes load, only bounds the imbalance to a tolerable range as the number of virtual nodes per physical node grows.

## See also
- [[Hash Function]]
- [[Hash Table]]
- [[Cache Invalidation]]
- [[Least Recently Used Cache]]
- [[Database Sharding]]
