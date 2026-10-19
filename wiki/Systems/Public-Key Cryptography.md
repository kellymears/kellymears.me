---
aliases:
  - Asymmetric cryptography
  - Public key
  - Private key
  - Digital signature
  - Key exchange
  - Diffie-Hellman
tags:
  - systems
summary: Cryptography with paired keys, one public and one private, which lets strangers agree on secrets and verify signatures without ever having met.
---
**Public-key cryptography** uses a pair of mathematically linked keys. The *public key* can be shared with anyone. The *private key* stays secret with its owner. What one key does, only the other can undo or check. That asymmetry solves a problem that had limited cryptography for all of history: how two parties who have never met can communicate securely, when sending a shared secret key over an insecure channel defeats the purpose.

It gives two main capabilities:

- **Key exchange and encryption.** Anyone can use a public key to encrypt data that only the private key's holder can read, or two parties can each combine their private key with the other's public key to arrive at the same shared secret. That is the *Diffie–Hellman* key exchange, published by Whitfield Diffie and Martin Hellman in 1976. The British signals agency had found the same ideas a few years earlier but kept them classified.
- **Digital signatures.** The owner uses the private key to sign data, and anyone with the public key can verify that the signature is genuine and the data unchanged. Signatures prove who produced something without revealing any secret.

The security rests on mathematical problems that are easy in one direction and infeasible to reverse: multiplying two large primes is easy but factoring the product is not (RSA, 1977), and the discrete logarithm problem on elliptic curves underpins the smaller, faster keys used today. Because public-key operations are slow, real systems use them only to agree on a symmetric key or to sign a [[Hash Function]] digest, then do bulk encryption with fast symmetric ciphers.

It is everywhere in modern computing. [[Transport Layer Security]] uses key exchange to set up encrypted connections and signatures to prove a server's identity. [[Secure Shell|SSH]] uses key pairs instead of passwords. [[Code Signing]] proves software came from its publisher, and package managers verify signed releases as part of [[Supply Chain Security]]. A [[JSON Web Token]] can be signed with a private key so any service can verify it. WireGuard and other [[Virtual Private Network]] protocols, end-to-end encrypted messaging, and cryptocurrencies all rest on it.

The weak point is binding a public key to an identity. A public key proves only that someone holds the matching private key, not who that someone is. Connecting keys to names takes a trust system, such as a [[Certificate Authority]], a web of trust, or simply checking a fingerprint in person. Large quantum computers would break RSA and elliptic-curve schemes, so *post-quantum* algorithms are now being deployed alongside them, since encrypted traffic recorded today could be decrypted later. Keeping private keys private is its own discipline, covered by [[Secret Management]].

## See also
- [[Shamir's Secret Sharing]]
- [[Encrypted Media Extensions]]
- [[Integer Factorization]]
- [[Entropy Pool]]
- [[Advanced Encryption Standard]]
- [[Homomorphic Encryption]]
