---
aliases:
  - System message
tags:
  - agents
summary: The standing instructions that frame every turn of a conversation with a model.
---
A **system prompt** is the persistent instruction block placed ahead of a conversation, used to establish role, constraints, tone, available context, and policy. Unlike a user turn it is not part of the dialogue; it frames the whole exchange.

Well-designed system prompts tend to carry only what cannot be expressed elsewhere: who the assistant is, what situation it is in, what it must never do, and how to behave when instructions conflict. Things that *can* live closer to their implementation should — a tool's purpose belongs in the tool's own description, where it ships with the code and cannot drift. See [[Tool Use]] and [[Documentation Rot]].

A recurring authoring failure is the rule that describes an intention without assigning an action. "Reach for an existing arrangement when one fits" produces a reply offering the user a menu of arrangements, because the rule never said who chooses. Any rule that expects the model to *act* must say so explicitly — choose it yourself and apply it, rather than answering with a list. The gap shows up as an absent tool call, not as anything wrong in the prose, which is why it needs an [[Evaluation Harness]] to catch.

System prompts are also a security boundary, since untrusted content arriving later may attempt to override them; see [[Prompt Injection]] and [[Guardrail]].

## See also
- [[Prompt]]
- [[Prompt Engineering]]
- [[Agent Skill]]
- [[Guardrail]]

## Related
- [[Large Language Model]]
- [[Model Context Protocol]]
