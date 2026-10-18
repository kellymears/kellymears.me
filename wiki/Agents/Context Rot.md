---
aliases:
  - Lost in the middle
  - Needle in a haystack
  - Context degradation
  - Long-context degradation
tags:
  - agents
summary: The decline in a language model's accuracy as its input grows longer, even well within its context window, and why more context is often worse context.
---
**Context rot** is the decline in a language model's performance as the amount of text in its context grows. A model may advertise a [[Context Window]] of hundreds of thousands of tokens, but its ability to find, use, and reason over information in that window weakens as it fills, often well before the limit. Past a point, more context actively hurts.

The best-known evidence is a 2023 study by Nelson Liu and colleagues titled "Lost in the Middle." Models answering questions from a set of documents performed best when the relevant document came first or last, and noticeably worse when it sat in the middle. The U-shaped curve resembles the [[Serial Position Effect]] in human memory, where people best recall the first and last items of a list.

Popular *needle in a haystack* tests, which hide one unusual sentence in a long document and ask the model to find it, suggested near-perfect long-context recall. But those tests are easy, since the needle usually shares exact words with the question. Later studies, including a 2025 report that coined the term "context rot," found that when the question and answer were related only in meaning, or when similar but irrelevant distractor passages were present, accuracy fell steadily as input grew, even on simple tasks.

Several causes contribute:

- **Diluted attention.** The [[Attention Mechanism]] spreads weight across every token, so irrelevant material competes with what matters.
- **Distractors.** Text resembling the right answer misleads more as it accumulates.
- **Training distribution.** Most training examples are much shorter than the maximum window, so very long contexts are less familiar territory.

Agents are especially exposed. A long session accumulates tool output, failed attempts, outdated file contents, and superseded plans. Each was relevant once; together they bury the current task, and the model may act on a stale version of a file or repeat an approach that already failed.

The response is to treat context as a scarce resource to curate, sometimes called *context engineering*:

- **Compaction.** Summarize older history into a compact form and drop the raw transcript.
- **Delegation.** Hand self-contained work to a [[Subagent]] with a fresh window and receive only its conclusion.
- **Just-in-time retrieval.** Load information when needed, as in [[Retrieval-Augmented Generation]], rather than up front.
- **External memory.** Persist durable facts to [[Agent Memory]] or files instead of carrying them in conversation.
- **Placement.** Put the most important instructions and the question at the start or end, not buried in the middle.

These pull against [[Prompt Caching]], which rewards keeping a long, stable prefix, so systems balance cost against freshness. The human parallel is [[Working Memory]]: capacity is limited, and overload degrades performance, which is why managing [[Cognitive Load]] matters for people and models alike.

## See also
- [[Context Window]]
- [[Serial Position Effect]]
- [[Subagent]]
- [[Token Budget]]
- [[Distribution Shift]]
