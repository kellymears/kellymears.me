---
aliases:
  - Substitution cipher
  - Frequency analysis
  - Vigenère cipher
  - ROT13
tags:
  - computation
summary: The ancient cipher that shifts every letter a fixed distance down the alphabet, trivially broken by trying all 25 shifts, and the starting point for the long contest between substitution ciphers and frequency analysis that shaped cryptography until the machine age.
---
The **Caesar cipher** replaces each letter of a message with the letter a fixed number of places further along the alphabet. With a shift of three, A becomes D, B becomes E, and the alphabet wraps so that X, Y and Z become A, B and C. The Roman historian Suetonius wrote that Julius Caesar used a shift of three in private correspondence, which gives the method its name.

It's about the weakest cipher there is. The key is a single number, and only 25 useful shifts exist, so anyone can try them all and read whichever comes out as language. Its modern survivor, **ROT13**, shifts by 13 so that applying it twice restores the original, and has been used online to hide spoilers and punchlines, not secrets. The cipher is a standard first exercise in modular arithmetic, since shifting with wraparound is addition mod 26; see [[Modular Arithmetic]].

A general **substitution cipher** replaces each letter with any other according to a scrambled alphabet. There are 26 factorial possible keys, a number with 27 digits, far too many to try by hand. Yet substitution ciphers are easy to break, because they preserve the statistics of the language. In English, E is the most common letter, and T, A and O follow; the most common pairs and short words are predictable too. **Frequency analysis** counts the symbols in the ciphertext and matches them to these patterns. The earliest known description is by the Arab scholar al-Kindi in the ninth century. Newspaper cryptograms rely on this weakness; see [[Information Theory]].

The response was to use several alphabets. The **Vigenère cipher** applies a different Caesar shift to each letter according to a repeating keyword, which flattens the letter frequencies. It was first described by Giovan Battista Bellaso in 1553 and later misattributed to Blaise de Vigenère, and for about three centuries it was called the indecipherable cipher. Friedrich Kasiski published a general attack in 1863, and Charles Babbage appears to have found one earlier without publishing; see [[Analytical Engine]]. Once the keyword's length is known, the message splits into interleaved Caesar ciphers, each broken by frequency counts.

If the keyword is truly random, as long as the message, and never reused, the Vigenère cipher becomes the one-time pad, which is provably unbreakable; see [[One-Time Pad]]. The rotor machines of the twentieth century were in effect polyalphabetic ciphers with enormously long, mechanically generated key sequences; see [[Enigma Machine]].

The lessons carried forward. A large key space is necessary but not sufficient, since structure leaking through is what breaks ciphers. And security should rest on the secrecy of the key, not of the method, since the method will eventually be known; see [[Public-Key Cryptography]], [[Pseudorandom Number Generator]] and [[Diffie-Hellman Key Exchange]].

## See also
- [[Data Compression]]
- [[Bitwise Operation]]
- [[Pigeonhole Principle]]
- [[Numbers Station]]
