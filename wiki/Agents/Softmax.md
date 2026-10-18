---
aliases:
  - Logits
  - Logit
  - Softmax function
  - Attention sink
tags:
  - agents
summary: The function that turns a vector of raw scores into probabilities, used at the output of every language model and inside every attention layer.
---
**Softmax** turns a list of arbitrary real numbers into a probability distribution. It raises *e* to the power of each number and divides each result by their sum, so every output is positive and the outputs add up to one. The raw inputs are called **logits**. Larger logits get exponentially larger shares, but nothing gets exactly zero.

The name describes what it does: it is a soft version of *argmax*, the function that picks the single largest value. John Bridle named it in 1990, but the formula is much older. In statistical physics it is the Boltzmann distribution, which gives the probability of a system being in each energy state at a given temperature, and that is where the language model term comes from.

Softmax appears in two places in a [[Large Language Model]]:

- **The output layer.** The model ends with one logit for every [[Token]] in its vocabulary, often more than 100,000. Softmax converts them into the probability of each token coming next. [[Temperature Sampling]] divides the logits by a temperature first: low temperatures sharpen the distribution toward the top choice, high ones flatten it. [[Constrained Decoding]] works by setting forbidden tokens' logits to negative infinity, which softmax maps to zero probability.
- **Inside attention.** The [[Attention Mechanism]] scores how relevant every earlier position is to the current one, then applies softmax so those scores become weights that sum to one.

In training, softmax pairs with the cross-entropy loss, which penalizes low probability on the correct token. Their combined gradient is simply the predicted probabilities minus the true answer, a clean signal for [[Backpropagation]] and the quantity behind [[Perplexity]].

Some practical details matter:

- **Numerical stability.** Exponentials overflow quickly in [[Floating-Point Arithmetic]], so implementations subtract the largest logit before exponentiating, which leaves the result unchanged.
- **The sum-to-one constraint.** Attention must put its weight somewhere, even when nothing is relevant. Models learn to dump excess attention on the first token, an *attention sink*; streaming systems that drop old tokens from the [[KV Cache]] must keep that token or quality collapses.
- **Cost.** The output softmax over a huge vocabulary is expensive, which is part of why vocabulary size is a design trade-off for tokenizers.

Logits are also a window for research. The *logit lens* applies the final output layer to intermediate activations to see what the model would predict at each depth, a basic tool of [[Mechanistic Interpretability]]. And because softmax never assigns exactly zero, a model always gives some probability to an absurd continuation, one ingredient of [[Hallucination]].

## See also
- [[Temperature Sampling]]
- [[Attention Mechanism]]
- [[Perplexity]]
- [[Entropy]]
