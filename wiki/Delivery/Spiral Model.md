---
aliases:
  - Spiral development
  - Boehm's spiral
tags:
  - delivery
summary: A software process proposed by Barry Boehm in the 1980s that organizes a project as repeated loops, each starting with the question of what could go wrong next, and that uses prototypes and analysis to retire the biggest risks before committing to build.
---
The **spiral model** is a software development process proposed by the software engineer Barry Boehm in a paper first circulated in 1986 and widely read after it appeared in a computing magazine in 1988. It was one of the first well-known alternatives to the strictly sequential approach of finishing requirements, then design, then code, then testing; see [[Waterfall]].

Boehm drew the process as a spiral on a diagram divided into four quadrants. Each loop around the spiral passes through all four:

- **Set objectives.** Decide what this cycle is for, what alternatives exist, and what constraints apply.
- **Analyze risk.** Identify the biggest uncertainties and resolve them, usually by building a prototype, running a simulation, or doing focused analysis; see [[Prototype]].
- **Develop and verify.** Build and check the next piece of the product, whether that's a requirements document, a design, or working code.
- **Plan the next loop.** Review the results with stakeholders and decide whether and how to continue.

The distance from the center represents cumulative cost; the angle represents progress through a cycle. Early loops are cheap and exploratory. Later ones are expensive and committed.

The key idea is that **risk drives the process**. Instead of following a fixed sequence of phases, a team asks at each turn what is most likely to sink the project and spends effort there first. A project whose main risk is unclear user needs would prototype the interface; one whose risk is performance would benchmark early. A low-risk project might pass through the spiral in a way that looks almost sequential. Boehm intended the model as a framework for choosing a process, not as a process itself; see [[Risk-Based Testing]] and [[Expected Value]].

This was a direct response to the experience that large projects often discovered their worst problems late, after most of the money was spent. Boehm had also documented how wildly early cost estimates could vary, an observation that later became known as the cone of uncertainty; see [[Cone of Uncertainty]] and [[Planning Fallacy]]. Resolving uncertainty early narrows that cone; see [[Pre-mortem]].

The spiral model was influential but often misunderstood. It was sometimes read as a series of small waterfalls, which missed the point about risk. Boehm later published clarifications emphasizing its underlying principles and adding fixed milestones, which were adopted by other process frameworks.

Its ideas live on in modern practice. Iterative and agile methods share its loops of building, reviewing, and adjusting, though with much shorter cycles and less formal risk analysis; see [[Feedback Loop]]. The practice of building a thin end-to-end version first to expose integration risks follows the same logic; see [[Walking Skeleton]]. Some problems can only be understood by attempting solutions; see [[Wicked Problem]] and [[Gall's Law]].

## See also
- [[Big Design Up Front]]
- [[Software Crisis]]
- [[Shape Up]]
