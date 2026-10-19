---
aliases:
  - Tornado diagram
  - Robustness check
  - One-at-a-time analysis
tags:
  - method
summary: Testing how much a model's conclusion changes when its uncertain inputs and assumptions are varied, which shows which numbers actually matter and whether a result depends on choices that could reasonably have gone the other way.
---
**Sensitivity analysis** asks how much a result changes when its inputs change. Any model, from a spreadsheet forecast to a climate simulation, rests on numbers that are uncertain and assumptions that could have been made differently. Varying them systematically shows which ones drive the answer and whether the conclusion survives reasonable alternatives.

The simplest version changes one input at a time while holding the others fixed. A business case might assume a growth rate, a price, and a cost of capital. Moving each to the low and high ends of its plausible range, and recording the effect, ranks them by importance. The results are often drawn as a **tornado diagram**, with a horizontal bar for each input sorted from widest to narrowest, so the chart tapers like a funnel cloud. Usually a few inputs dominate, which tells the analyst where better information is worth paying for; see [[Pareto Principle]].

One-at-a-time methods miss interactions, where two inputs matter mostly in combination. **Global** methods vary all inputs at once, often by drawing thousands of random combinations from their ranges and running the model each time; see [[Monte Carlo Method]]. Statistical techniques then split the variation in the output among the inputs. Engineers use the same approach to find which tolerances in a design matter most; see [[Margin of Safety]]. In a model with a mathematical form, the sensitivity of an output to an input is its derivative, the same quantity that gradient-based optimization computes; see [[Gradient Descent]].

In empirical research the equivalent is the **robustness check**. A finding should hold under reasonable alternative choices: different control variables, different treatment of outliers, different definitions of the outcome; see [[Outlier]] and [[Operationalization]]. Because analysts have so many such choices, a result that appears under only one combination may be an artifact; see [[Multiple Comparisons Problem]]. Specification-curve and multiverse analyses, developed in the 2010s, run every defensible combination and report the whole distribution of results; see [[Pre-registration]].

A classic case concerns confounding. In 1959 Jerome Cornfield and colleagues showed that a hidden factor would have to be implausibly strongly associated with smoking to explain away its link with lung cancer, a sensitivity argument that helped settle the debate; see [[Confounding]] and [[Bradford Hill Criteria]].

Sensitivity analysis can't fix a model with the wrong structure. Varying inputs within a framework tests only that framework, and an omitted mechanism or a tail risk outside every range stays hidden; see [[Black Swan]] and [[Map and Territory]]. Ranges chosen too narrowly also make a result look sturdier than it is. Decisions with large uncertainties are often better served by comparing distinct futures than by small variations around one; see [[Scenario Planning]].

## See also
- [[Decision Matrix]]
- [[Causal Inference]]
