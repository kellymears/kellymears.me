---
aliases:
  - WAL
  - Journaling
tags:
  - computation
summary: Recording the intent of a change durably before applying it, so a crash can be recovered.
---
**Write-ahead logging (WAL)** appends a description of a change to a sequential log and forces it to durable storage *before* the change is applied to the data itself. If the process dies mid-update, recovery replays the records belonging to committed transactions and discards the incomplete ones, so the store is never observed half-written.

The ordering constraint is the whole idea, and it is also fast: appending is sequential where updating in place is scattered, so the log absorbs the writes and the slow rewriting of pages is deferred and batched.

**Durability rests on fsync.** An ordinary write reaches only the operating system's page cache; an explicit flush forces the device and reports back. Flushing once per transaction bounds loss to nothing and costs a device round trip, so systems offer group commit, and looser modes that trade a window of recent commits for latency. Devices with volatile write caches have historically reported completion early, so a durability guarantee nobody has tested by cutting power is a datasheet claim rather than evidence; see [[Falsifiability]].

**Checkpointing** bounds recovery. The log grows without limit, so the system periodically flushes dirty state and writes a checkpoint to replay from. Replay must be safe to repeat, making [[Idempotence]] a requirement — usually enforced by stamping each page with the sequence number last applied to it, so older records are skipped. Each record carries a checksum from a [[Hash Function]] so a torn write at the tail is discarded rather than replayed, and a record saying "set the column to the current time" breaks [[Determinism]] and must store the computed value instead.

The log doubles as a [[Provenance]] trail for every mutation, which is why it feeds replication out of a [[Relational Database]] and why followers replaying a leader's log reach [[Eventual Consistency]].

## See also
- [[Relational Database]]
- [[Idempotence]]
- [[Determinism]]
- [[Eventual Consistency]]
- [[Provenance]]

## Related
- [[Hash Table]]
- [[Seed Data]]
- [[Record and Replay Testing]]
