---
aliases:
  - Clock arithmetic
  - Modulo operation
  - Euclidean algorithm
  - Chinese remainder theorem
tags:
  - computation
summary: Arithmetic where numbers wrap around after reaching a fixed modulus, like hours on a clock, which underlies hashing, checksums, random number generators, and public-key cryptography.
---
**Modular arithmetic** is arithmetic in which numbers wrap around after reaching a fixed value, the modulus. Clocks are the familiar example: four hours after ten o'clock is two, because 14 wraps around 12. Two numbers are congruent modulo n if they leave the same remainder when divided by n. Carl Friedrich Gauss set out the theory in 1801, but the ideas are much older.

Addition, subtraction, and multiplication all respect the wrapping, so remainders can be taken at any step without changing the final remainder. That makes it practical with enormous numbers: computing a huge power modulo n never needs the full power, only repeated squaring with a reduction after each step. Division is the exception. Dividing modulo n means multiplying by an inverse, which exists only when the number shares no factor with n. The **Euclidean algorithm**, recorded around 300 BCE, finds greatest common divisors and those inverses quickly, and is among the oldest algorithms still in daily use.

Computers already work this way. Fixed-size integers are arithmetic modulo 2 to the 32nd or 64th power, which is why adding one to the largest value wraps to the smallest; see [[Integer Overflow]]. Taking a value modulo a power of two is just masking off the low bits; see [[Bitwise Operation]].

Uses across computing:

- **Hashing.** A hash table picks a bucket by taking the hash modulo the number of buckets; see [[Hash Table]]. Changing the modulus moves nearly every key, the problem [[Consistent Hashing]] was invented to avoid.
- **Wraparound indexes.** A [[Ring Buffer]] advances its read and write positions modulo its size.
- **Check digits.** ISBNs, bank account numbers, and credit cards include a digit chosen so a weighted sum comes out to zero modulo 10 or 11, catching most typing errors; see [[Checksum]].
- **Random numbers.** The simplest generators multiply the previous value by a constant, add another, and reduce modulo a large number; see [[Pseudorandom Number Generator]].
- **Error correction.** Codes such as Reed-Solomon compute in finite fields, systems where every nonzero element has an inverse; see [[Error-Correcting Code]].
- **Cryptography.** RSA and Diffie-Hellman rely on exponentiation modulo large numbers being easy to compute and hard to reverse; see [[Public-Key Cryptography]] and [[Arbitrary-Precision Arithmetic]].

The **Chinese remainder theorem**, found in a Chinese text from roughly the third to fifth century, says that a number's remainders modulo several pairwise coprime values determine it uniquely within their product. Computers use it to split one large calculation into several small independent ones, which speeds up RSA decryption about fourfold.

Days of the week are arithmetic modulo 7, and the twelve pitch classes of Western music are arithmetic modulo 12. One trap for programmers: whether the remainder of a negative number comes out negative or positive varies between languages, a frequent source of bugs.

## See also
- [[Collatz Conjecture]]
- [[Boolean Algebra]]
