---
aliases:
  - Dashboard design
  - Key performance indicator
  - KPI
tags:
  - design
summary: A single screen of the measures someone needs to watch, meant to be read at a glance, which works when each number has context and fails when it collects every available chart or rewards gaming the metrics.
---
A **dashboard** is a single screen that collects the measures someone needs to monitor, arranged to be read at a glance. The data designer Stephen Few's definition stresses three things: the most important information, a single screen, and monitoring rather than analysis. The name comes from the board on the front of a horse-drawn carriage that kept mud dashed up by the hooves off the driver, later the panel of gauges in a car.

Dashboards come in roughly three kinds:

- **Operational** dashboards track live activity, such as server health, call queues, or orders per minute, and need to flag trouble fast; see [[Observability]].
- **Analytical** dashboards support investigation, with filters and drill-downs.
- **Strategic** dashboards show a few **key performance indicators**, or KPIs, to leaders, updated daily or weekly.

Design principles:

- **Context for every number.** A figure alone means little. Show it against a target, the previous period, or a normal range, and show the recent trend, often with a small word-sized line chart called a [[Sparkline]].
- **Hierarchy.** The most important measures go top left, where the eye starts, and largest; see [[Visual Hierarchy]].
- **Restraint.** Gauges, dials, and 3D effects take space without adding information; plain numbers and simple bars do better; see [[Data-Ink Ratio]].
- **Color for exceptions.** If everything is colored, nothing stands out. Keep the screen gray and reserve strong color for values that need attention; see [[Preattentive Processing]].
- **Load.** Every added chart competes for limited attention, and a screen of thirty charts answers no question well; see [[Cognitive Load]].
- **First run.** A new dashboard with no data should explain what will appear rather than show empty axes; see [[Empty State]].

Dashboards that people stare at wear out. Watching a screen for rare events is a task at which attention reliably fades, which is why operational monitoring relies on alerts tied to targets rather than on someone noticing a red tile; see [[Vigilance Decrement]] and [[Service Level Objective]]. Wall-mounted screens work better as ambient signals, read in passing; see [[Ambient display]].

The deeper risks are in the metrics. What is displayed gets managed, and a number used as a target invites gaming; see [[Goodhart's Law]]. Vanity metrics, such as total signups, climb no matter what, and reassure without informing. A project can also show green on every indicator while failing in ways no indicator measures, sometimes called a watermelon report: green outside, red inside. A useful test for any tile: if nobody would act differently when the number changed, it doesn't belong on the screen.

Engineering teams often track delivery measures this way; see [[DORA Metrics]].

Patterns across many items fit well in a [[Heat Map]] panel.

## See also
- [[McNamara Fallacy]]
- [[Sankey Diagram]]
