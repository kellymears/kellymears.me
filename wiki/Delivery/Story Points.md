---
aliases:
  - Planning poker
  - Velocity
tags:
  - delivery
summary: Agile teams' unit for estimating work by relative size instead of hours, often chosen in rounds of planning poker and summed into a velocity for forecasting, and widely criticized once those numbers become targets.
---
**Story points** are a unit agile teams use to estimate the size of a piece of work relative to other pieces, rather than in hours or days. A team might call a simple change a 1, something twice as large a 2, and a big uncertain feature an 8. The scale usually follows a sequence such as 1, 2, 3, 5, 8, 13, where the widening gaps reflect how uncertainty grows with size; see [[Agile Software Development]].

The reasoning is that people are poor at estimating absolute durations but better at comparing tasks. Estimating in hours invites the [[Planning Fallacy]], in which people imagine the best case and forget interruptions, reviews, and surprises; see [[Hofstadter's Law]]. Relative points sidestep this: whatever a team's actual speed, its record of points finished per iteration, called **velocity**, converts sizes into forecasts.

The practice came out of Extreme Programming in the late 1990s, where teams estimated in "ideal days" and later abstracted the unit to points. Ron Jeffries, often credited with inventing them, has since said he regrets it, given how they came to be used.

**Planning poker**, described by James Grenning in 2002 and popularized by Mike Cohn, is a common way to assign points. Each team member picks a card privately, then everyone reveals at once. Revealing together prevents the first number spoken from pulling everyone toward it; see [[Anchoring Effect]]. When estimates differ widely, the highest and lowest explain their reasoning, which often uncovers misunderstandings about the work itself. Many teams consider that conversation more valuable than the number.

The most common problem is turning points into a measure of productivity. Once managers compare velocity between teams or push for it to rise, teams inflate their estimates, and the numbers stop meaning anything; see [[Goodhart's Law]]. Points also can't be compared across teams, since each team's scale is its own. Converting them back into hours, as many organizations eventually do, reintroduces the problems they were meant to avoid.

Critics in the **#NoEstimates** movement argue the effort isn't worth it. Splitting work into small, similar-sized items and simply counting them predicts delivery about as well. Forecasts can be built from historical throughput, often by simulating many possible futures; see [[Monte Carlo Method]] and [[Kanban]]. The relationship between work in progress, throughput, and how long each item takes is described by [[Queueing Theory]].

Estimates also shape the work. Tasks expand to fit the time allowed; see [[Parkinson's Law]]. Adding people to a late project changes the arithmetic in ways velocity doesn't capture; see [[Brooks's Law]]. Measures of delivery that look at outcomes, such as how often a team deploys and how quickly it recovers, avoid estimation entirely; see [[DORA Metrics]].

## See also
- [[McNamara Fallacy]]
- [[Burndown Chart]]
- [[Issue Tracker]]
- [[Definition of Done]]
