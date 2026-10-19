---
aliases:
  - ECC
  - ECDSA
  - Curve25519
tags:
  - computation
summary: Public-key cryptography built on the arithmetic of points on an elliptic curve over a finite field, which matches the security of RSA with keys roughly a tenth the size and now secures most web traffic, messaging and cryptocurrency signatures.
---
**Elliptic curve cryptography**, or **ECC**, is a family of public-key methods built on the arithmetic of points on a curve. It does the same jobs as RSA and classic Diffie-Hellman, agreeing on keys and signing messages, but with far smaller keys. A 256-bit elliptic curve key is generally considered about as strong as a 3,072-bit RSA key; see [[RSA]] and [[Public-Key Cryptography]].

Neal Koblitz and Victor Miller proposed the idea independently in 1985. Adoption was slow at first, partly because of patent uncertainty and unfamiliar mathematics. By the 2010s it had become the default for new systems.

An elliptic curve here is the set of points satisfying an equation of the form y squared equals x cubed plus ax plus b. The surprising property is that points on the curve can be "added." Draw a line through two points; it meets the curve at exactly one more point; reflect that point across the horizontal axis, and the result is their sum. Cryptography uses the same rule over a finite field, where coordinates are integers modulo a large prime, so the "curve" becomes a scattered set of points with the same algebraic structure; see [[Modular Arithmetic]].

Adding a point to itself many times is called scalar multiplication. Computing k times P is fast, using repeated doubling much like fast exponentiation, even when k has 77 digits; see [[Binary Number]]. Recovering k from P and the result is the elliptic curve discrete logarithm problem, and the best known classical attacks on well-chosen curves take exponential time. That gap is what allows small keys; see [[Diffie-Hellman Key Exchange]] and [[Big-O Notation]].

Two uses dominate. **ECDH** runs the Diffie-Hellman exchange over a curve, and **ECDSA** and its relative EdDSA produce digital signatures. Curve25519, designed by Daniel Bernstein and published in 2006, was built to be fast and hard to implement wrongly, and it's now used in TLS, SSH, Signal and WireGuard; see [[Transport Layer Security]] and [[End-to-End Encryption]].

Implementations have failed in instructive ways. ECDSA needs a fresh random number for every signature. Sony's PlayStation 3 reused the same one, and in 2010 researchers recovered the console's private signing key with a few lines of algebra; see [[Pseudorandom Number Generator]]. Curve choice became contentious after 2013, when documents suggested a US standard random number generator built on elliptic curves contained a backdoor; that eroded trust in curves whose constants lacked a clear explanation. Bitcoin's choice of a less common curve, secp256k1, is sometimes cited as accidental good judgment.

Like RSA, ECC would fall to a large quantum computer running Shor's algorithm; see [[Quantum Computing]]. Smaller keys don't help there, and some estimates suggest curves need fewer qubits to break than RSA at comparable strength.

## See also
- [[Zero-Knowledge Proof]]
- [[Prime Number]]
- [[Information Theory]]
- [[Timing Attack]]
