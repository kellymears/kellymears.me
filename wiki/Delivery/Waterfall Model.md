---
aliases:
  - Waterfall
  - Waterfall development
  - DOD-STD-2167
tags:
  - delivery
summary: A sequential software process in which requirements, design, implementation, testing and maintenance each finish before the next begins, named after a 1970 paper that actually warned against running it that way.
---
The **waterfall model** organizes software development as a sequence of phases, each completed and signed off before the next starts: requirements, design, implementation, verification, then maintenance. Work flows downhill like water over a series of ledges, and going back up is expensive. Each phase ends in a document that the next phase consumes, and progress is measured by which documents are finished; see [[Big Design Up Front]] and [[Gantt Chart]].

The model is usually traced to a 1970 paper by Winston Royce, "Managing the Development of Large Software Systems." Its first figures show the familiar cascade. The text then calls that version risky and an invitation to failure, because testing comes last, so problems with the design surface only when fixing them is most costly. Royce recommended feedback between phases, building a pilot version first, and involving the customer throughout. The paper never uses the word "waterfall," which appears to have been applied by later authors in the 1970s.

The simple diagram outlived the caveats. Large organizations, especially defense agencies, wanted a process they could contract against and audit, and a sequence of signed deliverables fit that need. The US military standard DOD-STD-2167, issued in 1985, prescribed a document-driven sequence of reviews for software it bought. Later revisions explicitly allowed iterative approaches, but by then the sequence had become the default picture of how software is made; see [[Software Crisis]].

The core assumption is that requirements can be known and frozen early. For software, that rarely holds. Users discover what they need by using something, markets shift, and early estimates are the least reliable ones; see [[Cone of Uncertainty]] and [[Planning Fallacy]]. A waterfall project typically reveals its real status during integration and testing near the end, when the schedule has the least room left. Iterative alternatives such as the [[Spiral Model]] and later [[Agile Software Development]] shrink the loop, delivering working pieces early so that feedback arrives while it is still cheap to act on; see [[Small Batches]].

The model is not useless. Where change truly is expensive and requirements are fixed by physics, regulation or contract, as in parts of aerospace, medical devices and construction, a phase-gated sequence with formal reviews remains common. Safety standards often require traceable links from each requirement through design to test, which a phased process makes straightforward; see [[Requirements Traceability]] and [[Verification and Validation]]. Many such projects still iterate inside the phases while presenting a sequential face to auditors.

In everyday usage, "waterfall" has become shorthand for any heavyweight, plan-first process, often used as a criticism. Teams that adopt agile ceremonies while keeping fixed scope and a single big release at the end are sometimes said to practice "water-scrum-fall."

## See also
- [[Software Release Life Cycle]]
- [[Code Freeze]]
