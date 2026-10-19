---
aliases:
  - Model soup
  - Task arithmetic
  - Task vector
  - TIES-Merging
  - Frankenmerge
tags:
  - agents
summary: Combining the weights of several fine-tuned models into one without further training, by averaging or adding their differences from a shared base, which works surprisingly well and powered a wave of community-built open models.
---
**Model merging** combines several trained models into one by doing arithmetic directly on their weights, with no additional training. Averaging two neural networks' parameters sounds like it should produce noise. For models fine-tuned from the same starting point, it often produces a model that keeps the skills of both.

The reason lies in the shape of the training landscape. Fine-tuning moves a pretrained model only a short distance in parameter space, and models fine-tuned from the same base tend to land in one connected low-loss valley, so points between them are also good models; see [[Pretraining]], [[Fine-Tuning]], and [[Loss landscape]]. Two models trained from different random starts, by contrast, usually can't be averaged at all, because their internal features are arranged differently.

Main methods:

- **Model soups.** A 2022 study averaged the weights of many copies of a model fine-tuned with different settings, and the average beat the best single copy, at no extra cost when running it.
- **Task arithmetic.** Subtract the base model's weights from a fine-tuned model's to get a **task vector**, the change that taught the skill. Adding several task vectors to the base combines skills; subtracting one removes a behavior, such as reducing toxic output.
- **Interference handling.** Task vectors can conflict, pushing the same weight in opposite directions. TIES-Merging (2023) keeps only each vector's largest changes and resolves sign disagreements by vote before adding them.
- **Interpolation.** Blending two models along a curve rather than a straight line, borrowing a technique for smoothly interpolating rotations; see [[Slerp]].

Merging took off in the open-weight community in 2023 and 2024, when hobbyists with no training budget could produce new models by combining others in minutes; see [[Open-Weight Model]]. Some **frankenmerges** even stacked layers from different models to build larger ones. Merged models briefly dominated public leaderboards, partly by inheriting fine-tunes that had seen benchmark questions, which raised doubts about what the scores meant; see [[Benchmark Contamination]]. Later work used evolutionary search to choose merge recipes automatically.

Merging differs from a [[Mixture of Experts]], which keeps specialists separate and routes each input to some of them; a merge fuses them into one set of weights. It also offers a way around [[Catastrophic Forgetting]]: instead of training one model on task after task, train separate copies and merge them. Small fine-tuning adapters can likewise be added together or swapped.

The limits are real. Merges of unrelated models fail, conflicting skills degrade each other, and results are hard to predict without testing. Subtracting a task vector weakens a behavior rather than guaranteeing its removal; see [[Machine Unlearning]].

## See also
- [[Neural Network]]
- [[Knowledge Distillation]]
- [[Transfer Learning]]
