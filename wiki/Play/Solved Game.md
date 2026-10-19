---
aliases:
  - Game tree
  - Tic-tac-toe
  - Checkers
  - Minimax
tags:
  - play
summary: A game whose outcome under perfect play is known, from tic-tac-toe to checkers, which was solved in 2007 after nearly two decades of computation, and why solving one rarely ends people's interest in it.
---
A **solved game** is one whose outcome is known when both players play perfectly. Tic-tac-toe is the familiar example: two careful players always draw. Solving applies to games of [[Perfect Information]] without chance, where in principle every possible line of play can be examined.

The tool is the **game tree**. Each position is a node and each legal move a branch to a new position. A program can label every final position as a win, loss, or draw and work backward, assuming each player picks the move best for them. This procedure, **minimax**, was formalized by John von Neumann in 1928, and Ernst Zermelo had shown in 1913 that chess must have a definite value: a forced win for White, a forced win for Black, or a draw. Nobody yet knows which; see [[Game theory]].

Solutions come in three strengths:

- **Ultra-weak.** The result is known, but not how to achieve it. John Nash's strategy-stealing argument proves the first player wins Hex on any board size, because a second-player win could be "stolen" by the first player, yet no general winning strategy is known.
- **Weak.** A strategy is known that secures the result from the opening position.
- **Strong.** The best move is known from every legal position, including ones reached after mistakes.

Some milestones: Connect Four was weakly solved in 1988, a first-player win. Checkers took Jonathan Schaeffer's team at the University of Alberta nearly two decades, ending in 2007 with a proof that perfect play draws. The search combined forward search from the opening with databases built backward from positions with few pieces left; see [[Dynamic Programming]].

Chess and Go are far out of reach. Chess has roughly 10^44 legal positions and Go about 10^170, more than the number of atoms in the observable universe, so their trees can't be exhausted; see [[Combinatorial explosion]]. Chess endgames are the exception: **tablebases** solve every position with seven or fewer pieces, including forced wins hundreds of moves long.

Programs that play unsolved games well use partial searches instead. They look a limited number of moves ahead and score positions with a heuristic, pruning branches that can't matter; see [[Backtracking]] and [[Graph Traversal]]. AlphaGo and its successors replaced handcrafted heuristics with neural networks trained by playing against themselves; see [[Monte Carlo Tree Search]] and [[Self-Play]].

Solving a game rarely ends people's interest in it. Human players can't execute a strategy too large to memorize, so checkers is still played competitively, and tournament rules sometimes assign random openings to avoid drawish lines. What a solution does is change how people talk about a game: they stop asking who wins and start asking how close to perfect a given player is, as engines now do for every chess game; see [[Metagame]].

## See also
- [[Dominant Strategy]]
- [[Sudoku]]
- [[Bushnell's Law]]
- [[Deep Blue]]
- [[Poker]]
