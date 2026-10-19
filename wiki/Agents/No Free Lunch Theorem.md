---
aliases:
  - No free lunch
  - Inductive bias
tags:
  - agents
summary: The proof that, averaged over every possible problem, no learning or search algorithm beats any other, so every method that works well somewhere does so because its assumptions happen to match the world.
---
The **no free lunch theorem** says that, averaged over all possible problems, every optimization or learning algorithm performs equally well. If a method beats random guessing on some set of problems, it must do worse on others to make up for it. No single algorithm is best for everything.

David Wolpert published the result for supervised learning in 1996, and Wolpert and William Macready published the version for optimization in 1997. The name comes from the saying that there's no such thing as a free lunch.

The reasoning is simple once the setup is clear. Suppose every possible relationship between inputs and outputs is equally likely. Then the data seen so far carries no information about unseen cases, because for every function that continues the pattern, another one breaks it. Any prediction is as good as any other. That is a formal version of an old philosophical puzzle about whether past observations justify expectations about the future; see [[Problem of induction]].

The theorem's real lesson is that learning requires assumptions. Every method embodies an **inductive bias**, a built-in preference for some answers over others:

- **Simplicity.** Preferring simpler explanations is a bias, one that pays off when the world is mostly simple; see [[Occam's Razor]] and [[Overfitting]].
- **Smoothness.** Assuming that similar inputs have similar outputs underlies nearest-neighbor methods and much of machine learning.
- **Structure.** Convolutional networks assume patterns can appear anywhere in an image. Attention assumes any part of an input may relate to any other; see [[Convolution]] and [[Attention Mechanism]].
- **Priors.** Bayesian methods make assumptions explicit as prior beliefs; see [[Bayesian Inference]].

A method works well on real problems because real problems aren't uniformly random. They have structure, and methods succeed to the extent their biases match it. The theorem doesn't say learning is impossible. It says the success comes from the match between assumptions and world, not from the algorithm alone.

For optimization the lesson is similar. Search strategies such as hill climbing or simulated annealing each exploit some regularity in the landscape and fail where it's absent; see [[Simulated Annealing]] and [[Greedy Algorithm]].

The theorem is often used to counter claims that one algorithm is universally superior, and to explain why benchmark results don't always transfer; see [[Benchmarking]] and [[Distribution Shift]]. It pairs with a result showing neural networks can represent almost anything, which tells you nothing about which of those things they'll learn; see [[Universal Approximation Theorem]].

Modern machine learning bets on weak, general biases plus very large data and computation, a strategy that works because the world's structure is rich enough to be learned that way; see [[Bitter Lesson]].

## See also
- [[Model Routing]]
- [[Supervised Learning]]
