---
aliases:
  - Batch size
  - Small batch size
tags:
  - delivery
summary: The principle of moving work through a process in small increments, borrowed from lean manufacturing, which shortens feedback, reduces risk, and speeds flow, and which research on software teams links to better delivery performance.
---
**Small batches** is the principle that work should move through a process in small increments rather than large ones. In software, it means shipping small changes often: short-lived branches, small pull requests, frequent deploys. The idea comes from manufacturing, where it was central to the Toyota Production System, and it has become one of the most consistent findings about how effective software teams work; see [[Toyota Production System]].

The case rests on a few connected effects.

**Feedback arrives sooner.** A small change can be reviewed, tested, and released quickly, so the team learns within hours whether it worked. A large batch delays every lesson until the whole batch is done; see [[Feedback Loop]].

**Risk shrinks.** A deploy containing one change that breaks something is easy to diagnose and undo. A deploy containing two hundred changes is not, and the likelihood that something in it is broken grows with its size.

**Flow speeds up.** Queueing theory explains why. For a stable process, the average time an item spends waiting is proportional to how much work is in progress; see [[Little's Law]]. Large batches mean large queues, and items wait while the rest of the batch catches up. Limiting how much work is in flight is the related practice; see [[WIP limit]].

**Integration gets easier.** Small, frequent merges rarely conflict, while long-lived branches drift apart and collide; see [[Trunk-Based Development]].

**Review gets better.** Reviewers give careful attention to a short change and tend to skim a long one, so large pull requests often receive less scrutiny per line; see [[Code Review]] and [[Stacked Pull Requests]].

The product development writer Donald Reinertsen argued in a 2009 book that batch size is one of the most powerful and most neglected levers in product development. Research summarized in the 2018 book Accelerate found that teams deploying frequently in small increments also tended to have lower failure rates and faster recovery, challenging the assumption that speed and stability trade off; see [[DORA Metrics]].

Small batches aren't free. Each batch carries a fixed overhead, such as a build, a review, or a deployment, so making batches smaller pays off only when that overhead is also low. Much of the work of continuous integration and automated deployment is driving the transaction cost down until small batches become economical; see [[Continuous Integration]].

Splitting work well is a skill. A small batch should still be coherent and safe to ship on its own; see [[Atomic Commit]]. Unfinished features can be merged in small pieces and kept hidden until complete; see [[Feature Flag]]. The same thinking explains why bottlenecks matter more than individual speed; see [[Theory of Constraints]].

## See also
- [[Continuous Deployment]]
- [[Release Engineering]]
- [[Feature Branch]]
