---
aliases:
  - Temperature
  - Sampling Temperature
tags:
  - agents
summary: A parameter that scales how sharply a model favors its most likely next token, trading determinism for variety.
---
**Temperature sampling** is a parameter, usually a small non-negative number like 0 to 2, that reshapes a language model's probability distribution over its next [[Token]] before a choice is sampled from it. At temperature near zero, the distribution collapses toward always picking the single highest-probability token — effectively greedy decoding, which is deterministic (or close to it) and repeats the same output on the same input. At higher temperatures, the distribution flattens, less-likely tokens get real odds of being chosen, and the output becomes more varied — and, past a point, less coherent, since low-probability tokens exist at the tail for a reason.

The term borrows the physics metaphor directly: it's the same softmax-with-temperature formulation used in statistical mechanics, where higher temperature means higher entropy in the resulting distribution. Setting temperature to 0 doesn't strictly guarantee identical output every time in practice — floating-point nondeterminism and batched-inference effects on real serving infrastructure can still produce small variation even at the deterministic extreme, which is one flavor of [[Nondeterminism]] worth knowing about before assuming temperature 0 means reproducible.

The practical rule of thumb is that temperature should track the task's tolerance for variety: code generation, [[Structured Output]], and anything with one correct answer wants it low, because the goal is precision, not diversity; creative writing, brainstorming, and anything sampling for breadth wants it higher, because premature convergence on the single most likely continuation is exactly the failure mode to avoid there. Temperature is usually one of several sampling controls (top-p / nucleus sampling and top-k are the other common ones), and they compose — temperature reshapes the whole distribution while top-p and top-k truncate which part of it is even eligible to be sampled from.

## See also
- [[Large Language Model]]
- [[Nondeterminism]]
- [[Structured Output]]
- [[Constrained Decoding]]
