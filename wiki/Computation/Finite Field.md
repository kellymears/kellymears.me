---
aliases:
  - Galois field
  - GF(2^8)
  - Field arithmetic
tags:
  - computation
summary: A number system with only finitely many elements in which addition, subtraction, multiplication and division all work as usual, the algebra underneath error-correcting codes, modern ciphers and elliptic curve cryptography.
---
A **finite field** is a set with finitely many elements in which you can add, subtract, multiply and divide by anything except zero, and all the familiar rules of arithmetic still hold. Ordinary rational and real numbers form fields, but they are infinite. Computers work with finite quantities, and finite fields let them do exact algebra, including division, without rounding or overflow; see [[Floating-Point Arithmetic]] and [[Integer Overflow]].

The simplest examples are the integers modulo a prime p. Arithmetic wraps around at p, and because p is prime, every nonzero number has a multiplicative inverse; see [[Modular Arithmetic]] and [[Prime Number]]. Modulo 7, for example, 3 times 5 is 15, which is 1, so 5 is the inverse of 3. The same does not work modulo 8, where 2 has no inverse, which is why ordinary machine integers do not form a field.

A finite field must have a prime power number of elements, and for each prime power there is essentially one field of that size. Évariste Galois worked out this theory in the 1830s, before dying in a duel at 20, and finite fields are often called **Galois fields**, written GF(q).

Fields whose size is a power of 2 suit computers. In GF(2^8), the 256 elements correspond to the 256 possible byte values. Each byte is treated as a polynomial with coefficients 0 or 1. Addition is exclusive OR, done bit by bit with no carries; see [[Bitwise Operation]]. Multiplication multiplies the polynomials and takes the remainder after dividing by a fixed irreducible polynomial, the polynomial version of a prime.

Finite fields turn up throughout computing:

- **Error-correcting codes.** Reed-Solomon codes treat a block of data as values of a polynomial over a finite field and add extra values, so that missing or damaged pieces can be recovered. They protect CDs, QR codes, and data sent from deep-space probes; see [[Error-Correcting Code]].
- **Checksums.** Cyclic redundancy checks divide data, viewed as a polynomial over GF(2), by a fixed polynomial; see [[Checksum]].
- **Ciphers.** The byte substitution and column mixing in AES are defined by GF(2^8) arithmetic; see [[Advanced Encryption Standard]].
- **Public-key cryptography.** Diffie-Hellman key exchange works in the multiplicative group of a prime field, and elliptic curve cryptography works with curves whose points have coordinates in a finite field; see [[Diffie-Hellman Key Exchange]] and [[Elliptic Curve Cryptography]].
- **Secret sharing.** Shamir's scheme does its polynomial arithmetic in a prime field so that the shares reveal nothing; see [[Shamir's Secret Sharing]].
- **Pseudorandom sequences.** Linear feedback shift registers generate long sequences from polynomial arithmetic over GF(2); see [[Pseudorandom Number Generator]].

## See also
- [[Boolean Algebra]]
- [[Fourier Transform]]
