---
aliases:
  - Secret sharing
  - Threshold scheme
  - Lagrange interpolation
tags:
  - computation
summary: A way to split a secret into pieces so that any chosen number of them can rebuild it while fewer reveal nothing at all, based on the fact that a polynomial is pinned down by a fixed number of points.
---
**Shamir's secret sharing** divides a secret, such as an encryption key, into n pieces called shares, with a threshold k. Any k shares together reconstruct the secret exactly. Any k − 1 shares reveal nothing about it, not even a hint. Adi Shamir, one of the inventors of [[RSA]], published the scheme in 1979 in a two-page paper titled "How to Share a Secret." George Blakley independently published a geometric scheme with the same goal that year.

The method rests on a fact from school algebra. Two points determine a line; three determine a parabola; in general, k points determine a polynomial of degree k − 1. To share a secret:

1. Build a random polynomial of degree k − 1 whose constant term, its value at zero, is the secret.
2. Evaluate the polynomial at n different nonzero points, and give each participant one point as a share.

Any k participants can combine their points to recover the polynomial, using a formula known as **Lagrange interpolation**, and read off the secret at zero. With only k − 1 points, every possible secret is equally consistent with some polynomial through them, so the shares carry no information. This is unconditional, or information-theoretic, security: it holds against an attacker with unlimited computing power, like a [[One-Time Pad]] and unlike schemes whose security depends on a hard problem; see [[Information Theory]].

For this to work precisely with computer data, the arithmetic is done not on ordinary numbers but in a [[Finite Field]], usually integers modulo a large prime; see [[Modular Arithmetic]]. The same polynomial idea underlies Reed-Solomon codes, which can rebuild data from any sufficient subset of its pieces; see [[Error-Correcting Code]].

Secret sharing addresses a tension in protecting critical secrets. A key held by one person is a [[Single Point of Failure]]: lose it, or lose the person, and the secret is gone. Copying it to several people multiplies the ways it can leak. A threshold scheme gives both properties at once: a 3-of-5 scheme survives losing two shares and resists two people colluding. It is a cryptographic version of the two-person rule for nuclear launch keys; see [[Bus Factor]].

Uses include backing up the master keys of certificate authorities and hardware security modules, unsealing secret stores in infrastructure tools, and splitting the recovery phrase for cryptocurrency wallets; see [[Trusted Platform Module]] and [[Secrets Management]]. The organization that manages the internet's root DNS signing keys distributes recovery key material among trusted individuals in several countries.

Verifiable variants guard against a participant who submits a fake share. Threshold cryptography goes further, letting k parties sign or decrypt together without ever reassembling the key in one place; see [[Byzantine Fault Tolerance]] and [[Homomorphic Encryption]].

## See also
- [[Public-Key Cryptography]]
- [[Zero-Knowledge Proof]]
