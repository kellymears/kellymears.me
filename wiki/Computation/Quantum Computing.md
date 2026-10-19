---
aliases:
  - Qubit
  - Shor's algorithm
  - Grover's algorithm
tags:
  - computation
summary: Computing with qubits, which can hold combinations of 0 and 1 whose amplitudes interfere, offering large speedups on a few problems such as factoring, while staying limited in practice by noise and error correction.
---
**Quantum computing** uses the rules of quantum mechanics to process information. Its basic unit is the **qubit**. A classical bit is either 0 or 1. A qubit can be in a superposition of both, described by two numbers called amplitudes, and several qubits can be entangled so their states can't be described separately. Measuring a qubit gives 0 or 1 at random, with probabilities set by the amplitudes, and destroys the superposition.

A common misunderstanding is that a quantum computer simply tries every answer at once. A register of qubits can represent many values in superposition, but measurement returns only one, at random. The power comes from **interference**: amplitudes can be positive or negative, so a well-designed algorithm makes the paths leading to wrong answers cancel and those leading to right answers reinforce; see [[Wave Interference]]. Only problems with the right mathematical structure allow this.

Richard Feynman suggested in 1981 that simulating quantum systems might require quantum computers. The key results came in the 1990s:

- **Shor's algorithm** (1994) factors large numbers exponentially faster than any known classical method. It relies on a quantum version of the Fourier transform to find hidden periods; see [[Divide and Conquer]]. Widely used encryption depends on factoring and related problems being hard, so a large enough quantum computer would break it; see [[Public-Key Cryptography]]. New encryption schemes believed to resist quantum attacks are already being deployed.
- **Grover's algorithm** (1996) searches an unstructured list of N items in about the square root of N steps instead of N. That speedup is quadratic, not exponential, and is provably the best possible; see [[Big-O Notation]].

Quantum computers aren't expected to solve NP-complete problems efficiently, and most everyday computing gains nothing; see [[P versus NP Problem]]. They don't compute anything a classical machine can't, given enough time; see [[Turing Completeness]]. Simulating molecules and materials remains the most promising application, as Feynman expected.

The practical obstacle is noise. Qubits are disturbed by heat, vibration, and stray fields, losing their quantum state in a process called decoherence, often within microseconds. Leading designs use superconducting circuits cooled to near absolute zero, trapped ions held by electromagnetic fields, or photons; see [[Polarized Light]]. Quantum error correction spreads one reliable "logical" qubit across many physical ones, much as classical codes add redundancy; see [[Error-Correcting Code]]. Running Shor's algorithm on numbers used in real encryption is estimated to need around a million physical qubits, far beyond current machines.

Experiments since 2019 have shown quantum devices performing specially chosen sampling tasks faster than classical supercomputers, though classical methods have since narrowed some of those claims. Optimization machines based on quantum annealing are a separate, more limited approach; see [[Simulated Annealing]].

Many results are probabilistic and must be repeated; see [[Monte Carlo Method]].

## See also
- [[Integer Factorization]]
- [[Standard Model]]
- [[Superconductivity]]
- [[Analytical Engine]]
- [[RSA]]
