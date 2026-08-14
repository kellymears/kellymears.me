---
aliases:
  - Agent loop
  - ReAct loop
tags:
  - agents
summary: The cycle of model turn, tool call, observation, repeat — the basic mechanism of an AI agent.
---
The **agentic loop** is the control structure that turns a text-predicting model into something that gets work done: the model produces a turn; if that turn contains a tool call, the host executes it and appends the result to the conversation; the model runs again with the new information; repeat until it produces a final answer or a limit is reached.

Everything characteristic of agents follows from this loop. The model can *investigate* — read a file, run a search, look at the result, and choose the next step based on what it found. It can also fail in loop-specific ways: repeating an action whose effect it cannot observe, or terminating early because it believes work is done.

Practical design centers on a few pressures.

**Observation must reflect reality.** If a write goes to one place and the corresponding read comes from another, the model sees its own change fail to appear and does it again — producing duplicates. Read and write paths must agree; see [[Draft and Published]].

**Every iteration consumes the [[Context Window]]**, so long loops need artifacts stored outside it and referenced by handle.

**Limits are real.** Step caps and request timeouts wrap the whole turn including tool execution, so a slow tool can abort a turn before its own honest report is ever delivered.

## See also
- [[Tool Use]]
- [[Multi-Agent Orchestration]]
- [[Human in the Loop]]
- [[Token Budget]]
- [[Guardrail]]
- [[Large Language Model]]

## Related
- [[Token]]
- [[Model Context Protocol]]
