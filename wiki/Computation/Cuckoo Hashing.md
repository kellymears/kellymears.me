---
aliases:
  - Cuckoo filter
  - Open addressing
tags:
  - computation
summary: A hash table scheme where every key has two possible homes and a newcomer evicts whatever occupies its spot, guaranteeing that a lookup checks at most two places, at the price of occasional chains of evictions and rebuilds.
---
**Cuckoo hashing** is a way of building a hash table in which every key has exactly two possible locations, chosen by two different hash functions; see [[Hash Table]] and [[Hash Function]]. A lookup checks both locations and nothing else, so it takes constant time even in the worst case. The name comes from the cuckoo bird, which lays its eggs in other birds' nests, where the chick pushes out the eggs already there.

Rasmus Pagh and Flemming Friche Rodler published it in 2001.

Insertion works by eviction:

1. Hash the new key and place it in its first location.
2. If that slot was occupied, the old key is kicked out.
3. The evicted key moves to its own alternate location, possibly evicting another key.
4. The chain continues until a key lands in an empty slot.

Occasionally the chain loops forever, cycling through the same keys. Implementations stop after a fixed number of moves, then pick new hash functions and rebuild the table. This is rare while the table isn't too full, so the average cost of insertion stays constant; see [[Amortized Analysis]]. The structure can be pictured as a graph with slots as nodes and keys as edges, and insertion fails exactly when some part of that graph contains more keys than slots; see [[Pigeonhole Principle]].

Basic cuckoo hashing works well only up to about half full. Variations push that much higher. Using more hash functions, or buckets that hold several keys each, lets tables reach well over 90 percent occupancy while keeping lookups bounded. A small extra area, called a stash, absorbs the rare keys that can't be placed.

Cuckoo hashing is one form of **open addressing**, where all keys live directly in a single array rather than in linked lists hanging from each slot. Other forms include linear probing, which checks consecutive slots and benefits from cache-friendly memory access; see [[Locality of Reference]]. Robin Hood hashing reduces variance by letting keys that have traveled far from their home take slots from keys that haven't.

Guaranteed lookup time matters where worst cases cause trouble. Network hardware looks up packet headers in fixed time, and services exposed to attackers face inputs crafted to collide, a form of [[Denial-of-Service Attack]]. Bounded lookups also help keep [[Tail Latency]] predictable.

A **cuckoo filter**, introduced in 2014, applies the idea to approximate set membership. It stores short fingerprints instead of keys and supports deletion, which a standard Bloom filter can't; see [[Bloom Filter]]. Related probabilistic structures trade exactness for memory in similar ways; see [[HyperLogLog]].

The technique is a good example of a common algorithmic move: giving each item a small number of random choices dramatically improves balance, an effect sometimes called the power of two choices; see [[Load Balancing]].

## See also
- [[Consistent Hashing]]
- [[Birthday Problem]]
- [[Perfect Hashing]]
