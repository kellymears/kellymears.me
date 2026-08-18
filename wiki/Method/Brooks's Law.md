---
aliases:
  - Adding Manpower to a Late Project Makes It Later
tags:
  - method
summary: Adding people to a late software project makes it later, because onboarding and coordination costs outpace the new capacity.
---
**Brooks's Law** states that adding manpower to a late software project makes it later. Fred Brooks stated it in *The Mythical Man-Month*, drawing on his own experience managing IBM's OS/360, and it's one of the few software-management claims that has held up as robustly as a law of physics rather than a rule of thumb people quietly abandon.

The mechanism is arithmetic, not pessimism. A new person doesn't add capacity the instant they join — they subtract it first, because someone already on the project has to stop and train them, and training time scales with how much undocumented context the project has accumulated, which is exactly the kind of context a late, pressured project has the most of and the least time to write down. Worse, work that used to require no coordination now requires it: Brooks modeled this as communication paths growing roughly with the square of team size, since every new pair of people is a new channel that needs to stay in sync, a new place for a misunderstanding to hide. A task that's genuinely partitionable — laying more bricks — scales with headcount fine; a task that's a single tangled dependency chain, which most late-stage software work is, doesn't partition no matter how many people you assign to it, and the ninth pregnant woman still can't produce a baby in one month.

The law is frequently misquoted as "more people always makes things slower," which overshoots — Brooks's actual claim is conditional on the project already being late and the work already underway, where the onboarding tax lands at the worst possible time. Adding people to a project at its outset, before deep undocumented context has piled up, doesn't carry the same cost.

The practical corollary is that a genuinely late project is rescued by removing scope or extending the deadline, not by throwing bodies at the calendar — and that the tell of a team about to learn this the hard way is treating headcount as a lever for schedule at all.

## See also
- [[Second-System Effect]]
- [[Hofstadter's Law]]
- [[Parkinson's Law]]
- [[Bus Factor]]

## Related
- [[Technical Debt]]
