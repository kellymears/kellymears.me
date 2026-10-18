---
aliases:
  - Base64url
  - Binary-to-text encoding
  - Base32
  - Base58
tags:
  - data
summary: A way to write arbitrary bytes using 64 safe text characters, so binary data can travel through email, JSON, URLs, and other channels built for text, at the cost of a third more size and with no secrecy at all.
---
**Base64** is a way of representing arbitrary binary data, such as an image, a key, or a compressed file, using only 64 printable characters: the uppercase and lowercase letters, the digits, and two symbols, usually plus and slash. It exists because many systems were built to carry text, and raw bytes passed through them get corrupted.

The arithmetic is simple. Sixty-four is two to the sixth power, so each character carries six bits. Three bytes make 24 bits, which split evenly into four characters. When the input isn't a multiple of three bytes, equals signs pad the end. The result is about a third larger than the original, plus line breaks in some variants.

The need came from email. Early mail transport was defined for 7-bit text, and some systems mangled anything else: line endings were converted, high bits stripped, long lines wrapped; see [[Simple Mail Transfer Protocol]]. When MIME added attachments to email in the early 1990s, it adopted Base64 to carry binary content safely; see [[MIME Type]]. A 2006 specification is now the common reference.

It is everywhere:

- **Email attachments**, still.
- **Data embedded in text formats**, since [[JSON]] and [[XML]] have no binary type.
- **Inline resources** in web pages and stylesheets; see [[Data URI]].
- **Tokens and keys.** Signed web tokens and certificate files are Base64 text; see [[JSON Web Token]].
- **HTTP Basic authentication** sends the username and password Base64-encoded in a header.

That last use shows the most common misunderstanding: **Base64 is not encryption**. Anyone can decode it instantly. A Basic authentication header protects nothing without an encrypted connection, and configuration systems that store secrets as Base64 have misled users into thinking they were protected; see [[Secrets Management]]. Its scrambled look has made it popular for hiding text from casual filters, from malware to prompts designed to slip past a model's safeguards; see [[Jailbreak]].

Variants trade size against convenience:

- **Base64url** replaces plus and slash, which have special meanings in addresses, with minus and underscore, and often drops padding; see [[URL]].
- **Hexadecimal** uses two characters per byte, doubling size but easy for humans to read.
- **Base32** uses only uppercase letters and digits, so it survives case-insensitive systems and is easier to read aloud. Authenticator app secrets and onion service addresses use it; see [[Multi-Factor Authentication]] and [[Onion Routing]].
- **Base58** drops characters that look alike, such as zero and capital O, for identifiers that people may copy by hand, as in Bitcoin addresses.

Base64 interacts badly with compression. Encoded data looks random to a compressor at first glance, so compress before encoding, not after; see [[HTTP Compression]]. It is unrelated to text encodings like UTF-8, which map characters to bytes rather than bytes to characters; see [[Character Encoding]].

## See also
- [[Binary Number]]
- [[Checksum]]
