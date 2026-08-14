---
aliases:
  - Confabulation
tags:
  - agents
summary: Fluent, confident output that is not grounded in anything real.
---
**Hallucination** is the production of plausible, well-formed content that has no basis in fact — a cited source that does not exist, an API method that was never defined, a file path that is invented rather than observed. The term is imperfect (confabulation is closer) but it has stuck.

It is not a bug in the ordinary sense. A [[Large Language Model]] generates likely continuations; a fluent wrong answer and a fluent right answer are equally likely-looking from inside the model. Nothing in the objective distinguishes them.

The important consequence is that **fluency is not evidence**, and specificity is actively misleading: a precise-sounding mechanism reads as more rigorous than an honest "not established", which is exactly the trap described in [[Plausible Mechanism]]. Humans make the same error for the same reason, which is why the mitigation is procedural rather than model-specific.

Mitigations that work are all about grounding. Give the model tools to *look* rather than recall — reading the file beats remembering the file. Validate identifiers against a real catalog rather than trusting recall. Require citations that can be checked. And design so that unverifiable claims are cheap to detect: an exhaustive claim, an invented path, or a cited test file are each one command away from being falsified. See [[Ground Truth]] and [[Exhaustive Claim]].

## See also
- [[Falsifiability]]
- [[Tool Use]]
- [[Guardrail]]
- [[Nondeterminism]]

## Related
- [[Vacuous Truth]]
- [[Prompt Engineering]]
