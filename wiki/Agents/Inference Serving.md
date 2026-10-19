---
aliases:
  - Model serving
  - Continuous batching
  - PagedAttention
  - Prefill
  - Time to first token
tags:
  - agents
summary: Running a trained language model for many users at once, where the work splits into a compute-heavy prefill and a memory-bound decode, and batching, memory paging, and scheduling decide cost and speed.
---
**Inference serving** is the work of running a trained model for many users at once, efficiently enough to pay for the hardware. Training happens once; inference happens every time anyone sends a request, so for widely used models it dominates total cost.

A request to a language model passes through two phases with very different profiles:

- **Prefill.** The model reads the whole prompt in one pass, processing all its tokens in parallel. This is compute-heavy, keeps the [[Graphics Processing Unit]] busy, and determines the **time to first token**.
- **Decode.** The model then generates one [[Token]] at a time, each step depending on the last. Every step must read all of the model's weights from memory to produce a single token, so decode is limited by memory bandwidth, not arithmetic. It determines tokens per second.

The key to efficiency is that decode's weight-reading cost can be shared. Reading the weights once and applying them to a hundred requests' next tokens costs barely more than doing it for one. Serving systems therefore **batch** many requests into each step.

Simple batching waits for every request in a batch to finish, so short replies sit idle behind long ones. **Continuous batching**, introduced in a 2022 research system called Orca, schedules at the level of single steps instead: finished requests leave and new ones join between any two tokens, keeping the batch full; see [[Head-of-Line Blocking]].

The limit then becomes memory. Each active request keeps a cache of its attention state that grows with every token; see [[KV Cache]]. Reserving space for the longest possible reply wasted most of it. **PagedAttention**, from the vLLM project at UC Berkeley in 2023, borrowed the operating system's answer: store the cache in small fixed-size blocks mapped through a table, so memory is allocated as needed, and requests sharing a prompt prefix can share its blocks; see [[Virtual Memory]] and [[Prompt Caching]].

Other levers:

- **Smaller weights.** Lower-precision numbers mean less to read per step; see [[Quantization]].
- **Guessing ahead.** A small draft model proposes several tokens that the large model verifies at once; see [[Speculative Decoding]].
- **Splitting the model.** Large models are sliced across several GPUs, and sparse models send each token to only a few experts; see [[Mixture of Experts]].
- **Separating phases.** Some systems run prefill and decode on different machines, since they compete for different resources.
- **Picking the model.** Easy requests go to cheaper models; see [[Model Routing]].

Every choice trades throughput against latency. Bigger batches lower cost per token but slow each user, and the slowest requests matter most for experience; see [[Tail Latency]] and [[Queueing Theory]]. Output is usually sent as it is generated, so users read while decode continues; see [[Streaming Response]].

## See also
- [[Batch Normalization]]
- [[Tensor Processing Unit]]
