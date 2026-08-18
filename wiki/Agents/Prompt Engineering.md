---
aliases:
  - Prompt design
tags:
  - agents
summary: Shaping a model's input to make the desired behavior reliable rather than occasional.
---
**Prompt engineering** is the practice of designing the text given to a [[Large Language Model]] so that the behavior you want happens reliably. The framing has matured: it is less about clever phrasings and more about structure, evidence, and knowing which channel actually carries influence.

A few findings recur across systems.

**Structure beats persuasion.** When a model systematically omits something it is merely *permitted* to produce, prose encouragement rarely fixes it — restructuring the output shape so the thing is *required* fixes it immediately. Models reliably produce what the grammar demands and unreliably produce what the text merely invites. See [[Constrained Decoding]] and [[Structured Output]].

**Systematic and probabilistic misses need different treatments.** A retry that names the rejection helps when the model *sometimes* gets it wrong. It does nothing when the model always gets it wrong, because nothing about the situation has changed.

**Every channel is a channel.** Tool descriptions, field descriptions, enum values, and error messages returned to the model all steer behavior, often more than the instructions written for that purpose. Error text is worth writing as guidance, since the model reads it verbatim.

**Numbers stated become numbers targeted.** See [[Anchoring Effect]] and [[Goodhart's Law]].

Because a prompt change cannot be type-checked, the only way to know whether it helped is to measure — see [[Evaluation Harness]].

## See also
- [[System Prompt]]
- [[Prompt]]
- [[Tool Use]]
- [[Nondeterminism]]
- [[Chain-of-Thought Prompting]]
