---
aliases:
  - Red teaming
  - Cold reviewer
tags:
  - agents
summary: Reviewing work with an explicit mandate to refute it, from a perspective that did not produce it.
---
**Adversarial review** is critique with an assignment to *disprove* rather than to approve. The framing matters because a reviewer asked "does this look right?" is disposed to agree, while a reviewer asked "find where this is wrong, default to rejecting if unsure" applies real pressure.

Two structural requirements make it work.

**The reviewer must be cold.** A critic that inherits the author's context inherits the author's assumptions and blind spots. Self-review reliably declares work satisfactory and misses the things that most needed catching — dead exports, inconsistent naming, an assertion that never runs. Where a system delegates implementation, review has to come from a fresh perspective rather than from the implementer's own continuation.

**Independent verdicts must be aggregated, not chained.** Several critics reviewing the same finding through *different lenses* — correctness, security, does-it-actually-reproduce — catch failure modes that three identical passes cannot. Requiring a majority to survive filters plausible-but-wrong findings, which is the dominant failure mode of automated review.

The same discipline applies to humans reviewing machine output, and to the reviewer's own reasoning: a lint rule set to error plus a clean run *feels* like execution, but it is configuration plus an inference across a gap nobody tested. See [[Plausible Mechanism]] and [[Code Review]].

## See also
- [[LLM-as-Judge]]
- [[Subagent]]
- [[Multi-Agent Orchestration]]
- [[Falsifiability]]

## Related
- [[Provenance]]
- [[Ground Truth]]
- [[Exhaustive Claim]]
