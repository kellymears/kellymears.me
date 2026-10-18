---
aliases:
  - McCabe complexity
  - Code complexity
  - Cognitive complexity
  - Basis path testing
tags:
  - testing
summary: A count of the independent paths through a piece of code, used to flag functions that are hard to test and understand, and the limits of judging code by a number.
---
**Cyclomatic complexity** measures how many independent paths run through a piece of code. Thomas McCabe introduced it in 1976. A function with no branches has a complexity of 1; each `if`, loop, `case`, or boolean operator that can change the path adds one. A function with three `if` statements in sequence has a complexity of 4.

Formally, McCabe defined it on the control flow graph of a program, where nodes are blocks of code and edges are possible jumps: complexity equals edges minus nodes plus twice the number of connected components. In practice, tools count decision points directly from the [[Abstract Syntax Tree]], and most [[Static Analysis]] linters report it.

The number has a testing interpretation. Cyclomatic complexity equals the number of linearly independent paths through the function, the minimum set from which every path can be built. McCabe proposed **basis path testing**: write at least that many tests, one per basis path. It sits between statement coverage and full path coverage, which is usually impossible because loops and combinations make paths explode. [[Branch Coverage]] is a related, weaker goal; reaching every branch doesn't guarantee each combination is exercised, which is the problem [[Decision Table Testing]] and [[Pairwise Testing]] tackle.

McCabe suggested a limit of 10 per function, and many teams use thresholds between 10 and 15 to flag code for [[Refactoring]]. High-complexity functions tend to be:

- **Hard to test**, since each path needs its own setup and inputs.
- **Hard to understand**, since readers must hold many branches in [[Working Memory]] at once.
- **Bug-prone**, with more places for an edge case to hide.

The evidence behind the third point is weaker than often claimed. Studies find complexity correlates with defects, but it also correlates strongly with plain size, lines of code, and much of its predictive power comes from that. A long, flat sequence of simple checks scores high but reads easily; deeply nested code with the same score is much harder.

That gap led to alternatives. **Cognitive complexity**, introduced by SonarSource in 2017, penalizes nesting more than sequence, and ignores constructs that don't make code harder to follow, such as a `switch` with simple cases. It aims to measure [[Cognitive Load]] on a reader rather than paths for a tester.

All such metrics share a trap. Enforced as a hard gate, a number becomes a target, and people satisfy it by splitting functions mechanically or hiding logic in lookup tables, which may not make the code clearer. That is [[Goodhart's Law]], the same risk that applies to a [[Coverage Gate]]. Used as a prompt for [[Code Review]] and a way to find the most tangled corners of a codebase, complexity metrics are useful. Used as a verdict, they mislead.

## See also
- [[Code Coverage]]
- [[Unit Test]]
- [[Test Smell]]
- [[Modified Condition Decision Coverage]]
