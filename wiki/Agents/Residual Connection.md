---
aliases:
  - Skip connection
  - ResNet
  - Residual stream
  - Layer normalization
tags:
  - agents
summary: Adding each layer's input back to its output, the small change that made very deep networks trainable and gives transformers a shared stream every layer reads and writes.
---
A **residual connection** adds a layer's input directly to its output. Instead of computing `y = F(x)`, the layer computes `y = x + F(x)`, so the layer only has to learn a *residual*: the change to make, not a full new representation. It is one of the simplest ideas in deep learning, and nearly every modern [[Neural Network]] depends on it.

It was introduced in **ResNet** by Kaiming He and colleagues at Microsoft Research in 2015. They had noticed a puzzle. Stacking more layers should never make a network worse, since extra layers could in principle learn to pass their input through unchanged. In practice, very deep plain networks had *higher* training error than shallower ones. It wasn't [[Overfitting]]; the optimizer simply couldn't find good weights. With residual connections, doing nothing is the default, because `F(x) = 0` leaves the input intact. ResNet trained 152 layers and won the 2015 ImageNet competition.

The connection also fixes gradient flow. During [[Backpropagation]] the identity path carries gradients straight back to early layers without passing through every layer's weights, so they don't vanish with depth. The same insight had appeared earlier in time rather than depth: the [[LSTM]] memory cell is updated additively for the same reason. Highway networks, published months before ResNet, used gated skip connections.

Residual networks also behave somewhat like ensembles. A 2016 study found that deleting single layers from a trained ResNet barely hurt it, as if the network were many shallower paths averaged together.

Transformers use residual connections around every sublayer, both the [[Attention Mechanism]] and the feedforward block, usually combined with **layer normalization**, which rescales each token's activations to a standard range. Putting the normalization before each sublayer instead of after, the *pre-norm* arrangement, made deep transformers much more stable to train and is now the standard.

This structure gives interpretability research its central picture, the **residual stream**. A token's vector enters at the bottom, and each layer reads from it, computes something, and adds its result back. Nothing is overwritten; information accumulates in one shared channel that every later layer can read. [[Mechanistic Interpretability]] treats the stream as a communication bus, finding which layers write which features and which later components read them, and [[Superposition]] describes how so many features fit into its limited width. The *logit lens* trick of reading predictions from intermediate layers, described under [[Softmax]], works because the stream is always in a form the output layer can partly decode.

The broader lesson is that architecture often succeeds by making optimization easier rather than by adding expressive power. A residual network can't represent anything a plain one can't, yet [[Gradient Descent]] finds good solutions in it, and the depth behind today's [[Scaling Laws]] depends on that.

## See also
- [[Backpropagation]]
- [[ImageNet]]
- [[Mechanistic Interpretability]]
- [[Gradient Descent]]
- [[Activation Steering]]
