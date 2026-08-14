---
aliases:
  - Review
tags:
  - delivery
summary: A second person reading a change before it lands, and the practices that make it worth the time.
---
**Code review** is the practice of having someone other than the author read a change before it is merged. Its documented benefits are defect detection and knowledge distribution, and the second is often the larger one — review is how a team stays able to work on each other's code.

What review is uniquely good at is precisely what automation cannot do: judging whether the approach is right, whether the naming will make sense to someone later, whether the change belongs where it was put, and whether the claims in the description are true. Nothing mechanical can check prose, so an unverified causal statement or a false exhaustive claim reaches production unless a reader catches it. See [[Plausible Mechanism]] and [[Exhaustive Claim]].

What makes review effective is mostly logistical. Small changes get read; large ones get skimmed. Reviewers need the evidence where the review happens, not in a place only the author can see. And a reviewer should be *cold* — fresh perspective is the whole mechanism, which is why self-review reliably declares work satisfactory. See [[Adversarial Review]]. Attention also drifts toward whatever everyone feels qualified to judge, which is rarely what carries the risk: a naming preference collects five replies and a migration collects none, the [[Law of Triviality]] operating on a diff.

A reviewer's own reasoning deserves the same scepticism they apply to the change. A configuration set to strict plus a clean run feels like execution, and is configuration plus an untested inference.

## See also
- [[Pull Request]]
- [[Adversarial Review]]
- [[Atomic Commit]]
- [[Human in the Loop]]
- [[Code Comment]]
- [[Provenance]]

## Related
- [[Documentation Rot]]
- [[Squash Merge]]
