---
aliases:
  - 0-1 knapsack
  - Subset sum
  - Bin packing
tags:
  - computation
summary: Choosing which items to pack into a limited capacity to maximize their total value, an NP-hard problem that dynamic programming nonetheless solves quickly when the numbers are small.
---
The **knapsack problem** asks which items to choose, each with a weight and a value, so that their total weight fits within a limit and their total value is as large as possible. A hiker filling a pack is the image, but the same problem appears whenever a fixed budget must be split among options: which projects to fund, which cargo to load, which tests to run in limited time; see [[Opportunity Cost]].

In the **0-1** version each item is taken whole or left behind; in the **fractional** version items can be split, like grain or liquid. The difference is decisive. The fractional version is easy: sort items by value per unit of weight and take the best until the pack is full, a [[Greedy Algorithm]] that is provably optimal. The same rule fails for whole items. With a capacity of 10, one item weighing 6 worth 7, and two weighing 5 worth 5 each, greedy grabs the 6 and has no room left, while the two 5s together are worth 10.

The 0-1 version is NP-hard; see [[P versus NP Problem]]. No known algorithm solves every instance in time polynomial in the input's size. Its decision form was among Richard Karp's 21 NP-complete problems in 1972, and the special case where every value equals its weight is **subset sum**.

Yet it is one of the easiest hard problems in practice:

- **Dynamic programming.** Build a table of the best value achievable for each capacity from zero to the limit, adding items one at a time. The work grows with the number of items times the capacity, which is fast when the capacity is a modest number; see [[Dynamic Programming]] and [[Memoization]]. This is called pseudo-polynomial: polynomial in the capacity's value, but exponential in the number of digits needed to write it.
- **Approximation.** For any chosen tolerance, rounding values to a coarser scale finds a solution within that fraction of optimal in polynomial time.
- **Branch and bound.** Search the tree of include-or-exclude choices, pruning branches whose best possible outcome, estimated with the fractional version, can't beat the best found so far; see [[Backtracking]].

Its relatives are everywhere. **Bin packing** asks how few fixed-size bins can hold a set of items, the problem behind loading trucks, scheduling jobs on machines, and placing containers on servers. Versions with several constraints at once, such as weight and volume, are usually handed to [[Linear Programming]] solvers with integer constraints.

Knapsack once anchored a cryptosystem. The Merkle-Hellman scheme (1978) hid messages in subset-sum instances, but Adi Shamir broke it in 1982 because its instances had exploitable structure. It became a standing lesson that worst-case hardness says little about typical instances; see [[Public-Key Cryptography]].

## See also
- [[Traveling Salesman Problem]]
- [[Simulated Annealing]]
- [[Boolean Satisfiability Problem]]
- [[Approximation Algorithm]]
- [[Masonry Layout]]
