---
aliases:
  - Abstract game
  - Combinatorial game
tags:
  - play
summary: Games such as chess, Go, checkers, and Hex in which nothing is hidden and nothing is left to chance, so the outcome depends only on the players' decisions, a family that has driven both competitive play and artificial intelligence research.
---
An **abstract strategy game** is one in which every piece of information is visible to both players, no dice or cards add chance, and any theme is minimal or vestigial. Chess, Go, checkers, Othello, Hex, and nine men's morris are the classic examples. Because nothing is hidden or random, the outcome depends only on the choices the players make; see [[Perfect Information]] and [[Input and Output Randomness]].

The theme is what gets abstracted away. Chess still has kings and knights, but nothing about medieval warfare affects how they move; the names are labels for rules. Go has no theme at all, just black and white stones placed on the intersections of a grid. That bareness lets them cross cultures and centuries. Go has been played in East Asia for well over two thousand years, and chess descends from games played in India around the sixth century.

Mathematicians call such games combinatorial. With perfect information and no chance, every position has a definite value under perfect play, and in principle a computer could search the whole tree of moves to find it; see [[Solved Game]]. Tic-tac-toe, Connect Four, and checkers have been solved this way. For chess and Go the trees are far too large. Chess has been estimated to have more possible games than atoms in the observable universe, and Go's legal positions alone number around ten to the power of 170.

That combination of clear rules and enormous depth made these games a benchmark for artificial intelligence. Early chess programs searched ahead and pruned branches that couldn't matter; see [[Alpha-Beta Pruning]]. IBM's Deep Blue defeated the world champion Garry Kasparov in 1997; see [[Deep Blue]]. Go resisted longer, because positions are hard to evaluate, until DeepMind's AlphaGo combined neural networks with random playouts and beat Lee Sedol in 2016; see [[AlphaGo]] and [[Monte Carlo Tree Search]].

The games also shaped how skill is measured. The Elo system was devised to rank chess players, and its descendants now rate players in online games; see [[Elo Rating System]]. Strong players study openings and endings as libraries of known lines, which computer analysis has greatly expanded.

Designers still create new abstracts. Hex, invented independently by Piet Hein in 1942 and John Nash in 1948, can never end in a draw, and a short argument shows the first player must have a winning strategy, though no one knows it for large boards. Modern abstracts such as Hive and Santorini add a light theme while keeping the core. The design challenge is avoiding a single best line of play while keeping the rules short; see [[Dominant Strategy]] and [[Interesting Decisions]].

Abstracts sit at one end of a spectrum of board games, opposite heavily themed games full of hidden hands and dice; see [[Eurogame]].

## See also
- [[Backgammon]]
- [[Tetris]]
- [[Go]]
- [[Mahjong]]
