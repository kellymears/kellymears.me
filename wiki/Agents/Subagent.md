---
aliases:
  - Sub-agent
  - Delegated agent
tags:
  - agents
summary: A model instance spawned by another to handle a scoped task with its own context.
---
A **subagent** is a model instance created by another agent to perform a delimited task and return a result. The motivation is usually context economy: a search that would flood the parent's [[Context Window]] with file contents can be delegated, with only the conclusion coming back.

Delegation has costs that are easy to underestimate.

**The parent cannot see the work, only the report.** A subagent that claims a build is green, a change is pushed, or a check has passed is making a claim, not providing evidence — verify independently. See [[Ground Truth]].

**Scope leaks.** A subagent inheriting the parent's full context frequently takes on more than it was assigned, because it can see the whole problem.

**Nesting is usually capped**, so a design that assumes a delegate can itself delegate may silently degrade — commonly into self-review, which is exactly the perspective [[Adversarial Review]] exists to avoid.

**Isolation is not automatic.** Unless given its own working copy, a subagent shares the parent's directory, and destructive commands there destroy in-flight work.

The instruction that most reliably improves subagent output is a statement of what "done" means and what evidence must accompany it.

## See also
- [[Multi-Agent Orchestration]]
- [[Adversarial Review]]
- [[Git Worktree]]
- [[Token Budget]]
- [[Fan-Out and Fan-In]]

## Related
- [[Race Condition]]
- [[Agentic Loop]]
