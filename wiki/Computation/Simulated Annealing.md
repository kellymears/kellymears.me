---
aliases:
  - Annealing schedule
  - Metropolis algorithm
  - Metaheuristic
  - Local search
tags:
  - computation
summary: An optimization method that sometimes accepts worse solutions on purpose, less often as it cools, borrowing from how slowly cooled metal settles into a strong crystal.
---
**Simulated annealing** is a way to find good solutions to optimization problems too large to search exhaustively, by wandering through candidate solutions and occasionally accepting a worse one. The name and the mechanics come from metallurgy. When metal is heated and then cooled slowly, its atoms have time to settle into an orderly, low-energy crystal. Cooled quickly, or *quenched*, they freeze in a disordered arrangement full of defects. Scott Kirkpatrick, Daniel Gelatt, and Mario Vecchi turned this into an algorithm in 1983, building on a 1953 method by Nicholas Metropolis and colleagues for simulating atoms at a given temperature.

The problem it addresses is the local optimum. A [[Greedy Algorithm]] that only ever moves to a better neighboring solution, such as swapping two cities in a delivery route whenever that shortens it, climbs to the nearest peak and stops there, even if a much better solution lies over a ridge. Simulated annealing sometimes steps downhill to get over the ridge.

The loop is short:

- Start from any solution and a high *temperature*.
- Propose a small random change.
- If it is better, accept it. If it is worse by some amount Δ, accept it anyway with probability e^(−Δ/T), where T is the temperature.
- Lower the temperature gradually, and repeat.

At high temperature, nearly every move is accepted and the search roams freely. As it cools, bad moves become rarer, until at the end it behaves like plain hill climbing, settling into whatever valley it has found.

The **cooling schedule** is the main tuning knob. Cool too fast and the search freezes into a poor local optimum, just like quenched metal. Cool slowly enough and, in theory, it finds the global optimum, though the schedule that guarantees this is impractically slow.

Simulated annealing became a standard tool for problems where exact methods are hopeless, many of them NP-hard in the sense of the [[P versus NP Problem]]: placing millions of components on a chip, routing vehicles, scheduling exams or sports fixtures, and laying out graphs. It needs only a way to score a solution and make a small random change, with no gradient and no special structure, which sets it apart from [[Gradient Descent]] and [[Dynamic Programming]]. Results depend on the random draws, so runs use a seeded [[Pseudorandom Number Generator]] for reproducibility, and teams often take the best of several runs.

It belongs to a family of *metaheuristics*, general search strategies that include tabu search and genetic algorithms. Its central idea, a temperature that controls how much randomness is allowed, also appears in [[Temperature Sampling]] for language models, where higher temperatures likewise accept less likely choices. The physical picture underneath, systems settling into low-energy states, connects it to [[Entropy]] and [[Phase Transition|phase transitions]].

## See also
- [[Hyperparameter]]
- [[Linear Programming]]
- [[Work Hardening]]
- [[Knapsack Problem]]
- [[Hopfield Network]]
