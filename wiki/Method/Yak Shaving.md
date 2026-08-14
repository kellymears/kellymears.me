---
aliases:
  - Shaving the yak
tags:
  - method
summary: A chain of prerequisite tasks that stands between you and the task you meant to do.
---
**Yak shaving** is working through a chain of prerequisite tasks, each a genuine dependency of the last, until the original goal is buried several layers down and the current task — say, shaving a yak — bears no visible relation to it. The term was coined by Carlin Vieri at the MIT AI Lab in the mid-1990s, after a segment at the end of a 1991 episode of *The Ren & Stimpy Show* announcing "Yak Shaving Day" — a Christmas parody with diapers hung instead of stockings, rubber boots stuffed with coleslaw, and a shaven yak floating past in an enchanted canoe. There is no chain of favors in the cartoon: it supplied an absurd image, not a structure. The chain-of-prerequisites sense comes from a 2000 post to an MIT mailing list by Jeremy H. Brown, working from a stalled thesis reference back through an aging email client, a text editor, and a run of dependency upgrades. The joke lands because every step was necessary; the absurdity is visible only from outside the chain.

The hard part is telling a genuine dependency chain from avoidance wearing its clothes. A real chain has a property the avoidant kind lacks: each task, once done, is consumed by the next, and skipping it produces a concrete failure rather than discomfort. Avoidance generates open-ended busywork — reorganizing a config, upgrading an unrelated dependency — that could be deferred without the original task ever failing to start. The tell is whether you can name, before starting, what the new task unblocks; [[Rubber Duck Debugging]] applies the same test to a stuck fix rather than a stuck plan.

**Timeboxing** is the practical control: fix a budget for the detour and re-evaluate at the boundary rather than letting the chain decide how deep it goes. If the budget runs out and the task is still unreachable, that is information — either the [[Technical Debt]] underneath is worse than assumed, or the chain has become a way of not starting.

The chain is sometimes literal: a [[Package Manager]] resolving a dependency of a dependency, or a [[Monorepo]] change blocked until an unrelated package upgrades first, is yak shaving with the prerequisites explicit in a lockfile rather than discovered one surprise at a time.

## See also
- [[Reproducible Case]]
- [[Root Cause Analysis]]
- [[Fermi Estimation]]
- [[Deprecation]]
