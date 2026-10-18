---
aliases:
  - Principal component analysis
  - PCA
  - t-SNE
  - UMAP
  - Curse of dimensionality
tags:
  - agents
summary: Compressing data with many variables into a few that keep most of what matters, used to visualize embeddings, speed up search, and expose structure hidden in high-dimensional space.
---
**Dimensionality reduction** represents data with many variables using far fewer, while keeping as much of the meaningful structure as possible. A modern text [[Embedding]] has hundreds or thousands of dimensions; reducing it to two lets a person plot thousands of documents and see clusters. Reducing it to a few dozen can make search faster and storage smaller.

It works because real data rarely fills its space. Images of faces, though each has millions of pixel values, vary along a much smaller number of underlying factors: pose, lighting, expression, identity. The data lies near a lower-dimensional surface inside the high-dimensional space, and reduction methods try to find it.

High dimensions are also strange, the **curse of dimensionality**. As dimensions grow, volume grows so fast that data becomes sparse, and distances between random points become nearly equal, so "nearest neighbor" loses meaning. Many algorithms that work in two or three dimensions degrade badly in hundreds.

The main methods:

- **Principal component analysis** (PCA), from 1901, finds the directions along which data varies most and projects onto the top few. It's a rotation followed by dropping axes, computed with linear algebra; see [[Transformation Matrix]]. It's fast, deterministic, and interpretable, but captures only linear structure.
- **t-SNE** (2008) arranges points in two dimensions so that neighbors in the original space stay neighbors. It produces striking cluster plots, but distances between clusters and cluster sizes are largely meaningless, and results vary between runs.
- **UMAP** (2018) serves the same purpose, runs faster on large datasets, and preserves somewhat more global structure.
- **Autoencoders** learn a compressed representation with a neural network, capturing nonlinear structure; see [[Autoencoder]].

Uses include:

- **Visualization.** Plotting embeddings to see how a model organizes concepts, words, or images, a common first step in [[Mechanistic Interpretability]].
- **Compression.** Fewer dimensions mean smaller indexes and faster similarity search in a [[Vector Database]]. Some embedding models are trained so their first dimensions carry the most information and the rest can be truncated.
- **Denoising.** Dropping low-variance dimensions often removes noise along with them, which can help models generalize; see [[Regularization]].
- **Exploration.** Revealing groupings, outliers, and gradients in scientific and business data before formal analysis.

Visualizations mislead easily. Squashing hundreds of dimensions into two must distort something, and t-SNE in particular can show tidy clusters in data that has none, depending on its settings. Conclusions should be checked in the original space, such as by measuring actual [[Cosine Similarity]] between points. Neural networks themselves appear to pack more features than they have dimensions, using nearly orthogonal directions, which complicates any simple reading of their geometry; see [[Superposition]].

Reduction is lossy compression of a kind, related to the ideas in [[Information Theory]] and [[Data Compression]].

## See also
- [[Supervised Learning]]
- [[Map Projection]]
- [[Data Visualization]]
- [[K-Means Clustering]]
