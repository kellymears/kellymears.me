---
aliases:
  - Policy constraint
  - Safety rail
tags:
  - agents
summary: A rule constraining what a model may do, enforced by prompt, schema, or surrounding code.
---
A **guardrail** is a constraint on model behaviour: a category of action it must refuse, a confirmation it must obtain, a shape its output must take. Guardrails live at three different strengths, and conflating them is the usual source of trouble.

**Prompt-level** rules are advisory. They shape behaviour reliably enough to be useful and are not enforcement — a rule stated in prose is followed most of the time.

**Schema-level** rules are enforced by [[Constrained Decoding]]: the model cannot emit what the grammar disallows. This is the strongest lever and the reason "make it required" beats "ask nicely".

**Code-level** rules are enforced by the host: a permission check, a scope restriction, an approval gate. This is the only level that holds against [[Prompt Injection]], because it does not depend on the model cooperating.

Two failure modes are worth naming. A guardrail can be *too strong for its context* — a policy against unsupported claims will cause a model to decline a task that merely resembles the prohibited one, which turns an evaluation into a coin flip. And an asymmetric permission (writes constrained to one target, reads unconstrained) leaves a gap where the model aims a write at something it read; closing it may come down to wording an error message so it names the likely mistake rather than offering a bare list of valid choices.

## See also
- [[Human in the Loop]]
- [[Least Privilege]]
- [[Prompt Engineering]]
- [[Evaluation Harness]]
- [[System Prompt]]
- [[Agentic Loop]]

## Related
- [[Tool Use]]
- [[Large Language Model]]
