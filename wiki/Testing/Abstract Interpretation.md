---
aliases:
  - Widening
  - Sound static analysis
tags:
  - testing
summary: A theory of static analysis that runs a program on approximate values, such as signs or ranges instead of exact numbers, to prove properties of every possible execution, at the cost of some false alarms.
---
**Abstract interpretation** is a mathematical framework for analyzing programs without running them, by executing them over simplified, approximate values. Instead of tracking that a variable equals 7, an analyzer might track only that it is positive, or that it lies between 0 and 10. Patrick and Radhia Cousot introduced the theory in 1977, and it underlies many modern static analyzers and compiler optimizations.

Exact answers about program behavior are impossible in general. Whether a program ever divides by zero, overflows, or dereferences a null pointer is undecidable for arbitrary code; see [[Halting Problem]] and [[Static Analysis]]. Abstract interpretation makes the problem tractable by giving up precision in a controlled way. The analyzer computes an **over-approximation**: a set of possible values guaranteed to include everything the program could actually do, and probably some things it can't.

A simple example uses signs. Knowing only that `x` is positive and `y` is negative, an analyzer can conclude that `x * y` is negative without knowing either number. Richer abstract domains track numeric intervals, relationships between variables, pointer targets, or the shapes of data structures in memory.

Loops are the hard part, because a loop might run any number of times. The analyzer repeats the loop body until the approximate state stops changing, which is a fixed point. To guarantee that happens quickly, it uses **widening**: if a counter's range keeps growing, the analyzer jumps straight to "any value at least 0" instead of iterating forever. Precision is lost, but the analysis always finishes; see [[Loop Invariant]].

The key property is **soundness**. If a sound analyzer reports that no division by zero can occur, none can, on any input. The price is false alarms: because the approximation includes impossible behaviors, the analyzer sometimes warns about errors that can't happen.

The best-known success is Astrée which proved the absence of runtime errors, such as overflows and invalid array accesses, in the flight control software of Airbus aircraft, with very few false alarms; see [[Integer Overflow]] and [[Floating-Point Arithmetic]]. Such tools are used in safety-critical industries where testing alone can't provide enough confidence; see [[Formal Verification]] and [[Safety Case]].

Compilers use simpler forms every day. Range analysis can show that an array index is always in bounds, so the bounds check can be removed; constant propagation replaces computations whose results are known; see [[Compiler]]. Type checking can be viewed as abstract interpretation with types as the abstract values; see [[Type System]] and [[Type Inference]].

Most commercial bug-finding tools are deliberately unsound, giving up guarantees to avoid drowning users in false alarms. Others explore program paths precisely but can't cover them all; see [[Symbolic Execution]]. Abstract interpretation sits at the opposite end: it covers all paths, approximately; see [[Memory Safety]].

## See also
- [[Null]]
- [[Program Slicing]]
- [[Unreachable Code]]
