---
aliases:
  - Pugh matrix
  - Weighted scoring
  - Multi-criteria decision analysis
tags:
  - method
summary: A table that scores several options against several weighted criteria, useful for making a group's reasoning visible and prone to weights tuned until the favorite wins.
---
A **decision matrix** is a table for comparing options against several criteria at once. Options run down one side, criteria across the top, and each cell holds a score for how well an option meets a criterion. In the common **weighted scoring** version, each criterion also gets a weight reflecting its importance, each score is multiplied by its weight, and the products are summed into a total for each option.

The idea is old. In a 1772 letter, Benjamin Franklin described a "moral or prudential algebra": list the reasons for and against a choice in two columns over several days, then strike out items of equal weight on opposite sides until one column remains. In the 1980s the engineering design researcher Stuart Pugh popularized a version for comparing design concepts. In a **Pugh matrix**, one design is chosen as the baseline and every alternative is scored only as better, worse or the same on each criterion, a deliberately coarse scale meant to provoke discussion rather than false precision. The wider academic field, **multi-criteria decision analysis**, includes more formal methods for eliciting weights and handling trade-offs.

The main benefit is making reasoning visible. Writing down criteria and weights forces a group to agree on what matters before arguing about which option wins, and it exposes when one person's favorite scores well only because of a criterion nobody else values. It gives structure to the trade-offs that [[Cost-Benefit Analysis]] tries to express in money, and to the reminder that choosing one option gives up the others; see [[Opportunity Cost]].

The weaknesses are just as real. The output is only as good as the weights, and weights are often reverse-engineered, adjusted until the preferred option wins. Adding many criteria dilutes each one, so a dealbreaker can be outscored by a pile of minor advantages. Must-have requirements are better handled as filters before any scoring, as in [[MoSCoW]] prioritization. A linear sum assumes criteria trade off evenly, but some features only matter up to a point and others delight beyond expectation; see [[Kano Model]]. When several people's rankings are combined, no method of aggregation can satisfy every reasonable fairness condition at once; see [[Arrow's Impossibility Theorem]]. Scoring uncertain outcomes as if they were known also ignores risk; see [[Expected Value]].

Too many options and criteria create their own problems. Each added row slows the choice, and an elaborate matrix can become a way to postpone deciding; see [[Hick's Law]], [[Choice overload]] and [[Analysis paralysis]]. Often the most useful result is the moment someone looks at the winning total and feels it's wrong, which reveals a criterion that was missing from the table. A good enough option found quickly is frequently the better outcome; see [[Satisficing]].

## See also
- [[Scenario Planning]]
- [[Devil's Advocate]]
