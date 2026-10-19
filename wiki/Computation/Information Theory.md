---
aliases:
  - Shannon information
  - Surprisal
  - Channel capacity
  - Bit (information)
  - Noisy-channel coding theorem
tags:
  - computation
summary: Claude Shannon's mathematical theory of how much information a message carries, setting the hard limits on how far data can be compressed and how fast it can be sent reliably.
---
**Information theory** is the mathematics of measuring, compressing, and transmitting information. Claude Shannon founded it almost single-handedly in a 1948 paper, "A Mathematical Theory of Communication." Its central move was to separate information from meaning. To Shannon, information is reduction in uncertainty, and it can be measured regardless of what a message is about.

The basic unit is the **bit**: the information gained from learning the outcome of a fair coin flip. A guessing game makes it concrete. Finding a number between 1 and 1,024 takes ten yes-or-no questions, so the answer carries ten bits, the same halving as [[Binary Search]]. More generally, an event with probability p carries −log₂ p bits, its *surprisal*. Rare events are informative; an event you were certain of tells you nothing.

The average surprisal of a source is its **entropy**: how unpredictable it is, in bits per symbol. A fair coin has one bit of entropy per flip, a coin that lands heads 99 percent of the time has about 0.08 bits. English text, because letters and words are so predictable from context, carries roughly one bit per character, though it is stored in eight. The mathematical form matches thermodynamic [[Entropy]].

Shannon proved two limits that still govern engineering:

- **Source coding.** No lossless code can compress data, on average, below its entropy, and codes exist that get arbitrarily close. Every [[Data Compression]] scheme works by modeling the source well enough to approach this bound.
- **Channel coding.** Every noisy channel has a *capacity*, a maximum rate of reliable transmission. Below it, codes exist that make errors as rare as you like; above it, reliable communication is impossible. This made [[Error-Correcting Code|error-correcting codes]] a science, and modern codes in phones and spacecraft come close to the limit.

The ideas spread well beyond communication:

- **Cryptography.** Shannon showed that perfect secrecy requires a key as long as the message, the one-time pad. Password strength is quoted in bits of entropy, and [[Pseudorandom Number Generator|random generators]] are judged by how unpredictable their output is.
- **Machine learning.** Language models are trained to minimize *cross-entropy*, the average surprisal of the real next token under the model's predictions, as described in [[Pretraining]]. A model that predicts text well is, in a precise sense, a good compressor.
- **Neuroscience.** Theories such as [[Predictive Processing]] describe the brain as minimizing surprise, an information-theoretic quantity, and [[Habituation]] is a response to signals that stop carrying news.
- **Statistics.** [[Occam's Razor]] has a formal version, minimum description length: prefer the hypothesis that compresses the data best.

A related measure, *Kolmogorov complexity*, defines the information in a single string as the length of the shortest program that produces it. It is uncomputable, a consequence of the [[Halting Problem]].

## See also
- [[Burrows-Wheeler Transform]]
- [[Shamir's Secret Sharing]]
- [[Homomorphic Encryption]]
- [[Byte-Pair Encoding]]
- [[Perplexity]]
