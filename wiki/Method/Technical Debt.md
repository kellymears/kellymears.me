---
aliases:
  - Tech debt
tags:
  - method
summary: The future cost of a present shortcut, metaphorically accruing interest.
---
**Technical debt** is Ward Cunningham's metaphor for the cost incurred by choosing an expedient implementation over a better one: you ship sooner, and you pay interest on the difference in every subsequent change.

The metaphor is often flattened into "bad code", which loses what made it useful. Cunningham's point was that *deliberately* taking a shortcut can be correct, provided the debt is known and repaid. Debt taken knowingly, recorded, and scheduled is a financing decision. Debt taken unknowingly is just a defect with a nicer name.

Some recognisable forms: a workaround kept after its cause was fixed upstream; a duplicated implementation nobody consolidated; a guard suppressed rather than resolved; a deprecated dependency held back; a coverage shortfall inherited from a branch whose gate never ran. Each is cheap once and expensive per subsequent touch.

Two practices keep it visible. Record *why* a shortcut was taken and what would let it be removed, so a later reader is not stuck at [[Chesterton's Fence]]. And prefer paying an adjacent debt inside the change that exposes it over filing a follow-up item — a follow-up moves the work to a backlog that may never be read, while the person with the context is right there.

## See also
- [[Deprecation]]
- [[Documentation Rot]]
- [[Code Review]]
- [[Root Cause Analysis]]
- [[Feature Flag]]

## Related
- [[Plausible Mechanism]]
- [[Naming]]
- [[Code Comment]]
