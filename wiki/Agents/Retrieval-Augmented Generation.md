---
aliases:
  - RAG
tags:
  - agents
summary: Fetching relevant documents at query time and feeding them into the prompt, so a model answers from retrieved text rather than memory.
---
**Retrieval-Augmented Generation** is a pattern where a system searches an external corpus for content relevant to a query, then inserts the retrieved passages into the [[Prompt]] before the [[Large Language Model]] generates its answer. The name comes from a 2020 paper (Lewis et al., Facebook AI Research), but the technique predates the paper's terminology by however long people had been pasting search results into a prompt by hand.

The point is to let a model answer questions about content it was never trained on, or that changed after training — a company's internal wiki, this week's news, a codebase that didn't exist at training time — without retraining or fine-tuning anything. Retrieval is usually done over an [[Embedding]] index stored in a [[Vector Database]], where the query itself gets embedded and compared against stored document embeddings by similarity, though keyword search (BM25) and hybrid approaches are common too, especially where exact term matches matter more than semantic similarity.

RAG's core failure mode is retrieval quality, not generation quality: if the wrong passages get retrieved, the model will often generate a fluent, confident answer built on the wrong material, which reads identically to a correct answer until someone checks the source. This is a different flavor of [[Hallucination]] than ungrounded generation — the model isn't inventing facts, it's faithfully summarizing the wrong facts it was handed — and it means RAG system quality lives or dies on retrieval precision, chunking strategy, and reranking, well before the generation step gets involved.

RAG competes conceptually with just widening the [[Context Window]] and pasting everything in, and the tradeoff is mostly [[Token Budget]]: retrieval costs an indexing pipeline and adds a failure mode, but scales to corpora far larger than any context window, while a big-enough window with no retrieval is simpler until the corpus outgrows it.

## See also
- [[Embedding]]
- [[Vector Database]]
- [[Context Window]]
- [[Hallucination]]

## Related
- [[Token Budget]]
