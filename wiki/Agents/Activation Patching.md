---
aliases:
  - Causal tracing
  - Path patching
  - Attribution patching
tags:
  - agents
summary: An interpretability technique that copies internal activations from one run of a neural network into another to find which components actually cause a behavior, the experimental workhorse for locating facts and circuits inside language models.
---
Looking at a network's activations shows what is correlated with a behavior; it doesn't show what causes it. A probe might find that some layer encodes a fact without that layer being used; see [[Linear Probe]]. **Activation patching** turns interpretability into an experiment. Researchers run the model on two inputs that differ in one controlled way, copy an internal activation from one run into the other, and measure whether the output changes; see [[Mechanistic Interpretability]] and [[Causal Inference]].

A typical setup uses a **clean** prompt, such as "The Eiffel Tower is in the city of," which the model completes with "Paris," and a **corrupted** prompt that removes the needed information, such as a different landmark or added noise. Running the corrupted prompt but restoring one component's activation from the clean run shows how much of the correct answer that single component brings back. Repeating this for every layer, position and attention head yields a map of where the behavior lives.

In 2022, Kevin Meng and colleagues used this method, which they called **causal tracing**, to argue that factual associations in GPT-style models are recalled mainly by feedforward layers in the middle of the network at the subject's last token. Editing those weights directly could then change a stored fact. The same year, a team mapped a circuit of more than two dozen attention heads in GPT-2 small that completes sentences such as "When Mary and John went to the store, John gave a drink to" with "Mary," the first detailed circuit found in a language model; see [[Attention Mechanism]].

Variants refine the question:

- **Path patching** patches the effect of one component on another specifically, rather than everywhere, isolating individual connections; see [[Residual Connection]].
- **Attribution patching** approximates many patches at once with gradients, trading accuracy for scale on large models; see [[Backpropagation]].
- **Ablation** replaces an activation with zero or an average, the simpler cousin of patching; see [[Ablation Study]].

The method has pitfalls. Results depend heavily on the choice of corrupted prompt and metric. A patched activation can push the network into states it never sees in normal use, giving misleading answers; see [[Distribution Shift]]. Networks also repair themselves: when one head is knocked out, backup heads may take over its job, hiding its importance. And polysemantic neurons mean a component may matter for reasons unrelated to the hypothesis being tested; see [[Superposition]].

Patching complements interventions that add vectors to change behavior, which test whether a found direction is used as hypothesized; see [[Activation Steering]]. Together they move interpretability from describing networks toward predicting and controlling them; see [[Explainable AI]].

## See also
- [[Shapley Values]]
- [[Randomized Controlled Trial]]
