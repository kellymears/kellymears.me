---
aliases:
  - Approval gate
  - HITL
tags:
  - agents
summary: Requiring a person's judgment at chosen points in an otherwise automated process.
---
**Human in the loop** describes a system that pauses for a person's decision at defined points rather than running to completion unattended. The design question is never whether to have one but *where* — a gate on every step destroys the value of automation, and a gate on nothing eventually does something irreversible.

The placement heuristic that holds up: gate on actions that are **hard to reverse** or **outward-facing**. Publishing, sending, deleting, spending, and anything that leaves the machine are worth confirming. Local, reversible, inspectable work is not — version control makes most of it undoable, and asking about it trains people to approve without reading, which is worse than not asking.

Two subtleties. **Authorization does not generalize across contexts.** Approval to do a thing once, or in one place, is not approval to do it everywhere. And **the gate must receive what it needs to judge with.** A reviewer who reads changes on a hosting platform cannot see evidence that lives only in a local scratch directory; if the evidence is not where the decision is made, the gate is decorative.

The complementary practice is honest reporting: a gate is only as good as the account it is given. See [[Fail Fast]] and [[Code Review]].

## See also
- [[Guardrail]]
- [[Agentic Loop]]
- [[Code Review]]
- [[Multi-Agent Orchestration]]
- [[Prompt Injection]]
- [[Pull Request]]

## Related
- [[Context Window]]
- [[Tool Use]]
