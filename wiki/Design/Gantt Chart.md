---
aliases:
  - Gantt
  - Critical path
  - Critical path method
tags:
  - design
summary: A project schedule drawn as horizontal bars on a timeline, one per task, popularized by Henry Gantt in the 1910s, combined with dependency analysis in the 1950s, and still the standard picture of a plan, for better and worse.
---
**A Gantt chart** shows a project schedule as horizontal bars on a timeline. Each row is a task; each bar starts when the task starts and ends when it's due. Arrows between bars show dependencies, where one task can't begin until another finishes. It's a [[Bar Chart]] laid along a calendar.

The Polish engineer Karol Adamiecki drew a similar diagram in 1896 but published it mainly in Polish and Russian, so it was little known in the West. The American engineer Henry Gantt developed his version around 1910 to 1915 to track factory production, and it spread during the First World War for tracking munitions work. Large projects of the 1930s, including the Hoover Dam, used Gantt-style schedules.

In the late 1950s, two methods added analysis to the picture. The **critical path method**, developed at the chemical company DuPont, and PERT, developed for the U.S. Navy's Polaris missile program, both treat the project as a network of tasks and dependencies. Ordering the tasks so nothing starts before its prerequisites is a graph problem; see [[Topological Sort]]. The **critical path** is the longest chain of dependent tasks. It sets the earliest possible finish date, and any delay on it delays the whole project, while tasks off the path have slack. Focusing effort on the one chain that limits the whole is related to the [[Theory of Constraints]].

Gantt charts are good at showing what must happen in what order and which work can overlap. They're poor at showing uncertainty. Every bar looks equally solid, though the estimate behind it may be a guess:

- Plans assume tasks go as expected, and they rarely do; see [[Planning Fallacy]] and [[Hofstadter's Law]].
- Uncertainty grows with distance into the future, while the chart draws next week and next year with the same confidence; see [[Cone of Uncertainty]].
- Work tends to fill the bar it's given; see [[Parkinson's Law]].
- Adding people to a late task often makes it later; see [[Brooks's Law]].

A detailed chart can become a fiction maintained for reporting while the real work goes differently. Software teams largely moved away from them, associating them with sequential [[Waterfall]] planning. Iterative methods track flow instead, showing work in progress rather than a dated plan; see [[Kanban]]. Some teams fix the time budget and vary the scope instead of the reverse; see [[Shape Up]].

Gantt charts remain standard in construction, manufacturing, events, and anywhere physical dependencies are real: the concrete has to cure before the walls go up. Many project tools now generate them automatically from tasks and due dates in an [[Issue Tracker]].

## See also
- [[Value Stream Mapping]]
- [[Story Points]]
