---
aliases:
  - Belief network
  - Probabilistic graphical model
tags:
  - agents
summary: A model of uncertain knowledge drawn as a directed graph, where each variable depends probabilistically on its parents, letting a system update beliefs about causes from observed effects and reason about interventions.
---
A **Bayesian network** is a way of representing uncertain knowledge as a directed graph. Each node is a variable, such as whether it rained, whether the sprinkler ran, and whether the grass is wet, and each arrow points from a cause to something it influences. Each node stores a table of probabilities for its values given the values of its parents. Together, the graph and tables define a full probability distribution over all the variables, in a compact form a person can read; see [[Bayes' Theorem]].

The compactness comes from what the graph leaves out. A distribution over 30 yes-or-no variables needs over a billion numbers if written out in full. But if each variable depends directly on only a few others, the network needs only small tables for each node, and missing arrows encode assumptions of independence. The graph must have no cycles, so variables can be ordered from causes to effects; see [[Topological Sort]].

The network supports reasoning in any direction. Given that the grass is wet, it can compute how likely rain and the sprinkler each are. Learning that it rained then lowers the probability of the sprinkler, since rain already explains the wet grass, an effect called explaining away. The same pattern of conditioning on a shared effect creates spurious correlations in data; see [[Berkson's Paradox]]. Updating beliefs this way is Bayesian inference at scale; see [[Bayesian Inference]].

The computer scientist Judea Pearl introduced the term in 1985 and developed the theory through the 1980s, including efficient message-passing algorithms for networks shaped like trees. In general, exact inference is computationally hard, so large networks use approximations such as random sampling; see [[Monte Carlo Method]] and [[P versus NP Problem]]. Pearl received the Turing Award in 2011.

Bayesian networks shaped the shift away from rule-based expert systems, which handled uncertainty awkwardly, toward probabilistic AI; see [[Expert System]]. They were applied to medical diagnosis, equipment troubleshooting, and spam filtering. Simpler models are special cases: a naive Bayes classifier is a network in which one class node points to every feature, and hidden Markov models are networks unrolled over time; see [[Naive Bayes]] and [[Hidden Markov Model]].

Pearl later extended the framework to causation. A causal Bayesian network supports questions about interventions, what happens if we force the sprinkler on, which differ from questions about observations. That distinction, formalized in Pearl's do-calculus, underlies modern methods for estimating causal effects from observational data and for adjusting for confounders; see [[Correlation and Causation]] and [[Confounding]].

Neural networks have since overtaken Bayesian networks for perception and language, but the graphs remain valued where uncertainty must be explicit and reasoning must be explained; see [[Explainable AI]].

## See also
- [[Fault Tree Analysis]]
- [[Simpson's Paradox]]
- [[Causal Inference]]
