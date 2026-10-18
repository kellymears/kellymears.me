---
aliases:
  - Audit trail
  - Tamper-evident log
  - Hash chain
tags:
  - data
summary: An append-only record of who did what, to what, and when, kept to answer questions of accountability long after the fact, and built so that even its administrators can't quietly rewrite it.
---
An **audit log** is a chronological record of actions taken in a system: who did what, to which record, when, and with what result. Where ordinary application logs help engineers debug, an audit log exists for accountability. It answers questions such as "who changed this customer's bank details," "who viewed this patient's file," and "when was this permission granted," sometimes years later.

A useful entry records:

- **Actor.** The user, service account, or automated job responsible, and on whose behalf it acted.
- **Action and target.** What happened and to which object.
- **Time and place.** A timestamp and the request's origin, such as an IP address or device.
- **Outcome.** Whether it succeeded, and often the values before and after.

Audit logs differ from debugging logs in what they demand; see [[Logging]]:

- **Completeness.** A debug log can drop lines under load. An audit log with gaps can't be trusted, so writes are usually part of the same transaction as the change they record; see [[ACID]] and [[Transactional Outbox]].
- **Retention.** Regulations in finance, healthcare, and payments require keeping them for years.
- **Immutability.** Entries are only ever appended, never edited or deleted.

**Tamper evidence** matters because the people most able to alter records, administrators, are sometimes the people under investigation. Two techniques help:

- **Separation.** Ship entries immediately to a separate system that the audited system's operators can't modify.
- **Hash chaining.** Each entry includes a hash of the previous one, so changing or removing any entry breaks every hash after it; see [[Hash Function]]. Periodically publishing or signing the latest hash anchors the chain. Organizing entries as a [[Merkle Tree]] allows efficient proofs that a given entry is included, the design behind public certificate logs; see [[Certificate Authority]].

Common failures:

- **Bypass.** Changes made directly in the database, by scripts or administrators, skip the application code that writes audit entries. Database-level triggers or reading the database's own log close the gap; see [[Change Data Capture]].
- **Oversharing.** Logging full request bodies can capture passwords, tokens, or sensitive [[Personal Data]], turning the audit log into a liability.
- **Unreadable volume.** A log nobody can search or alert on deters no one. Structured entries and alerts on sensitive actions make it useful.
- **Missing actors.** Records that say "system" instead of naming the job or the person who triggered it.

Audit logs connect to several data patterns. [[Event Sourcing]] stores every change as an event, which gives a complete history as a side effect. [[Soft Delete]] keeps deleted records available for review. Temporal tables record what the database believed at each point in time; see [[Bitemporal Data]]. All share the idea that history is data worth keeping, not exhaust to discard.

## See also
- [[Data Breach]]
- [[Row-Level Security]]
- [[Syslog]]
- [[Data Retention]]
