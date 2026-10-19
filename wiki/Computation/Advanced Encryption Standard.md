---
aliases:
  - AES
  - Rijndael
  - Block cipher
  - Data Encryption Standard
tags:
  - computation
summary: The symmetric block cipher chosen in an open international competition in 2000 to replace an aging US standard, now built into processors and used to encrypt most of the world's stored and transmitted data.
---
The **Advanced Encryption Standard**, or **AES**, is a symmetric cipher: the same secret key encrypts and decrypts. It is used almost everywhere data is protected, including web connections, phones, disk encryption, wireless networks and messaging apps; see [[Transport Layer Security]] and [[Full-Disk Encryption]].

AES is a **block cipher**. It takes a 128-bit block of data and a key of 128, 192 or 256 bits and produces a 128-bit block of ciphertext. Each block passes through 10, 12 or 14 rounds, depending on key length, of four steps:

- **SubBytes** replaces each byte using a fixed substitution table, built from inversion in the [[Finite Field]] of 256 elements. This is the cipher's main source of nonlinearity.
- **ShiftRows** rotates the rows of the 4-by-4 byte grid by different amounts, spreading bytes across columns.
- **MixColumns** mixes the bytes of each column with finite field arithmetic, so a change to one byte affects four.
- **AddRoundKey** combines the block with a key derived for that round, using exclusive OR; see [[Bitwise Operation]].

After a few rounds every output bit depends on every input bit and every key bit, the property cryptographers call diffusion.

AES replaced the **Data Encryption Standard**, adopted by the US government in 1977. DES had a 56-bit key, which critics said from the start was too short. In 1998 the Electronic Frontier Foundation built a machine for about $250,000 that found a DES key by brute force in a matter of days. The US National Institute of Standards and Technology had already announced an open competition in 1997. Fifteen designs were submitted from around the world and publicly attacked for three years. In 2000 the winner was Rijndael, by the Belgian cryptographers Joan Daemen and Vincent Rijmen, and it became a federal standard in 2001. The open process built a degree of trust that the closed design of DES never fully earned.

A block cipher alone encrypts only fixed-size blocks, so real systems use a **mode of operation**. The naive mode encrypts each block independently, leaking patterns: identical blocks give identical ciphertext, so an encrypted image can still show its outline. Modern systems use authenticated modes such as Galois/Counter Mode, which also detect tampering; see [[Hash Function]].

No practical attack on the full cipher is known. Weaknesses have come from implementations instead. Software using lookup tables leaked key bits through cache timing; see [[Speculative Execution]]. Most processors since around 2010 include dedicated AES instructions, which are faster and avoid that leak. Against quantum computers, Grover's algorithm would roughly halve the effective key length, so 256-bit keys are considered comfortably safe; see [[Quantum Computing]].

AES is usually paired with public-key methods that agree on its key; see [[Diffie-Hellman Key Exchange]] and [[Public-Key Cryptography]].

## See also
- [[Enigma Machine]]
- [[One-Time Pad]]
