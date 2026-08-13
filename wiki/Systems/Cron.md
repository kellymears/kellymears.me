---
aliases:
  - Scheduled job
  - Crontab
tags:
  - systems
summary: Time-based scheduling of recurring jobs, and the reasons scheduled jobs quietly stop working.
---
**Cron** is the traditional Unix scheduler: a table of times and commands, evaluated every minute. The name now stands loosely for any time-based job scheduling, including the various platform-specific successors.

Scheduled jobs fail more often than interactive commands, and nearly always for environmental reasons rather than logical ones. A scheduled job runs with a **minimal environment**: a short search path, no shell profile, no interactive session, and often a different working directory. A command that works when typed fails when scheduled because the program is not on the path, or because a credential lives in a profile that was never sourced.

They also fail *silently* by default. Output goes nowhere unless directed somewhere, so a job that has been failing nightly for months looks exactly like one that has been succeeding. Logging to a file, and — better — recording success somewhere observable, is what makes the difference. See [[Observability]] and [[Silent Failure]].

The practical rules: use absolute paths, set the environment explicitly, log to a known location, make the job [[Idempotence|idempotent]] so a double run is harmless, and provide a way to trigger it manually so it can be tested without waiting for the schedule.

## See also
- [[Daemon]]
- [[Environment Variable]]
- [[Idempotence]]
- [[Silent Failure]]

## Related
- [[Fail Fast]]
- [[Truncation Bias]]
- [[Secret Management]]
- [[Root Cause Analysis]]
