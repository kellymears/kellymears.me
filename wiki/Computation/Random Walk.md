---
aliases:
  - Drunkard's walk
  - Gambler's Ruin
tags:
  - computation
summary: A path built from a sequence of random steps, a simple model that describes diffusing particles, coiled molecules, and fluctuating prices, and that powers sampling and ranking methods in computing.
---
A **random walk** is a path built from a sequence of random steps. The simplest version starts at zero on a number line and, at each step, moves one unit left or right with equal probability, as if guided by a coin toss. Random walks nonetheless describe the jiggling of pollen grains in water, the shapes of long molecules, and the movement of prices.

Some behavior is easy to predict. After n steps of a one-dimensional walk, the expected position is still zero, but the typical distance from the start grows like the square root of n, not n. A walk of 10,000 steps usually ends up on the order of 100 steps away. Over many steps, the distribution of the end point approaches a bell curve; see [[Normal Distribution]]. Other behavior is counterintuitive: the walk tends to spend long stretches on one side of zero.

Whether a walk comes home depends on dimension. George Pólya proved in 1921 that a random walk on a grid in one or two dimensions returns to its starting point with certainty, eventually, but in three or more dimensions there's a real chance it never does. The mathematician Shizuo Kakutani is credited with summing this up: a drunk person will find the way home, but a drunk bird may get lost forever.

The **gambler's ruin** problem is a random walk with walls. A gambler betting one unit at a time against a casino with far more money will, with certainty, eventually go broke, even in a perfectly fair game. The walk has no memory: a long losing streak makes a win no more likely on the next bet; see [[Gambler's Fallacy]] and [[Markov Chain]].

The continuous limit of a random walk, with ever smaller steps taken ever more often, describes the erratic motion of particles suspended in fluid, which Albert Einstein explained in 1905 as the result of countless molecular collisions; see [[Brownian motion]]. Long flexible molecules are often modeled as random walks that can't cross themselves; see [[Polymer]].

In computing, random walks are tools. Monte Carlo methods estimate hard-to-compute quantities by wandering through a space at random; see [[Monte Carlo Method]]. Google's original ranking idea modeled a surfer clicking links at random, with a page's importance given by how often the surfer lands there; see [[PageRank]]. Optimization methods take random steps biased toward better answers; see [[Simulated Annealing]]. All of them depend on a good source of randomness; see [[Pseudorandom Number Generator]].

In finance, the claim that stock prices follow a random walk, so that past prices don't predict future ones, has fueled a long debate about whether markets can be beaten, and averages of many such walks behave far more predictably than any single one; see [[Law of Large Numbers]].

## See also
- [[Fractal]]
- [[Birthday Problem]]
