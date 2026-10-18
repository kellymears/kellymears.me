---
aliases:
  - Unlearning
  - Exact unlearning
  - Approximate unlearning
  - SISA training
tags:
  - agents
summary: Removing the influence of specific training data from a model that has already learned it, needed for privacy law, copyright, and hazardous knowledge, and hard because learning is spread across every weight.
---
**Machine unlearning** is removing what a trained model learned from specific data without retraining it from scratch. Deleting a record from a database is simple; a model has no record to delete, since what it learned from any example is smeared across millions or billions of weights; see [[Neural Network]].

The demand comes from several directions:

- **Privacy.** Data protection law gives people a right to have their personal data erased, which raises the question of whether a model trained on it must forget it too; see [[Personal Data]].
- **Copyright.** Rights holders may demand their works be removed from a model's training.
- **Bad data.** Mislabeled, poisoned, or corrupted examples discovered after training; see [[Adversarial Example]].
- **Hazardous knowledge.** Developers may want to remove detailed knowledge that could help build weapons, while keeping general science.

The gold standard is **exact unlearning**: retrain the model on everything except the data to be forgotten. That guarantees the result but, for a large language model, can cost months and millions of dollars per request; see [[Pretraining]]. A 2021 design called **SISA training** makes it cheaper by planning ahead: split the training data into shards, train a separate model on each, and combine their predictions. Forgetting an example means retraining only the shard that held it. That works for smaller models but not for one giant network.

**Approximate unlearning** adjusts an existing model instead. Common methods run training in reverse on the data to be forgotten, pushing the model to make it less likely, while continuing to train on retained data so general ability doesn't collapse; see [[Gradient Descent]] and [[Fine-Tuning]]. A 2023 Microsoft experiment made a model forget the Harry Potter books, after which it answered questions about them like someone who had never read them.

The hard question is whether anything was actually removed. Approximate methods often suppress knowledge rather than erase it. Studies have recovered supposedly unlearned information with a little further fine-tuning, careful rephrasing, or prompts that bypass safeguards; see [[Jailbreak]]. Auditors test unlearning with membership inference attacks, which try to tell whether a given example was in the training set, and with benchmarks of hazardous questions published since 2024.

Unlearning is the deliberate counterpart of [[Catastrophic Forgetting]], which destroys knowledge by accident when a model learns something new. Subtracting a model's learned change for a task is a related shortcut; see [[Model Merging]].

Prevention is easier than cure. Training with [[Differential Privacy]] bounds how much any single example can influence the model, limiting what there is to unlearn. Tracking which data went into which model makes requests answerable at all; see [[Data Lineage]]. As with deletion elsewhere, copies linger in backups and earlier model versions; see [[Data Retention]].

## See also
- [[Soft Delete]]
- [[AI Alignment]]
