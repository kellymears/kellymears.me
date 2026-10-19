---
aliases:
  - Hyperparameter tuning
  - Grid search
  - Random search
tags:
  - agents
summary: The settings fixed before a model trains, such as learning rate and model size, chosen by search on held-out data, which quietly decides many published comparisons.
---
**A hyperparameter** is a setting chosen before a model trains, as opposed to the parameters the training process learns. A neural network's weights are parameters. How fast it learns, how many layers it has, how many examples it sees per step, and how strongly it's penalized for complexity are hyperparameters. Training can't adjust them, because they define what training is.

Common examples:

- **The learning rate**, how big a step each update takes; see [[Learning rate]]. Too large and training diverges, too small and it crawls. It's usually the most important single setting.
- **Batch size and training length**, how many examples per update and how many passes are made over the data.
- **Regularization strength**, such as the dropout rate or weight decay; see [[Regularization]].
- **Model shape**, such as the depth and width of a [[Neural Network]], the maximum depth of a [[Decision Tree]], or the number of clusters in [[K-Means Clustering]].

No formula gives the right values, so they're found by search: train with some settings, measure, adjust. The measurement has to use data the model didn't train on, and data separate from the final test set too, or the test score stops being honest; see [[Train-Test Split]].

**Grid search** tries every combination of a few values per setting. **Random search** samples combinations at random, and a 2012 paper by James Bergstra and Yoshua Bengio showed it usually does better for the same budget. Only a few settings typically matter much, and a grid spends most of its trials repeating the same few values of each, while random sampling tries a new value of every setting on every run. Smarter methods build a model of which settings score well to choose the next trial, or start many runs and stop the weak ones early.

The search is expensive, since each trial is a full training run, and that cost has distorted research. A new method tuned for weeks is often compared with a baseline run at default settings, so part of the reported gain is extra tuning, not the idea. Studies that carefully re-tuned older baselines found much of the claimed progress shrank or vanished; see [[Evaluation Harness]] and [[Replication Crisis]]. Aimless manual tuning is jokingly called "graduate student descent."

Searching many settings is also a form of the [[Multiple Comparisons Problem]]. Try enough configurations and one will score well on the validation set by luck, which is [[Overfitting]] one level up; see [[P-Hacking]].

At large scale, tuning the full model is too costly, so labs tune small versions and extrapolate, relying on regular patterns in how performance changes with size; see [[Scaling Laws]].

Reporting the chosen values, the search space, and the random seeds is part of making a result reproducible; see [[Determinism]].

## See also
- [[Batch Normalization]]
- [[Ablation Study]]
