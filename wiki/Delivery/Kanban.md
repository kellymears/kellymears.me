---
aliases:
  - Kanban board
  - WIP limit
  - Work-in-progress limit
  - Cycle time
  - Lean software development
tags:
  - delivery
summary: A method for managing work as a visible flow, with explicit limits on how much is in progress, so teams finish more by starting less.
---
**Kanban** is a method for managing work as a continuous flow rather than in fixed batches. Work items move across a board of columns, such as "to do," "in progress," "review," and "done," and each column has a limit on how many items it can hold. The core rule is simple: start new work only when there's capacity, and finish things before starting more.

The name is Japanese for "signboard." It comes from the Toyota Production System, where in the 1950s Taiichi Ohno used cards to signal when a workstation needed more parts, so production was pulled by demand rather than pushed by schedule. David Anderson adapted the ideas to software in the mid-2000s, as part of a broader movement applying lean manufacturing to software.

Kanban rests on a few practices:

- **Visualize the work.** Every item and its state is on the board, which exposes where work piles up.
- **Limit work in progress.** WIP limits cap each column. When review is full, developers help review instead of starting new features.
- **Manage flow.** Measure how long items take from start to finish, called **cycle time**, and work on reducing it.
- **Make policies explicit.** What "done" means for each column is written down.
- **Improve continuously**, in small steps, starting from the current process rather than replacing it.

WIP limits seem counterintuitive, since keeping everyone busy feels productive. [[Queueing Theory]] explains why they work. [[Little's Law]] states that average cycle time equals work in progress divided by throughput, so with throughput fixed, more work in progress means every item takes longer. Starting more work doesn't finish more; it just makes everything wait. Each person juggling several items also pays a [[Context Switch]] cost. Busy people and fast delivery are different goals, and pursuing the first undermines the second.

Limits also expose bottlenecks. When work piles up before code review, the board shows it, and the team can respond by reviewing sooner, splitting changes smaller, or pairing; see [[Code Review]] and [[Pair Programming]]. The same thinking drives small [[Pull Request]]s and [[Trunk-Based Development]].

Compared with Scrum, the most common [[Agile Software Development]] framework, Kanban has no fixed-length sprints, no prescribed roles, and no requirement to commit to a batch of work in advance. Items flow continuously and are released when ready, which suits support, operations, and maintenance work with unpredictable arrivals. Many teams mix the two.

Kanban's metrics connect to delivery performance more broadly. Cycle time on the board is a local version of lead time in [[DORA Metrics]], and both reward small batches. A team that limits WIP and shrinks work items tends to deploy more often and fail less, for the same underlying reason.

## See also
- [[Parkinson's Law]]
- [[Continuous Deployment]]
- [[Release Train]]
- [[DevOps]]
- [[Theory of Constraints]]
