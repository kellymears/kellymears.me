---
aliases:
  - BDUF
tags:
  - delivery
summary: The practice of completing and settling a system's design before implementation begins, defended where change is costly or failure is dangerous, and criticized by agile practitioners as guessing at answers that only building can reveal.
---
**Big design up front**, often abbreviated **BDUF**, is the practice of completing a system's design in detail before writing the code that implements it. The name was coined by its critics, mostly in the agile and extreme programming communities around the turn of the millennium, as a label for what they were reacting against; see [[Waterfall]] and [[Extreme Programming]].

The argument for designing first rests on the cost of change. A widely repeated claim holds that a defect found late in a project costs many times more to fix than one caught during design, sometimes quoted as a hundredfold. If changes get dramatically more expensive over time, then thinking hard at the start is the cheapest way to get things right. Engineers in other fields work this way: a bridge is designed completely before construction, because changing it halfway is ruinous. The original data behind the hundredfold figure is thinner and older than its popularity suggests, and some researchers have argued the number has been repeated far beyond its evidence.

Agile critics argued that in software the premise often fails. Requirements change as users see working software, and many design questions can't be answered by thinking alone; only building reveals them. A detailed design produced before anyone has tried anything is a set of guesses, and guesses written into a large document become hard to revise; see [[Feature Creep]] and [[Second-System Effect]]. Kent Beck argued that with automated tests, continuous refactoring, and simple design, the cost of change can be kept low, removing the reason to design everything in advance; see [[Refactoring]] and [[You Aren't Gonna Need It]].

The alternative is often called **emergent** or **evolutionary design**: build the simplest thing that works, and let the design improve as understanding grows. A related principle, the **last responsible moment**, suggests deferring decisions until the cost of not deciding outweighs the benefit of waiting, when more information is available; see [[Reversible Decision]].

Neither extreme works well in practice. Pure emergent design can drift into a tangle of local decisions with no coherent structure. Pure up-front design can spend months on a plan that the first prototype invalidates; see [[Analysis paralysis]]. Most teams settle somewhere in between: enough design to fix the hard-to-change decisions, such as data models, public interfaces, and security boundaries, and enough flexibility to learn the rest; see [[Architecture Decision Record]] and [[Walking Skeleton]].

The right amount depends on context. Safety-critical systems, hardware, and public protocols, where mistakes are costly or permanent, justify much more design up front, sometimes including mathematical proof; see [[Formal Verification]]. Iterative processes that tackle the riskiest questions first offer a middle path; see [[Spiral Model]].

## See also
- [[Premature Optimization]]
- [[Gall's Law]]
- [[Healthcare.gov Launch]]
