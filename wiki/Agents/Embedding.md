---
aliases:
  - Vector Embedding
  - Text Embedding
tags:
  - agents
summary: A numeric vector representing a piece of content such that semantic similarity between items becomes geometric distance between vectors.
---
**Embedding** is a fixed-length numeric vector produced by a model to represent a piece of content — a word, a sentence, a document, an image — such that items with similar meaning end up close together in the vector space and unrelated items end up far apart. The core promise is that "similar meaning" becomes "small distance," which turns a semantic question ("does this passage answer that question?") into an arithmetic one (cosine similarity or Euclidean distance between two vectors), which is cheap enough to compute over millions of items.

Word-level embeddings (word2vec, GloVe, mid-2010s) demonstrated the idea first and produced the famous party trick — vector("king") − vector("man") + vector("woman") ≈ vector("queen") — showing that the space encoded relationships, not just identity. Modern systems mostly embed whole passages or documents at once using transformer-based encoder models, because sentence- and paragraph-level meaning doesn't reduce cleanly to a sum of word vectors.

Embeddings are the mechanism underneath [[Retrieval-Augmented Generation]]: a corpus gets embedded once and stored in a [[Vector Database]], a query gets embedded at search time, and the nearest stored vectors are retrieved as the presumed most relevant passages. The catch is that "nearest in vector space" and "actually relevant" are correlated but not identical — embedding models have blind spots (they can conflate topically similar but factually opposed passages, for instance), which is why production retrieval usually adds a reranking pass on top of raw vector similarity rather than trusting it alone.

Embedding models are also usually distinct from the generation model in a pipeline, trained separately and optimized for a different objective (similarity structure, not fluent text), which means swapping one embedding model for another changes retrieval behavior even if the downstream language model never changes.

## See also
- [[Vector Database]]
- [[Retrieval-Augmented Generation]]
- [[Large Language Model]]
- [[Context Window]]
