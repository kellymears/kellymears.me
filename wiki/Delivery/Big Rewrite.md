---
aliases:
  - Rewrite from scratch
  - Ground-up rewrite
tags:
  - delivery
summary: Throwing away a working system to build its replacement from nothing, a project that usually takes far longer than planned because the old code held years of fixes nobody wrote down.
---
The **big rewrite** is the decision to discard a working system and build its replacement from scratch rather than improving it in place. It is one of the most tempting choices in software and one of the most often regretted. Joel Spolsky called it "the single worst strategic mistake that any software company can make" in a 2000 essay about Netscape, which spent roughly three years rewriting its browser while Internet Explorer took the market; see [[Browser Wars]].

The appeal is easy to understand. Old code is hard to read, its structure reflects decisions nobody remembers, and every change seems to break something; see [[Technical Debt]]. Developers would rather write than read, and a clean start promises a design that fits what the product has become.

Why it usually goes badly:

- **The old code is full of knowledge.** Odd conditionals and special cases are often fixes for bugs found in production, for one customer's data or one platform's quirk. A rewrite drops them and then rediscovers them one incident at a time; see [[Chesterton's Fence]].
- **The target keeps moving.** The old system still needs features and fixes while the new one is built, so the rewrite chases a moving specification, or the business stands still for a year.
- **Nothing ships until everything ships.** Value arrives only at the cutover, so there's no feedback along the way and the project is hard to cancel; see [[Sunk Cost Fallacy]].
- **Estimates fail.** The scope is "everything the old system does," which nobody can list; see [[Planning Fallacy]] and [[Ninety-Ninety Rule]].
- **Ambition creeps in.** The new version tends to carry every feature deferred from the old one; see [[Second-System Effect]].

Users also depend on behaviors nobody intended, so even a faithful rewrite breaks someone; see [[Hyrum's Law]].

Rewrites do sometimes succeed, usually when the scope is small, the old platform is truly dead, or the team pins the old system's behavior with tests before touching anything; see [[Characterization Test]]. Python 3 is an example of a costly but eventually successful break: the language changed incompatibly in 2008, and the ecosystem took more than a decade to move, with Python 2 supported until 2020; see [[Backward Compatibility]].

The usual alternative is incremental replacement. The [[Strangler Fig Pattern]] routes traffic piece by piece from the old system to new components, and [[Branch by Abstraction]] does the same inside one codebase, so every step ships and can be reversed. Most successful "rewrites" turn out to be this, done patiently over years. [[Gall's Law]] gives the underlying reason: complex systems that work evolved from simple systems that worked, and a complex system designed from scratch rarely does.

## See also
- [[IKEA Effect]]
- [[Not Invented Here]]
