---
aliases:
  - SemVer
tags:
  - delivery
summary: A version-numbering convention where the number communicates the kind of change.
---
**Semantic versioning** assigns three numbers — major, minor, patch — with defined meanings: a major bump signals a breaking change, a minor bump a backward-compatible addition, a patch a backward-compatible fix. Pre-release and build identifiers can be appended.

The convention's value is that it lets a version range express a risk tolerance. Accepting compatible minor and patch updates while refusing majors is a policy that a range can encode, which is why automated dependency updating is possible at all.

Its weakness is that compatibility is a judgement, not a property a tool can compute. Whether a change breaks someone depends on what they relied on — including behaviour that was never part of the documented interface. A change that is minor by the letter of the specification can break real consumers, which is the observation behind Hyrum's law: with enough users, every observable behaviour of a system becomes something someone depends on.

The practical consequences are that a major bump deserves a migration path and a [[Deprecation]] window rather than a note, and that pinning exact versions is a reasonable posture for anything where reproducibility matters more than automatic updates. See [[Lockfile]].

## See also
- [[Deprecation]]
- [[Lockfile]]
- [[Conventional Commits]]
- [[Package Manager]]

## Related
- [[Supply Chain Security]]
- [[Silent Failure]]
- [[Monorepo]]
- [[Secret Management]]
- [[Bundler]]
