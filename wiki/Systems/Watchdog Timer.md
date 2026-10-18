---
aliases:
  - Watchdog
  - Hardware watchdog
  - Watchdog timeout
  - Soft lockup
  - Heartbeat timer
tags:
  - systems
summary: A countdown that resets a system unless healthy software keeps restarting it, the last line of defense against hangs in spacecraft, routers, and servers.
---
A **watchdog timer** is a countdown that resets a system unless software keeps restarting it. Healthy software periodically "kicks" or "feeds" the watchdog, setting the timer back to its full duration. If the software hangs, crashes, or gets stuck in a loop, the kicks stop, the timer expires, and the watchdog forces a reset. It turns "the system is frozen" into "the system rebooted," which, for a device nobody can reach, is a very large improvement.

Watchdogs are standard in embedded systems: cars, medical devices, routers, industrial controllers, and spacecraft. A satellite cannot be power-cycled by hand, so a hardware watchdog independent of the main processor is the only way out of a hang.

The most famous example is NASA's Mars Pathfinder in 1997. Days after landing, the lander began resetting itself repeatedly. A low-priority task held a shared resource needed by a high-priority one, while medium-priority tasks kept the low one from running, a *priority inversion*. The high-priority task missed its deadline, and the system responded by resetting. Engineers reproduced the bug on a replica on Earth and uploaded a fix enabling priority inheritance. The resets were the safety net working; without them the mission might have been lost.

Design questions every watchdog raises:

- **What counts as healthy.** Kicking from a timer thread proves only that the timer thread runs. A better design kicks only after the main loop completes useful work, so a hang anywhere stops the kicks.
- **How long to wait.** Too short and normal slow moments trigger resets; too long and a hang lingers. Timeouts are usually seconds.
- **Reboot loops.** A fault that recurs right after restart produces endless resets. Systems count consecutive resets and fall back to a safe mode, much as [[Rollback]] reverts a bad release.
- **Independence.** A watchdog in the same software it is watching can hang along with it. Hardware watchdogs run on a separate clock.

Linux supports watchdogs at several levels. Most PC chipsets include a hardware watchdog exposed as `/dev/watchdog`, and [[Systemd]] can kick it with `RuntimeWatchdogSec`, so a frozen kernel triggers a reboot. Per service, `WatchdogSec` expects the service to report health regularly and restarts it if the reports stop, catching hangs that a simple crash check would miss. The kernel also runs its own lockup detectors, warning when a CPU stops scheduling (a soft lockup) or stops handling [[Interrupt]] signals (a hard lockup).

The same idea appears in distributed systems as **heartbeats**. A node that stops sending heartbeats is declared dead and replaced, the core of [[Failure Detection]] and [[Leader Election]].

A watchdog does not fix anything; it buys time to investigate. Logs, a [[Core Dump]] or a kernel crash dump from before the reset show why the hang happened.

## See also
- [[Runtime Verification]]
- [[Daemon]]
- [[Silent Failure]]
- [[Fail Fast]]
- [[Real-Time Operating System]]
