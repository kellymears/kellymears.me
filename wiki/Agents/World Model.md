---
aliases:
  - World models
  - Model-based reinforcement learning
tags:
  - agents
summary: An internal model of how an environment works that lets an agent predict the results of actions before taking them, central to planning in reinforcement learning and to the debate over what language models actually understand.
---
A **world model** is an internal representation of how an environment behaves, which an agent uses to predict what will happen, especially what will happen if it takes a particular action. With a world model, an agent can imagine outcomes and plan before acting, instead of learning everything by trial and error.

The idea is older than AI. In 1943 the psychologist Kenneth Craik suggested that minds carry small-scale models of reality and use them to try out alternatives, a view that survives in modern theories of the brain as a prediction machine; see [[Mental Model]] and [[Predictive Processing]].

In reinforcement learning, the distinction is between model-free and model-based methods; see [[Reinforcement Learning]]. Model-free agents learn directly which actions pay off. Model-based agents learn how the environment responds and plan with that knowledge. A model can make learning far more efficient, since imagined experience is cheap, but errors in the model mislead the planner.

Some landmarks:

- **Dyna**, proposed in 1990, mixed real experience with simulated experience drawn from a learned model.
- **World Models**, a 2018 paper by David Ha and Jürgen Schmidhuber, trained an agent largely inside its own learned simulation of a racing game, which the authors likened to dreaming; see [[Dreaming]].
- **MuZero**, from 2019, extended the AlphaGo line by learning its own model of game dynamics and planning with tree search, mastering Go, chess, and Atari games without being told the rules; see [[AlphaGo]] and [[Monte Carlo Tree Search]].
- **Dreamer** agents learned to control robots and play games by training in imagined rollouts.

Video and game generators have since been described as world models, since they predict how a scene evolves in response to actions; see [[Diffusion Model]] and [[Game Engine]]. Whether they capture physics or only plausible appearances is debated.

The term is also at the center of an argument about language models. Critics argue models trained only to predict text learn surface statistics without understanding; see [[Stochastic Parrot]]. Supporters point to studies such as one in which a model trained only on records of Othello moves developed an internal representation of the board that researchers could read and edit; see [[Mechanistic Interpretability]] and [[Large Language Model]]. Some researchers argue that future systems need explicitly trained world models to reason and plan reliably.

World models connect to robotics through simulation. Training in a simulated world and transferring to the real one depends on the simulation being accurate enough, and on randomizing what isn't; see [[Synthetic Data]]. The old difficulty of tracking what changes and what stays the same after an action resurfaces here; see [[Frame Problem]].

## See also
- [[Automated Planning]]
- [[Linear Probe]]
