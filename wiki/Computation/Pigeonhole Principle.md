---
aliases:
  - Dirichlet's box principle
  - Drawer principle
tags:
  - computation
summary: The observation that putting more items than boxes forces some box to hold two, a trivial-sounding fact that proves no compressor shrinks every file and no hash function avoids collisions.
---
The **pigeonhole principle** says that if more items are placed into fewer boxes, at least one box must hold more than one item. Put eleven pigeons into ten holes and two of them share. It sounds too obvious to be useful, yet it proves things hard to see otherwise, often showing that something must exist without saying where to find it.

The principle is usually credited to the German mathematician Peter Gustav Lejeune Dirichlet, who used it in 1834 and called it the drawer principle, which is why it sometimes carries his name.

Some classic consequences:

- **Hairs on heads.** A human head has at most a few hundred thousand hairs, and London has millions of people, so at least two Londoners have exactly the same number of hairs, though no one could say which two.
- **Birthdays.** Among 367 people, two must share a birthday. Far fewer are needed for a likely match; see [[Birthday Problem]].
- **Remainders.** Among any eleven whole numbers, two leave the same remainder when divided by ten, so their difference is divisible by ten; see [[Modular Arithmetic]].

In computing, the principle sets hard limits:

- **Compression.** No lossless compressor can shrink every file. There are 2^n files of n bits but fewer than 2^n shorter files, so some inputs must stay the same size or grow. Compressors win only because real data is repetitive, and most random strings can't be compressed at all; see [[Data Compression]] and [[Kolmogorov Complexity]].
- **Hashing.** A hash function maps unlimited possible inputs to a fixed number of outputs, so collisions, different inputs with the same hash, are guaranteed to exist. A good function makes them hard to find, not impossible; see [[Hash Function]] and [[Hash Table]]. A Bloom filter accepts this openly, trading occasional false positives for space; see [[Bloom Filter]].
- **Identifiers.** A system can't give more things unique IDs than it has ID values, which is why short codes run out and must be widened; see [[Universally Unique Identifier]] and [[Integer Overflow]].
- **Error correction.** Error-detecting codes must leave many bit patterns unused, so a corrupted message lands somewhere invalid instead of on another valid one; see [[Error-Correcting Code]].

The principle has a generalized form: if n items go into k boxes, some box holds at least n divided by k, rounded up. It also has limits. With infinitely many boxes the counting breaks down: a full hotel with infinitely many rooms can still take in more guests; see [[Cantor's Diagonal Argument]].

Arguments like these show that impossibility can often be proved by counting alone. Claims of a universal compressor, a collision-free short hash, or a lossless encoding into fewer bits fail on arithmetic before any code needs examining; see [[Information Theory]].

## See also
- [[De Bruijn Sequence]]
- [[Consistent Hashing]]
- [[Cuckoo Hashing]]
