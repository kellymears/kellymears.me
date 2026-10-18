---
aliases:
  - Key-value cache
  - Attention cache
tags:
  - agents
summary: The stored attention keys and values for every token already processed, which lets a model generate each new token without re-reading the whole sequence.
---
A **KV cache** holds the [[Attention Mechanism|attention]] keys and values a [[Large Language Model]] has already computed for every [[Token]] in the current sequence. Generation is one token at a time, and each new token has to attend to all the tokens before it. Without the cache, producing token *n* would mean recomputing the keys and values for tokens 1 through *n−1* from scratch, so total work would grow quadratically with output length. With it, each step computes keys and values for one new token, appends them, and reads the rest. It is [[Memoization]] applied to the inner loop of inference.

The cost is memory, and it is large. The cache grows linearly with sequence length, with layer count, and with the number of concurrent requests. On a long [[Context Window]] it can rival the weights themselves. Its size is often the real limit on how much context a GPU can serve, more than compute is. That is why a model advertised with a huge window may be run locally with a much smaller one: the weights fit, the cache for the full window does not. Engines respond in several ways. They [[Quantization|quantize]] the cache separately from the weights, they share key/value heads across query heads (grouped-query attention), and they page it into fixed blocks so fragmentation doesn't waste memory, the same trick [[Virtual Memory|virtual memory]] plays.

Inference splits into two phases with different bottlenecks. **Prefill** processes the whole prompt in parallel and fills the cache; it is compute-bound and sets time-to-first-token. **Decode** produces tokens one by one, reading the entire cache each step; it is memory-bandwidth-bound and sets tokens per second. Most inference optimizations target one phase or the other. [[Speculative Decoding]] attacks decode; [[Prompt Caching]] skips prefill by keeping a cache alive across requests.

Because the cache is keyed by exact token prefix, anything that changes an early token, such as a timestamp in the [[System Prompt]], invalidates everything after it.

## See also
- [[Prompt Caching]]
- [[Speculative Decoding]]
- [[Context Window]]
- [[Token Budget]]
- [[Latency and Jitter]]
