---
aliases:
  - Release cadence
  - Release branch
  - Release channel
  - Time-based release
  - Rapid release
tags:
  - delivery
summary: Shipping on a fixed schedule whether or not a given feature is ready, so features that miss one release simply wait for the next instead of holding everyone back.
---
A **release train** ships on a fixed schedule. The train leaves on time, and whatever is ready gets on board. A feature that isn't finished doesn't delay the release. It waits for the next train, which is never far away. The alternative, *feature-based* releasing, waits until a planned set of features is complete, and in practice tends to slip repeatedly as one late feature holds up all the finished ones, the pattern [[Hofstadter's Law]] predicts.

Web browsers made the model famous. Chrome shipped a new stable version every six weeks from 2010 and moved to four weeks in 2021. Firefox adopted rapid release in 2011, after Firefox 4 took more than a year, and now also ships every four weeks. Rust has released a new stable compiler every six weeks since 1.0 in 2015. Ubuntu releases every April and October, with a long-term support release every two years, and the Linux kernel ships roughly every nine or ten weeks after a two-week merge window.

The mechanics usually look like this:

- **Channels.** Code moves through nightly, beta, and stable channels in step. Each new release promotes the beta to stable and the nightly to beta, so every change gets one full cycle of wider testing before it ships, a broad cousin of a [[Canary Release]].
- **Release branches.** At a cutoff date, a branch is cut from trunk and [[Code Freeze|stabilized]]. Only fixes are allowed in, usually by [[Cherry-Pick]] from the main line, while new work continues on trunk. See [[Branching Model]].
- **Flags for unfinished work.** Incomplete features ship disabled behind a [[Feature Flag]], so the code can merge early, as [[Trunk-Based Development]] encourages, without being exposed.

Predictability is the main benefit. Users, downstream packagers, and documentation teams know when the next version arrives. Missing a train costs weeks, not months, which removes the pressure to rush a feature in and lowers the stakes of each release. Smaller, regular releases also make regressions easier to trace. Each [[Changelog]] entry stays readable, and version numbers under [[Semantic Versioning]] advance steadily.

The costs are real. Some features can't be split to fit a cycle, and users can tire of constant updates. Long-term support releases exist to give organizations something that changes slowly, and maintaining them multiplies the backporting work. [[Deprecation]] policies are usually stated in trains: a feature is warned about in one release and removed a fixed number of releases later.

A release train is not a [[Merge Train]], which queues pull requests so each is tested against the ones ahead of it, and it is distinct from a [[Rolling Release]], which has no versions at all. Organizations that deploy web services many times a day with [[Continuous Deployment]] have effectively shrunk the train to a single car.

## See also
- [[Release Engineering]]
- [[Nightly Build]]
