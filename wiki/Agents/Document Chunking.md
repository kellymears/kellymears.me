---
aliases:
  - Text chunking
  - Chunk overlap
  - Semantic chunking
  - Late chunking
  - Contextual retrieval
tags:
  - agents
summary: Splitting documents into passages before embedding and retrieval, where chunks small enough to be precise lose the context that makes them understandable, and the strategies used to keep both.
---
**Document chunking** is splitting documents into smaller passages before indexing them for retrieval. A retrieval system for a language model rarely searches whole documents: it embeds and indexes chunks, and hands the best-matching ones to the model; see [[Retrieval-Augmented Generation]].

Chunking exists for three reasons. Embedding models accept limited input, and a single vector for a long document averages its topics into a blur, matching nothing well; see [[Embedding]]. The model's [[Context Window]] has room for only so much retrieved text. And precise retrieval needs units small enough that a match means the passage is actually about the query.

The central tension is size. Small chunks are precise but lose context: a passage saying "this setting must be disabled first" is useless without knowing which setting and which product. Large chunks keep context but dilute the match and spend tokens on irrelevant text; see [[Token Budget]] and [[Context Rot]].

Common strategies, roughly from crude to careful:

- **Fixed size.** Cut every few hundred tokens, overlapping neighbors slightly so a sentence split at a boundary appears whole in one of them; see [[Token]].
- **Recursive splitting.** Split on the largest natural boundary that fits, headings first, then paragraphs, then sentences.
- **Structure-aware splitting.** Respect the document's format: keep tables and lists intact, split [[Markdown]] by section, and split source code by function or class using its [[Abstract Syntax Tree]].
- **Semantic chunking.** Embed each sentence and cut where adjacent sentences become dissimilar, so chunks follow topic shifts.

Several techniques restore lost context instead of choosing sizes:

- **Contextual retrieval.** Before indexing, a language model writes a sentence situating each chunk within its document, such as which report, which section, and what period, prepended to the chunk. Anthropic reported in 2024 that this cut retrieval failures by about a third, and by about two thirds combined with keyword search and reranking; see [[Hybrid Search]] and [[Reranking]].
- **Late chunking.** Embed the whole document with a long-context model first, then split the resulting token vectors into chunks, so each chunk's vector reflects its surroundings.
- **Small to large.** Search over small chunks for precision, then return the larger section around each match.
- **Metadata.** Store titles, headings, dates, and sources alongside chunks for filtering and display; see [[Metadata]].

No setting is right everywhere. Legal contracts, chat logs, API references, and novels reward different boundaries, and the only reliable test is retrieval quality on real questions; see [[Evaluation Harness]]. Chunking choices are often blamed last when a system answers poorly, though a bad split can hide the answer from every later stage.

The word also names a memory strategy in psychology, grouping items into meaningful units; see [[Working Memory]].

## See also
- [[Vector Database]]
- [[Context Engineering]]
