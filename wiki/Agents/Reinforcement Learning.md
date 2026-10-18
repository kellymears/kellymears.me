---
aliases:
  - Markov decision process
  - Policy gradient
  - Q-learning
  - Credit assignment problem
tags:
  - agents
summary: Learning to act by trial and error from rewards instead of labeled examples, the method behind game-playing systems, RLHF, and reasoning models.
---
**Reinforcement learning** (RL) is learning to act from consequences. An *agent* takes actions in an *environment*, receives *rewards*, and adjusts its behavior, its *policy*, to collect more reward over time. No one supplies correct answers, only a score, so the agent must discover which actions lead to good outcomes, often long after the fact.

The standard formal setting is the **Markov decision process**, built on Richard Bellman's work in the 1950s: states, actions, transition probabilities, and rewards, where the next state depends only on the current state and action, the property of a [[Markov Chain]]. Bellman's equation says the value of a state equals the immediate reward plus the discounted value of the best next state, a recursion solvable by [[Dynamic Programming]] when the environment is fully known.

Most interesting problems aren't fully known, so algorithms learn from experience:

- **Value-based methods** estimate how good each action is in each state. Q-learning, introduced by Christopher Watkins in 1989, updates these estimates from each step's reward. DeepMind's 2015 deep Q-network learned dozens of Atari games from raw pixels.
- **Policy gradient methods** adjust the policy directly, making rewarded actions more likely. Proximal policy optimization (PPO, 2017) limits how far each update moves the policy, and it became the workhorse of [[Reinforcement Learning from Human Feedback]].

Three difficulties define the field. **Credit assignment**: when a reward arrives at the end of a long game, which of the many earlier moves deserves it? **Exploration**: an agent that only repeats what has worked never finds anything better, the trade-off studied in its simplest form as the [[Multi-Armed Bandit]]. **Reward specification**: the agent optimizes the reward as written, not as intended, so a flawed reward produces [[Reward Hacking]], a machine-learning case of [[Goodhart's Law]].

Landmarks followed. Gerald Tesauro's TD-Gammon reached expert backgammon in 1992. AlphaGo beat Lee Sedol at Go in 2016, combining learned evaluation with tree search, and AlphaZero then learned chess, shogi, and Go from self-play alone.

In language models, RL is the step after [[Pretraining]] and [[Fine-Tuning]]. RLHF uses a learned model of human preference as the reward. More recently, **RL from verifiable rewards**, rewarding answers that pass unit tests or match a known math result, produced the [[Reasoning Model]]: given only outcome rewards, models learned to write long chains of thought, check their work, and backtrack.

RL also has a neuroscience link. In 1997 Wolfram Schultz and colleagues showed that dopamine neurons fire in proportion to the temporal-difference error of RL algorithms, the gap between expected and received reward, now called [[Reward Prediction Error]]. The algorithm and the brain appear to have converged on the same signal, which also underlies [[Habit Formation]].

## See also
- [[Supervised Learning]]
- [[Self-Play]]
- [[Expected Value]]
- [[Cognitive Map]]
