---
aliases:
  - Background agents
  - Asynchronous agent
  - Long-running agent
  - Cloud agent
  - Unattended agent
tags:
  - agents
summary: An agent run that continues without a person watching, started by a schedule, an event, or a handoff, and reports its results when done.
---
A **background agent** is an agent run that proceeds without a person watching each step. Instead of an interactive session, where someone reads every tool call and can interrupt, the agent is given a task and left to work, on a server, in a cloud sandbox, or as a scheduled job. It reports back when finished or blocked: with a pull request, a summary, a notification, or a question. The [[Agentic Loop]] is the same. What changes is everything around it.

Runs start in a few ways. A person can hand off a task ("fix this and open a PR"). A **schedule**, the [[Cron]] model, can run a recurring task such as a nightly dependency check. An **event** such as a [[Webhook]] from an issue tracker or a failed build can trigger one. Several background agents can run in parallel, which is where [[Multi-Agent Orchestration]] and [[Fan-Out and Fan-In]] patterns come in.

Removing the watcher removes a safety layer, so the design work shifts to the edges:

- **Permissions.** An unattended agent should hold only the access the task needs, inside a sandbox such as a [[Containerization|container]] with scoped credentials. See [[Least Privilege]].
- **Checkpoints and approvals.** Irreversible or outward-facing actions, such as merging, deploying, or messaging people, belong behind a [[Human in the Loop]] gate rather than at the agent's discretion.
- **Untrusted input.** Background agents often read issues, emails, or web pages written by strangers, making [[Prompt Injection]] a primary risk rather than an edge case.
- **Budgets.** With no one to notice a loop, runs need hard limits on time, steps, and spending. See [[Token Budget]].
- **Durability.** Long runs fail midway. Persisting progress, as [[Durable Execution]] engines do, lets a run resume instead of restarting, and [[Idempotence]] keeps retried steps from doing things twice.
- **Reporting.** The final report is the only part a person may read, so it must stand on its own, saying what was done, what was not, and what is uncertain, without overstating success.

[[Observability]] matters more than for interactive use. A transcript, tool-call log, and diff let someone audit a run after the fact, which is the background equivalent of watching it happen.

## See also
- [[Job Control]]
- [[Corrigibility]]
- [[ReAct]]
