---
aliases:
  - Model as judge
  - Automated grading
tags:
  - agents
summary: Using a language model to score another model's output against a rubric.
---
**LLM-as-judge** is the practice of having a model evaluate output — its own, another model's, or a system's — against stated criteria. It exists because many qualities worth measuring have no assertion: whether copy answers the brief, whether a summary is faithful, whether an explanation is coherent.

It works best under a few constraints.

**The rubric should be explicit and itemized**, so a verdict is per-claim rather than a global impression, and so a change in the rubric can be tracked as a change.

**Code should claim what code can prove.** A judge should only be asked about the parts that resist mechanical checking. There is a sharp trap here: an assertion that lives *outside* the claim it supports cannot fail *inside* it, so on a broken run the claim is recorded as unproven and silently handed to the judge — buying a model's opinion on something the test had already disproved. The load-bearing assertion must sit inside the claim.

**The judge deserves a capable model.** Cheaper judges produce notes citing specifics the artifact contradicts, and a note that misquotes its subject is worse than no note.

**Judgments are only valid against the inputs that produced them.** Change the artifact, the model, the rubric wording, or the criteria set, and the verdict is stale. See [[Fingerprint]] and [[Provenance]].

## See also
- [[Evaluation Harness]]
- [[Adversarial Review]]
- [[Assertion]]
- [[Nondeterminism]]
- [[Multi-Agent Orchestration]]

## Related
- [[Record and Replay Testing]]
- [[Subagent]]
