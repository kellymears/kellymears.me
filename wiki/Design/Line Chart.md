---
aliases:
  - Line graph
  - Area chart
  - Slope graph
tags:
  - design
summary: A chart that joins data points with lines to show change across a continuous dimension, usually time, invented by William Playfair in 1786 and still the clearest way to show a trend.
---
**A line chart** plots values as points and joins them with lines, usually with time running left to right. The line says that the values in between exist and change smoothly, which is why the form suits measurements taken over time and misleads when the categories are separate things.

The Scottish engineer and economist William Playfair published the first widely recognized line charts in 1786, in a book showing England's trade balance with other countries over decades. The same book introduced the [[Bar Chart]], and the [[Pie Chart]] followed in 1801. Playfair argued that a picture of a trend could be grasped at a glance in a way a table of numbers couldn't; see [[Data Visualization]].

A line chart's strength is slope. The eye reads rising, falling, steepening, and flattening without any calculation; see [[Preattentive Processing]]. Several design choices change what the slope says:

- **The vertical axis.** A bar's length encodes its value, so bars need a zero baseline. A line chart encodes change, so starting the axis near the data is usually fine, though a narrow range can make noise look like a trend.
- **The aspect ratio.** The statistician William Cleveland found people judge slopes best when the important segments sit near 45 degrees. Stretch the chart wide and every change looks flat; squeeze it and every change looks dramatic.
- **The scale.** Anything that grows by a percentage, such as a population or an epidemic, looks like a wall on a linear axis and a straight line on a [[Logarithmic Scale]].
- **Smoothing.** Averaging over a window reveals the trend but hides spikes that may be the story; see [[Outlier]].

Too many lines on one chart become what designers call a spaghetti chart. The usual fixes are to highlight one or two series and gray the rest, label lines directly at their ends instead of using a legend, or split the series into a grid of small charts with shared axes; see [[Small Multiples]].

Dual-axis charts, with a different scale on each side, are a common way to mislead. Either axis can be stretched until any two lines appear to move together; see [[Correlation and Causation]].

Variants include the **area chart**, which fills under the line to stress volume, and the stacked area chart, where only the bottom layer has a flat baseline, so the upper layers are hard to read. A **slope graph** shows just two time points per item, making changes in rank easy to see.

Removing gridlines, borders, and markers that carry no information usually helps; see [[Data-Ink Ratio]]. Points connected by straight segments are themselves an interpolation, so a sparse series can look more certain than it is; see [[Linear Interpolation]].

## See also
- [[Scatter Plot]]
- [[Data Journalism]]
- [[Spreadsheet]]
- [[Control Chart]]
