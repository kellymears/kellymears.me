---
aliases:
  - Stochastic gradient descent
  - SGD
  - Learning rate
  - Loss function
  - Adam optimizer
  - Loss landscape
tags:
  - agents
summary: Improving a model by repeatedly nudging every parameter a little in whichever direction reduces its error, the optimization method behind essentially all neural network training.
---
**Gradient descent** finds good parameters for a model by repeatedly taking small steps downhill on its error. Training starts with a *loss function*, a single number measuring how wrong the model's outputs are on some examples. The *gradient* is the direction, across every parameter at once, in which the loss rises fastest. Step the opposite way, recompute, and repeat. Augustin-Louis Cauchy described the method in 1847, and it now trains every [[Neural Network]], from image classifiers to each [[Large Language Model]].

The usual picture is a hiker in thick fog who can feel only the slope underfoot. Each step goes in the steepest downhill direction. The terrain, called the *loss landscape*, has billions of dimensions in a large model, one per parameter, and the gradient for all of them comes from [[Backpropagation]].

The **learning rate** sets the step size and is the most important setting:

- **Too large**, and steps overshoot the valley floor, bouncing around or diverging so the loss explodes.
- **Too small**, and training crawls and can stall on flat ground.
- **Schedules** change it over time. Large models start with a short warmup at low rates, then use a high rate that decays toward the end.

**Stochastic gradient descent** computes the gradient on a small random *minibatch* of examples instead of the whole dataset, tracing back to Herbert Robbins and Sutton Monro's 1951 work. Each step is noisy but cheap, and the noise helps by jostling the model out of poor regions.

Plain steps are improved with momentum, which keeps some of the previous step's direction like a ball rolling downhill, and with per-parameter step sizes. The Adam optimizer, published by Diederik Kingma and Jimmy Ba in 2014, combines both and remains the default for most deep learning.

Early worries centered on local minima, valleys that are not the lowest. In very high dimensions they turn out to matter less than expected: most points where the slope is flat are saddle points, downhill in some direction, and many good minima perform about equally well. Gradient descent is still greedy, like the hill climbing described under [[Greedy Algorithm]], and only ever finds a nearby low point, not a guaranteed best one.

The loss is all the optimizer sees. Whatever reduces it gets learned, including shortcuts, memorized answers that cause [[Overfitting]], and loopholes in a reward that become [[Reward Hacking]], an instance of [[Goodhart's Law]]. Choosing what to measure is the real design decision.

Large training runs spread minibatches across thousands of GPUs and average their gradients, use 16-bit [[Floating-Point Arithmetic]] to save memory, and watch for loss spikes that force a restart from a checkpoint. [[Pretraining]] and [[Fine-Tuning]] differ mainly in data and learning rate, not in method, and [[Scaling Laws]] predict how far the loss will fall.

## See also
- [[Regularization]]
- [[Federated Learning]]
- [[Hyperparameter]]
- [[Linear Regression]]
