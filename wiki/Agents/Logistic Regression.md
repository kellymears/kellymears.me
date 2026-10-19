---
aliases:
  - Logistic function
  - Sigmoid function
  - Log-odds
tags:
  - agents
summary: The standard model for yes-or-no outcomes, which turns a weighted sum of inputs into a probability through an S-shaped curve, still the baseline for credit scoring, medicine, and machine learning.
---
**Logistic regression** predicts the probability of a yes-or-no outcome from a set of inputs: whether a loan defaults, a patient has a disease, an email is spam, or a user clicks. Despite the name, it's used for classification. It's one of the oldest models in machine learning and still among the most widely used; see [[Supervised Learning]].

Ordinary linear regression predicts a weighted sum of the inputs, but a sum can be any number, and a probability must lie between 0 and 1; see [[Regression]]. Logistic regression passes the sum through the **logistic function**, an S-shaped curve that squashes any number into that range. Large positive sums give probabilities near 1, large negative ones near 0, and zero gives exactly one half. The Belgian mathematician Pierre François Verhulst introduced the curve in 1838 to model population growth that levels off as resources run out.

Read the other way, the model says the **log-odds** of the outcome are a weighted sum of the inputs, which gives each weight a plain meaning. A weight of 0.7 on smoking means smokers have about twice the odds, since e raised to 0.7 is about 2, holding the other inputs fixed; see [[Odds ratio]]. That readability is why medicine and credit scoring rely on it. Regulators and doctors can read the coefficients, and a lender can say which factors lowered an applicant's score. The weights describe association, not cause; see [[Correlation and Causation]].

Training picks the weights that make the observed outcomes most probable, which is the same as minimizing [[Cross-entropy loss]]. Unlike a deep network's objective, this one has a single best solution, so [[Gradient Descent]] finds the same answer every time. If one input separates the classes perfectly, the weights grow without limit, and a penalty on large weights keeps them finite; see [[Regularization]].

Its relatives are everywhere in machine learning:

- **Softmax** extends it to more than two classes; see [[Softmax]].
- **A classifier network's output layer** is a logistic regression on features the earlier layers learned; see [[Neural Network]].
- **Naive Bayes** is its generative counterpart. A 2001 comparison found Naive Bayes reaches its best accuracy with less data, while logistic regression usually wins with more; see [[Naive Bayes]].

Logistic regression draws a straight boundary between classes, so it misses interactions unless they're added by hand, which is where a [[Decision Tree]] or a [[Support Vector Machine]] with a curved boundary can do better. Its probabilities tend to be reasonably well calibrated, which matters when decisions depend on the number itself and not only the ranking; see [[Calibration]].

It's the standard baseline. A complex model that can't beat a well-built logistic regression on a table of data probably isn't worth deploying.

## See also
- [[Sentiment Analysis]]
- [[Linear Probe]]
