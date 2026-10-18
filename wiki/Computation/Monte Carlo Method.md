---
aliases:
  - Monte Carlo
  - Monte Carlo simulation
  - Randomized algorithm
  - Las Vegas algorithm
tags:
  - computation
summary: Estimating answers by running many random trials, a technique born in the Manhattan Project that now powers rendering, risk analysis, and game-playing AI.
---
The **Monte Carlo method** estimates answers by repeated random sampling. Instead of calculating a quantity directly, you simulate many random trials and average the results. To estimate pi, scatter random points over a square containing a circle and count how many land inside; the ratio approaches pi over four. The answer is approximate, but the error shrinks predictably as trials accumulate.

The method was developed in the late 1940s at Los Alamos by Stanislaw Ulam and John von Neumann, working on neutron diffusion in nuclear weapons. Ulam got the idea while playing solitaire during an illness, wondering about the chance of winning a hand and realizing it was easier to play many hands and count than to compute it. Nicholas Metropolis suggested the name, after the casino in Monaco where Ulam's uncle liked to gamble. Their work was among the first uses of electronic computers, and the [[Simulated Annealing]] method grew from Metropolis's later sampling algorithm.

The error of a Monte Carlo estimate falls with the square root of the number of samples: four times as many samples halves the error. That's slow, but it doesn't depend on the number of dimensions. For problems with many variables, where grid-based methods need exponentially many points, random sampling is often the only practical approach.

Monte Carlo methods appear across fields:

- **Rendering.** Path tracing estimates the light reaching each pixel by following random light paths, which is why early renders look grainy before converging; see [[Ray Tracing]].
- **Finance and risk.** Simulating thousands of market scenarios estimates the range of outcomes for a portfolio or project.
- **Statistics.** Markov chain Monte Carlo draws samples from complex probability distributions, making modern [[Bayes' Theorem]] computations feasible; see [[Markov Chain]].
- **Games.** Monte Carlo tree search evaluates moves by playing out many random games, and was central to AlphaGo's 2016 victory.
- **Planning.** Simulating project durations with uncertain tasks gives a range of finish dates rather than one optimistic guess; see [[Planning Fallacy]].

Computer science distinguishes two kinds of **randomized algorithm**. A *Monte Carlo algorithm* runs in bounded time but may give a wrong answer with small probability, as with probabilistic primality tests or a [[Bloom Filter]]'s false positives. A *Las Vegas algorithm* always gives the right answer, but its running time varies, as with quicksort using a random pivot; see [[Sorting Algorithm]]. [[Reservoir Sampling]] and [[HyperLogLog]] are other randomized techniques.

Results are only as good as the randomness and the model. A weak [[Pseudorandom Number Generator]] can bias results, and a simulation of the wrong model produces precise-looking nonsense. Variance reduction techniques, such as importance sampling, focus samples where they matter and can cut the required work dramatically.

## See also
- [[Quantum Computing]]
- [[Monte Carlo Tree Search]]
- [[Birthday Problem]]
- [[Wargame]]
- [[Radioactive Decay]]
