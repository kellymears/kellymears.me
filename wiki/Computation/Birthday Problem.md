---
aliases:
  - Birthday paradox
  - Birthday attack
tags:
  - computation
summary: Why only 23 people are needed for an even chance of a shared birthday, because the number of pairs grows with the square of the group, and why a hash's collision resistance is only half its length in bits.
---
The **birthday problem** asks how many people need to be in a room before it's more likely than not that two of them share a birthday. The answer, 23, surprises most people, whose instinct lands nearer 183, half of 365. With 70 people the chance passes 99.9 percent. It's often called the birthday paradox, though nothing contradicts itself; the result only clashes with intuition.

Intuition goes wrong by thinking about one person. The chance that someone shares your birthday in a group of 23 is small. But the question allows any two people to match, and 23 people form 253 pairs, each a separate chance. The number of pairs grows roughly with the square of the group's size, so matches arrive much sooner than linear thinking expects. The clean way to calculate it is through the complement: the chance that all 23 birthdays differ is 365/365 × 364/365 × … × 343/365, about 49 percent, leaving about 51 percent for at least one match. Real birthdays aren't spread evenly across the year, which only makes matches more likely.

The general rule is that among N equally likely values, a repeat becomes likely after drawing around the square root of N, about 1.2 times it for an even chance. That rule matters wherever random values must stay unique:

- **Hash collisions.** A hash with n-bit output has 2^n values, but random inputs start colliding after about 2^(n/2). A **birthday attack** exploits this, so a 128-bit hash such as MD5 offers at most about 64 bits of resistance to someone searching for any colliding pair, far too little today. Modern hashes use 256 bits or more; see [[Hash Function]] and [[Pigeonhole Principle]].
- **Random identifiers.** Random IDs must be long enough that the square-root rule still leaves collisions negligible. A version 4 UUID has 122 random bits, so a collision becomes likely only after about 2^61 IDs; see [[Universally Unique Identifier]].
- **Hash tables.** Even with a good hash function and a mostly empty table, two keys land in the same bucket surprisingly early, so tables must handle collisions from the start; see [[Hash Table]] and [[Bloom Filter]].
- **Testing randomness.** Repeats in a supposedly random stream should appear at the rate the birthday bound predicts, and George Marsaglia's "birthday spacings" test checks generators against it; see [[Pseudorandom Number Generator]].

The same blindness to pairs explains why coincidences feel more meaningful than they are. With enough people and enough possible matches, some striking coincidence somewhere is nearly certain, even when any particular one is rare; see [[Texas Sharpshooter Fallacy]] and [[Multiple Comparisons Problem]].

## See also
- [[Law of Large Numbers]]
- [[Monte Carlo Method]]
- [[Base Rate Fallacy]]
