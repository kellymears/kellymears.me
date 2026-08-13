---
aliases:
  - Background service
  - Launch agent
tags:
  - systems
summary: A long-running background process managed by the operating system's service supervisor.
---
A **daemon** is a program that runs in the background rather than attached to a session, typically started and supervised by the operating system: systemd on Linux, launchd on macOS, the service manager on Windows.

Supervision is the feature and the complication. A supervisor can restart a service when it exits unexpectedly, which turns an occasional crash into an invisible blip — genuinely useful when an underlying framework is unreliable. It also means the process cannot simply be killed: a signal reads as a crash and triggers a restart, so stopping it requires either a clean exit or unloading the job from the supervisor.

Registration is where the subtle failures live. A supervisor records the path it was told about, and if that path was captured in an unusual context — a sandboxed shell with a remapped home directory, for example — the record points at somewhere that does not exist. Every subsequent launch then fails, silently and quickly, and the fix requires clearing the registration rather than reinstalling the program. Registering from a normal launch, rather than by executing the binary directly, avoids the whole class of problem.

Scheduled work is the daemon's near relative; see [[Cron]].

## See also
- [[Process]]
- [[Cron]]
- [[Code Signing]]
- [[Observability]]

## Related
- [[Silent Failure]]
- [[Resource Starvation]]
- [[Ground Truth]]
- [[Truncation Bias]]
- [[Root Cause Analysis]]
- [[Instrumentation]]
