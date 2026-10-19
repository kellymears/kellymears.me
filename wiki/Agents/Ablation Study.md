---
aliases:
  - Ablation
  - Ablation experiment
tags:
  - agents
summary: An experiment that removes or disables one part of a system and measures what changes, borrowed from neuroscience lesion studies and now the standard way machine learning papers show which of their components actually matter.
---
An **ablation study** takes a working system, removes one piece, and measures what's lost. If a new model has five innovations, the authors train versions missing each one in turn and compare. A component whose removal barely changes the result probably wasn't doing much, whatever the paper's story about it.

The term comes from biology, where ablation means surgically removing or destroying tissue. Neuroscientists long studied what brain regions do by damaging them in animals, or by studying people with injuries to specific areas, and inferring function from what was lost. An early landmark came in 1861, when Paul Broca linked a patient's loss of fluent speech to damage in one region of the left frontal lobe. The approach has a known weakness that carries over: brains reorganize after damage, so a missing capacity may be taken over by another region and a lesion can understate what the region normally did; see [[Neuroplasticity]].

In machine learning, ablations became expected in papers that propose complex systems. Reviewers routinely ask which parts are needed, partly because many published gains have turned out to come from incidental choices, such as better tuning of the baseline or a longer training run, rather than the advertised idea; see [[Hyperparameter]]. A careful ablation changes one thing at a time and holds the rest fixed, the logic of a controlled experiment; see [[Control group]] and [[Confounding]].

Ablations sometimes overturn explanations. Studies removing parts of transformer models found that many attention heads could be dropped with little effect, while a few were critical; see [[Attention Mechanism]]. Experiments on [[Batch Normalization]] showed its benefit survived even when the effect it was supposed to prevent was deliberately added back. Removing [[Residual Connection]]s from very deep networks shows how much training depends on them.

Interpretability research ablates inside a single trained network. Zeroing a neuron, replacing a layer's output with its average, or swapping activations from a different input reveals which parts carry which information; see [[Mechanistic Interpretability]] and [[Linear Probe]]. Such interventions test causal claims that correlations can't. They face the same problem as brain lesions: networks often have redundant paths, so knocking out one may let another compensate.

Good ablations require statistical care. Training runs differ from seed to seed, sometimes as much as the effect being measured, so a single comparison can mislead; see [[Nondeterminism]] and [[Statistical Significance]]. Reporting several seeds with error bars, and testing on held-out benchmarks rather than ones the method was tuned on, guards against fooling yourself; see [[Evaluation Harness]] and [[Replication Crisis]]. Ablations are also expensive at scale, so the largest models are often studied with small stand-ins, trusting that conclusions carry over.

## See also
- [[Neural Network]]
- [[Benchmark Contamination]]
