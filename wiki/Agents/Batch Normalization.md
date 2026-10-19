---
aliases:
  - Batch norm
  - BatchNorm
  - Internal covariate shift
tags:
  - agents
summary: A layer that rescales each feature inside a neural network to a standard mean and spread over every training batch, which made deep networks train much faster and more reliably in 2015, though the reason it works turned out to be different from the one first given.
---
**Batch normalization** is a layer inserted between the layers of a neural network that standardizes each feature it receives. For every training batch, it computes the mean and spread of each feature across the examples in the batch, shifts and scales the values to a mean of zero and a standard deviation of one, then applies a learned scale and offset so the network can undo the change if that helps; see [[Neural Network]] and [[Standard deviation]].

Sergey Ioffe and Christian Szegedy introduced it in 2015. Their explanation was **internal covariate shift**. As earlier layers learn, the distribution of values they pass on keeps changing, so later layers are always chasing a moving target. Holding each layer's inputs to a steady distribution should let every layer learn at once. An image classifier reached the same accuracy in a small fraction of the training steps, and the paper reported that networks tolerated much higher step sizes and became less sensitive to how their weights started; see [[Gradient Descent]] and [[ImageNet]].

The explanation didn't hold up as well as the method. A 2018 study added deliberate noise after batch normalization, making layer inputs shift more than ever, and the networks still trained well. The authors argued that its real benefit is smoothing the landscape the optimizer travels over, so gradients change more predictably from step to step and larger steps are safe; see [[Backpropagation]]. It's a familiar pattern in deep learning, where a technique is adopted on results and understood later; see [[Ablation Study]].

The batch dependence brings quirks. During training, each example's output depends on the other examples in its batch, which adds a little noise that acts as a mild [[Regularization]]. At inference there's no batch to average over, so the layer switches to running averages collected during training. That difference between training and serving behavior is a classic source of bugs, such as forgetting to switch modes or evaluating on data unlike the training data; see [[Distribution Shift]]. Very small batches make the statistics noisy, and spreading a batch across several machines raises the question of whether to share statistics between them; see [[Distributed Training]].

Those problems led to alternatives that normalize within a single example instead of across the batch. **Layer normalization**, published in 2016, normalizes across the features of one example and became standard in recurrent networks and transformers, often with the simpler RMS variant; see [[Residual Connection]] and [[Attention Mechanism]]. Group normalization splits channels into groups and suits image models trained with tiny batches.

Batch normalization remains common in convolutional image models, where it was a large part of what made very deep networks practical alongside skip connections; see [[Convolutional neural network]]. Its constants and placement are among the [[Hyperparameter]] choices that quietly matter.

## See also
- [[Federated Learning]]
- [[Double Descent]]
