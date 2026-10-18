---
aliases:
  - Incident management
  - Incident commander
  - On-call
  - On-call rotation
  - Runbook
  - Severity level
tags:
  - delivery
summary: How teams detect, coordinate, and resolve production outages, with clear roles, mitigation before diagnosis, and a review afterward that improves the system instead of blaming people.
---
**Incident response** is the process a team follows when a production system breaks: detecting the problem, coordinating people, restoring service, and learning from it afterward. Software teams borrowed much of it from emergency services, particularly the Incident Command System developed for California wildfires in the 1970s, which gives every responder a defined role so a crowd of experts doesn't become chaos.

**Detection** comes first. Ideally an alert fires before users notice, based on symptoms users would feel, such as errors and slow responses, rather than internal causes. Alerting on how fast a [[Service Level Objective]] is being missed keeps pages meaningful. Someone has to receive the alert: an **on-call rotation** shares responsibility for responding outside working hours, typically a week at a time. Too many false or unactionable alerts cause *alert fatigue*, where people stop responding promptly, so pruning noisy alerts is part of the job.

Once an incident is declared, common practices include:

- **Severity levels.** A shared scale, often SEV1 for a full outage down to SEV4 for minor issues, decides who gets paged and how fast.
- **An incident commander.** One person coordinates, delegates, and makes decisions but doesn't debug. Separating coordination from investigation prevents everyone from digging into logs while nobody tracks the whole picture.
- **One channel and a timeline.** Actions and findings are recorded as they happen, which helps later review.

The most important principle is **mitigate first, diagnose later**. Restoring service matters more than understanding the cause. If the problem began with a deployment, a [[Rollback]] or turning off a [[Feature Flag]] is usually the fastest fix, even before anyone knows exactly what broke. Mean time to restore service is one of the [[DORA Metrics]] for this reason.

**Runbooks** document known procedures for common alerts: what the alert means, how to check it, and how to fix it. They speed up response, especially at 3 a.m., and work best kept close to the alert itself, since stale runbooks suffer from [[Documentation Rot]].

After the incident comes the review. A [[Blameless Postmortem]] reconstructs what happened and why the system allowed it, aiming at fixes to tools and processes rather than individuals. Complex failures rarely have a single cause, so techniques like [[Five Whys]] are used with care; see [[Root Cause Analysis]]. Follow-up actions are tracked like any other work, since an unfixed cause tends to return.

Teams practice before real outages. Game days and [[Chaos Engineering]] inject failures on purpose so responders rehearse the process and find gaps in alerts and runbooks. On-call load is also a health signal: frequent pages wear people down and drive turnover, and a high [[Bus Factor]] risk appears when only one person knows how to fix a system.

## See also
- [[Status Page]]
- [[Syslog]]
- [[Knight Capital Incident]]
- [[Git Revert]]
- [[Morris Worm]]
