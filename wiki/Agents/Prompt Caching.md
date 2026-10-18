---
aliases:
  - Prefix caching
  - Context caching
tags:
  - agents
summary: Reusing the computed state of a prompt's unchanged prefix across requests, which only works if that prefix stays byte-identical.
---
**Prompt caching** keeps the [[KV Cache]] for a prompt's prefix alive after a request finishes, so the next request that starts with the same tokens can skip recomputing them. Hosted providers bill cached input tokens at a fraction of the normal price and return the first token sooner. Local inference engines do the same thing implicitly, often storing prefixes in a radix tree, a [[Trie]] over token sequences, so many requests can share one stored prefix.

The rule that governs everything is that **the match is on an exact prefix**. The cache is valid up to the first token that differs and worthless after it. That turns prompt layout into a performance decision:

- **Stable content first, volatile content last.** The [[System Prompt]], tool definitions, and long reference documents go at the top. The user's latest message goes at the bottom.
- **Nothing dynamic in the prefix.** A current timestamp, a request ID, or a per-user greeting in the system prompt invalidates the cache on every call, and it does so silently: the responses stay correct and only the bill and latency change. This is a [[Silent Failure]] that shows up only in usage metrics.
- **Ordering must be deterministic.** Tools serialized from an unordered collection, or JSON keys emitted in insertion order that varies, produce a different byte sequence for the same logical prompt. [[Determinism]] in serialization is a prerequisite.

In an [[Agentic Loop]], each turn's prompt is the previous turn's prompt plus a little more, so caching can cut the cost of a long session by most of an order of magnitude. Rewriting or summarizing earlier history to save [[Context Window]] space breaks the prefix from that point on, so the cache cost belongs in that trade-off.

Caches expire after minutes of inactivity and are evicted under memory pressure, much like a [[Least Recently Used Cache]]. Treat a hit as an optimization rather than a guarantee, and measure the hit rate rather than assume it. The same reasoning applies to a [[Fingerprint]] used as a cache key: whatever goes into the key decides what counts as a repeat.

## See also
- [[Context Engineering]]
- [[Token Budget]]
- [[Cache Invalidation]]
- [[Inference Serving]]
- [[Memoization]]
- [[Context Rot]]
