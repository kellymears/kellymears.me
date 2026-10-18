---
aliases:
  - Exploration–exploitation tradeoff
  - Explore-exploit
  - Thompson sampling
  - Epsilon-greedy
  - Contextual bandit
tags:
  - agents
summary: The simplest model of the explore-or-exploit dilemma, choosing repeatedly among options with unknown payoffs, and the algorithms that balance trying new things against using what works.
---
The **multi-armed bandit** problem asks how to choose repeatedly among several options whose payoffs are unknown. Picture a gambler facing a row of slot machines, "one-armed bandits," each with a hidden payout rate. Every pull earns a reward and reveals a little. The gambler wants the most total winnings, which means balancing two competing needs.

That tension is the **exploration–exploitation tradeoff**. *Exploiting* means pulling the arm that looks best so far. *Exploring* means trying others, which costs reward now but might reveal something better. Pure exploitation can lock onto a mediocre arm after a lucky start; pure exploration never cashes in. The cost of not knowing the best arm in advance is measured as *regret*, the reward lost compared with always pulling the best arm. In 1985 Tze Leung Lai and Herbert Robbins proved that regret must grow at least logarithmically with the number of pulls.

Three strategies cover most practice:

- **Epsilon-greedy** exploits the best arm most of the time and picks at random a small fraction, epsilon, of the time. It is simple but wastes exploration on arms known to be bad.
- **Upper confidence bound** (UCB) picks the arm with the highest optimistic estimate, its average plus an uncertainty bonus that shrinks as the arm is tried. This is "optimism in the face of uncertainty": an under-tested arm might be great, so it gets a chance.
- **Thompson sampling**, proposed by William R. Thompson in 1933 for clinical trials, keeps a probability distribution over each arm's payoff, samples one plausible value from each, and pulls the arm whose sample is highest. Arms are chosen in proportion to the chance that they are best. It often performs best in practice.

Bandits are a cousin of [[AB Testing]]. A fixed A/B test splits traffic evenly until the end; a bandit shifts traffic toward the winner as evidence arrives, losing less to the inferior variant but giving weaker statistical conclusions. *Contextual bandits* choose using features of the situation, and Yahoo's 2010 news recommender is the classic case. [[Model Routing]] faces a bandit problem when it learns which model handles which request best.

The bandit is also the one-state special case of [[Reinforcement Learning]], where actions don't change the world, so it isolates exploration from planning. Reducing exploration over time resembles the cooling schedule of [[Simulated Annealing]], and always grabbing the current best is a [[Greedy Algorithm]] that can fail the same way.

People face the same dilemma: the favorite restaurant or a new one. Research on human choice finds that people explore more when they have a long horizon ahead, which suggests [[Curiosity]] is partly a rational response to uncertainty. Children explore more than adults, which fits: they have the most future ahead.

## See also
- [[Recommender System]]
- [[Expected Value]]
- [[Model Routing]]
- [[Curiosity]]
- [[Randomized Controlled Trial]]
- [[Statistical Significance]]
