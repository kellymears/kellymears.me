---
aliases:
  - Hashing
  - Content addressing
tags:
  - systems
summary: A function mapping arbitrary input to a fixed-size digest, used for identity, integrity, and addressing.
---
A **hash function** maps input of any size to a fixed-size value. The properties that matter are determinism (same input, same digest) and collision resistance (finding two inputs with the same digest should be infeasible).

The uses divide cleanly. *Content addressing* names a thing by its digest, so identity and integrity are the same fact — the model behind Git's object store and behind content-hashed asset filenames, where a changed file necessarily has a new name and cache invalidation becomes unnecessary. *Integrity checking* verifies that a download matches what was published. *Cache keys* summarize a set of inputs so that a change to any of them is detectable; see [[Fingerprint]]. *Password storage* uses deliberately slow functions designed for exactly that, and nothing else.

Two practical cautions. A hash covers exactly what was fed into it — including ordering, so a digest over a list changes when the order changes even if the membership does not, which produces "identical content, different hash" surprises across tools that enumerate in different orders.

And a hash used to derive a value from a small space — a port number, a bucket index — collides regularly. Hashing does not eliminate collisions; it only makes them uniform.

## See also
- [[Determinism]]
- [[Fingerprint]]
- [[Cache Invalidation]]
- [[Version Control]]

## Related
- [[Record and Replay Testing]]
- [[Provenance]]
- [[LLM-as-Judge]]
- [[Write-Ahead Logging]]
- [[Caller ID Authentication]]
- [[Hash Table]]
