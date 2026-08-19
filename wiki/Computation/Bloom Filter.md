---
aliases:
  - Probabilistic set membership
tags:
  - computation
summary: A probabilistic set membership structure that can say "definitely not present" but only "probably present."
---
**Bloom Filter** answers "is this element in the set" with a probabilistic guarantee in one direction only: "definitely not," or "probably yes" — never a false negative, but occasionally a false positive, in exchange for a fixed, small memory footprint no matter how many elements have been added. It's a bit array plus several independent [[Hash Function]]s; adding an element sets the bits at each hash's position, and checking membership tests whether all of those bit positions are set. If any is clear, the element was definitely never added; if all are set, it probably was — but another combination of elements could have set exactly those same bits by coincidence.

This asymmetry is what makes it useful, not a limitation to route around: it's a cheap pre-check in front of an expensive definitive one. A database or [[Content Delivery Network|CDN]] checks a Bloom filter before a disk read or network request — "probably not present" skips the expensive check entirely, and "probably present" falls through to the real, authoritative check, which resolves any false positive. Cassandra's row/file-existence checks and various CDN cache lookups use exactly this pattern: cheap filter first, expensive authority second, never the filter alone.

The false-positive rate is tunable by trading memory: more bits per element and more hash functions both lower it, following a known formula, so a system can dial in "one false positive per million checks" against a known memory budget rather than guessing. What a Bloom filter cannot do at all is removal — clearing a bit to "unadd" one element might also clear a bit another element still depends on, since bits are shared across elements by design; a counting Bloom filter (bytes instead of bits, incremented and decremented) is the standard fix when deletion is required, at proportionally higher memory cost.

## See also
- [[Hash Function]]
- [[Hash Table]]
- [[Trie]]
- [[Cache Invalidation]]
