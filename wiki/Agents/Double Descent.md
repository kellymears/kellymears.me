---
aliases:
  - Bias-variance tradeoff
  - Grokking
  - Benign overfitting
tags:
  - agents
summary: The finding that test error, after rising as a model grows big enough to memorize its training data, falls again as it grows bigger still, overturning the textbook rule that bigger models overfit.
---
**Double descent** is a pattern in how a model's error on new data changes as the model grows. Classical statistics predicted a U-shaped curve, while modern neural networks show a second drop: error falls, rises to a peak, then falls again as models get even bigger. It helped explain why huge networks, with far more parameters than training examples, work at all.

The classical view is the **bias-variance tradeoff**. A model too simple for its data misses real patterns (high bias). A model too flexible fits noise in the training data along with the signal (high variance), so it does worse on new data; see [[Overfitting]]. The sweet spot lies between, and the textbook advice was to stop adding capacity there; see [[Train-Test Split]].

Deep learning practice ignored this advice and kept winning with larger networks. In 2019, Mikhail Belkin and colleagues reconciled the two. Test error follows the classical U up to the **interpolation threshold**, the size at which the model can just barely fit every training example exactly. Past that point, error falls again, often below the classical sweet spot. Later that year, researchers at OpenAI showed the same shape across many network types, and showed it occurs over training time and dataset size too: near the threshold, adding more data can make a model worse.

The usual explanation is about choice. At the threshold, exactly one set of parameters fits the data, so the model has to contort itself to fit every noisy point. With many more parameters than needed, countless solutions fit perfectly, and the way networks are trained tends to find smooth, simple ones among them, a kind of built-in [[Regularization]]; see [[Gradient Descent]] and [[Occam's Razor]]. Label noise makes the peak worse, since there's more junk to contort around.

A related surprise is **grokking**, reported in 2022. Small networks trained on simple arithmetic tasks memorized their training examples quickly, with no ability to handle new ones. Then, long after training accuracy hit 100%, test accuracy suddenly jumped to near perfect, as if the model had finally understood the rule. Interpretability work found the network had replaced its memorized lookup table with a compact algorithm; see [[Mechanistic Interpretability]]. Such abrupt shifts resemble a [[Phase Transition]].

The practical consequences:

- **Bigger is often safer.** Adding parameters past the threshold tends to help, consistent with [[Scaling Laws]].
- **Stopping early can mislead.** A model that looks overfit may still be heading for the second descent.
- **Clean data matters** most near the threshold.

None of this means overfitting is solved; overparameterized models still memorize training data, which matters for privacy and evaluation; see [[Benchmark Contamination]].

## See also
- [[Neural Network]]
- [[Superposition]]
