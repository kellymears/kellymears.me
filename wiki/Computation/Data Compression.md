---
aliases:
  - Compression
  - Lossless compression
  - Lossy compression
  - Huffman coding
  - LZ77
  - Gzip
tags:
  - computation
summary: Representing data in fewer bits by exploiting its patterns, either exactly (lossless) or by discarding what people won't notice (lossy), with limits set by information theory.
---
**Data compression** encodes information in fewer bits than the original by exploiting patterns and redundancy. There are two kinds:

- **Lossless** compression reconstructs the original exactly. It's required for text, code, and anything where a single changed bit matters. ZIP, gzip, PNG, and FLAC are lossless.
- **Lossy** compression discards information people are unlikely to notice, achieving much smaller sizes. JPEG, MP3, and modern video codecs are lossy.

The theoretical limit comes from Claude Shannon's 1948 paper founding information theory. Shannon defined the *entropy* of a source as the average information per symbol, measured in bits, and proved no lossless code can beat it on average. Predictable data has low entropy and compresses well; random data has maximal entropy and can't be compressed at all. A simple counting argument shows no lossless method can shrink every input: there are fewer short files than long ones, so some inputs must get longer. The term borrows from thermodynamic [[Entropy]], and the two are mathematically related.

Two classic techniques underlie most lossless formats:

- **Huffman coding.** Invented by David Huffman in 1952. Common symbols get short codes and rare ones get long codes, built from a tree so no code is the prefix of another.
- **Dictionary methods.** Abraham Lempel and Jacob Ziv's LZ77 (1977) replaces repeated sequences with references back to earlier occurrences: "copy 12 bytes from 40 bytes ago." Text and code are full of repetition, so this works well.

DEFLATE, behind gzip, ZIP, and PNG, combines both. Newer formats such as Brotli and Zstandard use larger windows, better modeling, and built-in dictionaries for faster or smaller results.

Lossy compression relies on models of perception. JPEG transforms each block of pixels into frequencies and stores high frequencies, fine detail the eye barely notices, with less precision. Audio codecs drop sounds masked by louder ones nearby. Reducing numeric precision in this way is a kind of [[Quantization]], the same idea used to shrink machine learning models.

Compression is everywhere on the web. Servers compress text responses, often cutting them by 70 percent or more, which speeds up the [[Critical Rendering Path]]. HTTP/2 and HTTP/3 compress headers, see [[HTTP2 and HTTP3]], and choosing modern image formats is a large part of [[Responsive Images]]. Databases gain hugely from [[Columnar Storage]], where values of one type sit together and compress far better than mixed rows. Language models split text into each [[Token]] using byte-pair encoding, originally a compression technique.

There is a deep link between compression and prediction: a model that predicts the next symbol well can compress well, and vice versa. Kolmogorov complexity, the length of the shortest program that produces a given output, is the ultimate measure of compressibility, but it is uncomputable, a consequence of the [[Halting Problem]].

## See also
- [[Binary Heap]]
- [[Time Series Database]]
- [[Chroma Subsampling]]
- [[Texture Mapping]]
- [[Pretraining]]
