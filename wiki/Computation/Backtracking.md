---
aliases:
  - Backtracking search
  - Catastrophic backtracking
  - ReDoS
  - SAT solver
  - Boolean satisfiability
  - Eight queens puzzle
tags:
  - computation
summary: Searching for a solution by making choices one at a time and undoing the latest choice when it leads nowhere, the method behind puzzle solvers, regex engines, and dependency resolvers.
---
**Backtracking** finds solutions by building them one choice at a time and abandoning a partial solution as soon as it cannot possibly work. When a dead end is reached, the search undoes the most recent choice and tries the next option. The mathematician D. H. Lehmer named the technique in the 1950s. It is a depth-first [[Graph Traversal]] of a tree of choices, usually written with [[Recursion]], where each level picks one more value.

The classic example is the eight queens puzzle: place eight queens on a chessboard so that none attacks another. Place one queen per row. If a row has no safe square, go back to the previous row and move that queen. Of the roughly 4.4 billion ways to place eight queens on 64 squares, the search visits only about fifteen thousand partial positions before finding all 92 solutions.

Its power comes from **pruning**. Rejecting a partial solution early eliminates every complete solution that would have extended it, often millions at once. Better pruning makes dramatic differences:

- **Constraint propagation.** After each choice, eliminate values that the constraints now rule out, as in [[Constraint Propagation]] for Sudoku. Many puzzles then need little or no guessing.
- **Ordering heuristics.** Choose the most constrained variable first, so failures surface early.
- **Learning from failure.** Modern SAT solvers, which decide whether a Boolean formula can be satisfied, record why a branch failed and never repeat that combination. This conflict-driven approach lets them solve industrial problems with millions of variables, despite the problem being NP-complete, as discussed under [[P versus NP Problem]].

Backtracking appears in more systems than people expect:

- **Regular expressions.** Most engines in Perl, Python, JavaScript, and Java match a [[Regular Expression]] by backtracking. Certain patterns, such as nested repetition, can force exponential work on a short input, called *catastrophic backtracking*. A single regex took down Stack Overflow in 2016 and Cloudflare's network in 2019; attackers who trigger it deliberately mount a [[Denial-of-Service Attack]] known as ReDoS. Engines such as RE2 avoid backtracking entirely by using a [[Finite State Machine]].
- **Dependency resolution.** A [[Package Manager]] choosing versions that satisfy every constraint is solving a satisfiability problem. Resolvers such as PubGrub backtrack with conflict learning and explain failures, which helps with [[Dependency Hell]].
- **Logic programming.** Prolog has backtracking built into the language.
- **Verification.** [[Symbolic Execution]] and [[Formal Verification]] tools hand path conditions to SAT and SMT solvers.
- **Games and generation.** Game-tree search in [[Game AI]] explores moves and retreats, and some [[Procedural Generation]] systems backtrack when a layout becomes impossible.

When choices are never reconsidered, the search becomes a [[Greedy Algorithm]], faster but liable to get stuck. Backtracking is the patient alternative.

## See also
- [[Tower of Hanoi]]
