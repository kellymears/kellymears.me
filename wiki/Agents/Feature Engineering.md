---
aliases:
  - One-hot encoding
  - Feature scaling
  - Feature store
tags:
  - agents
summary: The craft of turning raw data into the input variables a machine learning model learns from, using domain knowledge to create, encode and scale features, which long decided who won on structured data and still does for many tabular problems.
---
A machine learning model sees only the numbers it is given. **Feature engineering** is the work of choosing and constructing those numbers from raw data so that the patterns a model needs are easy to find. For decades it was where most of the effort and skill in applied machine learning went.

Common techniques include:

- **Encoding categories.** Models need numbers, not labels such as "red" or "Ohio." **One-hot encoding** makes a separate yes-or-no column for each category. Categories with thousands of values may instead be replaced by statistics such as the average outcome for that category, or learned vectors; see [[Embedding]].
- **Scaling.** Putting features on comparable ranges, such as subtracting the mean and dividing by the standard deviation, helps methods that compare distances or use gradient steps; see [[Gradient Descent]].
- **Transforming.** Taking the logarithm of skewed values such as income or prices, clipping extreme outliers, or grouping continuous values into bins; see [[Outlier]].
- **Deriving.** Extracting the day of the week or hour from a timestamp, computing ratios such as debt to income, counting a customer's purchases in the past month, or combining two features into one.
- **Text.** Counting words or weighting them by how distinctive they are turns documents into vectors; see [[Naive Bayes]] and [[Inverted Index]].

Good features encode knowledge a model would struggle to find on its own. A fraud model given "time since this card's last transaction" can catch bursts of activity that a model seeing only raw timestamps would miss. A linear model given the square of a variable can fit a curve; see [[Logistic Regression]]. **Feature selection**, which drops features that add noise or merely duplicate others, keeps models smaller, faster and easier to explain.

Deep learning shifted the work. Networks trained on images, audio and text learn their own features from raw pixels and characters, and hand-designed features largely disappeared from those fields; see [[Neural Network]] and [[Bitter Lesson]]. On structured, spreadsheet-like data, though, tree ensembles built on engineered features still often match or beat neural networks, and feature work still separates strong solutions from weak ones in data science competitions; see [[Decision Tree]] and [[DataFrame]].

The biggest hazard is **leakage**: features that accidentally contain the answer or information unavailable at prediction time, such as a "refund issued" flag in a model predicting complaints. Statistics used for scaling or encoding must be computed from training data only; see [[Train-Test Split]].

In production, features must be computed identically during training and serving. A mismatch quietly degrades predictions; see [[Distribution Shift]]. **Feature stores** address this by computing features once and serving the same values to both; see [[Data Cleaning]].

## See also
- [[Dimensionality Reduction]]
- [[Shapley Values]]
