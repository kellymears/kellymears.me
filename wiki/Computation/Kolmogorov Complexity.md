---
aliases:
  - Algorithmic information theory
  - Algorithmic complexity
  - Minimum description length
tags:
  - computation
summary: The length of the shortest program that produces a given string, a precise measure of how much structure something has, and one that provably cannot be computed.
---
The **Kolmogorov complexity** of a string is the length of the shortest program that outputs it and then stops. It measures how much real information a string contains, as opposed to how long it is. The idea was developed independently in the 1960s by Ray Solomonoff, Andrey Kolmogorov, and Gregory Chaitin, and grew into **algorithmic information theory**.

Compare two strings of a million characters. One is "ab" repeated half a million times; a tiny program can print it, so its complexity is low. The other is the result of a million coin flips; most likely no program much shorter than the string itself can produce it, so its complexity is close to its length. On this view, a string is **random** exactly when it's incompressible.

A few basic results:

- **The language barely matters.** Changing the programming language changes complexity by at most a constant, the length of an interpreter for one language written in the other; see [[Turing Completeness]].
- **Most strings are incompressible.** There are fewer short programs than long strings, so the vast majority of strings of any length can't be compressed by much; see [[Data Compression]].
- **It can't be computed.** No program can take a string and return its Kolmogorov complexity. If one existed, it could be used to find "the first string with complexity over a billion," described by a program much shorter than a billion, a contradiction; see [[Halting Problem]].

That last result ties the idea to [[Gödel's Incompleteness Theorems]]: Chaitin showed that a formal system can't prove that any specific string has complexity much greater than the system's own description.

Kolmogorov complexity is related to Shannon's [[Information Theory]] but differs in an important way. Shannon entropy measures the average information of a random source; Kolmogorov complexity measures the information in one specific object, without assuming any probability distribution; see [[Entropy]].

Uncomputable as it is, the idea has practical shadows:

- **Compression as a stand-in.** A "normalized compression distance" compares two files by how much better they compress together than apart, and has clustered genomes and music with no domain knowledge.
- **Minimum description length.** In statistics and machine learning, the best model is the one that minimizes the length of the model plus the data encoded with it, a formal version of [[Occam's Razor]] and a guard against [[Overfitting]].
- **Randomness testing.** A [[Pseudorandom Number Generator]] has low complexity by definition, since a short program and seed produce its whole output.
- **Procedural content.** Small programs that generate large worlds or demos exploit low complexity; see [[Procedural Generation]].

The concept gives a precise meaning to an intuitive idea: understanding something often means finding a shorter description of it.

## See also
- [[Edit Distance]]
- [[Monte Carlo Method]]
- [[Lambda Calculus]]
- [[Demoscene]]
