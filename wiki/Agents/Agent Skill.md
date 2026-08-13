---
aliases:
  - Skill
  - Slash command
tags:
  - agents
summary: A packaged, invocable set of instructions that loads into an agent's context on demand.
---
An **agent skill** is a reusable bundle of instructions — often a single document plus supporting reference files — that an assistant loads when a task matches it. It is the unit of packaging for procedural knowledge: how to run a particular workflow, what conventions apply to a kind of work, which steps a task requires and in what order.

The design pressure is the same one that governs all context: a skill that is always loaded is just a longer [[System Prompt]] and competes with everything else for attention. Loading on demand — triggered by name or by a description matched against the task — is what makes a large library of them affordable.

Skills tend to accumulate the procedural material that would otherwise bloat a project's standing instructions. Keeping the standing instructions lean and moving step-lists into skills is a recurring refactor, and it has a corollary: standing instructions should say *what is true*, skills should say *what to do*.

Practical hazards are those of any plugin system. Loading is by convention — a bundle placed where the loader does not scan is silently inert, which is a [[Silent Failure]] with no error anywhere. Names must match directories exactly. And a skill that names a specific model or a specific file layout goes stale in the ordinary way; see [[Documentation Rot]].

## See also
- [[System Prompt]]
- [[Model Context Protocol]]
- [[Prompt Engineering]]
- [[Agent Memory]]

## Related
- [[Tool Use]]
- [[Prompt]]
- [[Provenance]]
