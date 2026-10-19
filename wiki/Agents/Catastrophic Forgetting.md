---
aliases:
  - Catastrophic interference
  - Continual learning
  - Stability-plasticity dilemma
tags:
  - agents
summary: A neural network's tendency to lose what it learned before when trained on something new, why fine-tuning can quietly damage a model, and the techniques and brain-inspired ideas used to prevent it.
---
**Catastrophic forgetting** is the tendency of a neural network to abruptly lose earlier knowledge when it's trained on something new. Train a model to recognize handwritten digits, then train it only on letters, and it may stop recognizing digits almost entirely. People don't learn this way: learning French doesn't erase English. Human memories fade gradually and can be relearned quickly, rather than vanishing all at once.

The cause is how knowledge is stored. A network's skills aren't kept in separate compartments; they're spread across the same shared weights; see [[Neural Network]] and [[Superposition]]. Training on a new task moves those weights wherever reduces the new task's error, with no regard for what the old values were doing; see [[Gradient Descent]]. Nothing in the loss records that the old task mattered.

Michael McCloskey and Neal Cohen described the problem in 1989. It's one side of the **stability-plasticity dilemma**: a learner must be plastic enough to absorb new information and stable enough to keep old information, and the two pull against each other.

It matters most in [[Fine-Tuning]]. Adapting a large pretrained model to a narrow task can degrade its general abilities, safety behavior included. Researchers found that fine-tuning on a few hundred harmless-looking examples could undo much of a model's refusal training; see [[Reinforcement Learning from Human Feedback]]. Teams therefore evaluate broadly after fine-tuning, not just on the target task; see [[Regression Testing]].

Common remedies:

- **Rehearsal.** Mix some old training data back in with the new, so the model keeps practicing.
- **Protecting important weights.** Elastic weight consolidation (2017) estimates which weights mattered most for old tasks and penalizes changing them; see [[Regularization]].
- **Training small additions.** Freeze the original model and train only small added modules, such as low-rank adapters, so the original weights can't drift.
- **Separate experts.** Route different tasks to different parts of the network; see [[Mixture of Experts]].
- **Distillation.** Train the new model to match the old model's outputs on old inputs; see [[Knowledge Distillation]].

The brain's answer may be similar. The theory of complementary learning systems holds that the hippocampus records new experiences quickly, then replays them, often during sleep, so the cortex can absorb them gradually alongside old knowledge; see [[Memory Consolidation]]. Rehearsal methods in machine learning borrow this idea.

Large models mostly sidestep the problem by not learning after deployment: their weights are fixed, and new information arrives through the prompt or retrieval instead; see [[In-Context Learning]] and [[Retrieval-Augmented Generation]]. That avoids forgetting but means nothing is retained between conversations, the gap that [[Agent Memory]] systems try to fill.

## See also
- [[Transfer Learning]]
- [[Model Merging]]
