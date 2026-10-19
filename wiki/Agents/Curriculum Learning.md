---
aliases:
  - Self-paced learning
  - Automatic curriculum
tags:
  - agents
summary: Training a model on examples ordered from easy to hard, the way people are taught, an idea with modest gains in ordinary supervised learning and much bigger ones where rewards are sparse and tasks build on each other.
---
**Curriculum learning** trains a machine learning model on examples in a meaningful order, typically easy ones first and harder ones later, instead of in random order. The idea borrows from how people are taught: arithmetic before algebra, scales before sonatas.

Yoshua Bengio, Jérôme Louradour, Ronan Collobert, and Jason Weston named and studied it in a 2009 paper. Earlier, in 1993, the cognitive scientist Jeffrey Elman had argued that networks learning grammar did better when they started with simple sentences, or with limited memory that grew over time, a principle summarized as "starting small."

The intuition is about the shape of the problem. Early in training, hard examples may produce noisy, conflicting signals. Easy ones point the model toward a reasonable region, and harder ones refine it; see [[Gradient Descent]].

Variants differ in who decides the order:

- **Hand-designed curricula** sort data by a human-chosen difficulty measure, such as sentence length or image clutter.
- **Self-paced learning** lets the model choose, training first on examples it already finds easy and gradually admitting harder ones.
- **Teacher-student setups** use a second process that picks examples where the student is improving fastest.
- **Anti-curricula** go hard first, which sometimes works better, a reminder that the effect depends on the task.

Results in ordinary supervised learning have been mixed. Several careful studies found that curricula help mainly when data is noisy or training time is short, and that random order is a strong default; see [[Supervised Learning]]. The notion that order matters at all is an empirical claim that each new setting has to test.

Reinforcement learning is where curricula matter most. When reward arrives only on success, an agent facing a hard task may never succeed by chance and so never learn. Gradually raising difficulty keeps rewards within reach; see [[Reinforcement Learning]]. Self-play provides a natural curriculum, since an agent's opponent improves exactly as fast as it does; see [[Self-Play]]. Automatic curricula that widen the range of simulated conditions as an agent improves helped train a robot hand to solve a Rubik's cube in 2019; see [[Synthetic Data]].

Language model training uses related ideas. Pretraining mixes are often adjusted over time, with higher-quality data concentrated near the end, and fine-tuning stages build on capabilities from earlier ones; see [[Pretraining]] and [[Transfer Learning]]. Ordering also interacts with forgetting: material seen only early can be lost later; see [[Catastrophic Forgetting]].

The human analogy cuts both ways. Educational research finds that some difficulty helps learning stick, and that revisiting material over time beats one pass in order; see [[Desirable Difficulty]] and [[Spaced Repetition]]. Keeping a learner challenged but not overwhelmed is also a condition for absorbed engagement; see [[Flow]].

## See also
- [[Imitation Learning]]
- [[Scaling Laws]]
