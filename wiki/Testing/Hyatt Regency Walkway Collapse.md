---
aliases:
  - Hyatt Regency collapse
  - Kansas City walkway collapse
tags:
  - testing
summary: The 1981 collapse of two suspended walkways in a Kansas City hotel lobby, which killed 114 people, caused by a small change to how the walkways hung from their rods that doubled the load on a connection already too weak, and that every reviewer assumed someone else had checked.
---
The **Hyatt Regency walkway collapse** happened on July 17, 1981, in the lobby of the Hyatt Regency hotel in Kansas City, Missouri. Two suspended walkways, one above the other, gave way during a crowded tea dance and fell onto the people below. The collapse killed 114 people and injured more than two hundred, making it for two decades the deadliest structural collapse in American history.

The walkways hung from the ceiling on steel rods. In the original design, each rod ran continuously from the ceiling down through the upper walkway to the lower one, with nuts holding each walkway in place. In that arrangement, the connection at the upper walkway carried only that walkway's own load.

During construction, the steel fabricator proposed a change. Running a single long rod through both walkways would have been awkward to build, so the design was altered to use two shorter rods: one from the ceiling to the upper walkway, and a second from the upper walkway down to the lower one. It looked like a minor detail. But it meant the upper walkway's connection now carried the weight of both walkways, roughly doubling the load on it; see [[Stress and strain]].

Investigators found that even the original design didn't meet the building code's required strength for that connection. The change took a connection without enough margin and loaded it far beyond its capacity; see [[Margin of Safety]]. On the day of the collapse, the rods pulled through the beams that supported the upper walkway. Investigators concluded the weight of the crowd was enough; the movement of dancers wasn't needed to explain the failure; see [[Resonance]].

The more lasting lesson was about review. The revised drawings passed between the fabricator and the engineering firm, and the engineers stamped them as approved. Each side later said it believed the other had performed the calculations. The change was never traced back to the original design assumptions; see [[Requirements Traceability]]. Everyone in the chain was relying on someone else to have checked; see [[Diffusion of responsibility]].

The engineers of record lost their licenses, and the case became one of the most widely taught in engineering ethics. It's a reminder that a review is only as good as its reviewers' understanding of what changed and why; see [[Code Review]] and [[Software Inspection]]. Approving a change is not the same as examining it; see [[Peer Review]].

Software teams face the same failure when a small edit quietly invalidates an assumption elsewhere, and no test or reviewer looks at the interaction; see [[Change management]] and [[Load Testing]]. Engineers sometimes describe the walkway connection as a case where the structure was never asked the right question until it answered on its own; see [[Safety Case]].

## See also
- [[Normalization of Deviance]]
- [[Space Shuttle Challenger Disaster]]
