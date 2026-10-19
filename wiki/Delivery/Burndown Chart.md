---
aliases:
  - Burnup chart
  - Cumulative flow diagram
tags:
  - delivery
summary: A chart of work remaining against time, used by agile teams to see at a glance whether a sprint or release is on track, and easily distorted once it becomes a target rather than a picture.
---
**A burndown chart** plots how much work remains against time. The vertical axis shows the remaining work, measured in tasks, hours, or story points, and the horizontal axis shows days in a sprint or weeks in a release. A straight diagonal line from the starting total down to zero shows ideal progress. The actual line, updated daily, shows whether the team is ahead of it or falling behind.

Burndown charts spread with Scrum and other agile methods in the 2000s; see [[Agile Software Development]]. They're usually displayed on a wall or a team dashboard, so everyone sees the same picture without needing a status meeting; see [[Dashboard]]. Teams often review them at the daily standup; see [[Daily Standup]].

The shape of the line tells a story:

- **Steady decline** close to the ideal suggests work is well understood and well sized.
- **A flat line, then a cliff** at the end means work is being finished, or declared finished, in a rush. Tasks may sit mostly done for days; see [[Ninety-Ninety Rule]] and [[Definition of Done]].
- **A line that rises** means work was added mid-sprint, or estimates grew as the team learned more.
- **Finishing early** may mean estimates were padded, as work expands or contracts to fill the time allowed; see [[Parkinson's Law]].

A **burnup chart** separates two things a burndown blends together. It draws one line for completed work and another for total scope. When a burndown flattens, a burnup shows whether the team slowed down or the scope grew, a distinction that matters in conversations with stakeholders.

Kanban teams, who don't work in fixed sprints, use a **cumulative flow diagram** instead. It stacks the number of items in each stage of the workflow over time, so widening bands reveal where work piles up; see [[Kanban]].

The charts are easy to misuse. Once the burndown becomes a target, teams learn to make the line look good: splitting tickets, closing them prematurely, or inflating estimates; see [[Goodhart's Law]] and [[Story Points]]. Managers comparing burndowns across teams make it worse, since units and estimating habits differ.

Remaining work is also an estimate, and estimates of remaining work are notoriously optimistic; see [[Planning Fallacy]] and [[Hofstadter's Law]]. A line on track until the last two days often reflects unknowns no one had found yet.

Alternatives aim to show progress more honestly. Some teams prefer charts of completed items with ranges of likely finish dates rather than a single line. The Shape Up method uses hill charts, which show whether each piece of work is still being figured out or is in execution; see [[Shape Up]].

A burndown works best as a prompt for conversation, not a verdict. When the line diverges, the useful question is why.

## See also
- [[Gantt Chart]]
- [[Value Stream Mapping]]
