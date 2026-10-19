---
aliases:
  - Log scale
  - Log-log plot
  - Semi-log plot
  - Order of magnitude
tags:
  - design
summary: A scale on which equal distances mean equal ratios rather than equal differences, used for sound, acidity, and earthquakes and on charts of growth, and often misread by audiences who expect a linear axis.
---
On a **logarithmic scale**, equal distances stand for equal ratios rather than equal differences. Going from 1 to 10 takes the same space as going from 10 to 100 or from 100 to 1,000. Each step of that size is an **order of magnitude**.

Many everyday measures are logarithmic because what they describe spans enormous ranges:

- **Sound**: every 10 decibels is a tenfold increase in intensity; see [[Decibel]].
- **Acidity**: each pH unit is a tenfold change in hydrogen ion concentration; see [[pH]].
- **Earthquakes**: each whole step of magnitude releases about 32 times more energy.
- **Music**: each octave doubles the frequency.

Perception is roughly logarithmic too. A second candle in a dark room is obvious, while the same candle added to a hundred goes unnoticed. People without schooling in arithmetic, such as the Mundurucú of the Amazon in a 2008 study, place numbers on a line logarithmically, with small numbers spread out and large ones crowded together, and young children do the same.

On charts, the log scale has two main uses:

- **Semi-log plots** use a log scale on one axis. Steady percentage growth becomes a straight line, and the slope shows the growth rate, which made them standard for epidemic curves in 2020 and for plotting the doubling of transistor counts; see [[Moore's Law]].
- **Log-log plots** use log scales on both axes. A power law becomes a straight line, as in word frequencies and city sizes; see [[Zipf's Law]] and [[Pareto Principle]]. A straight line on a log-log plot is weak evidence on its own; other distributions can look nearly straight over a limited range.

Log axes also make room for data spanning very different magnitudes, such as algorithm running times or benchmark results; see [[Big-O Notation]] and [[Scatter Plot]].

The costs:

- **Misreading.** Studies during the COVID-19 pandemic found that readers understood the same chart less accurately on a log scale than on a linear one. Label the axis plainly and mark ticks at round values like 1, 10, 100.
- **No zero.** A log axis cannot show zero or negative values, so data containing them needs another treatment.
- **Bars mislead.** A bar's length implies a quantity measured from zero, which a log axis doesn't have, so log-scaled bar charts exaggerate small values; see [[Data-Ink Ratio]].

The same idea runs through design and computing. Typographic scales step font sizes by a constant ratio, so they are evenly spaced on a log scale; see [[Typographic Scale]]. Floating-point numbers keep constant relative precision across magnitudes; see [[Floating-Point Arithmetic]]. Leading digits of real-world data are spread evenly on a log scale; see [[Benford's Law]]. Rough estimation works in orders of magnitude; see [[Fermi Estimation]].

## See also
- [[Line Chart]]
- [[Histogram]]
- [[Timeline]]
