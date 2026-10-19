---
aliases:
  - Least squares
  - Line of best fit
  - R-squared
tags:
  - method
summary: Fitting a straight line, or its many-variable equivalent, through data by minimizing squared errors, a technique from early nineteenth-century astronomy that remains the workhorse of statistics and the simplest form of machine learning.
---
**Linear regression** fits a straight line through a cloud of data points so that it predicts one quantity from another as well as possible. Given house sizes and prices, it finds the line that best describes how price rises with size. With several inputs, such as size, age, and location, it finds a flat surface in many dimensions, but the idea is the same.

The standard method is **least squares**: choose the line that makes the sum of squared vertical distances between the points and the line as small as possible. The French mathematician Adrien-Marie Legendre published it in 1805, and Carl Friedrich Gauss published in 1809, claiming to have used it for years, including to predict where the dwarf planet Ceres would reappear after it was lost behind the sun. Gauss linked the method to the bell curve of measurement errors; see [[Normal Distribution]].

The word "regression" came later and from a different problem. In the 1880s, Francis Galton found that tall parents tended to have children shorter than themselves, and short parents taller ones, and called the pattern regression toward mediocrity; see [[Regression to the Mean]].

The fitted line yields useful numbers. The **slope** says how much the output changes per unit of input, and with several inputs, how much it changes when one input moves while the others are held fixed. **R-squared** says what fraction of the variation in the output the line accounts for. A high R-squared means the line fits the data closely, not that the model is right.

Regression is easy to run and easy to misread:

- **Squared errors favor extremes.** A single far-off point can drag the whole line toward it; see [[Outlier]].
- **Summaries hide shapes.** Very different datasets can produce the same line and the same R-squared, which is why statisticians plot the data first; see [[Anscombe's quartet]] and [[Scatter Plot]].
- **Association isn't cause.** A slope describes how things move together, not why; see [[Correlation and Causation]].
- **Controls cut both ways.** Adding a variable can remove a hidden influence or, if chosen badly, create a false one; see [[Confounding]] and [[Simpson's Paradox]].
- **Lines don't know where to stop.** Extending the line beyond the range of the data assumes the pattern continues.
- **More inputs fit better on paper.** Adding variables always raises R-squared on the data used to fit, even when they're noise; see [[Overfitting]].

The same model sits at the root of machine learning. Fitting it by repeatedly nudging the line toward lower error is [[Gradient Descent]]. Passing its output through an S-shaped curve to predict yes-or-no outcomes gives [[Logistic Regression]], and stacking many such units with nonlinear steps between them gives a neural network.

## See also
- [[Line Chart]]
- [[Effect Size]]
- [[Train-Test Split]]
- [[Newton's Method]]
