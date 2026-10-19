---
aliases:
  - Bin width
  - Frequency distribution
  - Density plot
tags:
  - design
summary: The chart that shows how a single measurement is distributed by counting values into adjacent bins, revealing skew, gaps, and multiple peaks, with a shape that can change dramatically depending on how wide the bins are.
---
A **histogram** shows how the values of a single measurement are distributed. The range of values is divided into intervals, called bins, and a bar for each bin shows how many values fall in it. Unlike a bar chart, which compares separate categories, a histogram's bins lie on a continuous scale, so the bars touch and the overall shape is the message; see [[Bar Chart]].

The statistician Karl Pearson coined the name in the 1890s. The shape it reveals answers questions a single average can't:

- **Center and spread.** Where most values sit and how widely they scatter.
- **Skew.** Whether a long tail stretches to one side, as incomes and response times usually do; see [[Tail Latency]].
- **Multiple peaks.** Two humps usually mean two different populations mixed together, such as two kinds of customer or two code paths.
- **Gaps and spikes.** Spikes at round numbers suggest values typed in or estimated by hand; a cliff at a threshold suggests people gaming a cutoff; see [[Data Cleaning]].
- **Fit to a model.** Whether the data look like a bell curve or something else entirely; see [[Normal Distribution]].

Bin width is the main design decision, and it changes the picture. Too few bins blur real structure into a single lump; too many make noise look like structure, with each bar holding a handful of values. Rules of thumb exist, including Sturges's rule from 1926, which sets the number of bins from the number of values, and later rules that use the data's spread, but the honest practice is to try several widths and check the shape holds. Where bins start matters too: shifting them by half a width can move a peak.

When bins have unequal widths, the count must be shown as area, not height, or wide bins look inflated. Many tools instead draw a **density plot**, a smoothed curve that avoids bin edges, at the cost of hiding how few values may lie under a gentle bump.

For data spanning several orders of magnitude, such as file sizes or city populations, a logarithmic horizontal axis turns a squashed spike and a long empty tail into a readable shape; see [[Logarithmic Scale]] and [[Power law]].

Histograms appear well beyond statistics. Cameras show one of brightness values, so a photographer can see clipped shadows or highlights at a glance; see [[Image Sensor]]. Performance monitoring records latency in histogram buckets so percentiles can be computed without storing every request; see [[Observability]].

To compare distributions across many groups at once, histograms take too much room, and the compact summary is a box plot; see [[Box Plot]]. Viewing several side by side as aligned panels also works; see [[Small Multiples]].

## See also
- [[Law of Large Numbers]]
- [[Data Visualization]]
- [[Mean and Median]]
- [[Outlier]]
- [[Data Profiling]]
