---
aliases:
  - SVM
  - Kernel trick
  - Maximum-margin classifier
tags:
  - agents
summary: A classifier that separates two classes with the widest possible gap, defined only by the handful of examples closest to the boundary, and that bends that boundary through the kernel trick, the leading method in machine learning before deep learning.
---
A **support vector machine**, or SVM, is a method for sorting examples into two classes by drawing the boundary that leaves the widest possible gap between them. Given points labeled as, say, spam or not spam, many lines could separate them; an SVM picks the one farthest from the nearest points on either side. For about fifteen years, from the mid-1990s until deep learning took over, it was the default answer to most classification problems; see [[Supervised Learning]].

The widest gap, or **margin**, is a bet on generalization. A boundary that just squeaks past the training points will likely misclassify new points that land slightly differently, while one with room on both sides tolerates small variations; see [[Overfitting]]. The theory came from Vladimir Vapnik and Alexey Chervonenkis in the Soviet Union in the 1960s.

The name comes from a striking property. The boundary depends only on the few training points that sit right at the edge of the gap, the **support vectors**. Every other point could be deleted or moved, as long as it stays outside the margin, and the answer wouldn't change. Real data rarely separates cleanly, so the 1995 soft-margin version by Corinna Cortes and Vapnik allows some points inside the gap or on the wrong side, with a penalty whose size sets how much error to accept in exchange for a wider margin; see [[Regularization]].

The **kernel trick**, introduced for SVMs in 1992 by Bernhard Boser, Isabelle Guyon, and Vapnik, handles boundaries that aren't straight. Data that can't be split by a line in two dimensions, such as one class forming a ring around the other, may split easily if each point is lifted into more dimensions, for instance by adding its distance from the center as a third coordinate. The algorithm only ever needs the similarity between pairs of points, so a kernel function can compute that similarity as if the points had been lifted, without ever building the higher-dimensional coordinates, even when there would be infinitely many; see [[Cosine Similarity]] and [[Embedding]].

SVMs were strong on handwritten digits and text categorization, came with clean mathematics and a single best answer rather than a training run that might land anywhere, and worked well on modest datasets; see [[Gradient Descent]]. Their weaknesses were scale and features. Training time grows faster than the number of examples, and the method learns only a boundary over whatever features it's given, so performance depended on hand-designed inputs; see [[Dimensionality Reduction]].

Neural networks learn the features themselves and improve with more data and computation, and after 2012 they overtook SVMs on images and later language; see [[ImageNet]] and [[Bitter Lesson]]. SVMs remain a strong baseline for small, tabular problems, alongside tree ensembles; see [[Decision Tree]].

## See also
- [[Sentiment Analysis]]
- [[Naive Bayes]]
- [[Precision and Recall]]
- [[Anomaly Detection]]
- [[Logistic Regression]]
