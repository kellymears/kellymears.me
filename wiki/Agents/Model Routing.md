---
aliases:
  - Model tiering
  - Model selection
tags:
  - agents
summary: Choosing which model handles which step, trading capability against cost and latency.
---
**Model routing** is the practice of directing different steps of a workflow to different models. Providers offer tiers spanning roughly an order of magnitude in price and latency, so a system that sends every step to the largest model is usually overpaying, and one that sends every step to the smallest is usually unreliable.

Routing is an architectural decision because *capability differences are not uniform*. Cheaper models are often perfectly good at bounded, well-specified work and specifically bad at things that need judgment across a wide space. Two failure modes recur:

**Cheap models under-produce what they are merely permitted to produce.** Given an output shape where a component is optional, a smaller model will systematically omit it, and no amount of instruction fixes this. Making the component *required* in the schema fixes it immediately, because the grammar enforces requirements and nothing else. See [[Constrained Decoding]].

**Cheap models have tighter structural ceilings.** A schema that compiles for a large model may be rejected or time out for a small one, so the tightest-routed model is the one to probe against.

Routing also interacts with testing: an environment configured for a cheap tier will produce different results from production, and a verification that never reached the interesting comparison because it bailed on a model-identity check has proved nothing.

## See also
- [[Large Language Model]]
- [[Token Budget]]
- [[Structured Output]]
- [[Evaluation Harness]]

## Related
- [[Prompt Engineering]]
- [[Token]]
- [[Nondeterminism]]
- [[JSON Schema]]
