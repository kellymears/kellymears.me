---
aliases:
  - Candidate elimination
  - Sudoku solving
tags:
  - graphics
summary: Repeatedly narrowing the possible values of each variable using the constraints, until nothing more can be deduced.
---
**Constraint propagation** is the core technique of constraint satisfaction: each variable holds a set of candidate values, and each constraint removes candidates that cannot possibly hold. Removing one candidate may enable another removal, so the process iterates until it reaches a fixed point.

Sudoku is the clearest example. Every cell begins with nine candidates; each filled cell eliminates that value from its row, column, and box. Two deductions do most of the work: a cell with exactly one remaining candidate must hold it, and a value with exactly one remaining position in a unit must go there. Puzzles solvable by these alone are "easy"; harder ones require techniques reasoning about *pairs* of candidates, and the hardest require search with backtracking.

This also explains what puzzle difficulty *is*: not how many cells are blank, but which deduction techniques are required. A generator that removes clues at random produces wildly inconsistent difficulty; one that solves as it removes, and stops when the required technique exceeds a target, produces consistent difficulty.

The same structure appears in type inference, scheduling, layout solvers, and dependency resolution. And it has a direct interface consequence: an application that tracks candidates can offer to fill in forced cells, mark them, or eliminate them automatically — automating exactly the bookkeeping while leaving the interesting deductions to the player.

## See also
- [[Game AI]]
- [[Seeded Randomness]]
- [[Roguelike]]
- [[Cellular Automaton]]

## Related
- [[Procedural Generation]]
- [[Trick-Taking Game]]
- [[L-System]]
- [[Determinism]]
- [[Voxel]]
- [[Shader]]
