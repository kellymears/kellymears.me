---
aliases:
  - Fake timers
  - Clock injection
  - Injectable clock
  - Time mocking
  - Frozen time
tags:
  - testing
summary: Replacing the real clock in tests with one the test controls, so time-dependent code can be checked at midnight, across DST, or after an hour of retries without waiting.
---
A **fake clock** replaces the system clock in tests with one the test controls. Code that asks for the current time gets whatever the test has set, and the test can advance time instantly: skip an hour of retries, jump to midnight on New Year's Eve, or land on February 29. It is a specialized [[Test Double]] for the one dependency nearly every program has.

Time is a hidden input. A function that checks whether a subscription has expired reads the clock, so its result depends on when the test runs. That causes a family of failures:

- **Calendar bugs.** Tests that pass all year and fail at month end, on leap days, at midnight in some [[Time Zone]], or during a daylight saving shift.
- **Slow tests.** Code that waits, backs off, or times out makes tests that really sleep, adding seconds per test.
- **Flaky tests.** Timing-sensitive assertions pass on a fast machine and fail on a loaded CI runner, a classic [[Flaky Test]].

There are two main ways to control time:

- **Inject a clock.** Code takes a clock as a dependency instead of calling the system directly. Java 8's time API, released in 2014, included a Clock class for exactly this. In tests, a fixed or adjustable clock is passed in. The cleanest version moves time out entirely: pass the current time as an argument, turning the logic into a [[Pure Function]].
- **Patch the runtime.** Libraries such as Sinon's fake timers in JavaScript, freezegun in Python, and Timecop in Ruby replace the language's time functions globally. In JavaScript they also take over timers and can run the scheduled callbacks of the [[Event Loop]] on demand. This works on code that was never designed for injection, but patching can leak between tests and break [[Test Isolation]] if not restored.

A fake clock makes some behavior practical to test at all. A retry loop with [[Exponential Backoff]] can be checked across its whole schedule in milliseconds. A [[Cron]] scheduler can be advanced through a week. Cache expiry, session timeouts, and rate-limit windows all become ordinary assertions. Time-sensitive edges deserve explicit cases, chosen with [[Boundary Value Analysis]]: one second before expiry, the exact moment, one second after.

Two clocks are worth distinguishing. *Wall-clock* time follows the calendar and can jump backward when synchronized by the [[Network Time Protocol]] or adjusted by hand. *Monotonic* time only moves forward and suits measuring durations. Code that measures elapsed time with the wall clock can see negative durations, a bug a fake clock can reproduce on purpose.

[[Deterministic Simulation Testing]] generalizes the idea, controlling time along with threads and network so entire distributed systems run reproducibly. In distributed systems, where machine clocks disagree, ordering often comes from a [[Logical Clock]] instead.

## See also
- [[Daylight Saving Time]]
- [[Testability]]
- [[Monotonic Clock]]
