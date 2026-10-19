---
aliases:
  - Soft deletion
  - Logical delete
  - Tombstone
  - Deleted-at flag
  - Hard delete
tags:
  - data
summary: Marking a record as deleted instead of removing it, which makes deletion reversible and auditable but leaks complexity into every query.
---
A **soft delete** marks a record as deleted, usually with a `deleted_at` timestamp or an `is_deleted` flag, instead of removing it from the database. Queries then filter out the marked rows, so the record disappears from the application while staying in storage. A **hard delete** removes the row for good.

The appeal is easy to see:

- **Undo.** Accidentally deleted data can be restored by clearing the flag. A trash folder with a 30-day recovery window is soft deletion with a scheduled hard delete at the end.
- **History and audit.** Records of what existed, and when it was deleted, stay available for support, reporting, and disputes.
- **Referential safety.** Orders that reference a deleted product still have something to point to.

The costs arrive later and spread everywhere:

- **Every query must remember the filter.** One forgotten `WHERE deleted_at IS NULL` in a report, a join, or a background job, and deleted records reappear. ORMs offer default scopes to apply the filter automatically, which then surprise anyone who needs to see deleted rows.
- **Unique constraints break.** A user deletes their account and tries to sign up again with the same email, and the soft-deleted row still holds it. Workarounds include partial indexes that cover only live rows.
- **Tables and indexes grow** with rows nobody reads, slowing queries that must skip them, as every [[Database Index]] carries the dead entries too.
- **Deletion stops meaning deletion.** Privacy laws give people the right to have their data erased. A soft delete that keeps personal data indefinitely does not satisfy that, so real systems need a hard delete path regardless.

Alternatives often fit better. Moving deleted rows to a separate archive table keeps live tables clean. [[Event Sourcing]] records deletion as an event, keeping history without a flag on current state. Some systems simply hard delete and rely on backups, or on [[Change Data Capture]] streams, for recovery.

Distributed systems use a related idea under the name *tombstone*: a marker that records a deletion so replicas learn about it, since simply removing data would look like data that was never received. [[Conflict-Free Replicated Data Type]] designs and [[Database Replication]] depend on tombstones, which in turn need garbage collection. [[Draft and Published]] workflows face a similar question of what "removed" means for content, and [[Immutability]] answers it by never removing anything at all.

## See also
- [[Audit Log]]
- [[Bitemporal Data]]
- [[Undo]]
- [[Machine Unlearning]]
- [[Data Retention]]
- [[Database Partitioning]]
- [[Foreign Key]]
- [[Null]]
