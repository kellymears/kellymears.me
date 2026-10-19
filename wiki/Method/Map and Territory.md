---
aliases:
  - The map is not the territory
  - Map-territory relation
  - Reification
tags:
  - method
summary: The reminder that a model, measure, or description of something is not the thing itself, and leaves out by design, so errors come from forgetting the gap rather than from the map being simplified.
---
**The map is not the territory** is a reminder that any representation of something, whether a map, a model, a diagram, a metric, or a word, differs from the thing it describes. The phrase comes from Alfred Korzybski, a Polish-American scholar who used it in 1931 to argue that much human confusion comes from reacting to our labels for things as if they were the things themselves.

The point is not that maps are bad. A map is useful precisely because it leaves things out. Jorge Luis Borges wrote a one-paragraph story about an empire whose cartographers made a map at the scale of one mile to the mile, which matched the territory exactly and was therefore useless. Every useful model chooses what to omit; see [[Leaky Abstraction]]. The statistician George Box made the same point about scientific models: all models are wrong, but some are useful.

The errors come from forgetting the gap:

- **Treating the measure as the goal.** A hospital that manages to its waiting-time metric can shorten the recorded wait without shortening the actual one; see [[Goodhart's Law]] and [[Cobra Effect]].
- **Trusting the plan over the ground.** A project plan says the work is 80 percent done; the code says otherwise; see [[Planning Fallacy]].
- **Confusing a category with its members.** Reasoning about "users" as a single persona can miss the many who don't fit; see [[Prototype Theory]].
- **Reification.** Treating an abstraction as a concrete thing, such as speaking of "the market" or "the algorithm" as if it had intentions.

Software is maps all the way down. A type describes the values a variable may hold, not what it will actually contain at runtime. A test suite describes intended behavior, not the behavior of the deployed system. Documentation describes the code as it was when someone last wrote about it; see [[Documentation Rot]]. A dashboard shows the metrics someone chose to collect, and a [[Silent Failure]] is one the map was never drawn to show; see [[Observability]].

The idea also applies to people's own beliefs. Each person carries a [[Mental Model]] of how a system works, and surprises are evidence that it differs from the territory. Debugging is largely the practice of finding where the model and reality diverge; see [[Rubber Duck Debugging]] and [[Scientific Debugging]].

Governments face a version at large scale. James C. Scott argued that states simplify the places they govern into legible forms, such as surnames, grid plans, and standardized fields, and then reshape the places to fit the simplifications, sometimes disastrously; see [[Legibility]].

The practical habits follow: check the territory directly when stakes are high, ask what a model leaves out before relying on it, and treat surprise as a sign that the map needs updating rather than reality needs explaining away; see [[Ground Truth]].

## See also
- [[OODA Loop]]
- [[Wargame]]
