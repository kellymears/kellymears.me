---
aliases:
  - Universal approximation
tags:
  - agents
summary: The result that a neural network with a single hidden layer can approximate any continuous function as closely as desired, a guarantee that the right network exists which says nothing about how to find it or whether it will generalize.
---
The **universal approximation theorem** says that a neural network with one hidden layer, given enough units, can approximate any continuous function on a bounded region as closely as you like. Whatever the relationship between inputs and outputs, so long as it's continuous, some network of that simple shape matches it to any chosen accuracy.

George Cybenko proved a version in 1989 for networks using the sigmoid activation, an S-shaped curve. Kurt Hornik, Maxwell Stinchcombe, and Halbert White published related results the same year, and later work showed the property holds for almost any nonlinear activation, failing only for polynomials; see [[Neural Network]].

The intuition is that each hidden unit contributes a simple bump or step, and enough of them, scaled and shifted, can trace out any shape, much as a staircase with fine enough steps approximates a smooth curve; see [[Linear Interpolation]]. Older mathematics offered similar guarantees. In 1885 Karl Weierstrass proved that polynomials can approximate any continuous function, and sums of sine waves can represent a wide range of signals; see [[Fourier series]].

The theorem is often misread as an explanation for deep learning's success. It's much weaker than that:

- **Existence, not learnability.** It says suitable weights exist. It doesn't say training will find them; see [[Gradient Descent]] and [[Backpropagation]].
- **Size can be enormous.** The number of hidden units needed can grow exponentially with the complexity of the function or the number of inputs; see [[Curse of dimensionality]]. A network with too few units can't match the function at all, however it's trained.
- **Nothing about generalization.** A network can match the training data exactly while behaving badly on new data; see [[Overfitting]].

Depth turns out to matter in ways the theorem hides. Later results showed that some functions a deep network represents compactly would need exponentially many units in a shallow one. Stacking layers lets networks build features out of features, and techniques that make very deep networks trainable became central to modern architectures; see [[Residual Connection]].

Universality is common and cheap in computing. Many simple systems turn out to be capable of any computation, which says little about whether they're practical; see [[Turing Completeness]]. The interesting questions are about efficiency and the assumptions a method builds in, which is the point of a companion result about optimization and learning; see [[No Free Lunch Theorem]].

Modern explanations for why huge networks generalize lean instead on training dynamics, data, and scale; see [[Double Descent]] and [[Scaling Laws]]. The theorem's lasting role is a floor: it rules out the worry that neural networks are fundamentally unable to represent some continuous relationship, and leaves the hard problems to learning.

## See also
- [[Bitter Lesson]]
- [[Regularization]]
