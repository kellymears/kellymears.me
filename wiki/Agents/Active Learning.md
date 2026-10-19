---
aliases:
  - Uncertainty sampling
  - Query by committee
tags:
  - agents
summary: A machine learning strategy in which the model chooses which unlabeled examples a human should label next, spending a limited labeling budget on the cases it's most unsure about instead of on random samples.
---
**Active learning** is a machine learning strategy in which the model helps choose its own training data. Instead of labeling a random sample of examples, a team trains a model on a small labeled set, lets it pick the unlabeled examples it would learn the most from, has people label those, retrains, and repeats. The goal is to reach good accuracy with far fewer labels; see [[Supervised Learning]].

The motivation is cost. Unlabeled data is often plentiful while labels are expensive: a radiologist's time, a lawyer's review, an annotator's hours; see [[Data Labeling]]. A random sample spends much of that budget on easy, redundant examples the model already handles. Active learning tries to spend it where the model is weakest; see [[Human in the Loop]].

The central question is how to pick examples. **Uncertainty sampling** chooses the cases where the model is least confident, such as a classifier assigning near-equal probability to two classes; it works best when the model's confidence is meaningful; see [[Calibration]]. **Query by committee** trains several models and picks examples where they disagree most. Diversity-based methods pick examples spread across the data, often by clustering their embeddings, so the batch doesn't fill up with near-duplicates of one confusing case; see [[Embedding]]. Practical systems usually combine uncertainty and diversity, since labels typically arrive in batches.

The approach has real pitfalls. The labeled set it builds is deliberately unrepresentative, concentrated near the model's decision boundaries, so it can't double as a test set; evaluation needs a separate random sample; see [[Train-Test Split]] and [[Selection Bias]]. The most uncertain examples are sometimes just noise or ambiguous cases that no label will settle. Early on, with only a handful of labels, the model's uncertainty estimates are poor, a cold-start problem. And the examples chosen for one model may not be the best for a different model trained later.

The idea of choosing what to learn next connects to other fields. Deciding between examples the model already knows and examples that might teach it something echoes the explore-exploit trade-off; see [[Multi-Armed Bandit]]. Ordering examples from easy to hard is a related but distinct idea; see [[Curriculum Learning]]. Human tutors pick problems just beyond a learner's current ability; see [[Zone of Proximal Development]].

Language models have changed the economics. A model can now generate candidate labels cheaply, with people reviewing only the cases where the model is unsure or where several models disagree; see [[LLM-as-Judge]] and [[Synthetic Data]]. The same logic guides which outputs to send to human review in deployed systems: flag inputs that look unlike the training data or where confidence is low; see [[Distribution Shift]].

## See also
- [[Statistical Sampling]]
- [[Precision and Recall]]
