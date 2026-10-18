---
aliases:
  - Dopamine
  - Prediction error
  - Temporal difference learning
  - Dopamine reward signal
tags:
  - mind
summary: The difference between the reward you expected and the reward you got, signaled by dopamine neurons and used by the brain to learn what to want.
---
A **reward prediction error** is the gap between an expected reward and the reward actually received. Better than expected is a positive error, worse is negative, and exactly as expected is zero. The idea comes from learning theory, but in the 1990s it turned out to describe what dopamine neurons in the midbrain actually do. Wolfram Schultz recorded those neurons in monkeys. When an unexpected reward such as a drop of juice arrived, they fired. Once the monkey learned that a light predicted the juice, the neurons fired at the light and no longer at the juice itself. And if the light came on but the juice didn't follow, firing dipped below baseline at the moment the juice should have arrived.

In 1997, Schultz, Peter Dayan, and Read Montague showed this matched *temporal difference learning*, an algorithm from computer science in which an agent learns to predict future reward by correcting its estimates whenever outcomes surprise it. The same family of algorithms later powered game-playing AI, which made the link one of the clearest meeting points between neuroscience and computing.

Several popular ideas get revised by this view:

- **Dopamine is not the pleasure chemical.** It signals surprise about reward, which drives learning and motivation, the *wanting* of something more than the *liking* of it.
- **Expected rewards stop exciting.** Once fully predicted, a reward produces little signal. This fits the [[Hedonic Treadmill]]: what was a delight becomes the baseline.
- **Uncertainty keeps the signal alive.** Rewards that arrive unpredictably keep generating prediction errors, so [[Variable-Ratio Reinforcement]] holds attention better than reliable rewards. Slot machines, loot boxes, the [[Compulsion Loop]] of games, and pull-to-refresh feeds all exploit this.
- **Disappointment teaches too.** Negative errors weaken behaviors that no longer pay off.

The signal underpins [[Habit Formation]], where behavior that is reliably rewarded eventually runs on cues alone. ADHD is often linked to differences in dopamine signaling, and stimulant medications raise dopamine availability, though the full picture is more complicated than a simple shortage. The pull of novelty that drives a [[Rabbit Hole]] is prediction error at work. So is part of the [[Placebo Effect]], since expectation itself shapes how rewards are processed.

## See also
- [[Boredom]]
- [[Reinforcement Learning]]
- [[Multi-Armed Bandit]]
- [[Classical Conditioning]]
- [[Placebo Effect]]
- [[Rabbit Hole]]
- [[Predictive Processing]]
- [[Curiosity]]
- [[Neuroplasticity]]
