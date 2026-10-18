---
aliases:
  - AT&T 1990 outage
  - 1990 AT&T long-distance crash
tags:
  - testing
summary: On 15 January 1990 AT&T's long-distance network spent nine hours knocking itself over, because a misplaced break statement made each switch crash on the very messages its neighbors sent when recovering from a crash.
---
On 15 January 1990, a US holiday, the long-distance telephone network of AT&T began failing in the early afternoon and stayed crippled for about nine hours. Tens of millions of calls went unconnected, including those of airlines, hotels, and businesses that depended on toll-free numbers. No equipment was damaged and no one attacked it. The network was crashing itself, one switch at a time, over and over.

The network's core was 114 large electronic switches that routed calls and talked to one another over a separate signaling network, swapping status messages; see [[Telephone Network]]. The design was built for resilience. When a switch detected a problem, it took itself out of service for a few seconds, reset, and then sent its neighbors a message saying it was back, so they could resume routing calls through it; see [[Failure Detection]].

A few weeks earlier, AT&T had installed a software update on the switches to speed up exactly that recovery. The new code, written in C, contained a misplaced break statement inside a branch of a larger control structure. Its effect showed up only under specific timing. If a switch received a second message from a recovering neighbor while it was still processing the first, it could corrupt its own data, detect the corruption, and reset itself. When it came back, it sent its own recovery messages to its neighbors, which could trip the same bug in them.

That afternoon one switch in New York hit a minor fault and reset. Its recovery messages crashed neighbors, whose recovery messages crashed theirs, and the resets swept the network in waves; see [[Cascading Failure]] and [[Positive feedback]]. Engineers stabilized it that night and then went back to the previous version of the software; see [[Rollback]].

Several features of the case recur in later outages:

- **The recovery path was the fault.** Code meant to make the system heal was what spread the failure, and it ran only when something else had already gone wrong; see [[Fault injection]].
- **Redundancy didn't help.** Every switch ran the same code, so every one had the same bug; see [[N-Version Programming]].
- **Timing bugs escape ordinary tests.** The failure needed two messages arriving close together under load, a combination unit and integration tests rarely produce; see [[Race Condition]] and [[Deterministic Simulation Testing]].
- **Staged rollout limits the damage,** though here the bug sat dormant for weeks; see [[Canary Release]].

The C language lets control fall through or jump out of branches silently, which is why modern compilers and linters warn about suspicious break and fall-through patterns; see [[Static Analysis]].

Bruce Sterling's 1992 book on the computer crime crackdowns of that era opens with the crash, since rumors at the time blamed hackers.

## See also
- [[Crash-Only Software]]
- [[Regression Testing]]
