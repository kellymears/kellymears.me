---
aliases:
  - Prompting
tags:
  - agents
summary: The text supplied to a language model to elicit a response.
---
A **prompt** is the input given to a [[Large Language Model]]. In modern systems it is not a single string but an assembled structure: a [[System Prompt]] establishing role and rules, a sequence of conversational turns, the definitions of any available tools, and whatever documents or state have been injected for the task.

Two properties are worth internalizing. First, everything in that assembly is *text the model reads* — including tool descriptions, which are frequently more influential on behavior than the instructions written for the purpose. Second, everything competes for the same [[Context Window]], so adding instruction has a cost, not just a benefit.

Prompts are also the least type-checked part of most systems. Nothing errors when a prompt describes a capability that was removed, states a rule the runtime does not enforce, or duplicates a fact that has since changed elsewhere. That makes them a prime site for [[Documentation Rot]], and it is the argument for keeping a single source of truth: a tool's description ships beside its implementation and cannot drift, while a catalog of tools in a separate document will.

## See also
- [[Prompt Engineering]]
- [[System Prompt]]
- [[Tool Use]]
- [[Token]]
- [[Prompt Injection]]

## Related
- [[Guardrail]]
- [[Agent Skill]]
