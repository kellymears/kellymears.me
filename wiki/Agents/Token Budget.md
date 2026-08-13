---
aliases:
  - Cost control
tags:
  - agents
summary: The finite allowance of model usage a task may consume, and the design decisions it forces.
---
A **token budget** is a cap on how much model usage a piece of work may consume, whether denominated in money, in [[Token]]s, or in a provider's rate limit. It is a real engineering constraint rather than an accounting detail, because the cheapest way to exceed it is to do something that looks reasonable.

Parallelism is the main multiplier. Running several model workers concurrently multiplies spend by their number, and a wide fan-out repeated twice can exhaust a monthly allowance mid-task, killing work in flight. Narrow, staggered batches cost the same in total and fail more gracefully. See [[Fan-Out and Fan-In]].

The second multiplier is context. Every turn resends the accumulated conversation, so a long session's cost grows superlinearly. Storing artifacts outside the window and passing handles, summarising rather than pasting, and delegating self-contained work to a [[Subagent]] are all budget techniques as much as clarity techniques.

Budgeting also shapes what is worth automating. A recording run that costs a few dollars is worth doing without ceremony; one that costs orders of magnitude more deserves a decision first. And an expensive regeneration launched against a working copy someone else is mid-edit produces a stale result at full price — check before spending. See [[Model Routing]].

## See also
- [[Context Window]]
- [[Model Routing]]
- [[Multi-Agent Orchestration]]
- [[Resource Starvation]]
- [[Large Language Model]]

## Related
- [[Race Condition]]
- [[Agentic Loop]]
