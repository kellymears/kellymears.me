---
aliases:
  - AlphaZero
  - League training
tags:
  - agents
summary: Training an agent by having it play against copies of itself, giving it an opponent that always matches its skill, the route by which programs became superhuman at backgammon, Go, and poker.
---
**Self-play** trains an agent by having it play against copies of itself. Every game generates training data, and the opponent improves exactly as fast as the learner, providing a challenge that's always roughly the right difficulty. It's how game-playing programs have repeatedly gone past the best humans without being taught by them; see [[Reinforcement Learning]].

The idea is old. Arthur Samuel's checkers program in the 1950s improved by playing itself, and Samuel coined the phrase "machine learning" to describe it. In 1992, Gerald Tesauro's TD-Gammon learned backgammon purely from self-play, reached the level of top human players, and found opening moves that experts then adopted.

The landmark came in 2017. DeepMind's AlphaGo Zero learned Go with no human games at all, starting from random play, and within days beat the version that had defeated world champion Lee Sedol, 100 games to 0. Its successor, **AlphaZero**, did the same for chess and shogi, combining self-play with tree search; see [[Monte Carlo Tree Search]]. That human data turned out to be unnecessary, even limiting, is a central example of the [[Bitter Lesson]].

Self-play has a typical failure. An agent that only faces its current self can forget how to beat older strategies, cycling like rock-paper-scissors: strategy A beats B, B beats C, C beats A; see [[Catastrophic Forgetting]]. Remedies include:

- **Playing past versions.** Training against a pool of earlier selves keeps old lessons alive.
- **Leagues.** DeepMind's AlphaStar, which reached grandmaster level at StarCraft II in 2019, trained a league that included "exploiter" agents whose only job was to find weaknesses in the main agents.
- **Equilibrium methods.** In games with hidden information, such as poker, training aims for strategies that can't be exploited; see [[Nash equilibrium]]. The program Pluribus beat professionals at six-player poker in 2019.

Self-play also produces surprises. In an OpenAI experiment in 2019, agents playing hide-and-seek invented tool use, building forts and then exploiting physics glitches to launch themselves over walls; see [[Emergent Gameplay]]. An evolving population of strategies mirrors how a human player community's [[Metagame]] shifts.

Superhuman doesn't mean robust. In 2023, researchers trained an adversary that found a simple strategy a strong amateur could use to beat top Go programs, which had never encountered it in self-play; see [[Adversarial Example]].

The idea extends well beyond board and video games. A [[Generative Adversarial Network]] pits a generator against a discriminator in a similar loop. Language model research uses models that generate problems for one another, or debate, to create training signal without human labels; see [[Synthetic Data]].

## See also
- [[Game AI]]
- [[Reward Hacking]]
- [[Solved Game]]
- [[Deep Blue]]
- [[Elo Rating System]]
