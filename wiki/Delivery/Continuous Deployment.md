---
aliases:
  - CD
  - Continuous delivery
tags:
  - delivery
summary: Automatically releasing every change that passes validation.
---
**Continuous deployment** releases every change that passes automated validation, without a human release step. *Continuous delivery* is the weaker sibling: every change is made releasable, and a person chooses when to press the button.

The practice depends entirely on the confidence of the validation, which is why it tends to arrive together with strong testing, [[Feature Flag]]s, and quick rollback. Flags matter most: they decouple deploying code from enabling behavior, so shipping unfinished work becomes safe and releasing becomes a configuration change rather than a deployment.

Deployment is also where a whole category of environment-specific failure lives, and it is the category least covered by ordinary checks. A database migration that runs in a fresh environment and fails in the deployed one; a required secret that exists locally and not in production; a platform-provided variable under a name the application does not read; a certificate that has to be provisioned separately. None of this is visible to a type checker or a test suite.

The only honest verification is to reproduce the deployment path end to end — reset, migrate, build, start in production mode, and request the real thing. See [[Database Migration]] and [[Ground Truth]].

## See also
- [[Continuous Integration]]
- [[Feature Flag]]
- [[Database Migration]]
- [[Secret Management]]
- [[Containerization]]

## Related
- [[Vacuous Truth]]
- [[Trunk-Based Development]]
- [[Silent Failure]]
