---
aliases:
  - Backprop
  - Automatic differentiation
  - Autodiff
  - Vanishing gradient
  - Exploding gradient
tags:
  - agents
summary: Working out how much every weight in a network contributed to its error by passing blame backward through the layers, the algorithm that makes training deep networks possible.
---
**Backpropagation** computes how much each weight in a [[Neural Network]] contributed to its error, so that [[Gradient Descent]] knows which way to adjust every one of them. It runs in two passes. The *forward pass* feeds an input through the layers and computes the loss. The *backward pass* starts at the loss and moves back through the layers, applying the chain rule of calculus at each step to pass along how sensitive the loss is to each intermediate value. One backward pass yields the gradient for all the weights at once, at a cost of about twice the forward pass, however many weights there are.

Estimating each weight's effect separately, by nudging it and rerunning the network, would take one forward pass per weight, billions for a large model. Backpropagation reuses shared intermediate results instead, the same move that turns exponential work into linear work in [[Dynamic Programming]].

Seppo Linnainmaa described reverse-mode automatic differentiation in his 1970 thesis, Paul Werbos proposed applying it to neural networks in 1974, and David Rumelhart, Geoffrey Hinton, and Ronald Williams's 1986 paper in Nature showed it training hidden layers to learn useful internal representations.

Modern frameworks such as PyTorch and JAX implement it as **automatic differentiation**. The programmer writes only the forward computation; the framework records each operation and derives the backward pass mechanically. Researchers can therefore try new architectures, such as the [[Attention Mechanism]], without deriving gradients by hand.

The backward pass needs the intermediate values from the forward pass, so training stores every layer's activations, and memory rather than arithmetic often limits model size. *Gradient checkpointing* keeps only some of them and recomputes the rest during the backward pass, trading compute for memory, the reverse of [[Memoization]].

Deep networks exposed a problem. Multiplying many small derivatives together shrinks the signal toward zero by the time it reaches the early layers, the **vanishing gradient** problem Sepp Hochreiter analyzed in 1991, and multiplying large ones makes it explode. Fixes accumulated:

- **Activations** such as ReLU, whose derivative is one for positive inputs.
- **Residual connections**, from ResNet in 2015, which add each layer's input to its output and give gradients a direct path back.
- **Normalization** layers, which keep activations in a stable range.
- **Gating**, as in LSTM networks from 1997, which protects a memory cell from repeated shrinking.
- **Clipping**, which caps exploding gradients, and careful [[Floating-Point Arithmetic]] so small values don't round to zero.

Gradients are useful beyond training. [[Mechanistic Interpretability]] uses them to see which inputs and neurons drive an output, and adversarial examples, images subtly altered to fool a classifier, follow the gradient toward a wrong answer.

Whether brains do anything similar is debated, since real neurons have no obvious way to send precise error signals backward.

## See also
- [[Activation Patching]]
- [[Batch Normalization]]
- [[Hopfield Network]]
- [[Newton's Method]]
