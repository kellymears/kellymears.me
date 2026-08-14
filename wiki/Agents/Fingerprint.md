---
aliases:
  - Request fingerprint
  - Cache key
tags:
  - agents
summary: A hash over everything that determined a result, used to detect when the result has gone stale.
---
A **fingerprint** is a hash computed over all the inputs that produced an artifact, stored alongside it, and compared later to decide whether the artifact is still valid. It is the general mechanism behind build caches, memoization, and stale-recording detection.

Its value is that it makes staleness *mechanical* rather than a review step. If the fingerprint covers the prompt, the model identity, and every tool definition, then any drift in any of them turns into a failing check rather than a subtle behavioral difference nobody notices.

The cost is that the coverage is deliberately broad, so unrelated changes invalidate everything. A change that only rewords one tool's description stales every recording in the system, because the model saw that description in every request.

Two mechanical hazards recur. Fingerprints usually hash an *ordered* list, so anything that changes ordering without changing membership — for instance, a bundler that sorts module exports where another preserves source order — produces a different hash for identical content, across runtimes rather than across revisions. And a fingerprint computed against a merged preview differs from one computed against your local base, so a check can fail in one place while passing in the other, correctly.

## See also
- [[Record and Replay Testing]]
- [[Hash Function]]
- [[Determinism]]
- [[Cache Invalidation]]
- [[Provenance]]
- [[Evaluation Harness]]
- [[LLM-as-Judge]]
- [[Tool Use]]

## Related
- [[Nondeterminism]]
- [[Large Language Model]]
