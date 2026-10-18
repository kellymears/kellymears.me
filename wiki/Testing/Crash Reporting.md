---
aliases:
  - Crash reporter
  - Error tracking
  - Error monitoring
  - Exception tracking
tags:
  - testing
summary: Automatically capturing crashes and unhandled errors from software in the field, grouping them, and ranking them by impact, so the bugs users actually hit come to light.
---
**Crash reporting** captures failures from software running on real users' devices and servers and sends them back to the people who build it. When an app crashes or throws an unhandled exception, a small library records what it can, uploads it, and a service groups the reports so a team sees "this crash, 4,000 users, since Tuesday's release" instead of a pile of individual events.

It exists because testing can't cover the field. Users have hardware, data, locales, and sequences of actions no test suite anticipated, and most of them never file a [[Bug Triage|bug report]]. They just leave.

A report typically includes:

- **The stack trace**, the chain of function calls at the moment of failure, read from the [[Call Stack]]. Native apps often send a minidump, a compact [[Core Dump]] holding the stack and some memory.
- **Context**: app version, operating system, device, and *breadcrumbs*, a short log of recent events such as screens visited and network requests, which show what led up to the failure.
- **Who and how many**: an anonymous user or session ID, so impact can be counted.

Shipped code is usually compiled or minified, so raw traces show addresses or mangled names. *Symbolication* maps them back to source lines using debug symbols or a [[Source Map]] uploaded at build time, which is why release pipelines publish symbols alongside each build.

**Grouping** is the core trick. The service fingerprints each report, usually by the top frames of its stack, and merges reports with the same fingerprint into one issue. Grouping too finely splits one bug into hundreds of issues; too coarsely merges different bugs. Once grouped, issues can be ranked by users affected, and teams track a *crash-free sessions* rate per release, a natural service level objective.

Crash reporting closes several loops:

- A spike right after a release is the clearest signal to halt a [[Canary Release]] or trigger a rollback.
- A crash that only happens in the field is often a [[Heisenbug]] or a [[Race Condition]], and the breadcrumbs are the best clue toward a [[Minimal Reproducible Example]].
- Errors that are caught and swallowed never appear at all. Code that logs and continues produces a [[Silent Failure]], so many teams report handled-but-unexpected errors too.

There are costs. Reports can capture user content in variable values, URLs, or breadcrumbs, which makes them [[Personal Data]], so scrubbing, sampling, and consent matter. On mobile and games, a crash reporter must itself be crash-proof, writing to disk first and uploading on the next launch.

Crash reporting is one strand of [[Observability]]: errors, alongside logs, metrics, and traces.

## See also
- [[Synthetic Monitoring]]
- [[Kernel Panic]]
- [[Logging]]
- [[Debugger]]
