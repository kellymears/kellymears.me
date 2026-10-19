---
aliases:
  - Mars Pathfinder
  - Pathfinder resets
  - Priority inheritance
tags:
  - testing
summary: Days after landing on Mars in 1997, the Pathfinder lander began resetting itself because a low-priority task held a lock that a high-priority task needed, a classic priority inversion that engineers diagnosed from Earth and fixed by uploading a one-line configuration change.
---
**The Mars Pathfinder priority inversion** was a software bug that caused NASA's Mars Pathfinder lander to reset itself repeatedly in July 1997, days after a celebrated landing on Mars. The resets interrupted data collection but didn't damage the mission, and the bug was diagnosed and fixed remotely. It's become the standard real-world example of priority inversion.

Pathfinder ran a commercial real-time operating system that scheduled tasks strictly by priority; see [[Real-Time Operating System]]. Several tasks shared an information bus, protected by a lock, a mutual exclusion mechanism that ensured only one task could use the bus at any given moment.

Three tasks were involved:

- **A low-priority task** collecting meteorological data sometimes took the lock on the bus.
- **A high-priority task** managing the bus needed the same lock and had to wait.
- **A medium-priority communications task** didn't need the lock at all, but it outranked the low-priority task, so it could preempt it; see [[Preemption]].

While the medium task ran, the low task couldn't finish and release the lock, and the high task stayed blocked indefinitely. That's priority inversion: a high-priority task effectively waiting on a medium-priority one; see [[Priority inversion]]. A watchdog noticed the bus task hadn't completed on time, concluded something had gone badly wrong, and reset the whole system; see [[Watchdog Timer]].

The resets depended on timing, appearing only under the heavier data loads of the surface mission; see [[Race Condition]] and [[Heisenbug]]. Engineers at the Jet Propulsion Laboratory reproduced the problem on an identical replica of the spacecraft on Earth, running with detailed tracing enabled; see [[Hardware-in-the-Loop]] and [[Distributed Tracing]]. The trace showed exactly the sequence of tasks that caused the resets.

The fix was already built in. The operating system supported priority inheritance, in which a task holding a lock temporarily takes on the priority of the highest-priority task waiting for it, so medium tasks can't preempt it; see [[Semaphore]]. The option had simply been left off when the software was configured. Engineers uploaded a small patch that turned it on, and the resets stopped.

Glenn Reeves, who led the flight software team, later wrote an account noting that the problem had shown up in prelaunch testing but was attributed to hardware glitches and given lower priority than landing software; see [[Bug Triage]].

Lessons often drawn:

- **Keep diagnostics in production.** Tracing left in the flight software made remote debugging possible; see [[Instrumentation]] and [[Testing in Production]].
- **Investigate rare glitches.** Unexplained resets in testing were a signal; see [[Flaky Test]].
- **Watchdogs turn hangs into restarts**, which kept the mission alive.

## See also
- [[Peterson's Algorithm]]
- [[Record and Replay]]
