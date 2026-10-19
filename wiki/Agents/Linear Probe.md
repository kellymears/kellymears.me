---
aliases:
  - Probing classifier
  - Representation probing
tags:
  - agents
summary: A simple linear classifier trained on a neural network's internal activations to test whether some piece of information, such as a word's part of speech or a board position, can be read directly from the model's representations.
---
A **linear probe** is a simple classifier trained to read a specific piece of information out of a neural network's internal activations. Researchers freeze the network, run inputs through it, record the activation vectors at some layer, and train a linear model, often logistic regression, to predict a property from those vectors: whether a sentence is true, what part of speech a word is, which square a chess piece occupies. If the probe succeeds, the information is present in the representation in a linearly accessible form; see [[Logistic Regression]] and [[Mechanistic Interpretability]].

Keeping the probe linear is deliberate. A powerful nonlinear probe could learn to compute a property itself from almost any input, telling us about the probe rather than the model. A linear probe can only find information that's already arranged along a direction in the model's activation space. Guillaume Alain and Yoshua Bengio popularized the method in 2016 to study what each layer of an image classifier had learned; see [[Neural Network]].

Probes have turned up striking results. Language models' activations encode syntax, and the parse structure of sentences can be partly recovered from them. Models trained only on moves of the board game Othello developed internal representations of the board that probes could read, evidence that they built a model of the game rather than memorizing surface statistics; see [[World Model]]. Other work found directions corresponding to whether a statement is true, and to geographical locations and dates.

Probing also evaluates representations for reuse. Training a linear classifier on top of a frozen model is a standard test of how good its learned features are; see [[Transfer Learning]] and [[Contrastive Learning]].

The method has a well-known caveat. A successful probe shows information is decodable, not that the model uses it. A property might be present by accident, correlated with something the model does use; see [[Correlation and Causation]]. Researchers address this by comparing against control tasks with random labels, which show how much a probe can learn on its own, and by intervening: if changing activations along the probe's direction changes the model's behavior, the model is using that direction; see [[Activation Steering]]. Probes trained on small datasets can also simply overfit; see [[Overfitting]].

Probes assume a concept lives along a single direction. Models appear to pack many more features than they have dimensions, overlapping in ways that complicate this picture; see [[Superposition]]. Methods that learn many features at once, without specifying in advance what to look for, complement probing, which tests one hypothesis at a time.

Practical uses are emerging: probes can monitor models in deployment, flagging internal signs of deception or uncertainty more cheaply than reading their output; see [[Hallucination]] and [[Explainable AI]].

## See also
- [[Dimensionality Reduction]]
- [[Embedding]]
