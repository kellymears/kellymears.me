---
aliases:
  - Bikeshedding
  - Parkinson's law of triviality
tags:
  - method
summary: The time spent debating an item is inversely proportional to its actual stakes.
---
**The law of triviality** is C. Northcote Parkinson's observation that an organisation spends time on an agenda item in inverse proportion to how much the item actually matters. His illustration is a committee approving a nuclear power plant in minutes, because almost nobody present understands reactor design well enough to have a confident opinion, followed by a long argument over the bicycle shed for the plant's staff, because everyone has ridden a bike and painted a fence and therefore has a view.

The mechanism is accessibility, not malice: a topic invites debate in proportion to how many people feel qualified to hold an opinion about it, and qualification tracks familiarity far more than it tracks consequence. A database schema change gets a rubber stamp; the naming of a boolean flag gets a week, because [[Naming]] is a topic everyone in the room owns and the schema, correctly or not, is assumed to belong to whoever proposed it. This is one reason [[Anchoring Effect]] hits trivial decisions particularly hard — the first opinion voiced in an accessible debate anchors all the ones that follow, since there is no external evidence to override it.

The practical counter is to decide the trivial matters by default rather than by discussion — a house style, a linter, a documented convention picked once and left alone — and to spend deliberate discussion time only where the cost of being wrong is actually high. A [[Code Review]] that flags every naming preference with the same weight as a data-loss bug has not skipped this lesson; it has simply moved the bikeshed into the [[Pull Request]].

## See also
- [[Continuous Integration]]
- [[Code Comment]]
- [[Semantic Versioning]]
- [[Fail Fast]]
