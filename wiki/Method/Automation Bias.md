---
aliases:
  - Automation complacency
  - Over-reliance on automation
tags:
  - method
summary: Over-trusting an automated recommendation, including against available contrary evidence.
---
**Automation bias** is the tendency to accept an automated system's output without the scrutiny the same claim would get from a person, and to discount contrary evidence already at hand. It is documented in aviation, clinical decision support, navigation, and inspection work.

The errors take two forms. **Omission** errors are failures to act because the system raised no alert — an absent warning read as assurance rather than as no information. **Commission** errors are actions taken on a wrong recommendation against available evidence: following a route that visibly does not exist, clearing a case the system marked clean.

Reliability sets the trap. A system right ninety-nine times in a hundred teaches, correctly, that checking rarely pays, and the habit is in place when the hundredth case arrives. A tool that fails loudly is safer than one quietly slightly wrong, so [[Silent Failure]] is the mechanism and [[Fail Fast]] the response; fluent, confident wording is what makes a [[Hallucination]] more dangerous than an obvious error.

**Deskilling** is the slower cost. Sustained reliance erodes the capability underneath — manual flight, mental arithmetic, navigating from a map — and the fallback the automation assumes quietly stops existing, which is why aviation training mandates periods of hand-flying and why practitioners in several fields deliberately work unaided at intervals. The same decay turns a [[Human in the Loop]] approval into a rubber stamp, worse than no gate because it records a review that did not happen.

Countermeasures concern ordering and visibility: give the basis and the confidence, not the verdict alone; record the reviewer's own judgement before showing the recommendation so it cannot anchor them ([[Anchoring Effect]]); publish known failure modes; and never measure agreement rate, which is [[Goodhart's Law]] aimed at the last safeguard.

## See also
- [[Human in the Loop]]
- [[Silent Failure]]
- [[Hallucination]]
- [[Adversarial Review]]
- [[Ground Truth]]
