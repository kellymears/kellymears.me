---
aliases:
  - Design diversity
  - Triple modular redundancy
tags:
  - testing
summary: Building several independent versions of the same program from one specification and voting on their outputs, in the hope that their bugs won't coincide, a hope that experiments showed is only partly justified.
---
**N-version programming** is a fault-tolerance technique in which several teams independently write programs from the same specification, the versions run side by side on the same inputs, and a voter compares their outputs. If one version disagrees with the others, the majority answer wins. The idea is that independently built programs will have different bugs, so a fault in one will be outvoted. Algirdas Avižienis and Liming Chen described it in 1977.

It borrows from hardware. **Triple modular redundancy** runs three identical circuits and takes a majority vote, so any single failing component is masked. That works for hardware because physical failures, such as a burnt-out chip or a bit flipped by radiation, strike copies independently; see [[Error-Correcting Code]] and [[RAID]]. Identical software copies are useless this way, since a bug in one is a bug in all three. Diversity has to come from building the software differently: different teams, languages, algorithms, or tools.

The crucial question is whether independent teams really make independent mistakes. In 1986, John Knight and Nancy Leveson tested this with 27 versions of a missile-defense program written by students at two universities. The versions failed together far more often than independence would predict. Programmers tended to struggle with the same difficult parts of the problem, such as edge cases in the geometry and the limits of [[Floating-Point Arithmetic]]. N-version systems were more reliable than single versions, but not by as much as the theory assumed; see [[Correlation and Causation]] and [[Fault Tree Analysis]].

The specification itself is a shared weakness. If it's wrong or ambiguous, every version faithfully builds the same mistake. Voting on floating-point results also needs a tolerance, since correct versions can legitimately differ in the last digits.

Real systems use the idea selectively. The Space Shuttle ran four computers with identical primary software, which protected against hardware failure, plus a fifth running backup software written by a separate contractor, in case the primary software itself failed. Airbus fly-by-wire aircraft use dissimilar computers from different suppliers, programmed separately, for the same reason.

The voter has its own problems: it must not become a single point of failure, and versions must stay in step. These are the same issues that distributed systems face in agreeing on an answer; see [[Byzantine Fault Tolerance]], [[Quorum]], and [[Consensus Algorithm]]. A related idea monitors one program with a simpler one that checks it; see [[Watchdog Timer]] and [[Assertion]].

In testing, the same principle turns into a bug-finding method. Running several implementations, such as multiple compilers or parsers, on the same inputs and looking for disagreements finds faults without needing to know the correct answer; see [[Differential Testing]] and [[Test Oracle]]. Ensembles of machine-learning models rely on the same logic of diverse errors; see [[Decision Tree]].

## See also
- [[Single Point of Failure]]
- [[Common-Mode Failure]]
