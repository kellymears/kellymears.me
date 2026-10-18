---
aliases:
  - CAB
  - Change management
  - Change approval
  - Four-eyes principle
tags:
  - delivery
summary: A committee that reviews and approves changes to production systems before they ship, a long-standing control that research found slows delivery without making it safer.
---
A **change advisory board** (CAB) is a group that reviews proposed changes to production systems and approves, rejects, or schedules them. It comes from formal IT service management frameworks, especially ITIL, where **change management** classifies changes by risk and routes the risky ones through review. A CAB typically meets weekly, and a change needs a written request describing what will change, the risk, the test plan, and the rollback plan.

Frameworks usually define three kinds of change:

- **Standard changes** are routine and pre-approved, such as a scheduled patch.
- **Normal changes** go through review and approval.
- **Emergency changes** skip the usual process to fix an active problem, with review afterward; see [[Hotfix]].

The goals are sensible: catch dangerous changes, coordinate changes that might collide, and leave a record. In regulated industries, the **four-eyes principle**, that no one person can both make and approve a change, is often a legal requirement.

The problem is evidence. The research behind the [[DORA Metrics]], summarized in the 2018 book *Accelerate*, found that approval by an external body like a CAB was associated with lower delivery speed and was **not** associated with fewer failed changes. Teams with heavyweight approval did worse on throughput and no better on stability than teams with no formal approval at all.

The reasons are fairly clear:

- **Distance.** CAB members often don't know the code well enough to judge risk, so review becomes a reading of the form rather than the change, a control that looks reassuring more than it reduces risk.
- **Batching.** Weekly meetings encourage bundling changes into larger releases, which are riskier and harder to debug.
- **Delay.** Waiting days for approval slows fixes as well as features, so problems last longer.
- **Diluted ownership.** When a board approves, the person making the change can feel less responsible for it; see [[Diffusion of responsibility]].

The alternative that research supports is lightweight, peer-based control close to the work: [[Code Review]] by someone who understands the change, automated tests and checks in a [[Deployment Pipeline]], and gradual rollout that limits damage; see [[Progressive Delivery]] and [[Canary Release]]. Branch protection rules and pipeline logs provide the separation of duties and audit trail that regulators require, often more reliably than meeting minutes; see [[Branch Protection]] and [[Audit Log]].

CABs persist partly because they feel safe and are easy to explain to auditors, and partly because removing a control after an incident looks reckless; see [[Chesterton's Fence]]. Some organizations keep a CAB for genuinely cross-cutting changes, such as network or database migrations, while letting most changes flow through automated pipelines.

## See also
- [[Code Freeze]]
- [[DevOps]]
- [[Normalization of Deviance]]
- [[Value Stream Mapping]]
- [[Patch Tuesday]]
