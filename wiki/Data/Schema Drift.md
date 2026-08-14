---
aliases:
  - Type drift
  - Generated types
tags:
  - data
summary: Divergence between a schema and the code, types, or documentation that describe it.
---
**Schema drift** is the gap that opens between a data model and everything else that claims to describe it: generated types, validation rules, documentation, tooling, and the assumptions embedded in code.

The reliable defense is *generation plus verification*. Types derived from the schema cannot drift by construction, and a build step that regenerates them and fails on any difference converts drift into a red build rather than a runtime surprise. Worth knowing: such a check can be triggered by changes that seem purely cosmetic, since documentation text on a field is frequently emitted into the generated output.

Drift also travels along the type graph in ways a diff cannot show. Relaxing a required field to optional widens its generated type, which breaks every reader in the codebase — including readers written after the change was started, which appear in neither the conflict list nor the change's own diff. The type checker, not the merge, is the detector. See [[Semantic Conflict]].

A related asymmetry causes real bugs: a system may *advertise* a richer schema through its introspection surface than its write path actually accepts. Readers then learn about fields that writes reject. Keeping the two in lockstep — ideally with a test asserting the read model equals the write model — is what closes it.

## See also
- [[Relational Database]]
- [[Schema Validation]]
- [[Documentation Rot]]
- [[Database Migration]]
- [[Deprecation]]
- [[Client-Server Boundary]]

## Related
- [[Tool Use]]
- [[Technical Debt]]
