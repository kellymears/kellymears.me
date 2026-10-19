---
aliases:
  - Spider chart
  - Star plot
  - Kiviat diagram
tags:
  - design
summary: A chart with one axis per variable radiating from a center, the values joined into a polygon, popular for character stats and skill profiles and widely criticized because the shape depends on the order of the axes.
---
**A radar chart** places several variables on axes that radiate from a central point like spokes, marks each value along its spoke, and joins the marks into a polygon. It's also called a spider chart, star plot, or, in computer performance work, a Kiviat diagram. The German statistician Georg von Mayr is often credited with an early version in 1877.

The form is familiar from video games, where a character or a sports player's speed, strength, and skill appear as a spiky shape; see [[Skill Tree]]. It also shows up in product comparisons, athlete scouting, personality profiles, and team skills assessments. Its appeal is that one shape seems to summarize a whole profile at once, and two overlapping shapes seem to show at a glance where one candidate beats another; see [[Gestalt Principles]].

The trouble is that the shape is an artifact of choices that have nothing to do with the data:

- **Axis order.** The same values arranged in a different order around the circle make a different polygon. Putting two high values next to each other creates a large bulge; separating them makes two thin spikes.
- **Area.** People read the filled area as the total, but area grows with the square of the values and depends on which values sit next to each other. A profile that doubles on every axis covers four times the area; see [[Weber-Fechner Law]].
- **Scales.** Each spoke may measure a different unit, so the designer has to choose how to scale each one, and those choices decide which variable looks large.
- **Angles.** Comparing lengths along spokes pointing in different directions is harder than comparing lengths along a shared baseline, which is what a [[Bar Chart]] provides; see [[Preattentive Processing]].
- **Overlap.** More than two or three overlaid polygons turn into a tangle.

Critics of chart design have generally recommended alternatives. A grouped bar chart or a dot plot compares values exactly. Several small radar charts side by side avoid the overlap; see [[Small Multiples]]. For many items with many variables, parallel coordinates, a chart that lays the axes out side by side and draws each item as a line across them, scales better.

Radar charts work best when the variables are on the same scale, have a natural circular order, such as months or compass directions, and the goal is to recognize a characteristic shape rather than to read values. A wind rose, showing how often wind blows from each direction, is a good fit. Florence Nightingale's famous 1858 diagram of army deaths by month is a related form, with wedges whose area grows with the count; see [[Pie Chart]].

Coloring the filled areas strongly makes the overlap problem worse; see [[Color Contrast]] and [[Data-Ink Ratio]].

## See also
- [[Big Five Personality Traits]]
- [[Treemap]]
- [[Halo Effect]]
- [[Bullet Graph]]
