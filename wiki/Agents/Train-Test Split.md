---
aliases:
  - Test set
  - Validation set
  - Holdout set
  - Data leakage
  - Cross-validation
tags:
  - agents
summary: Holding back data a model never trains on so its performance can be measured honestly, and the many quiet ways information leaks across that line and inflates results.
---
A **train-test split** divides data into a part used to train a model and a part held back to evaluate it. The point is honesty. A model judged on the same examples it learned from can score perfectly by memorizing them, which says nothing about how it will handle new data. Testing on unseen examples estimates real-world performance and exposes [[Overfitting]].

Most projects use three sets:

- **Training set.** The model learns from it, typically 70 to 80 percent of the data.
- **Validation set.** Used during development to compare models, tune settings such as learning rate, and decide when to stop training.
- **Test set.** Touched once, at the end, for the final estimate.

The validation set exists because tuning on the test set quietly overfits to it. Each time you check a score and adjust, a little information about the test set leaks into your choices. Run enough experiments and some configuration will score well on that particular test set by chance. The more a test set is reused, the less its numbers can be trusted, a problem that applies to whole research fields sharing one benchmark; see [[Replication Crisis]].

When data is scarce, **cross-validation** rotates the split: divide data into, say, five parts, train on four and test on the fifth, five times over, and average the results.

**Data leakage** is any path by which information from the test data reaches training, and it's the most common way machine learning results turn out to be fake. Some forms:

- **Duplicates.** The same or near-identical examples appear in both sets, as when photos of the same patient land on both sides.
- **Time travel.** Shuffling time-ordered data lets a model train on the future to predict the past. Forecasting needs a split by date.
- **Preprocessing.** Computing normalization statistics or selecting features using the whole dataset before splitting.
- **Proxy features.** A column that encodes the answer, such as a hospital code that reveals which patients were already diagnosed.

For a [[Large Language Model]], leakage is hard to rule out. Pretraining scrapes much of the public internet, which often includes benchmark questions and answers, so high scores may reflect memorization; see [[Benchmark Contamination]]. That's why evaluators increasingly use private or freshly written test sets; see [[Evaluation Harness]].

Even a clean split only measures performance on data like the training data. If real use differs, test scores overstate quality; see [[Distribution Shift]].

Optimizing hard against any fixed measure tends to corrupt it; see [[Goodhart's Law]]. Practices such as preregistration in science and the separation between a [[Test Oracle]] and the code under test apply the same idea: decide how you'll be judged before you see the answers.

## See also
- [[Linear Regression]]
- [[Precision and Recall]]
- [[Hyperparameter]]
- [[Decision Tree]]
- [[Double Descent]]
- [[Naive Bayes]]
- [[Fisher-Yates Shuffle]]
