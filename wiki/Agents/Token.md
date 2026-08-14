---
aliases:
  - Tokens
  - Tokenization
tags:
  - agents
summary: The sub-word unit a language model actually reads and writes; the unit of cost and of context.
---
A **token** is the atomic unit a [[Large Language Model]] processes. Tokens are not words or characters but fragments produced by a learned segmentation — common words are usually a single token, rare words split into several, and whitespace and punctuation carry tokens of their own. English text averages roughly four characters per token.

Tokens matter for three practical reasons. They are the unit in which the [[Context Window]] is measured, so "how much can I show the model" is a token question. They are the unit of billing, so they are the unit of [[Token Budget]]. And they are the unit of latency, since generation is sequential.

Tokenization also explains a family of otherwise-strange model behaviors: difficulty with character-level tasks like counting letters or reversing strings, uneven handling of unusual formatting, and the fact that the same content costs different amounts depending on how it is written. Dense structured formats and long identifier names are more expensive than their information content suggests.

Because tokens are consumed by everything in the request — instructions, tool definitions, prior turns, retrieved documents — reducing any of these frees capacity for the rest. That trade is the whole subject of context engineering.

## See also
- [[Context Window]]
- [[Token Budget]]
- [[Character Encoding]]
- [[Prompt]]
- [[Nondeterminism]]
- [[Tool Use]]
- [[Constrained Decoding]]

## Related
- [[Prompt Engineering]]
- [[Structured Output]]
