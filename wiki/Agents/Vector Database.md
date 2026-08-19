---
aliases:
  - Vector Store
  - Vector Index
tags:
  - agents
summary: A datastore built to find the nearest neighbors of a high-dimensional vector quickly, at a scale exact search can't reach.
---
**Vector database** is a datastore purpose-built to answer nearest-neighbor queries over high-dimensional vectors — given a query vector, return the stored vectors closest to it by cosine similarity or Euclidean distance — at a speed exact brute-force comparison can't sustain once the collection reaches millions of items. A brute-force scan is exact and easy to reason about, but its cost grows linearly with corpus size; a vector database trades a small amount of accuracy for approximate nearest-neighbor algorithms (HNSW graphs and IVF clustering are the two dominant families) that answer in roughly logarithmic time instead.

The category exploded alongside [[Retrieval-Augmented Generation]], since RAG needs exactly this operation — embed a query, find the nearest stored document embeddings — as its core retrieval step, but the underlying technique (approximate nearest neighbor search) predates the [[Large Language Model|LLM]] wave by years and was solving recommendation and search problems long before anyone was retrieving text for a prompt. Purpose-built products (Pinecone, Weaviate, Milvus, Qdrant) compete with vector extensions bolted onto existing databases (pgvector for Postgres, Redis's vector search), and the practical choice usually comes down to whether the team already operates the host database and wants one fewer system, versus wanting a store optimized specifically for this workload at larger scale.

The metadata-filtering problem is where most real deployments spend their engineering effort: a pure nearest-neighbor query doesn't know that some documents are private to one tenant, expired, or restricted to one language, so production vector databases combine the similarity search with metadata filters — a step easy to describe and surprisingly easy to get wrong, since filtering after retrieval instead of during it can silently return fewer results than requested.

## See also
- [[Embedding]]
- [[Retrieval-Augmented Generation]]
- [[Context Window]]
- [[Token Budget]]
