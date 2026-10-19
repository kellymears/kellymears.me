---
aliases:
  - 3n + 1 problem
  - Hailstone sequence
tags:
  - computation
summary: The unproven claim that repeatedly halving even numbers and tripling odd ones plus one always reaches 1, a rule a child can follow that has resisted mathematicians since 1937.
---
The **Collatz conjecture** concerns a simple rule. Take any positive whole number. If it's even, halve it; if it's odd, multiply by three and add one. Repeat. The conjecture says that every starting number eventually reaches 1, after which the sequence cycles 1, 4, 2, 1 forever. The German mathematician Lothar Collatz posed it in 1937, and it remains unproven.

The sequences behave erratically, rising and falling like hailstones in a storm cloud, which gives them their nickname. Starting from 6 takes eight steps: 6, 3, 10, 5, 16, 8, 4, 2, 1. Starting from 27 takes 111 steps, climbing as high as 9,232 before collapsing. Nothing obvious about the starting number predicts how long the trip will be; see [[Pseudorandom Number Generator]].

A rough argument suggests why it might be true. Half of all numbers are even and shrink by half. An odd number is multiplied by three, but 3n + 1 is always even, so it's halved at least once next. On average the steps shrink a number more than they grow it. But an average isn't a proof, and the conjecture covers every number with no exceptions; see [[Law of Large Numbers]].

Computers have checked it extensively. Every starting value up to about 2^68, nearly three hundred quintillion, has been confirmed to reach 1. The search runs quickly because a number only needs following until it drops below where it started, since everything smaller has already been verified; see [[Memoization]] and [[Dynamic Programming]]. That evidence is impressive and settles nothing. Pólya's conjecture, also about whole numbers, was believed for decades before a counterexample turned up near 906 million; see [[Falsifiability]].

Progress on a proof has been partial. In 2019 Terence Tao proved that almost all starting values eventually fall far below where they began, in a strong and precise sense, the best result so far, but "almost all" still leaves room for exceptions. Paul Erdős is often quoted as saying that mathematics is not yet ready for such problems.

There are reasons to suspect it is genuinely hard. In 1972 John Conway showed that a natural generalization of the rule, with different multipliers for different remainders, can encode any computation, so whether such sequences reach 1 is undecidable in general; see [[Halting Problem]] and [[Turing Completeness]]. The original rule might still be provable, but no general method can settle every question of this kind. A Collatz program is, in effect, a loop with no known proof that it terminates, exactly what verification tools try to rule out; see [[Formal Verification]].

The problem attracts amateurs because anyone can explore it with a pencil or a few lines of code, and it is a staple of programming exercises; see [[Modular Arithmetic]].

## See also
- [[Gödel's Incompleteness Theorems]]
- [[Ackermann Function]]
- [[Recursion]]
- [[Tower of Hanoi]]
- [[Fibonacci Sequence]]
- [[Prime Number]]
