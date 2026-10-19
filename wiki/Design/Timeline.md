---
aliases:
  - Chronology
tags:
  - design
summary: Laying events out along a line in order of time, a form that seems obvious but was invented in the eighteenth century and still forces hard choices about scale, density, and what counts as an event.
---
A **timeline** arranges events along a line in the order they happened, so distance on the page stands for elapsed time. It seems like the most natural way to show history, yet the familiar form is relatively recent.

Earlier chronologies were mostly tables: columns of dates and rulers, with kingdoms in parallel lists. The historians Daniel Rosenberg and Anthony Grafton, in a 2010 history of the form, trace the modern timeline to the eighteenth century. Joseph Priestley's Chart of Biography of 1765 drew the lives of about two thousand famous people as bars against a uniform scale of years. Its companion chart of 1769 showed the rise and fall of empires as bands across time. Priestley's insight was to make time a measurable axis rather than a sequence of entries, an idea later carried into charts of data over time; see [[Line Chart]] and [[Gantt Chart]].

The form forces several choices:

- **Scale.** A uniform scale is honest but uneven: recent decades are crowded and remote ages empty. Charts of deep history often switch to a logarithmic axis, which makes the past compress smoothly but hides how vast it is; see [[Logarithmic Scale]]. One popular device squeezes the age of the universe into a single calendar year, so that all of recorded history occupies the final seconds of December 31.
- **Points and spans.** Some events are instants and some are periods. Bars for spans and markers for points must be told apart.
- **Lanes.** Parallel tracks for places, people, or themes show what happened at the same time, at the cost of width; see [[Small Multiples]].
- **Selection.** Every timeline decides what counts as an event, which makes it an argument about what mattered.

Combining time with another dimension produces some of the best-known charts. Charles Joseph Minard's 1869 map of Napoleon's Russian campaign plotted the army's route, shrinking size, and the temperature on the retreat in one image; see [[Sankey Diagram]] and [[Infographic]].

In software, timelines are also interfaces. Video and animation editors arrange clips and keyframes along a time axis; see [[Keyframe Animation]]. Version history presents a project as a sequence of saved states; see [[Version Control]]. Social media made the reverse-chronological feed a default view of other people's lives, then largely replaced it with algorithmic ordering, which shows posts in an order chosen for engagement rather than by time; see [[Attention Economy]].

Data-backed timelines depend on timestamps that can be compared reliably. Mixed time zones and formats make that harder than it looks; see [[ISO 8601]] and [[Unix Time]].

A timeline's straight line also carries an implicit idea: that time moves steadily in one direction and events can be placed on it unambiguously. Calendars, cycles, and contested dates show where that assumption strains.

## See also
- [[Data Visualization]]
- [[Event Sourcing]]
