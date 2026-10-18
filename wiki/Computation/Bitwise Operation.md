---
aliases:
  - Bit manipulation
  - Bitmask
  - Bit flags
  - Bitset
  - Bit shift
tags:
  - computation
summary: Operating directly on the individual bits of integers with AND, OR, XOR, NOT, and shifts, and the compact sets, flags, and tricks this enables.
---
A **bitwise operation** acts on the individual binary digits of integers rather than on their numeric values. Processors execute these operations in a single cycle, and they underlie much of low-level programming, from graphics and networking to compression, cryptography, and compact data structures.

The basic operations, applied bit by bit:

- **AND** (`&`) gives 1 only where both inputs are 1. It's used to test or clear bits.
- **OR** (`|`) gives 1 where either input is 1, used to set bits.
- **XOR** (`^`) gives 1 where the inputs differ, used to toggle bits.
- **NOT** (`~`) flips every bit.
- **Shifts** (`<<`, `>>`) move bits left or right. Shifting left by one doubles a number; shifting right halves it.

A **bitmask** is an integer whose bits act as a set of yes-or-no flags. Unix file permissions are the familiar example: read, write, and execute are 4, 2, and 1, so permission 7 means all three, and `chmod 644` is three such masks. Checking a flag is `flags & WRITE`; setting it is `flags |= WRITE`. Packing booleans into bits saves memory and lets many be tested in one operation.

A **bitset** extends this to large sets: element *n* is present if bit *n* is 1. Union and intersection become OR and AND across whole machine words, 64 elements at a time. A [[Bloom Filter]] is a bitset combined with hashing, and chess engines represent board positions as 64-bit "bitboards," one bit per square.

Some well-known tricks:

- **`x & (x - 1)`** clears the lowest set bit, so it's zero exactly when `x` is a power of two.
- **XOR swap** exchanges two variables without a temporary, a curiosity on modern hardware.
- **Population count**, the number of set bits, has a dedicated instruction on modern processors and is used in [[HyperLogLog]], bitsets, and similarity search.
- **Masking for modulo.** When a table size is a power of two, `i & (size - 1)` replaces the slower `i % size`, a trick used by every [[Ring Buffer]] and many a [[Hash Table]].

XOR has special properties: applying the same XOR twice undoes it, which makes it the basis of parity checks in [[Error-Correcting Code]], RAID storage, and stream ciphers. Bit operations also appear in [[Hash Function]] design and in [[Pseudorandom Number Generator]] algorithms like xorshift.

Bit manipulation has pitfalls. Right-shifting a negative signed number behaves differently across languages, shifting by more than the type's width is undefined in C, and mixing signed and unsigned types invites [[Integer Overflow]] bugs; see the two's complement representation. JavaScript converts numbers to 32-bit integers for bitwise operators, a surprise for anyone using them on large values. Clever bit tricks also hurt readability, so they belong in hot paths, documented, not sprinkled through ordinary code.

## See also
- [[Entity Component System]]
- [[SIMD]]
- [[Arbitrary-Precision Arithmetic]]
