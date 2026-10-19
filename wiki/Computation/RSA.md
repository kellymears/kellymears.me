---
aliases:
  - RSA cryptosystem
  - RSA algorithm
tags:
  - computation
summary: The public-key cryptosystem published in 1977 by Rivest, Shamir, and Adleman, whose security rests on the difficulty of factoring the product of two large primes, and which for decades protected much of the web's encrypted traffic.
---
**RSA** is a public-key cryptosystem published in 1977 by Ron Rivest, Adi Shamir, and Leonard Adleman, whose initials give it its name. It was one of the first practical schemes in which anyone can encrypt a message using a published key, but only the recipient, holding a matching private key, can decrypt it; see [[Public-Key Cryptography]]. For decades it secured much of the web's encrypted traffic.

The scheme rests on an asymmetry in arithmetic. Multiplying two large prime numbers is easy. Recovering the primes from their product, called factoring, appears to be very hard; see [[Prime Number]]. No one has proved factoring is hard, but decades of effort haven't produced a fast method for ordinary computers; see [[P versus NP Problem]].

To make a key pair, a user picks two random primes, each hundreds of digits long, and multiplies them to get a modulus. From the primes, they compute a pair of exponents that undo each other in arithmetic modulo that number; see [[Modular Arithmetic]]. The public key is the modulus and one exponent. Encrypting means raising the message, treated as a number, to the public exponent and taking the remainder. Decrypting raises the result to the private exponent, which returns the original. Finding the private exponent requires knowing the primes. Signing runs the process in reverse: only the private key can produce a value that anyone can check with the public one.

This takes numbers far larger than a processor's native integers, so implementations rely on libraries for very large integers; see [[Arbitrary-Precision Arithmetic]]. The primes must also be truly unpredictable. Weak random number generation has produced real keys that share a prime with other keys, and researchers have broken such keys in bulk; see [[Pseudorandom Number Generator]].

The scheme has a secret history. Clifford Cocks, a mathematician at the British signals intelligence agency GCHQ, devised essentially the same method in 1973, but it stayed classified until 1997.

Unlike a one-time pad, RSA's security is computational rather than absolute: an attacker with unlimited computing power could break it; see [[One-Time Pad]]. Applied directly, plain RSA is also insecure, since the same message always encrypts the same way and the math leaks structure. Real systems add random padding, and flawed padding has led to practical attacks. Implementations have also leaked keys through timing and power use; see [[Side-channel attack]]. In practice RSA mostly encrypts a short symmetric key or signs a hash rather than encrypting data directly; see [[Hash Function]].

Its long-term future is limited. A large enough quantum computer could factor RSA moduli efficiently; see [[Shor's algorithm]]. Standards bodies have published replacement schemes designed to resist quantum attack, and many systems already prefer elliptic-curve cryptography, which gives similar security with much smaller keys.

## See also
- [[Zero-Knowledge Proof]]
- [[Enigma Machine]]
- [[Elliptic Curve Cryptography]]
- [[Diffie-Hellman Key Exchange]]
