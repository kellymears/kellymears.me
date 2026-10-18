---
aliases:
  - Speculative sampling
  - Draft model
  - Assisted generation
tags:
  - agents
summary: Having a cheap model guess several tokens ahead and the large model check them all in one pass, which speeds generation without changing its output.
---
**Speculative decoding** speeds up text generation by letting a small, fast *draft* model propose several tokens ahead, then having the large *target* model verify all of them in a single forward pass. The target accepts the longest run of draft tokens it agrees with, supplies the correct token at the first disagreement, and the cycle repeats.

It works because of how decode time is spent. Producing one token from a [[Large Language Model]] is bound by memory bandwidth: the weights and the [[KV Cache]] are read in full for very little arithmetic. Checking five candidate tokens in parallel costs almost the same as producing one. If the draft is usually right, several tokens come out of every expensive pass. The speedup depends entirely on the **acceptance rate**. Predictable text such as code, boilerplate, and repeated structure accepts long runs. Creative or high-[[Temperature Sampling|temperature]] output accepts few, and the draft becomes overhead.

The verification step uses a rejection-sampling rule that makes the final output distribution **identical** to what the target would have produced alone. This is the property that sets it apart from most speedups: unlike [[Quantization]] or routing to a smaller model, it trades no quality. The draft can only make generation faster or slower. It cannot make it wrong.

Variants differ in where the guesses come from:

- **A separate small model** from the same family, sharing the [[Token|tokenizer]].
- **Extra prediction heads** trained onto the target itself, as in Medusa and EAGLE, which predict from the target's own hidden states and reach higher acceptance than an independent model.
- **Lookup from the context**, matching n-grams already in the prompt. It is cheap and works well when the output copies from the input, as in editing.

The technique parallels branch prediction in CPUs: guess, compute ahead, and throw away work past the first misprediction. The cost is extra memory for the draft and a less predictable [[Latency and Jitter|latency]] per step.

## See also
- [[KV Cache]]
- [[Quantization]]
- [[Model Routing]]
- [[Mixture of Experts]]
- [[Markov Chain]]
- [[Determinism]]
- [[Knowledge Distillation]]
- [[Beam Search]]
- [[Inference Serving]]
