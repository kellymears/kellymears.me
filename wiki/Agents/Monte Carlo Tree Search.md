---
aliases:
  - MCTS
  - Upper confidence bound
tags:
  - agents
summary: A game-tree search that estimates moves by playing many random or learned games to the end and focuses effort on the most promising branches, the method that cracked computer Go.
---
**Monte Carlo tree search** (MCTS) decides on a move by building a tree of possible futures a little at a time, guided by the results of many simulated games. Instead of evaluating every branch to a fixed depth, it spends its effort where results look promising, and it gets better the longer it runs. It transformed computer Go and became a core part of the systems that beat the best human players.

Classic game programs search every move to some depth and score the resulting positions with a hand-written evaluation function. That works for chess but fails for Go, where each position offers around 250 legal moves and nobody could write a reliable evaluation; see [[Combinatorial explosion]] and [[Backtracking]]. MCTS gets around both problems by estimating a position's value from the outcomes of random games played from it; see [[Monte Carlo Method]].

Each iteration has four steps:

1. **Selection.** Starting at the root, descend the tree, at each node picking the child that best balances a high win rate against having been tried few times.
2. **Expansion.** Add a new child node for an untried move.
3. **Simulation.** Play the game out from there to the end, choosing moves randomly or with a fast heuristic.
4. **Backpropagation.** Record the win or loss in every node along the path.

The selection rule is the key idea, published by Levente Kocsis and Csaba Szepesvári in 2006. It applies the **upper confidence bound** formula from slot-machine problems, treating each node's children like arms to pull: exploit moves that have done well, but keep exploring rarely tried ones in case they're better; see [[Multi-Armed Bandit]]. The same year Rémi Coulom named the method in his Go program, which soon reached strong amateur level.

DeepMind's AlphaGo, which beat Lee Sedol 4–1 in 2016, combined MCTS with neural networks: one network suggested promising moves to explore, and another estimated who was winning, replacing most random playouts; see [[Neural Network]]. AlphaZero, in 2017, used the same search with networks trained only by playing against itself, mastering chess, shogi, and Go; see [[Self-Play]] and [[Reinforcement Learning]].

MCTS stops whenever time runs out and returns its best estimate so far, which suits games with time limits. It has been used for strategy-game opponents, planning, and puzzles; see [[Game AI]]. Researchers have also applied tree search to language model reasoning, exploring alternative chains of steps and scoring them; see [[Test-time compute]].

Its success with Go is a leading example of a general method that improves with more computation beating hand-crafted knowledge; see [[Bitter Lesson]].

## See also
- [[A-Star Search Algorithm]]
- [[Greedy Algorithm]]
- [[Solved Game]]
- [[Deep Blue]]
