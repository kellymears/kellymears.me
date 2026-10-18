---
aliases:
  - Value stream
  - Lean manufacturing
  - Toyota Production System
  - Flow efficiency
  - Muda
tags:
  - delivery
summary: Drawing every step a piece of work passes through from request to delivery, with the time spent working and the time spent waiting, which usually shows that most of the delay sits in queues and handoffs.
---
**Value stream mapping** is a method for drawing every step a piece of work passes through, from the moment someone asks for it to the moment it reaches them, and recording how long each step takes. It comes from the **Toyota Production System**, the manufacturing approach Taiichi Ohno and others developed after the Second World War, which Western writers later called lean manufacturing. Mike Rother and John Shook's 1998 book *Learning to See* gave it its standard form, and the DevOps movement adopted it for software.

A map is usually drawn on a wall with the people who do the work. For each step it records two numbers: **process time**, how long someone actually works on the item, and **wait time**, how long it sits before the step starts. In software the steps might be: request written, prioritized, designed, coded, reviewed, tested, approved, deployed.

The usual discovery is that waiting dominates. A change that takes four hours to write may take three weeks to reach users because it waits for review, for a test environment, for a weekly release window, and for a [[Change Advisory Board]] meeting. **Flow efficiency**, process time divided by total elapsed time, is often reported below 15 percent in knowledge work. Adding people does little for a stream that is mostly queues; see [[Brooks's Law]].

What the map reveals:

- **Queues.** Work waits wherever a step has more coming in than it can handle. Waiting time grows sharply as a step nears full use, which is why busy reviewers become bottlenecks; see [[Queueing Theory]] and [[Theory of Constraints]].
- **Handoffs.** Each change of hands adds a wait and loses context. Teams split by function, one for testing and one for operations, create handoffs by design; see [[Conway's Law]] and [[Team Topologies]].
- **Rework loops.** Arrows that go backward, from testing to coding, show where quality is caught late.
- **Waste.** Ohno's term **muda** covers activity that adds nothing the customer would pay for, such as waiting, extra processing, and partly done work.

Common fixes are smaller batches, so each item waits less; automating the slowest manual step, often testing or deployment; and limiting work in progress so items finish before new ones start; see [[Kanban]] and [[Deployment Pipeline]]. The [[DORA Metrics]], particularly lead time for changes, measure the same stream continuously.

The method has limits. A map is a snapshot built from people's estimates, and it is easy to speed up one stream while ignoring the others that feed it. It also measures speed, not whether the work was worth doing; see [[Goodhart's Law]]. Its main value is often social: people who each owned one step see the whole for the first time, which is the core idea of [[DevOps]].

## See also
- [[Platform Engineering]]
- [[Release Train]]
- [[Sankey Diagram]]
