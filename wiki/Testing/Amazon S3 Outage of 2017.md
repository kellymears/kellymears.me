---
aliases:
  - S3 outage
  - US-EAST-1 outage
tags:
  - testing
summary: A mistyped command during routine maintenance in 2017 removed far more servers than intended from Amazon's storage service in its busiest region, taking down large parts of the web for hours and exposing restart paths that hadn't been exercised in years.
---
**The Amazon S3 outage of 2017** was a disruption of Amazon Web Services' object storage service in its US-EAST-1 region, in northern Virginia, on February 28, 2017. For roughly four hours, S3 in that region failed to serve requests, and a large number of websites and services that depended on it broke or slowed; see [[Cascading Failure]].

Amazon's published summary described the cause. An engineer debugging a slow billing system ran an established command meant to remove a small number of servers from one subsystem. One input was entered incorrectly, and the command removed a much larger set of servers, including ones supporting two critical subsystems: one that tracks where every object is stored, and one that allocates storage for new objects.

Those subsystems had to be fully restarted, and the restart took far longer than anyone at Amazon had expected or planned for. They hadn't been completely restarted in the larger regions for many years, during which S3 had grown enormously. Safety checks and validation steps had to process the index of a vastly larger system; see [[Cold start]].

Several details became famous:

- **The status page broke.** AWS's service health dashboard depended on S3 itself, so for a while it couldn't show that S3 was down; see [[Status Page]].
- **The blast radius.** Many services had concentrated in a single region, so one regional failure looked like an internet-wide outage; see [[Blast radius]].
- **Dependencies within AWS.** Other AWS services that relied on S3 in the region were affected too, widening the damage.

Amazon's response focused on making the tool safer and the system more resilient. The capacity removal tool was changed to remove servers more slowly and to refuse operations that would drop a subsystem below its minimum required capacity; see [[Mistake-proofing]] and [[Guardrail]]. Amazon also accelerated work to break the index subsystem into smaller partitions, so that failures and restarts would affect less at once.

The incident became a common case study for several reasons:

- **Recovery paths decay.** Procedures that are rarely run, like full restarts, stop working as systems change; see [[Chaos Engineering]] and [[Crash-Only Software]].
- **Typos are inevitable.** Tools should make dangerous operations hard, not rely on people being perfect; see [[Defensive Programming]].
- **Monitoring must be independent.** A monitor that shares a dependency with the system it watches fails with it; see [[Synthetic Monitoring]].

The postmortem avoided blaming the engineer, focusing instead on the tool and the system; see [[Blameless Postmortem]]. Many organizations responded by reviewing their dependence on a single region and their own recovery procedures; see [[Incident Response]].

## See also
- [[GitLab Database Incident]]
- [[Cloudflare Outage of 2019]]
- [[Facebook Outage of 2021]]
