---
aliases:
  - Logs
  - Structured logging
  - Log level
  - Log levels
  - Log aggregation
tags:
  - testing
summary: Recording timestamped events from a running program so people can reconstruct what happened, and how structured logs, levels, and aggregation make them useful at scale.
---
**Logging** is writing a running program's events to a durable record: requests received, decisions made, errors hit. A log is the main way to answer, after the fact, "what was this system doing when that went wrong?" Along with metrics and traces, logs are one of the three classic signals of [[Observability]].

A log entry usually carries a timestamp, a severity, a message, and some context. **Log levels** classify severity so readers and tools can filter:

- **DEBUG** for detailed diagnostic information, usually off in production.
- **INFO** for normal milestones, such as a service starting or a job finishing.
- **WARN** for something unexpected that the program handled.
- **ERROR** for a failure that affected a request or task.
- **FATAL** or **CRITICAL** for failures that stop the program.

Plain-text logs, such as `User 42 failed login from 10.0.0.1`, are easy to write but hard to search reliably. **Structured logging** writes each entry as data, typically JSON with named fields, such as user ID, event name, IP address, and duration. Tools can then filter, group, and count by field: every failed login from one address in the past hour, or the slowest endpoints. Adding a request or correlation ID to every entry lets you pull together all the lines for one request, a lightweight cousin of Distributed Tracing.

In production, logs from many machines are shipped to central **log aggregation** systems for search and retention, because by the time someone investigates, the server that wrote the log may no longer exist. The Twelve-Factor App recommends that applications simply write logs to standard output and leave routing to the environment. On Linux, [[Systemd]]'s journal collects logs from services in a similar way.

Good logging takes judgment:

- **Log what helps an investigation.** Inputs to important decisions, external calls and their results, and the context needed to reproduce a problem.
- **Avoid noise.** Logging every loop iteration buries the signal and costs real money in storage. Frequent alerts on routine warnings breed Alarm fatigue.
- **Never log secrets.** Passwords, tokens, and full payment details in logs are a common source of breaches; see [[Secret Management]]. Logs containing [[Personal Data]] fall under privacy law.
- **Log errors once, with context.** The same failure logged at every layer of the [[Call Stack]] creates duplicates without adding information.

Logs are central to debugging. Print debugging is logging's simplest form. Crash Reporting tools capture error-level events with stack traces automatically, and [[Instrumentation]] is the broader practice of adding hooks to see inside a program.

During Incident Response, logs are often the primary evidence, which is why logging decisions made in calm times shape how quickly problems get solved later.

## See also
- [[Middleware]]
- [[Audit Log]]
