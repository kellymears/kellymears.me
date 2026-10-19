---
aliases:
  - Sieve of Eratosthenes
  - Primality test
  - Prime factorization
tags:
  - computation
summary: Whole numbers divisible only by one and themselves, the building blocks of multiplication, easy to test but believed hard to factor, which is the gap much of modern cryptography stands on.
---
**A prime number** is a whole number greater than 1 that has no divisors besides 1 and itself: 2, 3, 5, 7, 11, 13, and on. Every whole number greater than 1 can be written as a product of primes in exactly one way, apart from order, which makes primes the building blocks of multiplication.

Euclid proved around 300 BC that the primes never run out. Suppose there were a finite list; multiply them all and add 1. The result leaves a remainder of 1 when divided by any prime on the list, so its prime factors are missing from the list, a contradiction. It shares its shape with [[Cantor's Diagonal Argument]]: assume a complete list, then build something it misses.

Primes thin out but never stop. Near a number n, roughly one in every ln n numbers is prime, so about one in 230 hundred-digit numbers is.

The **sieve of Eratosthenes**, from the third century BC, finds all primes up to a limit: list the numbers, then cross out the multiples of each prime in turn, and what remains is prime. It's still practical for small limits.

For large numbers, two problems that sound alike turn out to be very different:

- **Testing** whether a number is prime is easy. The Miller-Rabin test checks properties every prime must have; a composite fails most random checks, so a few dozen rounds give near certainty; see [[Randomized algorithm]]. In 2002, three researchers at the Indian Institute of Technology Kanpur showed a deterministic test runs in polynomial time.
- **Factoring** a large number into its primes has no known efficient method on ordinary computers. It isn't known to be NP-complete either; it sits in an unresolved middle ground; see [[P versus NP Problem]].

Cryptography lives in that gap. RSA keys are built by multiplying two large random primes, which is easy, and stay safe as long as nobody can split the product, which is believed to be hard; see [[Public-Key Cryptography]] and [[Modular Arithmetic]]. A large enough quantum computer could factor efficiently, which is why new schemes not based on factoring are being deployed; see [[Quantum Computing]]. Generating keys needs fast big-number arithmetic and a reliable source of random primes; see [[Arbitrary-Precision Arithmetic]].

Primes also turn up in everyday code. Hash tables are often sized to a prime so that keys with a common pattern don't collide on the same buckets; see [[Hash Table]].

The largest known primes are Mersenne primes, one less than a power of two, found by a volunteer computing project; the record set in 2024 has over 41 million digits. Simple questions remain open, such as whether infinitely many primes differ by 2. Like the [[Collatz Conjecture]], they are easy to state and have resisted proof.

## See also
- [[Diffie-Hellman Key Exchange]]
- [[Fibonacci Sequence]]
- [[Elliptic Curve Cryptography]]
- [[RSA]]
