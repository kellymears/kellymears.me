---
aliases:
  - Fagan inspection
  - Code inspection
  - Formal inspection
tags:
  - testing
summary: A formal, role-based group review of code or documents, introduced at IBM in the 1970s, which found most defects before testing and gave rise to the lighter code review practiced today.
---
A **software inspection** is a formal review in which a small group examines a piece of work, such as code, a design, or a requirements document, to find defects before it moves on. Michael Fagan introduced the method at IBM in 1976, and it became the most studied form of review in software engineering.

A Fagan inspection has defined roles. The **moderator** runs the process, the **author** wrote the work, a **reader** paraphrases it aloud piece by piece, **inspectors** look for defects, and a **recorder** logs them. The process runs in stages:

1. **Planning.** The moderator checks the material is ready and schedules it.
2. **Overview.** The author explains the context.
3. **Preparation.** Each inspector studies the material alone, guided by a checklist of common defects; see [[Checklist]].
4. **Meeting.** The group walks through the work and records defects, but doesn't fix them or debate style.
5. **Rework and follow-up.** The author fixes the defects and the moderator checks the fixes.

The rules exist to keep the meeting productive. Pace is limited, typically to a couple of hundred lines an hour, because detection falls off sharply when reviewers rush. The author doesn't defend the work, and the defects belong to the product, not the person; see [[Blameless Postmortem]]. Discussion of solutions is cut off, which also avoids lengthy arguments over trivial points; see [[Law of Triviality]].

Inspections were remarkably effective. Studies at IBM and elsewhere reported that they found well over half of all defects before testing began, far more cheaply than finding them later; see [[Shift-Left Testing]]. Defect data from inspections also showed that problems cluster in a few modules; see [[Pesticide Paradox]]. One way to measure an inspection's thoroughness is to plant known errors beforehand; see [[Fault Seeding]].

Later research questioned the meeting. In 1993 Lawrence Votta found that most defects were found during individual preparation, and that meetings added few new ones while costing many hours of scheduling. That finding, along with distributed teams and version control, led to the asynchronous, tool-based [[Code Review]] most teams use now, which keeps the core idea of a second pair of eyes but drops the roles and meeting. Many hands catching bugs is also the premise of open source; see [[The Cathedral and the Bazaar]].

Formal inspection survives where the cost of a defect is high, in avionics, medical devices, and other regulated software, often paired with linking every requirement to its tests; see [[Requirements Traceability]]. Mechanical checks have taken over much of the routine work, freeing reviewers for logic and design; see [[Static Analysis]].

Explaining code line by line to a listener is part of why inspections work, and the same effect lets a programmer find bugs by explaining code to an inanimate object; see [[Rubber Duck Debugging]].

## See also
- [[Pair Programming]]
- [[Exploratory Testing]]
