---
aliases:
  - Random forest
  - Gradient boosting
  - Ensemble learning
  - XGBoost
tags:
  - agents
summary: A model that predicts by asking a sequence of yes-or-no questions about the input, readable on its own and, combined into random forests or gradient-boosted ensembles, still the strongest choice for tabular data.
---
A **decision tree** is a model that makes a prediction by asking a sequence of questions about its input, each answer leading to the next question, until it reaches a leaf holding the answer. "Is income above 50,000? If yes, has the person missed a payment in the last year?" and so on, down to "approve" or "decline." Trees handle both classification, picking a category, and regression, predicting a number; see [[Supervised Learning]].

Training builds the tree from the top. At each node, the algorithm tries every feature and threshold, and picks the split that best separates the examples, measured by how much it reduces impurity, often information gain from [[Information Theory]] or a related measure. Then it repeats on each side; see [[Greedy Algorithm]] and [[Divide and Conquer]]. Classic versions, ID3, C4.5, and CART, date from the 1980s.

A single tree is easy to read: a person can follow the path to any prediction and see exactly why it was made, which matters in lending, medicine, and anywhere decisions must be explained. That's close to the rule lists of an [[Expert System]], except learned from data rather than interviews. Business decision tables are a hand-written cousin; see [[Decision Table Testing]].

A single tree also overfits badly. Grown deep enough, it memorizes the training data, one leaf per example, and generalizes poorly; see [[Overfitting]] and [[Regularization]]. Two ways of combining many trees, called **ensemble learning**, fix this:

- **Random forests** (Leo Breiman, 2001) train hundreds of trees, each on a random sample of the data and considering a random subset of features at each split, then average their votes. Each tree is noisy, but their errors are partly independent, so the average is far steadier, the same reason a crowd's estimate beats most individuals'.
- **Gradient boosting** builds trees one after another, each fitting the errors the ensemble still makes, a form of [[Gradient Descent]] in the space of functions. Libraries such as XGBoost and LightGBM made it fast, and it dominated data-science competitions through the 2010s.

On tabular data, rows and columns like a [[Spreadsheet]] or a [[Relational Database]] table, boosted trees still usually beat deep [[Neural Network]]s, while needing less data, tuning, and computation. Deep learning wins on images, audio, and text, where raw inputs need learned features; trees win where the columns are already meaningful.

Trees need little preprocessing: they're indifferent to the scale of features and handle missing values and categories gracefully. Their weaknesses are smooth trends, which come out as staircases, and predicting beyond the range of the training data; see [[Distribution Shift]].

Ensembles give up the single tree's readability. Feature-importance scores and per-prediction attributions recover some of it.

## See also
- [[Support Vector Machine]]
- [[Naive Bayes]]
