---
aliases:
  - Competitive analysis
  - Ski rental problem
  - Competitive ratio
tags:
  - computation
summary: An algorithm that must make each decision as its input arrives, without knowing what comes next, judged by how its results compare with the best possible choices made in hindsight.
---
An **online algorithm** receives its input piece by piece and must act on each piece before seeing the next, usually without being able to undo earlier decisions. An **offline** algorithm sees the whole input at once. A cache deciding which item to evict, a scheduler assigning arriving jobs to machines, and a person deciding whether to keep renting or to buy all face online problems.

Because an online algorithm cannot know the future, it usually cannot be optimal. **Competitive analysis**, introduced by Daniel Sleator and Robert Tarjan in 1985, measures how much worse it can be. An algorithm is c-competitive if, on every possible input, its cost is at most c times the cost of the best offline solution, the one chosen with perfect hindsight. The analysis imagines an adversary who knows the algorithm and builds the worst input for it; see [[Approximation Algorithm]] and [[Big-O Notation]].

The **ski rental problem** is the standard example. Renting skis costs 1 per day and buying costs B, and you do not know how many days you will ski. Buy on day one and you overpay badly if you quit after a day. Rent forever and you overpay badly if you ski for years. The best deterministic strategy is to rent until the rent paid would reach the purchase price, then buy. Whatever happens, this costs at most about twice the optimum, so it is 2-competitive, and no deterministic strategy does better. A randomized strategy that picks the day to buy from a carefully chosen distribution improves the guarantee to about 1.58; see [[Monte Carlo Method]].

**Paging** is the other classic. With a cache holding k pages, the optimal offline policy, described by László Bélády in 1966, evicts the page that will be needed furthest in the future, which requires knowing the future; see [[Virtual Memory]]. Least recently used eviction is k-competitive, and no deterministic online policy can do better in the worst case. In practice, LRU performs far better than that bound because real access patterns have locality; see [[Least Recently Used Cache]] and [[Locality of Reference]].

Other online problems include assigning jobs to machines, where greedily choosing the least loaded machine is within a factor of 2 of optimal; packing items into bins as they arrive; and the secretary problem of choosing the best candidate from a sequence when each must be accepted or rejected on the spot; see [[Load Balancing]], [[Knapsack Problem]] and [[Greedy Algorithm]].

Online learning studies the same setting with a different measure, regret, the gap between an algorithm's results and the best fixed choice in hindsight; see [[Multi-Armed Bandit]]. Algorithms that process a stream once with little memory face a related constraint; see [[Reservoir Sampling]].

## See also
- [[Amortized Analysis]]
- [[Hindsight Bias]]
