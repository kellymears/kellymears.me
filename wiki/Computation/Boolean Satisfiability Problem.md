---
aliases:
  - SAT
  - Cook-Levin theorem
  - Conjunctive normal form
tags:
  - computation
summary: Deciding whether some assignment of true and false to the variables of a logical formula makes it true, the first problem proved NP-complete and, despite that, routinely solved at enormous scale by modern solvers.
---
The **Boolean satisfiability problem** (SAT) asks whether the variables in a logical formula can be set to true or false in some way that makes the whole formula true. Given "(a or b) and (not a or c) and (not b or not c)," is there an assignment that works? Here there is: a true, b false, c true. With thousands or millions of variables, finding one, or proving none exists, is the question; see [[Boolean Algebra]].

Formulas are usually written in **conjunctive normal form**: a list of clauses that must all hold, each clause an OR of variables or their negations. Any formula can be converted to this form, and most solvers expect it.

SAT holds a special place in theory. In 1971 Stephen Cook proved, and Leonid Levin independently showed, that any problem whose solutions can be checked quickly can be translated into a SAT instance. That made SAT the first known **NP-complete** problem: a fast general algorithm for it would give fast algorithms for thousands of other hard problems, including scheduling, [[Graph Coloring]], and the [[Traveling Salesman Problem]]. Whether such an algorithm exists is the [[P versus NP Problem]].

The worst case is believed to be exponential, but practice tells a different story. Modern solvers handle industrial instances with millions of variables in seconds. They build on a 1962 search procedure known as DPLL, which assigns variables one at a time and retreats on contradiction; see [[Backtracking]]. Each assignment forces others through unit propagation: if all but one literal in a clause is false, the last must be true; see [[Constraint Propagation]].

The breakthrough of the late 1990s was **conflict-driven clause learning**. When the search hits a contradiction, the solver analyzes why, records a new clause that rules out that whole combination, and jumps back past the decisions that didn't matter. Learned clauses prune huge regions of the search. Why this works so well on real problems, which have structure that random instances lack, is still only partly understood.

Because solvers are so good, many problems are solved by translating them into SAT:

- **Hardware and software verification.** Checking that a circuit or program can never reach a bad state; see [[Formal Verification]]. Extended solvers that understand numbers and arrays power [[Symbolic Execution]].
- **Dependency resolution.** Choosing package versions that satisfy every constraint is NP-complete, and several package managers use SAT solvers; see [[Package Manager]] and [[Dependency Hell]].
- **Puzzles and mathematics.** Sudoku encodes naturally, and SAT solvers have settled open mathematical questions with proofs too large for any person to read.

Local search methods, which flip variables to reduce the number of unsatisfied clauses, work well on some random instances; see [[Simulated Annealing]]. Procedural generators that fill grids under constraints solve closely related problems; see [[Wave Function Collapse]].

## See also
- [[Integer Factorization]]
- [[Logic Programming]]
- [[Knapsack Problem]]
