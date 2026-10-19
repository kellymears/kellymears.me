---
aliases:
  - Bullet chart
tags:
  - design
summary: A compact bar chart designed to replace dashboard gauges, showing one measure against a target and shaded ranges of poor to good performance in a single thin strip.
---
A **bullet graph** is a compact chart that shows a single measure against a target and a set of qualitative ranges, in a strip small enough to stack many on one screen. It was designed in the mid-2000s by Stephen Few, a consultant and author on data visualization, as a replacement for the gauges and meters that filled business dashboards; see [[Dashboard]].

Few objected to gauges. Dials modeled on car speedometers take up a lot of space for one number, are hard to compare side by side, and encourage decoration such as chrome bezels and glossy reflections that carry no information; see [[Skeuomorphism]] and [[Data-Ink Ratio]]. The bullet graph keeps what a gauge communicates, a value, a target, and whether the value is good or bad, while discarding the rest.

It has three parts. A dark bar shows the actual value, such as revenue to date. A short line perpendicular to the bar marks the target. Behind the bar, two to five bands of gray, from dark to light, mark qualitative ranges such as poor, satisfactory, and good. A reader sees at a glance whether the bar has crossed the target and which band it sits in; see [[Preattentive Processing]].

The design follows research on how accurately people read charts. Judging position or length along a common scale is far more precise than judging angles or areas, which is why a straight bar outperforms a dial's needle and a pie's slices; see [[Bar Chart]] and [[Pie Chart]]. Using shades of one gray for the bands keeps them readable for people with color vision deficiencies and when printed in black and white, and saves color for highlighting problems; see [[Color Vision Deficiency]].

Bullet graphs work well in groups. A column of them, one per metric, aligned on their own scales, lets a manager scan a dozen measures quickly, a variation on repeating a small chart for comparison; see [[Small Multiples]]. A tiny trend line beside each graph can add history, which the bullet graph alone doesn't show; see [[Line Chart]].

There are limits. The qualitative ranges must be chosen by someone, and the chart presents them as objective facts. Metrics on dashboards tend to become targets, and people learn to move the bar rather than the underlying reality; see [[Goodhart's Law]]. A bullet graph also says nothing about why a value is where it is.

The chart has been adopted by many visualization libraries and business intelligence tools, though gauges remain popular because they look familiar and impressive in demonstrations. It's a small example of a broader principle: the clearest chart is often the plainest one; see [[Data Visualization]] and [[Visual Hierarchy]].

## See also
- [[Progress Indicator]]
- [[Heat Map]]
