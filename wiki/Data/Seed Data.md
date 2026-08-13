---
aliases:
  - Seeding
  - Demo content
tags:
  - data
summary: Initial content created programmatically to make an empty system usable or demonstrable.
---
**Seed data** is content generated to populate a fresh environment: an administrative account, reference data a system cannot function without, and demonstration content that makes the product show what it does.

It divides into two kinds with different requirements. *Essential* seeds are required for the system to work and belong to the deployment path, which means they must be idempotent and safe to run against a database that may already have them. *Demonstration* seeds exist for development and sales and can be as elaborate as anyone likes, provided they never run in production.

Two lessons repeat.

**Seed content is real content for review purposes.** Nobody reviews it as such, so errors in it live a long time. Descriptive text written from an intended image rather than the actual one passes every automated check — a type checker sees a string, a request returns success for any valid identifier, and an accessibility scan verifies only that alternative text *exists*, never that it describes anything. The only check is looking.

**Seeds encode a data model that will change.** Content authored against an earlier model is not portable to a later one by copying; it is re-authoring. Treating a large seed as a migratable asset underestimates the work considerably.

## See also
- [[Database Migration]]
- [[Test Fixture]]
- [[Idempotence]]
- [[Accessibility]]

## Related
- [[Relational Database]]
- [[Determinism]]
