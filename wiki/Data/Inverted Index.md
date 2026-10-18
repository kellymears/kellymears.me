---
aliases:
  - Full-text search
  - Full-text index
  - Posting list
  - BM25
  - TF-IDF
tags:
  - data
summary: The structure behind search engines, mapping each word to the documents that contain it, so finding documents by their words takes a lookup rather than a scan.
---
An **inverted index** maps each term to the list of documents containing it. A normal document store goes from document to words. The inverted index flips that relationship, hence the name. To find documents mentioning "osmosis," the engine looks up that one entry and reads its *posting list*, the documents (and often the positions within them) where the word appears. A query with several words intersects or merges posting lists. It is the core of every full-text search engine, from library catalogs to web search.

Building one requires deciding what counts as a term, a process called *analysis*:

- **Tokenization** splits text into words, which is harder than splitting on spaces once punctuation, hyphens, URLs, and languages without spaces are involved.
- **Normalization** lowercases text and folds accents so "Café" matches "cafe".
- **Stemming or lemmatization** reduces words to a common root so "running" matches "run".
- **Stop words** such as "the" and "of" are sometimes dropped, though modern engines usually keep them for phrase search.

The same analysis must be applied to queries and documents, or they won't meet. A misconfigured analyzer is a common reason search "can't find" something that is obviously there.

Matching is only half the job. Ranking orders the results. *TF-IDF* scores a document higher when a query term appears often in it (term frequency) and rarely across the whole collection (inverse document frequency), so rare words count for more than common ones. *BM25*, its refined successor, adds saturation so the hundredth repetition counts little, plus document-length normalization. It remains a strong baseline decades later.

Search engines in this tradition, from Lucene to the engines built on it, are lexical. They match words, not meanings, so "car" won't find "automobile" without synonym lists. [[Embedding]] search over a [[Vector Database]] matches meaning instead, but misses exact identifiers and rare terms that lexical search handles well. Many [[Retrieval-Augmented Generation]] systems combine the two as *hybrid search*.

Inverted indexes are optimized for reading. Posting lists are compressed and stored in immutable segments that merge in the background, much like a log-structured database. Updates are batched, which is why newly added documents may not be searchable for a moment. [[Search Engine Optimization]] is, at bottom, the practice of shaping documents for the index and the ranking function, and a [[Bloom Filter]] or [[Trie]] often sits alongside for fast term lookups and autocomplete.

## See also
- [[PageRank]]
- [[Stemming and Lemmatization]]
- [[Hybrid Search]]
- [[Web Crawler]]
- [[String-Searching Algorithm]]
- [[Zipf's Law]]
- [[Library Classification]]
- [[Reranking]]
- [[Boolean Algebra]]
