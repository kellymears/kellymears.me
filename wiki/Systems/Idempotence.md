---
aliases:
  - Idempotent
tags:
  - systems
summary: The property that performing an operation twice has the same effect as performing it once.
---
**Idempotence** is the property that repeating an operation changes nothing further. Setting a value is idempotent; incrementing one is not. Creating a record with a caller-supplied identifier can be; creating one with a generated identifier is not.

It is the single most useful property in any unreliable system, because it makes *retry* safe. Networks drop responses, jobs get rerun, users double-click, and schedulers overlap. If the operation is idempotent, none of that requires coordination — which is why an idempotency key is standard practice in payment and messaging interfaces.

It also makes automation tractable. A provisioning script that can be run repeatedly is one you can run without thinking; one that fails or duplicates on a second run has to be reasoned about every time. The same applies to scheduled jobs, migrations, and imports: designing so that a double run is harmless removes an entire class of operational anxiety. See [[Cron]] and [[Database Migration]].

The corresponding design work is usually to make the operation *express the desired end state* rather than a delta — write the value rather than adjust it, upsert rather than insert, and derive rather than accumulate. Where a delta is unavoidable, a caller-supplied key and a record of keys already seen restores the property.

## See also
- [[Race Condition]]
- [[Cron]]
- [[Database Migration]]
- [[Determinism]]
- [[Relational Database]]
- [[Seed Data]]
- [[Conflict-Free Replicated Data Type]]
- [[Eventual Consistency]]

## Related
- [[WebRTC]]
- [[Signaling Server]]
