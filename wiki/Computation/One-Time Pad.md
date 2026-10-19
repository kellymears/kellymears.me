---
aliases:
  - Vernam cipher
  - Perfect secrecy
tags:
  - computation
summary: The only cipher proved unbreakable, combining a message with truly random key material as long as the message and never reused, whose impractical key handling and catastrophic reuse failures explain most of modern cryptography.
---
**A one-time pad** encrypts a message by combining it with a key of random symbols as long as the message, used once and then destroyed. For bits, the combination is exclusive or; for letters, adding positions in the alphabet and wrapping around; see [[Bitwise Operation]] and [[Modular Arithmetic]]. Decrypting repeats the operation with the same key.

Gilbert Vernam at AT&T built it into a teleprinter in 1917, combining a message on punched tape with a tape of key characters; see [[Telegraph]]. Joseph Mauborgne of the US Army saw that the key had to be random and never repeated. A banker named Frank Miller had described the same scheme in 1882, a fact rediscovered in 2011.

It's the only cipher proved unbreakable. Claude Shannon showed in work completed during the Second World War and published in 1949 that, with a truly random key used once, a ciphertext is equally consistent with every possible message of the same length. An attacker with unlimited computing power learns nothing except the length. Shannon also proved the cost: any scheme with this **perfect secrecy** needs a key at least as long as the message; see [[Information Theory]].

Each condition matters, and history is mostly about breaking them:

- **Reuse.** Combining two ciphertexts made with the same pad cancels the key, leaving the two messages combined with each other, which can be pulled apart. Under wartime pressure, Soviet producers duplicated some pad pages, and from 1946 the US Venona project exploited the duplicates to read thousands of messages and identify spies, including Klaus Fuchs.
- **Weak randomness.** A key from a predictable generator is not a pad at all; see [[Pseudorandom Number Generator]] and [[Hardware random number generator]].
- **Distribution.** Both sides need identical key material, delivered securely in advance, as much of it as they will ever send. The Moscow-Washington hotline used one-time tapes couriered between embassies.

A pad also provides secrecy without integrity. Flipping a bit of the ciphertext flips the same bit of the message, so an attacker who knows the format can change an amount or a name without detection. Modern protocols add authentication for this reason; see [[Transport Layer Security]].

Practical encryption keeps the pad's structure and replaces its key. A stream cipher expands a short key into a long pseudorandom stream and combines it with the message the same way, giving up provable secrecy for keys that fit in a few bytes. Reusing a stream cipher's key and nonce fails exactly like reusing a pad, which helped break early Wi-Fi encryption; see [[Wi-Fi]]. Exchanging short keys over open channels is the problem [[Public-Key Cryptography]] solved.

Earlier machine ciphers fell because their keys repeated in patterns; see [[Enigma Machine]].

## See also
- [[Steganography]]
- [[Homomorphic Encryption]]
- [[Advanced Encryption Standard]]
- [[Quantum Entanglement]]
- [[Caesar Cipher]]
