---
aliases:
  - Reranker
  - Cross-encoder
  - Two-stage retrieval
  - Reciprocal rank fusion
tags:
  - agents
summary: Retrieving many candidates cheaply and then reordering a short list with a slower, more accurate model, the standard way search and RAG systems get relevant results into a limited context.
---
**Reranking** is the second stage of a two-stage search. A fast first stage pulls a few hundred candidates out of millions of documents, and a slower, more accurate model rescores just those candidates and puts the best at the top. Web search has worked this way for decades, and it is now standard in [[Retrieval-Augmented Generation]].

The two stages exist because accuracy and speed conflict. A retriever must search the whole collection in milliseconds, so it relies on precomputed structures:

- **Lexical retrieval** matches words through an [[Inverted Index]], scored with BM25. It is fast and exact on names, codes, and rare terms, but blind to synonyms.
- **Dense retrieval** uses a *bi-encoder*: queries and documents are each turned into an [[Embedding]] separately, and a [[Vector Database]] finds the nearest documents. It captures meaning, but squeezing a whole passage into one vector, computed without knowing the question, loses detail.

A **cross-encoder** reranker reads the query and a candidate document *together*, as one input to a transformer, and outputs a relevance score. Every word of the question can attend to every word of the passage through the [[Attention Mechanism]], so it catches what a single vector misses, such as negation or which entity a question is really about. The price is that nothing can be precomputed: each query-document pair needs its own forward pass. Rodrigo Nogueira and Kyunghyun Cho showed in 2019 that a BERT cross-encoder reranking BM25 results produced large gains on Microsoft's MS MARCO benchmark. Late-interaction models such as ColBERT (2020) sit between the two, keeping one vector per token instead of one per document.

Systems often run lexical and dense retrieval together and merge the lists before reranking, a *hybrid search*. **Reciprocal rank fusion** (2009) is the usual merge: each document scores the sum of one over its rank in each list, plus a constant, which needs no tuning of incompatible score scales.

Large language models can rerank too, either scoring passages one at a time or reading a list and returning it reordered. They are accurate but slow and costly, so they usually reorder only the last few dozen candidates.

In retrieval-augmented systems, reranking matters more than in classic search, because the output goes into a [[Context Window]] with a [[Token Budget]]. A model given five precise passages often answers better than one given fifty loosely relevant ones, since irrelevant text dilutes attention, the problem [[Context Rot]] describes, and can mislead the model into [[Hallucination]].

Evaluation uses ranking metrics: recall at *k* for the first stage, since anything it misses can't be recovered, and normalized discounted cumulative gain or mean reciprocal rank for the final order. An [[Evaluation Harness]] with labeled queries keeps changes honest, and [[LLM-as-Judge]] can label relevance at scale where human judgments are scarce.

## See also
- [[Cosine Similarity]]
- [[Recommender System]]
- [[Inverted Index]]
- [[Embedding]]
