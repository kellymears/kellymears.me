---
aliases:
  - Never attribute to malice
tags:
  - method
summary: Never attribute to malice that which is adequately explained by stupidity.
---
**Hanlon's razor**, in its canonical wording, runs: "Never attribute to malice that which is adequately explained by stupidity." The softer variants in circulation — incompetence, carelessness, ignorance — are later rephrasings, and they point at the more useful systems reading: a bad outcome is usually the predictable output of a process under ordinary pressure rather than the intent of a person. The line is credited to Robert J. Hanlon, who submitted it for Arthur Bloch's *Murphy's Law Book Two* (1980). A deploy that takes down a service is more often a missing check than a saboteur; a confusing error message is more often nobody's job to fix than a deliberate obstacle.

Its value is as a de-escalation heuristic. Assuming malice invites a search for a villain and an argument about intent, both slow and rarely conclusive; assuming a mundane failure invites a [[Root Cause Analysis]] instead, which is usually the faster route to a fix and the one less likely to make the next disclosure a defensive one. It is also a corrective to the instinct behind [[Silent Failure]] postmortems that read like character judgments of whoever touched the code last, when the honest finding is a gap in the system that would have caught anyone.

The razor has a clear edge, though, and treating it as absolute is its own error: incompetence explains an isolated mistake, but it does not explain a pattern that an incentive structure predicts. A [[Principal-Agent Problem]] — where the person making the call is rewarded for an outcome that costs someone else — produces behaviour that looks exactly like the harmful choice being made on purpose, because in the sense that matters it was; [[Regulatory Capture]] and ordinary [[Rent-Seeking]] are the institutional versions of the same thing. [[Goodhart's Law]] describes the mechanism connecting the two readings: a system optimising its stated measure will produce harm that looks like malice from outside and looks like compliance from inside, and Hanlon's razor is the wrong tool once you can show the incentive predicted it.

## See also
- [[Automation Bias]]
- [[Motte and Bailey]]
- [[Ground Truth]]
- [[Provenance]]
