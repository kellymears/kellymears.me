---
aliases:
  - Mech interp
  - Circuits
tags:
  - agents
summary: Reverse-engineering the computation a trained network learned into human-legible features and circuits.
---
**Mechanistic interpretability** is the attempt to reverse-engineer what a trained neural network actually computes, described as features and circuits, rather than treating it as a black box characterised only by its inputs and outputs. A **feature** is a direction in activation space corresponding to something describable; a **circuit** is a subgraph of features and weights implementing a behaviour end to end. A published example is the induction head, which detects a repeated prefix and copies whatever followed it last time.

The central obstacle is **superposition**. A model represents far more distinguishable features than it has dimensions, packing them into near-orthogonal directions and tolerating the interference. Individual neurons are therefore polysemantic — one unit fires for several unrelated things — so reading neurons directly yields no explanation. **Sparse autoencoders** attack this by training a very wide, sparsely activating dictionary on a layer's activations, recovering features closer to monosemantic. Clamping one and watching the output change is the causal test separating a feature from a correlation.

The limits are real. Recovered dictionaries are incomplete, reconstruction is lossy, feature sets differ between training runs, and most fully traced circuits come from small models. [[Nondeterminism]] in training and sampling makes exact replication awkward, and a [[Token]]-level story about one prompt rarely generalises.

What none of this licenses is folk prompting advice. Discovering that a [[Large Language Model]] carries a feature for a concept says nothing about which phrasing recruits it, and no published result yet justifies an incantation. Claims about [[Prompt Engineering]] still need an [[Evaluation Harness]] and measured outcomes; interpretability supplies an explanation to be earned, not a [[Plausible Mechanism]] to be assumed. Its firmest practical contribution so far is negative — showing that intuitive stories about why a model produced an output, including many about [[Hallucination]], are simply wrong.

## See also
- [[Large Language Model]]
- [[Context Window]]
- [[Evaluation Harness]]
- [[Falsifiability]]
- [[Markov Chain]]
