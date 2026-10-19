---
aliases:
  - Minimal perfect hash function
  - Perfect hash function
  - gperf
tags:
  - computation
summary: A hash function built for a fixed, known set of keys so that no two keys collide, giving guaranteed single-probe lookups for static data such as keyword tables and large read-only indexes.
---
A **perfect hash function** maps every key in a fixed, known set to a different slot, with no collisions at all. Ordinary hash functions scatter keys pseudo-randomly, so two keys sometimes land in the same slot and the table needs a way to handle them; see [[Hash Function]] and [[Hash Table]]. When the full set of keys is known in advance, it's possible to build a function tailored to that set that avoids collisions entirely, so every lookup takes one probe.

Collisions are surprisingly hard to avoid by chance. Placing just 23 keys at random into 365 slots gives better-than-even odds that two share a slot; see [[Birthday Problem]]. A random function is very unlikely to be perfect, so perfect hash functions have to be found by search or construction. And if there are more keys than slots, collisions are unavoidable; see [[Pigeonhole Principle]].

A **minimal perfect hash function** goes further: it maps n keys onto exactly n slots, wasting no space. Modern constructions handle billions of keys, and the function needs only a few bits per key to store. That makes them useful for large static indexes, such as genome databases and search engine dictionaries, where the key set rarely changes and the table is read constantly.

A classic theoretical construction, from Michael Fredman, János Komlós, and Endre Szemerédi in 1984, uses two levels. A first hash splits the keys into buckets, and each bucket gets its own small table with a second hash, picked at random and retried until it happens to have no collisions; see [[Pseudorandom Number Generator]]. Because the buckets are small, a good choice turns up quickly, and the total space stays linear. Later schemes draw on ideas from random graphs, related to how cuckoo hashing resolves collisions; see [[Cuckoo Hashing]].

The best-known practical tool is **gperf**, a GNU program that generates C code for a perfect hash over a list of words. It's typically used to recognize the reserved words of a programming language quickly, a task in every compiler and many interpreters; see [[Compiler]]. Character-keyed search trees compete for the same job; see [[Trie]].

Perfect hashing only suits static sets. Adding a key may break the function and require rebuilding it, so changing data usually calls for ordinary hashing. Some structures relax the guarantee the other way: rather than promising no collisions, they accept occasional false matches in exchange for tiny space; see [[Bloom Filter]]. Others deliberately cause collisions between similar keys; see [[Locality-Sensitive Hashing]].

A minimal perfect hash function also doesn't check membership on its own. Given a key outside the original set, it still returns some slot, so applications that might see unknown keys store each key, or a short fingerprint of it, to confirm a match.

## See also
- [[Consistent Hashing]]
- [[Regular Expression]]
