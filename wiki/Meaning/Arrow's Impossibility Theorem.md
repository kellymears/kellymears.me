---
aliases:
  - Arrow's theorem
  - Social choice theory
  - Condorcet paradox
tags:
  - meaning
summary: Kenneth Arrow's 1951 proof that no ranked voting system with three or more options can satisfy a short list of fairness conditions at once, the founding result of social choice theory.
---
**Arrow's impossibility theorem** shows that no method of combining people's ranked preferences into a group ranking can meet a handful of reasonable-sounding conditions at the same time, once there are three or more options. The economist Kenneth Arrow proved it in a 1951 book, Social Choice and Individual Values. It founded the modern field of social choice theory, and was among the work cited when Arrow shared the Nobel Memorial Prize in Economic Sciences in 1972.

The conditions, in plain terms:

- **Unrestricted domain.** The method works for any combination of individual rankings.
- **Unanimity.** If everyone prefers A to B, so does the group.
- **Independence of irrelevant alternatives.** The group's choice between A and B depends only on how people rank A against B, not on how they rank some third option C.
- **No dictator.** No single voter's ranking always decides the outcome.

Every ranked voting system breaks at least one. In practice, the condition usually given up is independence: adding or removing a candidate can flip the result between two others, which is the spoiler problem familiar from elections; see [[Duverger's Law]] and [[Ranked-Choice Voting]].

The theorem generalizes a much older puzzle. In 1785, the French philosopher and mathematician the Marquis de Condorcet noticed that majority preferences can go in a circle. If one third of voters rank A over B over C, one third rank B over C over A, and one third rank C over A over B, then majorities prefer A to B, B to C, and C to A. Each individual is consistent, but the group isn't. Whoever controls the order in which options are voted on can then decide the outcome.

Related results followed. In the 1970s, Allan Gibbard and Mark Satterthwaite showed that every reasonable voting rule with three or more options sometimes rewards voters for misreporting their preferences; see [[Game theory]].

The theorem has escape routes, each with costs:

- **Restricting preferences.** If every voter's preferences can be placed along a single left-to-right line, majority rule doesn't cycle and picks the option favored by the median voter; see [[Median Voter Theorem]].
- **Rating instead of ranking.** Systems where voters score or approve candidates fall outside Arrow's framework, though they face their own trade-offs.
- **Accepting imperfection.** Every real system makes some trade, and choosing one is a judgment about which failures matter most.

Arrow's result belongs to a family of impossibility theorems that show some combinations of goals can't be met at once; see [[Gödel's Incompleteness Theorems]] and [[CAP Theorem]]. It also complicates the idea that a group has a single will waiting to be discovered. Aggregation can produce outcomes that no individual chose; see [[Collective Action]] and [[Simpson's Paradox]].

## See also
- [[Sortition]]
- [[Wisdom of the Crowd]]
- [[Schelling Point]]
