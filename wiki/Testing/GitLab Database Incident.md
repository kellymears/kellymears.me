---
aliases:
  - GitLab outage of 2017
  - Untested backups
tags:
  - testing
summary: In 2017, a tired engineer at GitLab deleted the production database while trying to fix replication, and the company then discovered that most of its backup methods hadn't been working, restoring from a lucky six-hour-old snapshot while live-streaming the recovery.
---
**The GitLab database incident** was an outage of GitLab.com on January 31, 2017, in which an engineer accidentally deleted data from the site's main production database. The company then found that almost none of its backup mechanisms were usable. About six hours of data, including issues, comments, and new user accounts, was permanently lost. GitLab's unusually open handling of the event made it one of the most widely discussed incidents of its kind.

The trouble started with a spam attack that put heavy load on the database. Under that load, the secondary database, a replica meant to stay in sync with the primary, fell behind and stopped replicating; see [[Database Replication]]. Late at night, after several failed attempts to restart replication, an engineer decided to wipe the secondary's data directory and start fresh. The command was run in a terminal connected to the primary. It was stopped within seconds, but by then roughly 300 gigabytes of production data was gone.

The team turned to backups and found them failing one after another:

- **Scheduled database dumps** had been silently failing because of a version mismatch, and the emails reporting the errors had been rejected by the mail system; see [[Logging]].
- **Cloud disk snapshots** hadn't been enabled for the database servers.
- **A storage bucket** expected to hold backups was empty.

What saved them was a snapshot taken about six hours earlier, made manually for a staging environment; see [[Staging Environment]]. Restoring from it was slow, taking most of a day, because the data had to be copied across slow disks.

GitLab documented the recovery in real time in a public document and live-streamed engineers working on it. Its postmortem was candid about the failures and focused on systems rather than the engineer; see [[Blameless Postmortem]].

The incident is now a standard illustration of a few principles:

- **An untested backup isn't a backup.** Only regular restore drills show whether data can actually be recovered; see [[Backup and Restore]] and [[Chaos Engineering]].
- **Silent failures are the dangerous ones.** Monitoring must report missing successes, not just errors; see [[Synthetic Monitoring]].
- **Layered defenses fail together** when nobody checks the layers; see [[Normalization of Deviance]].
- **Destructive commands need guardrails.** Distinct prompts, confirmation steps, and separate credentials for production reduce mistakes, especially under fatigue; see [[Mistake-proofing]].

GitLab afterward assigned clear ownership for backups, added automated restore testing, and revised its procedures; see [[Incident Response]].

The event shares themes with other outages caused by routine operations going wrong at scale, where the recovery path proved far weaker than anyone believed; see [[Amazon S3 Outage of 2017]].

## See also
- [[Testing in Production]]
- [[Sleep Deprivation]]
