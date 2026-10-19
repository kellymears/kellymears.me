---
aliases:
  - Backup
  - Backups
  - Point-in-time recovery
  - 3-2-1 rule
  - Recovery point objective
  - Disaster recovery
tags:
  - data
summary: Keeping copies of data that can actually bring it back, and the rule that a backup nobody has restored from should be treated as missing.
---
A **backup** is a copy of data kept so it can be recovered after loss, and **restore** is the act of recovering it. The hard part is not making copies but making copies that work when needed. The industry saying is that nobody wants backups, they want restores.

Data gets lost in many ways: hardware failure, a deleted table, a buggy [[Database Migration]], ransomware, a cloud account closed by mistake, or a fire. Each threat shapes the strategy. The widely cited **3-2-1 rule**, popularized by photographer Peter Krogh, says to keep three copies of data, on two different kinds of storage, with one copy offsite. Modern versions add a copy that is *immutable* or offline, since ransomware and compromised credentials can delete any backup that the attacker can reach.

Replication is not backup. [[Database Replication]] and RAID protect against hardware failure, but they copy mistakes just as faithfully. Delete a table on the primary and the replicas delete it a fraction of a second later. A [[Filesystem Snapshot]] guards against mistakes but usually lives on the same disks, so it fails along with them.

Backup methods for databases:

- **Logical backups** export data as SQL statements or another portable format. Easy to inspect and move between versions, slow for large databases.
- **Physical backups** copy the database's files directly. Fast, but tied to the exact database version.
- **Point-in-time recovery** combines a periodic full backup with the continuous [[Write-Ahead Logging]] stream. Restoring replays the log up to any chosen moment, such as one second before someone ran the wrong `DELETE`.
- **Incremental backups** store only what changed since the last one, often relying on [[Copy-on-Write]] snapshots or content-addressed chunks to avoid storing anything twice.

Two numbers frame a recovery plan. The *recovery point objective* is how much recent data the business can afford to lose, an hour or zero. The *recovery time objective* is how long recovery may take. Tighter targets cost more, and each system deserves its own.

The most important practice is testing restores. Backups fail silently: a job that stopped running months ago, files that are corrupt, credentials nobody can find, or a restore that takes three days when the plan assumed three hours. Regular restore drills, ideally automated, are a kind of [[Chaos Engineering]] for data, and an untested backup is a [[Silent Failure]] waiting to be discovered. Several well-known outages ended with a [[Blameless Postmortem]] revealing that several backup methods had all quietly stopped working.

Backups also carry obligations. They contain the same sensitive data as production and need the same protection, including encryption keys handled through [[Secret Management]], and data deleted under privacy law may linger in old backups until they expire.

## See also
- [[Logical Volume Manager]]
- [[Data Portability]]
- [[Hard Link]]
- [[Hard Disk Drive]]
- [[Data Sovereignty]]
- [[Internet Archive]]
