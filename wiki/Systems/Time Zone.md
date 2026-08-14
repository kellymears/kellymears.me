---
aliases:
  - Time zones
  - IANA tz database
tags:
  - systems
summary: Civil time is a political layer over solar time, and its rules change often enough to be data.
---
A **time zone** is a region that agrees to keep the same civil clock. Before railways and telegraphy, towns kept local solar time and noon differed by minutes between neighbors. Standard zones made timetables possible, and the resulting offsets are political rather than astronomical: they follow borders, they are not all whole hours — several places sit at thirty- or forty-five-minute offsets — and governments change them by decree, sometimes weeks in advance.

Civil time is now defined as an offset from **UTC**, an atomic timescale nudged to track the Earth's rotation. An offset alone is not a zone. A zone is a rule set spanning history: which offset applied in which years, and when daylight saving started and stopped. Those rules live in the IANA tz database, shipped by operating systems through the ordinary [[Package Manager]] and updated several times a year. A machine running stale data computes wrong local times with no error raised — [[Silent Failure]] in its purest form. Minimal container images often ship no zone data and default to UTC, so the same code behaves differently under [[Containerization]] than on a workstation, and `TZ` is worth pinning as an explicit [[Environment Variable]].

**Transitions break assumptions.** Springing forward makes local times that never occur; falling back makes local times that occur twice. A task defined in local time can be skipped or run twice, so anything driven by [[Cron]] should be safe to repeat — see [[Idempotence]]. Tests that pass in one zone and fail in another are a standard [[Flaky Test]], and pinning the zone is a precondition for [[Determinism]] in anything date-bearing.

Abolishing daylight saving would end future transitions but not the problem: historical timestamps still need historical rules, and offsets still vary with longitude. Like [[Character Encoding]], the complexity is in the world, not the software.

## See also
- [[Ground Truth]]
- [[Root Cause Analysis]]
- [[Defensive Default]]
- [[Inertial Frame of Reference]]
