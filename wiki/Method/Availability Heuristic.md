---
aliases:
  - Availability Bias
tags:
  - method
summary: Judging how likely or common something is by how easily examples come to mind, not by actual frequency.
---
**Availability Heuristic** is estimating the probability or frequency of something by how easily instances of it come to mind, rather than by counting. Recall ease is driven by recency, vividness, and personal exposure — none of which track actual base rate — so the heuristic is fast and usually good enough, and systematically wrong exactly where those three diverge from reality.

The canonical illustration is that people rate death by shark attack as more likely than death by falling furniture, because shark attacks make the news and furniture deaths don't — the heuristic is sampling from "what got reported to me," which is a different population than "what actually happens." The engineering version: the last outage you personally debugged feels like the most likely cause of the next one, because it's vivid and recent, even when logs show it accounts for a small fraction of incidents. An on-call rotation that "always" gets paged for the same kind of alert is really a [[Base Rate Fallacy]] plus availability working together — the loud, memorable pages dominate memory even if a quieter class of failure is actually more frequent.

Availability also drives estimation in the other direction: a task feels quick to estimate because a similar-sounding task once was quick, ignoring how many similar-sounding tasks were painful and simply didn't stick in memory the same way. This is one root of chronically optimistic scheduling — the easily-recalled cases aren't a random sample of past cases, they're the sample that happened to be memorable.

The corrective is the same move [[Fermi Estimation]] makes explicit: force yourself to actually estimate a rate or count rather than reach for the first example that surfaces, and prefer a log query or incident tracker's real tally over a gut sense built from whichever incidents happened to be dramatic.

## See also
- [[Base Rate Fallacy]]
- [[Fermi Estimation]]
- [[Anchoring Effect]]
- [[Confirmation Bias]]
- [[Selection Bias]]

## Related
- [[Survivorship Bias]]
