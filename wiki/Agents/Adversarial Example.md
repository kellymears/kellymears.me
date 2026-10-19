---
aliases:
  - Adversarial examples
  - Adversarial attack
  - Data poisoning
tags:
  - agents
summary: Inputs altered in ways people barely notice that make a machine-learning model confidently wrong, a panda read as a gibbon, a stop sign as a speed limit, and what they reveal about how models see.
---
An **adversarial example** is an input altered, often imperceptibly, so that a machine-learning model gets it confidently wrong. The canonical demonstration, from a 2014 paper by Ian Goodfellow and colleagues, took a photo a classifier labeled "panda," added a faint pattern of noise invisible to people, and got "gibbon" at 99 percent confidence.

Finding one is straightforward if you can see inside the model. [[Backpropagation]] normally computes how to adjust weights to reduce error; an attacker instead computes how to adjust the *input* pixels to increase it, and nudges every pixel slightly in that direction. Each change is tiny, but across a hundred thousand pixels they add up. The fast gradient sign method does this in one step; see [[Gradient Descent]].

Why models are so fragile is still debated. One explanation is that models behave too linearly in very high dimensions, so many tiny coordinated changes push them far; another is that they rely on real but non-robust patterns in the data, textures and fine-grained statistics people ignore. Either way, the model's notion of "panda" isn't the one people use; see [[Superposition]].

Attacks don't always need the model's internals:

- **Transfer.** Examples crafted against one model often fool others trained on similar data, so attackers practice on a stand-in.
- **Physical attacks.** Researchers fooled sign classifiers with a few stickers that made a stop sign read as a speed limit, and made glasses frames that made face recognition see another person.
- **Query attacks.** Probing a public model with many inputs can locate failures without seeing its weights.

Related attacks target other parts of the pipeline. **Data poisoning** plants manipulated examples in training data, so the model learns a hidden trigger, a "backdoor," that activates later; see [[Supply Chain Security]] and [[Pretraining]]. Image-cloaking tools apply this deliberately, letting artists add perturbations meant to spoil models trained on their work.

For language models, the analogues are inputs that break rules: odd strings of characters that turn off refusals ([[Jailbreak]]), and instructions hidden in documents a model reads ([[Prompt Injection]]).

Defenses are only partial. **Adversarial training** adds attacked examples to training data, which helps against known attacks at a cost to ordinary accuracy; see [[Generative Adversarial Network]]. Many proposed defenses were later broken by stronger attacks, an arms race familiar from security; see [[Penetration Testing]] and [[Fuzzing]]. Certified methods can guarantee robustness, but only within small perturbations.

The practical lesson is to treat a model's input as untrusted, and not to assume that a model which matches people on ordinary examples sees the way people do; see [[Distribution Shift]].

## See also
- [[AlphaGo]]
- [[Federated Learning]]
- [[Deepfake]]
- [[Object Detection]]
