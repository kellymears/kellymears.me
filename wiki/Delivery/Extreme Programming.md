---
aliases:
  - Planning game
  - Collective code ownership
  - Sustainable pace
tags:
  - delivery
summary: Kent Beck's late-1990s method that took good programming practices to their extreme, such as reviewing code continuously by pairing and testing continuously by writing tests first, and seeded much of agile development.
---
**Extreme Programming** (XP) is a software development method created by Kent Beck in the late 1990s, worked out on a payroll project at Chrysler and described in his 1999 book *Extreme Programming Explained*. Its premise was in the name: take practices that are known to be good and turn them up as far as they go.

- If code review is good, review code all the time, by having two people write it together; see [[Pair Programming]].
- If testing is good, test all the time, by writing an automated test before each piece of code; see [[Test-Driven Development]].
- If integration is good, integrate many times a day; see [[Continuous Integration]].
- If design is good, improve the design every day, in small steps; see [[Refactoring]].
- If short feedback is good, release in iterations of a week or two.

Around those core practices sat others. **Simple design** meant building only what the current stories needed, summed up as "you aren't gonna need it"; see [[YAGNI]]. **Collective code ownership** let any pair change any part of the code, in contrast to modules owned by individuals; see [[Code Owners]]. An **on-site customer** sat with the team to answer questions and decide priorities. The **planning game** had customers write features as short stories and choose which to build next, while programmers estimated them; see [[User Story]] and [[Story Points]]. **Sustainable pace**, originally the 40-hour week, held that tired programmers make mistakes and overtime should not become routine; see [[Burnout]].

The practices reinforce each other. Constant refactoring is safe only because the tests catch breakage; collective ownership works only because pairing spreads knowledge and integration happens continuously. Teams that adopt only some practices often lose the benefit, since a single practice taken alone can be costlier than doing nothing.

Beck named four values: communication, simplicity, feedback, and courage, with respect added in the 2004 second edition. Feedback is the central one. Each practice shortens a loop, from seconds in test-driven development to minutes in pairing, hours in integration, and weeks in releases; see [[Feedback Loop]].

XP was one of the methods whose authors met in 2001 to write the Agile Manifesto, and Beck was a signatory; see [[Agile Software Development]]. Over the next decade Scrum overtook it as the dominant named method, largely because Scrum prescribes how to organize work without prescribing how to write code, which made it easier to adopt in large organizations. Its engineering practices outlived the brand. Automated tests, continuous integration, pairing, and refactoring became ordinary professional practice, often without people knowing they came from XP; see [[Trunk-Based Development]].

The Chrysler project itself was canceled in 2000, a fact critics raised for years.

## See also
- [[Daily Standup]]
- [[Product Backlog]]
- [[Big Design Up Front]]
