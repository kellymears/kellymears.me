---
aliases:
  - Tech radar
  - Innovation tokens
  - Choose Boring Technology
tags:
  - delivery
summary: A periodically updated map of which tools, techniques, and platforms an organization recommends adopting, trying, assessing, or avoiding, popularized by Thoughtworks and paired with the idea that new technology should be adopted sparingly.
---
**A technology radar** is a visual summary of an organization's view of the tools, techniques, platforms, and frameworks it uses or is watching. Each item sits in a ring that signals a recommendation, and the radar is revised periodically as opinions change.

The consultancy Thoughtworks popularized the format, publishing a radar of its own technology recommendations roughly twice a year since 2010. Its radar has four quadrants:

- techniques;
- tools;
- platforms;
- languages and frameworks.

And four rings:

- **Adopt**: proven, and recommended for appropriate use.
- **Trial**: worth using on projects that can handle some risk.
- **Assess**: worth exploring to understand its potential.
- **Hold**: proceed with caution, or stop starting new work with it.

Thoughtworks released tools to let other organizations build their own radars, and many companies do. An internal radar records collective judgments in one place, so teams don't rediscover the same lessons, and makes technology choices a deliberate conversation rather than individual preference. It works like an index of decisions, often backed by more detailed records explaining each one; see [[Architecture Decision Record]].

Radars support several goals:

- **Reducing sprawl.** When every team picks its own database and framework, the organization pays to maintain them all; see [[Platform Engineering]].
- **Surfacing risk.** Moving an aging tool to hold signals that it's time to plan a migration; see [[Deprecation]] and [[Long-Term Support]].
- **Encouraging exploration** in a bounded way, through the assess and trial rings.

A related philosophy argues for restraint. In a 2015 essay titled "Choose Boring Technology," the engineer Dan McKinley suggested that organizations have only a few **innovation tokens** to spend. Each new, unfamiliar technology costs one, because its failure modes are unknown and its operational burden is real. Well-understood tools, by contrast, have known problems and known fixes; see [[Boring technology]]. The essay became widely cited as a counterweight to adopting whatever is new.

Technology choices also accumulate costs over time. Each one adds dependencies, upgrades, and expertise to maintain; see [[Technical Debt]] and [[Dependency Hell]]. Once a tool is widespread, replacing it becomes difficult; see [[Path Dependence]]. Rebuilding with a fashionable new stack has its own well-known risks; see [[Second-System Effect]].

Radars can go wrong too. Treated as mandates, they can stifle experiments, and if not updated they become stale and ignored, a page nobody consults before choosing a tool. Ownership structures influence technology choices as well, since teams tend to pick tools that fit their boundaries; see [[Conway's Law]] and [[Team Topologies]].

Like any shared map, a radar is most valuable as a record of reasoning, not a list of rules.

## See also
- [[Inner Source]]
- [[Not Invented Here]]
