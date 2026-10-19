---
aliases:
  - De Bruijn graph
tags:
  - computation
summary: The shortest cyclic sequence that contains every possible string of a given length exactly once, useful for cracking keypads, locating a pen on paper, finding the lowest set bit, and assembling genomes.
---
**A de Bruijn sequence** is a cyclic sequence of symbols in which every possible string of a given length appears exactly once as a consecutive run. For binary strings of length three, the sequence 00010111, read around in a circle, contains 000, 001, 010, 101, 011, 111, 110, and 100, each once. No shorter sequence can contain all eight.

The sequences are named after the Dutch mathematician Nicolaas Govert de Bruijn, who counted them in 1946, though related constructions appear earlier. One much older example is often cited: Sanskrit prosody includes a mnemonic syllable string that runs through every pattern of three long and short syllables.

The standard construction uses a graph. Make a node for every string of length one less than the target, and draw an edge for every string of the full length, connecting its prefix to its suffix. Each node then has as many edges in as out, so a path exists that uses every edge exactly once, which spells out a de Bruijn sequence; see [[Seven Bridges of Königsberg]] and [[Graph Traversal]].

Applications include:

- **Keypads.** A lock that accepts the last n digits typed, without requiring an enter key, can be opened by typing a de Bruijn sequence, which tries every code with far fewer keystrokes than entering each one separately; see [[Pigeonhole Principle]].
- **Position sensing.** Because every window of the sequence is unique, reading a short window tells you where you are. Rotary encoders and digital pen systems print such patterns, a relative of the encodings that change one bit at a time; see [[Gray Code]]. Structured light scanners project them to match points between images; see [[Photogrammetry]].
- **Bit tricks.** Multiplying an isolated lowest bit by a de Bruijn constant puts a unique pattern in the top bits of the result, which a small lookup table turns into the bit's index. Chess engines and low-level libraries used this before processors offered instructions for it; see [[Bitwise Operation]] and [[Binary Number]].
- **Pseudorandom sequences.** Maximal-length shift register sequences, used in scramblers and simple random number generators, are de Bruijn sequences with one string removed; see [[Pseudorandom Number Generator]] and [[Spread Spectrum]].

The **de Bruijn graph** has its own life in genomics. Sequencing machines read short fragments of DNA. Assemblers break those fragments into overlapping short strings, build a de Bruijn graph from them, and look for paths through it that reconstruct the original genome. Repeated regions create ambiguous branches, which is why assembly remains hard.

In testing, these sequences let a single input exercise every combination of a few consecutive choices, a cheaper relative of exhaustive testing; see [[Pairwise Testing]].

## See also
- [[Modular Arithmetic]]
- [[Error-Correcting Code]]
- [[Caesar Cipher]]
