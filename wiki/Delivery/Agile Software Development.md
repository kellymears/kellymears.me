---
aliases:
  - Agile
  - Agile Manifesto
  - Scrum
  - Sprint
  - Waterfall
  - Retrospective
tags:
  - delivery
summary: The family of iterative software methods that grew from the 2001 Agile Manifesto, favoring working software and short feedback loops over upfront plans, and what happened when it became an industry.
---
**Agile software development** is a family of methods that build software in short iterations, delivering working pieces frequently and adjusting the plan based on feedback. The name comes from the **Agile Manifesto**, written by seventeen developers at a ski resort in Utah in February 2001. It valued:

- individuals and interactions over processes and tools,
- working software over comprehensive documentation,
- customer collaboration over contract negotiation,
- responding to change over following a plan,

while noting that the items on the right still had value.

The manifesto reacted against **waterfall** development, in which requirements, design, implementation, and testing happen in sequence, each finished before the next begins. Waterfall assumes requirements can be known upfront. In practice, users learn what they want by using software, and problems found late are expensive. Ironically, Winston Royce's 1970 paper, usually cited as the origin of waterfall, described the sequential model as risky and recommended iteration.

Several methods sit under the agile umbrella:

- **Scrum** organizes work into fixed **sprints**, usually two weeks, each starting with planning and ending with a review and a **retrospective** on how the team worked. It defines roles such as product owner and scrum master. It's by far the most widely adopted.
- **Extreme Programming**, from Kent Beck in the late 1990s, emphasized engineering practices: [[Test-Driven Development]], [[Pair Programming]], [[Continuous Integration]], and small releases.
- **[[Kanban]]** manages continuous flow with limits on work in progress, without fixed iterations.

The common thread is the feedback loop. Shipping small increments lets teams test assumptions early, the same logic as a [[Minimum Viable Product]], and the [[Planning Fallacy]] matters less when plans cover two weeks instead of two years.

Agile's success brought a backlash. The authors meant the manifesto as a set of values, not a process to buy. As it spread, it became an industry of certifications, consultants, and tools, and many organizations adopted the ceremonies, daily standups, story points, and sprints, without the substance. Velocity charts became targets, inviting [[Goodhart's Law]]. Several manifesto authors have criticized what they call "dark agile" or "agile in name only," in which processes and tools win after all. Meanwhile, practices from Extreme Programming that actually shorten feedback loops, automated testing and continuous integration, were often skipped.

Agile's ideas fed into later movements. DevOps extended the feedback loop past development into operations, and [[Continuous Deployment]] took small releases to their limit. [[DORA Metrics]] research gave evidence that small batches and fast feedback predict better outcomes. [[Conway's Law]] adds a caution: no process fixes a team structure that fights the architecture.

## See also
- [[Gantt Chart]]
- [[Definition of Done]]
- [[Shape Up]]
- [[Daily Standup]]
- [[Fresh Start Effect]]
