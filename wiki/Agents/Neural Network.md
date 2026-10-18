---
aliases:
  - Artificial neural network
  - Deep learning
  - Perceptron
  - Multilayer perceptron
  - Activation function
tags:
  - agents
summary: Layers of simple units that each weigh their inputs and pass on a result, a structure that learns almost any function from examples when it is large enough and trained well.
---
A **neural network** is a function built from many simple units arranged in layers. Each unit takes numbers from the layer before, multiplies each by a *weight*, adds them up with a *bias*, and passes the sum through a nonlinear *activation function*. The output feeds the next layer. The weights start random and are adjusted during training until the network's outputs match examples. A modern [[Large Language Model]] is a neural network with hundreds of billions of weights, called parameters.

Warren McCulloch and Walter Pitts modeled neurons as logic gates in 1943, loosely inspired by biology, and Frank Rosenblatt built the *perceptron*, a single trainable layer, in 1958. In 1969 Marvin Minsky and Seymour Papert showed that a single layer cannot compute even exclusive-or, and funding dried up. Stacking layers solves the problem, but training stacked layers needed [[Backpropagation]], popularized in 1986 by David Rumelhart, Geoffrey Hinton, and Ronald Williams.

The nonlinearity is essential. Without it, any stack of layers collapses into one linear transformation. With it, a network with enough units can approximate nearly any continuous function, a result proved by George Cybenko in 1989. Modern networks mostly use simple activations such as ReLU, which outputs zero for negative inputs and passes positive ones through.

**Deep learning** means networks with many layers. It took off in 2012, when AlexNet, by Alex Krizhevsky, Ilya Sutskever, and Hinton, won the ImageNet image recognition contest by a wide margin, trained on two consumer [[Graphics Processing Unit|GPUs]]. A network is mostly matrix multiplication, exactly the parallel arithmetic GPUs were built for. Hinton, Yann LeCun, and Yoshua Bengio shared the 2018 Turing Award, and John Hopfield and Hinton the 2024 Nobel Prize in Physics.

Architectures shape networks for their data:

- **Convolutional networks** slide small learned filters across images, sharing weights by position, the same operation as [[Convolution]] in image processing.
- **Recurrent networks** process sequences one step at a time, carrying a hidden state forward.
- **Transformers** let every position look at every other through the [[Attention Mechanism]], and now dominate language, vision, and audio.

Training adjusts weights by [[Gradient Descent]] to reduce a loss, a number measuring how wrong the outputs are. Networks large enough to memorize their training data risk [[Overfitting]], yet large networks trained on enough data generalize surprisingly well, part of what [[Scaling Laws]] describe.

Inside, a trained network represents concepts as directions in its layers' activations, the same geometry that makes an [[Embedding]] useful. What each part computes is not written anywhere, which is why understanding a network requires the reverse-engineering of [[Mechanistic Interpretability]].

The biological analogy is loose. Real neurons spike, learn locally, and are wired in loops, closer to the ideas in [[Neuroplasticity]] than to backpropagation, and artificial networks borrowed a metaphor more than a mechanism.

## See also
- [[Supervised Learning]]
- [[Residual Connection]]
- [[Pretraining]]
- [[Recurrent Neural Network]]
