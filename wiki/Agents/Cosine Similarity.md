---
aliases:
  - Cosine distance
  - Dot product similarity
  - Vector similarity
  - Semantic similarity
tags:
  - agents
summary: Measuring how alike two vectors are by the angle between them, ignoring their length, the standard way to compare embeddings in semantic search and retrieval.
---
**Cosine similarity** measures how similar two vectors are by the angle between them. Vectors pointing the same direction score 1, perpendicular ones 0, and opposite ones −1. Length is ignored: a short vector and a long one pointing the same way count as identical. It's the standard way to compare [[Embedding]]s, the vectors that models use to represent the meaning of text, images, and other data.

The calculation is the dot product of the two vectors divided by the product of their lengths. The dot product multiplies matching components and sums them, so it's large when the vectors have big values in the same dimensions. Dividing by the lengths removes the effect of magnitude, leaving only direction. Many embedding models output vectors already normalized to length 1, in which case cosine similarity and the dot product are the same, and the dot product is cheaper.

Why the angle rather than plain distance? In text, magnitude often reflects things that aren't meaning, such as document length or word frequency. Two articles on the same topic, one long and one short, may produce vectors of different lengths pointing in similar directions. Cosine similarity treats them as similar; straight-line distance might not.

It powers much of modern AI tooling:

- **Semantic search.** Embed a query and every document, then return documents whose vectors are most similar to the query's. This finds matches that share meaning without sharing words, so "how to fix a flat" can match a page about tire repair.
- **Retrieval for language models.** [[Retrieval-Augmented Generation]] uses it to pick passages to put in the [[Context Window]], usually followed by a slower, more accurate [[Reranking]] step.
- **Deduplication and clustering.** Near-duplicate texts have similarity close to 1, and grouping by similarity reveals topics.
- **Recommendations.** Items whose vectors resemble those a person liked are suggested next.

Comparing a query with millions of vectors one by one is too slow, so a [[Vector Database]] uses approximate nearest-neighbor indexes that find most of the closest matches far faster, trading a little accuracy, a version of the tradeoff in [[Precision and Recall]].

Some cautions:

- **Scores aren't calibrated.** A similarity of 0.8 means different things for different models. Many embedding models score unrelated text at 0.6 or higher, so thresholds must be tuned per model.
- **Similar isn't relevant.** A question and its opposite, "is coffee healthy" and "is coffee unhealthy," embed nearly identically. Negation, numbers, and exact names are weak spots, which is why hybrid search combines vector similarity with keyword matching.
- **Dimensions matter.** In very high dimensions, random vectors are nearly perpendicular, which is part of why embeddings work; see [[Dimensionality Reduction]].

Inside a transformer, the [[Attention Mechanism]] uses scaled dot products, closely related, to decide which tokens attend to which, followed by [[Softmax]].

## See also
- [[Autocomplete]]
- [[Hybrid Search]]
- [[Locality-Sensitive Hashing]]
