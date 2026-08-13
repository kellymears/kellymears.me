---
aliases:
  - Fan-out
  - Scatter-gather
tags:
  - agents
summary: Splitting work across parallel workers and recombining their results.
---
**Fan-out and fan-in** — also called scatter–gather — is the pattern of dividing a task into independent pieces, processing them concurrently, and combining the results. It is the oldest parallelism shape there is, and it applies unchanged to fleets of model instances.

The design decision that matters most is whether the recombination is a *barrier*. A barrier waits for every worker before anything proceeds, which is correct when the next stage genuinely needs the whole set — deduplicating across all results, deciding whether to continue at all, comparing findings against one another. When the next stage only needs one item's result, a barrier is pure waste: total time becomes the slowest worker in each stage summed, rather than the slowest single chain. Streaming each item through its stages independently is usually the better default.

The second decision is width. Parallelism trades wall-clock time for peak resource consumption, and the resource is frequently shared: concurrent test suites starve each other of processor time, concurrent builds exhaust disk, concurrent model workers consume a shared spending limit. Wide fan-outs fail in ways narrow ones do not, and the failures look like defects rather than contention. See [[Resource Starvation]] and [[Token Budget]].

Silent truncation is the last hazard: if a fan-out caps coverage, say so, or a partial sweep reads as a complete one.

## See also
- [[Multi-Agent Orchestration]]
- [[Subagent]]
- [[Race Condition]]
- [[Exhaustive Claim]]

## Related
- [[Git Worktree]]
- [[Context Window]]
- [[Ground Truth]]
