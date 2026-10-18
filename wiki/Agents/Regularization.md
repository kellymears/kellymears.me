---
aliases:
  - Dropout
  - Weight decay
  - Early stopping
  - L2 regularization
tags:
  - agents
summary: Techniques that stop a model from memorizing its training data by penalizing complexity or injecting noise, trading a slightly worse fit for much better generalization.
---
**Regularization** is any technique that discourages a model from fitting its training data too closely, so it generalizes better to new data. A flexible model given enough training will eventually memorize its examples, noise and quirks included, and do worse on anything new; see [[Overfitting]]. Regularization constrains it, accepting a slightly worse fit on training data in exchange for better performance elsewhere.

It's a formal version of [[Occam's Razor]]: prefer simpler explanations unless the data demands complexity. The common techniques work in different ways:

- **Weight penalties.** Add a term to the loss that grows with the size of the model's weights, so the optimizer prefers small weights unless large ones clearly help. L2 regularization, also called **weight decay**, penalizes squared weights and shrinks them all smoothly. L1 penalizes absolute values and drives many weights to exactly zero, producing sparse models that use fewer inputs.
- **Dropout.** During training, randomly switch off a fraction of a [[Neural Network]]'s units at each step, often half. The network can't rely on any one unit, so it learns redundant, robust features, somewhat like training a large ensemble of smaller networks at once. At inference time all units are used. Geoffrey Hinton's group introduced it in 2012.
- **Early stopping.** Watch performance on a validation set during training and stop when it begins to get worse, even as training loss keeps falling; see [[Train-Test Split]]. It's simple and remarkably effective.
- **Data augmentation.** Expand the training set with altered copies, such as flipped, cropped, or recolored images, teaching the model what doesn't matter. Adding noise to inputs works similarly.
- **Architecture choices.** Building in assumptions, such as the weight sharing of a convolutional network, restricts what a model can represent and reduces how much data it needs; see [[Convolution]].

Each adds a setting that must be tuned, such as the penalty strength or dropout rate. Too little regularization overfits; too much underfits, leaving the model too constrained to capture real patterns. This is the bias-variance tradeoff: simple models err systematically, complex ones err erratically.

Large language models complicated the picture. Classical theory said bigger models overfit more, but very large networks trained on vast data generalize well, sometimes improving after first appearing to overfit, an effect called *double descent*. Their [[Pretraining]] typically uses only light weight decay and little or no dropout, since a model that sees each example once or twice has little chance to memorize; see [[Scaling Laws]]. Regularization matters more in [[Fine-Tuning]] on small datasets, where a model can quickly overfit and lose general abilities.

Other techniques regularize indirectly. Stochastic [[Gradient Descent]] adds noise that seems to favor solutions that generalize. Some argue that [[Quantization]] and [[Knowledge Distillation]] do too, by removing capacity a model may have spent on noise.

## See also
- [[Supervised Learning]]
- [[Regression to the Mean]]
- [[Decision Tree]]
