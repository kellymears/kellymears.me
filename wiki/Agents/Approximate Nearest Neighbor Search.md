---
aliases:
  - Vector search
  - k-nearest neighbors
  - HNSW
  - Product quantization
tags:
  - agents
summary: Finding the stored vectors closest to a query without comparing against every one, trading a little accuracy for enormous speed, the engine inside vector databases and retrieval for language models.
---
**Approximate nearest neighbor search**, often shortened to ANN, finds the stored items most similar to a query without checking every item. Each item is a vector, a list of numbers, and similarity is a distance between vectors. Exact search compares the query against everything. Approximate search gives up a guarantee of finding the true closest matches in exchange for answering thousands of times faster.

The problem became central with embeddings. Text, images, and audio can be turned into vectors where similar meanings land near each other; see [[Embedding]] and [[Cosine Similarity]]. Retrieval for language models, recommendations, and duplicate detection all reduce to finding nearby vectors among millions or billions; see [[Retrieval-Augmented Generation]] and [[Recommender System]].

Exact methods break down in high dimensions. Tree structures that split space into regions work well in two or three dimensions, but with hundreds of dimensions almost every region must be searched, and the tree degrades to scanning everything; see [[Spatial Partitioning]].

Approximate methods fall into a few families:

- **Hashing.** Locality-sensitive hashing, introduced in 1998, uses hash functions that tend to send nearby points to the same bucket, so only one bucket needs searching; see [[Locality-Sensitive Hashing]].
- **Clustering.** Group the vectors into clusters, then search only the few clusters nearest the query. This is sometimes called an inverted file index, by analogy with text search; see [[K-Means Clustering]] and [[Inverted Index]].
- **Quantization.** **Product quantization**, published in 2011, splits each vector into chunks and replaces each chunk with the nearest of a small set of prototypes. Vectors shrink to a few bytes and distances can be computed from lookup tables; see [[Quantization]].
- **Graphs.** Connect each vector to its near neighbors and search by walking the graph, always stepping closer to the query; see [[Greedy Algorithm]].

The graph approach now dominates. **HNSW**, for hierarchical navigable small world, was published in 2016. It builds layered graphs, with a sparse top layer of long jumps and denser layers below, so a search zooms in quickly much as a skip list does; see [[Skip List]].

Quality is measured as recall: of the true nearest neighbors, what fraction did the search find? Systems tune a three-way trade-off between recall, speed, and memory. A recall of 95 percent is often acceptable, since the downstream task rarely depends on the exact top result.

Libraries such as Facebook's Faiss, released in 2017, made these techniques widely available, and dedicated vector databases package them with storage, updates, and filtering; see [[Vector Database]]. Filtering is a practical difficulty: restricting results to, say, one user's documents can disconnect the graph and hurt recall.

Approximate search often works alongside keyword search, since vectors capture meaning but miss exact names and rare terms; see [[Hybrid Search]].

## See also
- [[Dimensionality Reduction]]
- [[Reranking]]
