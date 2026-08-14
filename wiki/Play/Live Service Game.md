---
aliases:
  - Games as a service
  - GaaS
tags:
  - play
summary: A game operated as a running service rather than shipped as a finished artifact, with the consequences that shift implies.
---
**Live service game** describes a title operated continuously after release — patched, extended, seasonally reset, and eventually shut down — rather than shipped once and finished. *Counter-Strike*, *Destiny 2* and *Fortnite* are the usual examples. The category is often framed as a monetization strategy, but the more durable description is architectural: the game has stopped being an artifact and become a deployment.

Every consequence follows from that. Balance changes are [[Continuous Deployment]] against an audience that has already built habits on the old numbers, so a patch note is a migration guide. New content arrives behind staged rollouts and [[Feature Flag]] gates. Client and server drift apart and must be version-locked, making [[Semantic Versioning]] a runtime concern rather than a packaging one. Player data written years ago under an older schema still has to load, which is [[Schema Drift]] with no option to discard the rows. The studio's practices converge on those of any operations team, including the part where the [[Technical Debt]] of a live system cannot be paid down during a quiet period, because there is no quiet period.

**The season is the genre's characteristic structure**: a fixed window with its own content, its own progression track, and an expiry. Seasons give the operator a cadence and the player a reason to return on a schedule, and they are also where the form's incentives turn against its players. A track completable only by regular attendance measures attendance while presenting itself as measuring commitment — [[Goodhart's Law]] with a battle pass — and the logic of [[Gacha Monetization]] applies once the track can be shortened for money. [[Meta-Progression]] supplies the machinery, and [[Time as Resource]] describes the pressure from the player's side of it.

The unavoidable cost is preservation. A single-player game from 1998 still runs; a live service game whose servers are decommissioned does not exist in any form, and no amount of local storage recovers it. Players buy access to an operated system while the purchase is presented in the vocabulary of ownership, and the [[Provenance]] of what was acquired becomes clear only at sunset. The clearest reading of the form is that it trades permanence for continuous [[Observability]] into what players do — which is genuinely useful to designers, and genuinely not the trade most buyers think they are making.

## See also
- [[Battle Royale]]
- [[Gacha Monetization]]
- [[Meta-Progression]]
- [[Continuous Deployment]]
- [[Deprecation]]
