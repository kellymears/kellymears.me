---
aliases:
  - Statistical process control
  - Shewhart chart
  - Common cause variation
tags:
  - method
summary: A time-series chart with limits showing a process's normal variation, invented by Walter Shewhart at Bell Labs in 1924, which separates routine noise from real signals and warns that reacting to noise makes things worse.
---
**A control chart** plots a measurement over time, such as the diameter of machined parts, the time to fix bugs, or daily hospital infections, along with a center line at the average and two control limits, usually three standard deviations above and below it. Points that stay within the limits and show no pattern suggest the process is stable. Points outside them, or suspicious patterns inside them, suggest something has changed.

Walter Shewhart, a physicist at Bell Telephone Laboratories, invented the chart in a memo in 1924. The telephone system needed huge numbers of reliable parts, and inspecting every one was impractical. Shewhart's insight was to divide variation into two kinds:

- **Common cause variation** is the routine noise built into a process: small differences in materials, temperature, and people. It's always present, and it's a property of the system.
- **Special cause variation** comes from something specific and new: a worn tool, a bad batch of material, a changed procedure. It can be found and fixed.

The chart's job is to tell them apart. Treating every point as meaningful is a classic mistake, and W. Edwards Deming, who spread Shewhart's methods, called it tampering. Adjusting a machine after every slightly off part adds variation instead of removing it. A manager who praises the best month and scolds the worst is reacting to noise, and the next month will tend to look different regardless; see [[Regression to the Mean]].

Signals worth investigating include:

- a point outside the control limits;
- several points in a row on one side of the center line;
- a steady run of points rising or falling.

Engineers at Western Electric codified such rules in a 1956 handbook. Each added rule catches more real shifts but also raises false alarms, a trade-off familiar from any detector; see [[Anomaly Detection]] and [[Alarm fatigue]].

Control limits come from the process's own data, not from targets. A process can be stable and still fail to meet a specification, which means the system itself has to change; see [[Root Cause Analysis]]. Conversely, setting a target without changing the system invites people to hit the number by other means; see [[Goodhart's Law]].

The chart became central to the quality movement in manufacturing and later in health care. Software teams use it for cycle times and deployment metrics, where it shows whether a change to the workflow actually helped; see [[Kanban]] and [[Service Level Objective]]. It also fits the check step of the improvement cycle; see [[PDCA Cycle]].

Its basic form is a [[Line Chart]] with limits drawn from the [[Normal Distribution]], though the method works reasonably well even when data isn't normally distributed.

## See also
- [[Outlier]]
- [[Observability]]
- [[Precision and Accuracy]]
