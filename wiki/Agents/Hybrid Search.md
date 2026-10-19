---
aliases:
  - Keyword search
  - Lexical search
  - Dense retrieval
  - Sparse retrieval
  - SPLADE
tags:
  - agents
summary: Retrieval that combines exact keyword matching with embedding similarity and merges the two rankings, because each finds documents the other misses, now a default in retrieval-augmented generation.
---
**Hybrid search** combines two ways of finding documents, keyword matching and meaning-based similarity, and merges their results into one ranking. Each catches what the other misses, so the combination usually beats either alone.

The two methods:

- **Lexical search** finds documents containing the query's words, ranked by how rare and how frequent those words are, using an inverted index and a scoring formula such as BM25; see [[Inverted Index]]. It is fast and exact, and its results are easy to explain.
- **Dense retrieval** turns query and documents into vectors and finds the nearest ones, so "car won't start" can match "vehicle ignition failure" with no words in common; see [[Embedding]], [[Cosine Similarity]], and [[Vector Database]].

Their failures are complementary. Embeddings blur exact identifiers: an error code, a product number, a person's name, or a word coined after the embedding model was trained may land near vaguely similar text instead of the one document that contains it. Keyword search misses paraphrases and synonyms and can be thrown by word forms, which is why it leans on [[Stemming and Lemmatization]]. A support system asked about "error E-4012 after updating" needs both: the code to find the right page, and the meaning to rank pages about updates.

Merging is the tricky part, because the two produce scores on unrelated scales. The common answer, **reciprocal rank fusion**, ignores scores entirely and combines only positions: each document earns a little credit for its rank in each list, so documents near the top of both rise highest. It is simple, needs no tuning, and works well; see [[Reranking]]. The alternative normalizes and weights the scores, which can do better when tuned on real queries.

A middle path, **learned sparse retrieval**, uses a neural model to decide which terms each document should be indexed under, including related words it doesn't contain. SPLADE, published in 2021, is the best-known example, and it keeps the speed of an inverted index while capturing some meaning.

In practice, hybrid search is usually the first stage of a pipeline. It gathers a generous set of candidates, and a slower, more accurate model then rereads each candidate against the query to reorder the top. That pipeline feeds the context of many applications built on language models; see [[Retrieval-Augmented Generation]]. How documents are divided before indexing matters as much as the search itself; see [[Document Chunking]].

Measuring it requires labeled queries with known good answers, scored by whether the right documents appear near the top; see [[Precision and Recall]]. Without such a set, teams often discover keyword search's value only after users complain that an exact phrase they typed found nothing.

Many databases now offer both kinds of index, so hybrid search increasingly means one query rather than two systems.

## See also
- [[PageRank]]
- [[Context Engineering]]
- [[Word2Vec]]
