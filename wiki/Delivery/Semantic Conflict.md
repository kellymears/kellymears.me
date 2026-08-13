---
aliases:
  - Logical conflict
  - Silent merge break
tags:
  - delivery
summary: Two changes that merge cleanly and are incompatible in meaning.
---
A **semantic conflict** is an incompatibility between two changes that a textual merge cannot see. Neither touches the same lines, so nothing conflicts, and the combined result is broken.

The canonical examples are mundane. One change renames a value; another adds a caller using the old name — merged, the caller is broken. One change edits a shared string; another adds an assertion naming the old string — merged, the assertion fails. One change relaxes a field to optional; code written elsewhere in the meantime reads it as required — merged, the type checker fails on files neither change touched.

The important consequence for delivery: **per-change validation cannot catch this.** Two changes can each be entirely green and still break combined, and no individual check will ever show it. The only thing that finds a semantic conflict is validating the *combination* — which is what a [[Merge Train]] does, and what a naive back-to-back merge of several green changes does not.

Type systems catch a good share of them, which is a strong argument for them at scale. Tests catch some more. The residue is why integrating frequently, per [[Trunk-Based Development]], is not merely a preference: the smaller the divergence, the fewer chances for two intentions to drift apart unobserved.

## See also
- [[Three-Way Merge]]
- [[Merge Train]]
- [[Continuous Integration]]
- [[Regression]]
- [[Merge Conflict]]
- [[Rebase]]
- [[Schema Drift]]

## Related
- [[Stacked Pull Requests]]
- [[Pull Request]]
