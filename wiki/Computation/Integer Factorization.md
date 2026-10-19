---
aliases:
  - Factoring
  - Number field sieve
  - RSA Factoring Challenge
tags:
  - computation
summary: The problem of breaking a whole number into its prime factors, easy to state and to check but apparently hard to solve for large numbers, a gap that public-key cryptography has relied on for decades.
---
**Integer factorization** is the task of writing a whole number as a product of primes. Every integer greater than 1 has exactly one such factorization, a fact known as the fundamental theorem of arithmetic; see [[Prime Number]]. Multiplying two large primes together is fast. Recovering them from the product, as far as anyone knows, is not.

The simplest method is **trial division**: test every possible divisor up to the square root of the number. That works for small numbers and fails for large ones, because the work grows with the square root, and the square root of a 600-digit number has 300 digits.

Better algorithms exploit number theory:

- **Fermat's method** writes the number as a difference of two squares, which is fast when the two factors are close together.
- **Pollard's rho**, from 1975, iterates a simple function modulo the number until two values collide, relying on the same counting as the [[Birthday Problem]] to find small factors quickly.
- **Lenstra's elliptic curve method**, from 1985, finds medium-sized factors using arithmetic on elliptic curves; see [[Elliptic Curve Cryptography]].
- **The quadratic sieve** and its successor, the **general number field sieve**, collect many numbers that break down into small primes and combine them with linear algebra to find a factorization. The number field sieve is the fastest known classical method for large numbers.

Even the best classical algorithm is super-polynomial: its running time grows faster than any power of the number of digits, though slower than an exponential. Whether a polynomial-time algorithm exists is unknown. Factoring is in NP, since a claimed answer can be checked by multiplication, but it is not believed to be NP-complete, so a fast factoring method would not resolve the larger question; see [[P versus NP Problem]] and [[Big-O Notation]].

The difficulty matters because [[RSA]] encryption rests on it. A public key contains the product of two secret primes, and anyone who could factor it could compute the private key; see [[Modular Arithmetic]] and [[Public-Key Cryptography]]. RSA Laboratories published a set of challenge numbers in 1991 to track progress. The largest factored so far, RSA-250, a number of 250 decimal digits, fell in 2020 after an effort equivalent to thousands of years of single-core computing. That steady progress is why recommended key sizes grow over time.

A large enough quantum computer would change the picture. Shor's algorithm, published in 1994, factors in polynomial time by using quantum interference to find the period of a modular function; see [[Quantum Computing]]. The numbers actually factored with it on quantum hardware remain tiny, but the threat has driven work on cryptography based on other problems. Factorization also relies on fast big-number arithmetic; see [[Arbitrary-Precision Arithmetic]].

## See also
- [[Diffie-Hellman Key Exchange]]
- [[Monte Carlo Method]]
