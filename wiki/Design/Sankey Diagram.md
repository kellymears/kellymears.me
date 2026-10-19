---
aliases:
  - Alluvial diagram
  - Flow diagram
  - Minard's map
tags:
  - design
summary: A chart of quantities flowing between stages, drawn as bands whose width is proportional to the amount, from a steam engine's energy losses and Napoleon's shrinking army to budgets and user funnels.
---
A **Sankey diagram** shows quantities moving from one set of categories to another as bands whose width is proportional to the amount. Where a band splits, its parts add up to the whole, so the eye can follow where things went.

It is named for Matthew Henry Phineas Riall Sankey, an Irish engineer who in 1898 drew the energy flowing through a steam engine, with wide arrows peeling off for the heat that never became work; see [[Heat Engine]] and [[Conservation of Energy]]. Energy accounts are still the classic use. Lawrence Livermore National Laboratory publishes a yearly chart of the US energy supply, and its widest outflow is the band labeled "rejected energy," the share lost as waste heat.

The most famous flow chart is older. Charles Joseph Minard's 1869 map of Napoleon's invasion of Russia draws the army as a band laid over the route, beginning about 422,000 strong at the Niemen River and narrowing to about 10,000 on the retreat, with a temperature line underneath showing the cold that killed many of them. Edward Tufte called it possibly the best statistical graphic ever drawn, because it plots size, place, direction, time, and temperature at once; see [[Data Visualization]] and [[Data-Ink Ratio]].

Common uses:

- **Budgets**: where revenue comes from and where it goes.
- **Funnels and journeys**: how visitors move through a site and where they leave; see [[Information Scent]].
- **Elections**: how voters shifted between parties from one election to the next.
- **Processes**: material and time through a production line; see [[Value Stream Mapping]].

An **alluvial diagram**, introduced by Martin Rosvall and Carl Bergstrom in 2010, uses the same bands to show how groups regroup over time, such as research fields merging and splitting.

Design considerations:

- **Conservation.** Inputs should equal outputs at each node. Losses need their own visible band rather than vanishing, or the diagram lies about the total.
- **Ordering.** Crossed bands are the main source of clutter. Minimizing crossings is a hard optimization problem, so tools use heuristics and benefit from hand adjustment.
- **Color.** Coloring bands by source or by destination answers different questions; see [[Color Scale]].
- **Width perception.** Readers judge band widths less accurately than lengths along a shared axis, and curved sections look thinner than they are, so label the important values; see [[Preattentive Processing]].
- **Scale.** Past a dozen or so nodes per column, the chart turns into spaghetti. Grouping small flows into "other" or splitting into [[Small Multiples]] helps.

Related forms divide a whole differently. A [[Treemap]] shows a hierarchy of parts at one moment, and a [[Pie Chart]] shows a single split. Network algorithms that compute how much can move through a system produce exactly the numbers a Sankey diagram draws; see [[Maximum Flow]].

## See also
- [[Transit Map]]
- [[Flowchart]]
- [[Timeline]]
