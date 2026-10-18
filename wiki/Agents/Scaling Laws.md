---
aliases:
  - Neural scaling laws
  - Chinchilla scaling
  - Compute-optimal training
  - The Bitter Lesson
  - Emergent abilities
tags:
  - agents
summary: The empirical finding that language model performance improves predictably as a power law of parameters, data, and compute, which turned AI progress into a matter of planning budgets.
---
**Scaling laws** describe how a neural network's performance improves as it gets bigger, sees more data, and uses more computing power. For language models, the relationship turns out to be remarkably regular: the error of next-token prediction falls as a power law in each of these quantities across many orders of magnitude. That regularity lets labs predict how a large model will perform from much smaller experiments, before spending a fortune training it.

A 2020 OpenAI paper by Jared Kaplan and colleagues established the pattern for transformers. Loss fell smoothly as parameters, data, and compute grew, as long as none of the three was a bottleneck. A power law means steady but diminishing returns: each tenfold increase in compute buys roughly the same fixed reduction in loss.

In 2022, DeepMind's **Chinchilla** paper by Jordan Hoffmann and colleagues corrected how to spend a fixed budget. Earlier models had been too large for their data. For compute-optimal training, parameters and training tokens should grow together, at roughly 20 tokens per parameter. Chinchilla, with 70 billion parameters trained on 1.4 trillion tokens, outperformed DeepMind's own 280-billion-parameter Gopher using the same compute.

Practice then moved past "optimal." Training cost is paid once, but running a model is paid on every request, so labs now train smaller models on far more data than Chinchilla suggests. The model costs more to train but less to serve, which matters for [[Model Routing]] across tiers and for running models locally with [[Quantization]].

The scaling results gave weight to an argument Richard Sutton made in a 2019 essay, *The Bitter Lesson*: across decades of AI research, general methods that exploit growing computation have beaten approaches built on human insight about the problem.

Several caveats apply:

- **Loss is not capability.** Smooth improvement in prediction error doesn't mean smooth improvement on every task. Some abilities seemed to appear suddenly at scale, called *emergent abilities*, though a 2023 analysis argued much of the suddenness came from all-or-nothing metrics rather than the models.
- **Data runs out.** High-quality human text is finite, and training mostly on generated text risks the degradation described under [[Pretraining]].
- **Benchmarks saturate and leak**, so measured gains can overstate real ones; see [[Goodhart's Law]].

As gains from pretraining slowed, attention turned to a second axis: spending more computation when the model answers, letting it reason longer before responding. Performance on hard problems also scales with this *test-time compute*, which is the premise of the [[Reasoning Model]]. Smaller models trained to imitate larger ones, through [[Knowledge Distillation]], capture much of the larger model's ability at lower cost.

## See also
- [[Pretraining]]
- [[Reasoning Model]]
- [[Knowledge Distillation]]
- [[Large Language Model]]
