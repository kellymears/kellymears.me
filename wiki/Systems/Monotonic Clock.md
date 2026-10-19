---
aliases:
  - Wall-clock time
  - CLOCK_MONOTONIC
  - Steady clock
tags:
  - systems
summary: A clock that only moves forward at a steady rate, unaffected by time zones, NTP corrections, or someone changing the date, and why durations and timeouts must use it instead of the time of day.
---
A **monotonic clock** is a clock that only ever moves forward, at a steady rate, from some arbitrary starting point such as when the machine booted. It can't tell you what time it is. It can tell you precisely how much time has passed, which is the question most programs are actually asking.

Its counterpart is **wall-clock time**, the date and time of day, usually stored as [[Unix Time]]. Wall-clock time is what people read, but it jumps:

- **Synchronization.** [[Network Time Protocol]] corrects a drifting clock, sometimes by stepping it seconds or minutes in either direction.
- **Manual changes.** A user or administrator sets the date, or a laptop with a dead battery boots believing it's 1970.
- **Leap seconds.** UTC has occasionally inserted an extra second, which systems handled by repeating a second or smearing the difference over hours.
- **Virtual machines.** A paused or migrated virtual machine can wake with a clock far behind.

Daylight saving time doesn't affect Unix time itself, but code that measures durations in local time does see an hour vanish or repeat; see [[Time Zone]] and [[Falsehoods Programmers Believe]].

So subtracting two wall-clock readings can give a negative duration, or one hours too long. Code measuring elapsed time with it fails in ways that are rare, hard to reproduce, and sometimes serious:

- **Timeouts** that fire instantly or never; see [[Timeout]].
- **Rate limiters** and retry backoff that stall or burst; see [[Rate Limiting]] and [[Exponential Backoff]].
- **Benchmarks** reporting impossible numbers; see [[Benchmarking]].
- **Caches** expiring everything at once, or nothing; see [[Time to Live]].
- **Leases and locks** two machines both believe they hold; see [[Leader Election]].

Operating systems provide both clocks, and languages expose them under different names: `CLOCK_MONOTONIC` in POSIX, `performance.now()` in browsers, `Instant` in Rust, and the monotonic reading Go attaches to every time value. The rule is simple: wall-clock time for timestamps people will read or that must agree between machines, the monotonic clock for any duration, deadline, or interval.

There are subtleties. On Linux, `CLOCK_MONOTONIC` stops while the machine is suspended, and a separate boot-time clock keeps counting through sleep, so "has an hour passed?" depends on whether sleep should count. Monotonic readings mean nothing across machines or reboots, so they can't be stored or compared remotely; ordering events across machines needs a different tool; see [[Logical Clock]].

Testing time-dependent code is easier when the clock is passed in rather than read from the system, so a test can step time forward precisely; see [[Fake Clock]]. Deterministic simulators take this further, controlling every clock a program sees; see [[Deterministic Simulation Testing]].

## See also
- [[Daylight Saving Time]]
- [[Suspend and Hibernation]]
