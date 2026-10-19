---
aliases:
  - PRNG
  - Random number generator
  - RNG
  - CSPRNG
  - Mersenne Twister
  - Random seed
tags:
  - computation
summary: An algorithm that produces a sequence of numbers that looks random but is fully determined by a starting seed, and the separate, stricter kind needed for security.
---
A **pseudorandom number generator (PRNG)** is an algorithm that produces a long sequence of numbers that looks random but is entirely determined by its starting value, the *seed*. Computers are deterministic machines, so they can't produce randomness by calculation alone. A PRNG instead keeps some internal state, scrambles it with each call, and outputs part of the result. The same seed always gives the same sequence, which is a feature: it makes simulations, games, and tests reproducible, as described under [[Seeded Randomness]].

John von Neumann proposed an early method in 1946, squaring a number and taking its middle digits, while remarking that anyone considering arithmetical methods of producing random digits is "in a state of sin." Common designs since:

- **Linear congruential generators.** Multiply the state by a constant, add another, and take the remainder. Fast and tiny, but with visible patterns; the infamous RANDU generator of the 1960s put all its output points onto just 15 planes in three dimensions.
- **Mersenne Twister.** Published by Makoto Matsumoto and Takuji Nishimura in 1997, with a period of 2¹⁹⁹³⁷ − 1. It became the default in Python, Ruby, and many other languages.
- **Xorshift and PCG.** Small, fast modern generators built from bit shifts and XORs that pass demanding statistical test suites.

Quality is judged statistically: outputs should be evenly distributed, uncorrelated, and slow to repeat. Weak generators produce subtle patterns that can bias a [[Procedural Generation]] system, a Monte Carlo simulation, or a shuffle.

Security needs something stricter. A **cryptographically secure PRNG (CSPRNG)** must also be unpredictable: seeing past outputs shouldn't help anyone guess future ones. Ordinary PRNGs fail this badly, since a few hundred Mersenne Twister outputs reveal its entire state. CSPRNGs are built from ciphers or a [[Hash Function]] and seeded from true *entropy*, unpredictable physical events such as timing jitter, gathered by the operating system. Keys for Public-Key Cryptography, session tokens, and random identifiers such as a [[Universally Unique Identifier]] must come from one. Failures are severe: in 2008 it emerged that a Debian change had crippled OpenSSL's seeding for two years, leaving only about 32,000 possible keys per key type.

Games show both sides. Players exploit predictable generators through *RNG manipulation*, timing inputs to get a desired outcome, a staple of [[Speedrun]] routes, and reloading to reroll results is [[Save Scumming]]. Designers often bend randomness on purpose, as with a [[Pity Timer]], because truly random streaks feel unfair. Multiplayer games that share a seed across machines rely on every client producing identical sequences, part of the [[Determinism]] that [[Rollback Netcode]] needs.

In testing, randomness drives [[Property-Based Testing]] and Fuzzing, and recording the seed turns a random failure into a reproducible one.

## See also
- [[Session Management]]
- [[Device File]]
- [[Statistical Sampling]]
