---
aliases:
  - Discrete logarithm problem
  - Ephemeral key exchange
tags:
  - computation
summary: A method, published in 1976, that lets two parties who have never met agree on a shared secret key over a channel anyone can read, by exchanging values that are easy to compute and infeasible to reverse.
---
The **Diffie-Hellman key exchange** lets two parties agree on a secret number while every message between them is visible to an eavesdropper. Neither side sends the secret. Each sends a value derived from a private number of its own, and each combines what it receives with its private number to reach the same result. An observer sees both public values and still can't practically compute the shared one.

Whitfield Diffie and Martin Hellman published the method in 1976, building on ideas from Ralph Merkle, in a paper titled "New Directions in Cryptography." Until then, two parties who wanted to communicate secretly had to share a key in advance, by courier or in person, which limited cryptography to governments and large institutions; see [[Enigma Machine]] and [[One-Time Pad]]. Researchers at the British intelligence agency GCHQ had reportedly found the same idea a few years earlier, but it stayed classified until the 1990s.

The mechanics use modular arithmetic; see [[Modular Arithmetic]]. Both parties agree publicly on a large prime p and a base g. One picks a secret a and sends g raised to a, mod p. The other picks a secret b and sends g raised to b, mod p. Each raises what it receives to its own secret, and both arrive at g raised to ab, mod p. A common analogy is mixing paint, which is easy to do and effectively impossible to undo.

The security rests on the **discrete logarithm problem**: given g, p and g raised to a, mod p, find a. Exponentiation mod p is fast even for huge numbers, but no efficient classical algorithm is known for reversing it; see [[Big-O Notation]] and [[P versus NP Problem]]. A sufficiently large quantum computer running Shor's algorithm would break it, along with RSA; see [[Quantum Computing]] and [[RSA]].

On its own the exchange has a serious weakness: it proves nothing about who is on the other end. An attacker sitting between the parties can run separate exchanges with each and relay traffic, reading everything; see [[Man-in-the-Middle Attack]]. Real protocols therefore combine the exchange with digital signatures or certificates that authenticate the public values; see [[Public-Key Cryptography]].

Modern protocols generate fresh secrets for every session and discard them afterward. Recording traffic today and stealing a long-term key later then reveals nothing, a property called forward secrecy. TLS 1.3 requires this ephemeral form; see [[Transport Layer Security]]. Most deployments now run the exchange over elliptic curves, which reach the same security with much smaller numbers; see [[Elliptic Curve Cryptography]].

Parameters matter. In 2015 researchers showed that many servers still accepted deliberately weakened 512-bit groups, left over from 1990s export rules, and that a few widely shared primes made large-scale precomputation attacks feasible; see [[Prime Number]].

## See also
- [[Zero-Knowledge Proof]]
- [[Arbitrary-Precision Arithmetic]]
