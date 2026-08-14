---
aliases:
  - Attribution
  - History of a change
tags:
  - method
summary: The recorded origin of a change or a claim — who made it, when, and on what evidence.
---
**Provenance** is the traceable origin of an artifact: which change introduced a line, what reasoning accompanied it, and what evidence supported it. In software the provenance record is version-control history plus whatever narrative was attached to each change.

It is worth treating as a first-class output. History is the only durable answer to "why is this here", which means a change description is not paperwork — it is the permanent record that a squashed merge writes into the repository. A description containing an unverified causal claim, or a verification bullet describing something nobody actually did, becomes a false statement in the archive. See [[Plausible Mechanism]] and [[Squash Merge]].

Provenance also makes attribution auditable in the other direction. Determining which change caused a failure requires reading check results keyed to the specific revision, not to a branch or a merge preview — a "green" run computed against a state that predates the suspect change proves nothing about it.

The same idea applies to any recorded corpus: an evaluation result, a benchmark, a research summary. Recording *what produced it* — the model, the prompt, the input revision — is what makes it possible to tell a stale result from a current one later. See [[Fingerprint]].

Physical documents solved the adjacent problem — proving a record was not altered in transit — long before cryptography, by making the container itself tamper-evident; [[Letterlocking]] is the studied form of that craft, and its logic survives in [[Code Signing]].

## See also
- [[Version Control]]
- [[Commit]]
- [[Documentation Rot]]
- [[Fingerprint]]
- [[Code Review]]
- [[Code Comment]]

## Related
- [[Atomic Commit]]
- [[Technical Debt]]
