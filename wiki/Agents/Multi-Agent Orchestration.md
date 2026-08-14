---
aliases:
  - Agent orchestration
  - Agent fleet
tags:
  - agents
summary: Coordinating several model instances on one body of work, each with its own context.
---
**Multi-agent orchestration** runs several model instances against one problem, usually because the work decomposes or because independent perspectives are worth more than one long chain of reasoning. Each participant gets its own [[Context Window]], which is the main structural benefit: work that would not fit in one conversation fits across several.

Common shapes:

- **Fan-out** — split independent work across workers and merge results; see [[Fan-Out and Fan-In]].
- **Pipeline** — each item flows through successive stages without waiting for its siblings.
- **Panel** — several workers attempt the same task independently and a judge selects or synthesizes; see [[LLM-as-Judge]].
- **Adversarial** — an implementer and a fresh critic alternate; see [[Adversarial Review]].

The hard problems are not about the model. They are the ordinary problems of concurrency, arriving without the usual guardrails: workers sharing a working directory overwrite each other; a generic scratch filename collides with a sibling's in-flight file; a bulk staging command sweeps another worker's uncommitted work into your commit; two workers independently invent conflicting names for the same shared concept. Isolation — a separate working copy per worker, explicit paths, unique filenames — is the answer, and it is not free. See [[Git Worktree]] and [[Race Condition]].

Coordination has its own failure mode: a worker that "reports" into its own output rather than to the coordinator is invisible, and reads as failure when it merely finished quietly.

## See also
- [[Subagent]]
- [[Agentic Loop]]
- [[Token Budget]]
- [[Human in the Loop]]
