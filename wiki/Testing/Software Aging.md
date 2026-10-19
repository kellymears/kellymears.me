---
aliases:
  - Software rejuvenation
  - Code decay
tags:
  - testing
summary: The gradual degradation of software, either at runtime as long-running processes accumulate leaks and errors until they slow or crash, or over years as code drifts from changing needs, countered by planned restarts and by deliberate upkeep.
---
**Software aging** is the gradual degradation of software over time. Software doesn't wear out like a machine, yet it can still get worse. The term covers two related ideas.

**Runtime aging** describes long-running programs that become slower or less reliable the longer they run. Researchers including Yennun Huang and colleagues described it formally in the mid-1990s. Common causes include:

- **Memory leaks**, where a program keeps memory it no longer needs; see [[Memory Leak]].
- **Fragmentation**, where free memory breaks into pieces too small to use.
- **Unreleased resources**, such as file handles, threads, or connections; see [[Resource Starvation]].
- **Accumulating numerical error** or counters that eventually overflow; see [[Integer Overflow]].

The Patriot missile failure of 1991 is a famous example. A tiny error in converting the system's clock grew with uptime, and after about 100 hours of continuous operation it was large enough to make the system miss an incoming missile; see [[Patriot Missile Failure]]. Others are less dramatic. A Boeing 787 regulation from 2015 required airlines to power-cycle the aircraft's electrical systems periodically, because a counter would overflow after about 248 days of continuous power.

The countermeasure is **software rejuvenation**: restarting a program, process, or machine before aging causes failure, clearing out accumulated state. Rebooting a misbehaving computer is the folk version. Systems designed for this can restart parts of themselves regularly without disruption; see [[Crash-Only Software]] and [[Watchdog Timer]]. Many services routinely restart worker processes after a set number of requests for exactly this reason.

Runtime aging is hard to catch in ordinary testing, which usually runs for seconds or minutes. Soak tests, which run a system under realistic load for hours or days and watch memory and response times, are designed to expose it; see [[Soak testing]]. Monitoring production systems for slow trends is another defense; see [[Synthetic Monitoring]].

**Code decay** is the second sense. In a 1994 paper titled "Software Aging," David Parnas argued that software ages because the world around it changes while the code doesn't, and because repeated changes made without understanding the original design gradually erode its structure; see [[Technical Debt]]. Dependencies fall out of date, platforms change, and the people who understood the design leave; see [[Dependency Hell]]. The software may not change at all and still become unfit.

Parnas recommended designing for change, documenting decisions, and accepting that old software eventually needs renovation or replacement; see [[Big Rewrite]].

Reliability engineers describe failure rates that rise toward the end of a product's life, a pattern aging software can show as well; see [[Bathtub Curve]]. In both senses, aging is less a bug than a process to manage.

## See also
- [[Software Rot]]
- [[Garbage Collection]]
- [[Cellular Senescence]]
