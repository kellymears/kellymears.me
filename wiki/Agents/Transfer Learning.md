---
aliases:
  - Domain adaptation
  - Pretrained model
tags:
  - agents
summary: Reusing what a model learned on one task as the starting point for another, which lets a few hundred examples do the work of millions and made pretraining the default in machine learning.
---
**Transfer learning** is reusing a model trained on one task as the starting point for a different one. Instead of learning from scratch, the new model inherits features that already work, so it needs far less data and computing time. It's now the default way most machine learning gets done.

The approach took off in computer vision. After networks trained on [[ImageNet]] began winning competitions in 2012, researchers found in 2014 that their internal features worked remarkably well on unrelated image tasks. Studies of these networks showed why. The early layers of a [[Convolutional neural network]] learn edges, colors, and textures, useful for almost any image, while later layers become specific to the original categories. Keeping the early layers and retraining only the last few lets a model learn to spot, say, defects on a production line from a few hundred photos.

There are a few ways to reuse a model:

- **Feature extraction** freezes the inherited network and trains only a small new layer on top of its outputs; see [[Embedding]].
- **Fine-tuning** keeps training the whole network, or part of it, on the new data, usually with small steps so the inherited knowledge isn't wiped out; see [[Fine-Tuning]].
- **Prompting** changes nothing at all and describes the new task in the input; see [[In-Context Learning]].

Language caught up around 2018. Models such as ULMFiT and then BERT were trained on large amounts of unlabeled text, then adapted to classification, question answering, and other tasks, beating models built for each task alone; see [[Pretraining]]. A [[Large Language Model]] is the extreme case, one pretrained model reused for almost everything.

**Domain adaptation** is the harder variant where the task stays the same but the data changes: a model trained on product reviews applied to social media posts, or on one hospital's scans applied to another's. Performance usually drops, sometimes sharply; see [[Distribution Shift]].

Transfer doesn't always help. When the source and target are too different, inherited features can make results worse than starting fresh, which researchers call negative transfer. And a model inherits more than skills. Biases in the original training data can carry into every task built on top of it, and the downstream builder may never see that data; see [[Algorithmic Bias]].

The economics changed the field. Training a large model from scratch costs more than most groups can afford, so the work now splits between a few organizations that pretrain and everyone else who adapts. An adapted model can also be compressed into a smaller one for deployment; see [[Knowledge Distillation]].

Small target datasets carry their own risk, since a big model fit to a few hundred examples can memorize them; see [[Overfitting]].

## See also
- [[Synthetic Data]]
- [[Supervised Learning]]
