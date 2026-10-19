---
aliases:
  - DX
  - Inner loop
  - Developer productivity
  - SPACE framework
tags:
  - delivery
summary: How it feels to build software with a given set of tools, codebase, and process, shaped mostly by how fast feedback arrives, how much a developer must hold in mind, and how often they can work uninterrupted.
---
**Developer experience**, often shortened to DX, is the quality of a developer's working life as shaped by their tools, codebase, and processes. The term borrows from user experience: developers are the users of compilers, build systems, libraries, and internal platforms, and those things can be designed well or badly for them; see [[Usability Testing]].

A useful way to look at it is by loop. The **inner loop** is what one developer does alone, many times an hour: edit code, build, run, test, look at the result. The **outer loop** is what happens after, such as code review, continuous integration, deployment, and monitoring. Inner-loop delays are paid constantly, so small ones add up. A rebuild that takes ten seconds instead of one changes how people work, because they stop trying small experiments; see [[Hot Module Replacement]] and [[Build Cache]].

A 2023 paper by Abi Noda, Margaret-Anne Storey, Nicole Forsgren, and Michaela Greiler grouped the factors into three:

- **Feedback loops.** How quickly a developer learns whether a change works, from the compiler, the tests, a reviewer, or production. Slow or unreliable feedback, such as a [[Flaky Test]], teaches people to ignore it.
- **Cognitive load.** How much a developer must keep in mind to make a change safely, including undocumented conventions, inconsistent tools, and unclear ownership; see [[Cognitive Load]].
- **Flow state.** How often they get long, uninterrupted stretches of focused work. Meetings scattered through a day and constant notifications cost more than their minutes, since attention takes time to return; see [[Flow]] and [[Attention Residue]].

Measuring it is contested. Counting commits, lines, or closed tickets is easy and misleading, since people optimize what is counted; see [[Goodhart's Law]]. The **SPACE framework** (2021) argued that productivity has several dimensions, satisfaction, performance, activity, communication, and efficiency, and that any single metric distorts. Most teams combine system data, such as build times and the [[DORA Metrics]], with regular surveys asking developers where they lose time.

Much of the work is unglamorous: faster builds, a clear [[Error Message]], one command to set up a working environment, docs that match the code, and deleting steps nobody needs. Larger organizations give it to a dedicated team that builds an internal platform with well-supported defaults; see [[Platform Engineering]]. An [[Ephemeral Environment]] per change and automatic formatting remove whole categories of friction; see [[Code Formatter]].

DX also points outward. Companies that sell APIs and libraries compete on how quickly a new developer gets a first call working, and they test their documentation and sign-up the way consumer products test theirs. Time to first successful request is a common measure.

## See also
- [[Toil]]
- [[Spotify Model]]
