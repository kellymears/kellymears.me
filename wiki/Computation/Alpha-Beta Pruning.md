---
aliases:
  - Alpha-beta search
tags:
  - computation
summary: A technique for searching two-player game trees that returns the same move as a full minimax search while skipping branches that provably cannot change the result, letting game programs look much deeper in the same time.
---
**Alpha-beta pruning** is a method for searching game trees that gives the same answer as a full minimax search while examining far fewer positions. It underlies most classical chess programs, including the machine that beat a reigning world champion in 1997; see [[Deep Blue]].

The starting point is **minimax**. In a two-player game where one side's gain is the other's loss, a program can imagine every move, every reply, and so on, forming a tree of positions. At the bottom, positions are scored. Working upward, the player to move picks the child with the highest score and the opponent picks the lowest, on the assumption that both play as well as possible. For small games this settles the outcome exactly; see [[Solved Game]]. For chess, the tree is far too large, so programs search to a fixed depth and estimate the positions there.

Alpha-beta pruning rests on the observation that much of the tree doesn't need looking at. Suppose the program has found one move that guarantees at least a draw. While examining a second move, it finds that the opponent has a reply leading to a loss. There's no need to look at the opponent's other replies to that second move: it's already worse than the first, however the rest turns out. The search keeps two bounds as it goes, **alpha** for the score the maximizing side can already guarantee and **beta** for the score the minimizing side can guarantee, and abandons any branch that falls outside them. It's a form of dropping partial solutions that can't succeed; see [[Backtracking]].

How much it saves depends on move order. If the best moves are always examined first, alpha-beta examines roughly the square root of the number of positions minimax would, which in practice lets a program search about twice as deep in the same time; see [[Big-O Notation]]. With the worst ordering, it saves nothing. Real engines invest heavily in guessing good moves early, trying captures first and storing evaluated positions so that one reached by different move orders isn't searched twice; see [[Hash Table]].

Several researchers developed the idea around 1960, and Donald Knuth and Ronald Moore analyzed it carefully in 1975.

Alpha-beta has limits. It needs a good evaluation function, which some games resist. In Go, the branching factor is huge and positions are hard to score, so programs turned to random playouts instead; see [[Monte Carlo Tree Search]] and [[AlphaGo]]. Later systems that learn to evaluate positions by playing against themselves also lean on tree search guided by learned estimates; see [[Self-Play]].

The underlying lesson, that a provable bound lets a search skip work without losing correctness, also drives branch-and-bound methods in optimization and admissible heuristics in pathfinding; see [[A-Star Search Algorithm]].

## See also
- [[Graph Traversal]]
- [[Game theory]]
- [[Abstract Strategy Game]]
- [[Go]]
