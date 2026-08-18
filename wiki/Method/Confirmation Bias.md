---
aliases:
  - Myside Bias
tags:
  - method
summary: The tendency to search for, interpret, and recall evidence in ways that favor what you already believe.
---
**Confirmation Bias** is the tendency to seek out, weight, and remember evidence that supports a belief you already hold, while discounting or forgetting evidence against it. It is not a failure of intelligence — highly capable reasoners are often better at it, because they're more skilled at constructing a case for a conclusion they've already reached.

The bias shows up most dangerously at the search stage, before any weighing happens at all. A debugger who suspects the database drops one query into a console, sees a slow number, and stops — never running the query that would have implicated the network instead. The problem isn't that they misjudged the evidence; it's that they only went looking for evidence of one kind. This is why [[Falsifiability]] matters as a discipline rather than a philosophy-class abstraction: the useful question isn't "what would confirm my theory" but "what observation would force me to abandon it," and then going and making that observation.

Confirmation bias compounds with [[Anchoring Effect]] — the first hypothesis anyone proposes in an incident channel becomes the lens everyone else's search runs through — and with [[Motte and Bailey]], where a belief under threat retreats to a defensible version rather than being tested against the strong version anyone actually acted on. Code review has its own flavor: a reviewer who already trusts an author reads the diff looking for reasons it's fine, and a reviewer who doesn't trust them reads the same diff looking for reasons it's broken. Neither is reading the diff.

The practical countermeasure is cheap and specific: before accepting an explanation, write down one observation that would disprove it, then go check that observation before checking the ones that would confirm it. This single reordering — falsify first — does more work than any amount of "staying open-minded."

## See also
- [[Falsifiability]]
- [[Anchoring Effect]]
- [[Motte and Bailey]]
- [[Ground Truth]]
- [[Base Rate Fallacy]]

## Related
- [[Availability Heuristic]]
- [[Selection Bias]]
