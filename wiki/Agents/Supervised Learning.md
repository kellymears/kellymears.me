---
aliases:
  - Unsupervised learning
  - Self-supervised learning
  - Labeled data
  - Training data
tags:
  - agents
summary: The three ways a model can learn from data, from human-labeled examples, from structure alone, or from labels the data supplies itself, the last of which made large language models possible.
---
**Supervised learning** trains a model on examples paired with correct answers. Show it thousands of emails labeled "spam" or "not spam," and it learns to predict the label for emails it hasn't seen. Each training example is an input and a target; the model's error on the target is measured by a loss and reduced by [[Gradient Descent]]. Most practical machine learning before around 2018 was supervised: image classification, speech recognition, fraud detection, medical imaging.

Its limitation is the labels. Someone has to produce them, and that's slow and expensive. ImageNet, the dataset of 14 million labeled images whose 2012 benchmark results launched the deep learning boom, took years of crowdsourced work. Labels also carry the labelers' mistakes and biases, and whatever the labels say becomes the model's [[Ground Truth]], right or wrong.

**Unsupervised learning** finds structure in data with no labels at all. Clustering groups similar items, such as customers with similar purchases. [[Dimensionality Reduction]] compresses data into fewer variables that capture most of its variation. Density estimation learns what typical data looks like, so unusual items stand out, the basis of anomaly detection. The catch is that without labels, there's no direct measure of whether the structure found is meaningful.

**Self-supervised learning** gets labels from the data itself. Hide part of the input and train the model to predict it:

- **Next-token prediction.** Given text, predict the next word. Every sentence on the internet becomes thousands of training examples for free. This is how a [[Large Language Model]] learns during [[Pretraining]].
- **Masked prediction.** Blank out words or image patches and predict them from context.
- **Contrastive learning.** Train a model so that two views of the same thing, such as an image and its caption, produce similar [[Embedding]]s and unrelated pairs don't. This underlies models that connect text and images.
- **Reconstruction.** Compress an input and rebuild it; see [[Autoencoder]].

Self-supervision removed the labeling bottleneck, so training could scale to nearly all available text and images. That scale, as scaling laws describe, is what produced capable general models.

Modern language models combine all three. Self-supervised pretraining builds broad knowledge, supervised [[Fine-Tuning]] on curated examples teaches the model to follow instructions, and preference-based training adjusts its behavior; see [[Reinforcement Learning from Human Feedback]]. A separate paradigm, [[Reinforcement Learning]], learns from rewards for actions rather than correct answers, and increasingly trains models to reason.

Whatever the paradigm, the central worry is generalization: doing well on new data, not just memorizing the training set. Evaluating on held-out data guards against [[Overfitting]]; see [[Train-Test Split]]. A model that performs well in testing can still fail when real-world data differs from what it learned on; see [[Distribution Shift]].

## See also
- [[Abductive Reasoning]]
- [[Imitation Learning]]
