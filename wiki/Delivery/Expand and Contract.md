---
aliases:
  - Parallel change
  - Expand-contract migration
  - Expand, migrate, contract
tags:
  - delivery
summary: Making a breaking change in three safe steps, first adding the new form alongside the old, then moving every user over, and only then removing the old one.
---
**Expand and contract**, also called *parallel change*, is a way to make a breaking change to an interface, schema, or data format without breaking anything along the way. Instead of changing the old form in place, which breaks every user at once, the change is split into three steps that can each be deployed and rolled back independently:

- **Expand.** Add the new form alongside the old one. Both work. Nothing that uses the old form is affected.
- **Migrate.** Move every user, caller, or record from the old form to the new one, gradually and verifiably.
- **Contract.** Once nothing uses the old form, remove it.

Renaming a database column is the classic example. Renaming it directly breaks any running code that still uses the old name, and during a deployment old and new versions of the application always run side by side. With expand and contract:

1. Add the new column. Change the application to write to both columns and read from the old one.
2. Copy existing data from the old column into the new one in the background.
3. Change the application to read from the new column.
4. Stop writing to the old column, then drop it.

Each step is small, compatible with the version before it, and safe to deploy without downtime. If something goes wrong, the previous step still works, so a [[Rollback]] is always possible. This is how [[Database Migration]] tools are used safely in systems that deploy continuously, and it underpins [[Zero-Downtime Deployment]] generally.

The same pattern applies to APIs. A new field or endpoint is added while the old one keeps working, clients move over, usage of the old one is monitored until it reaches zero, and then it is removed, following a [[Deprecation]] process.

The pattern costs time and some temporary complexity. For a while, the code supports two forms, and the contract step is easy to forget once the urgent part is done, leaving dead columns and compatibility shims behind as [[Technical Debt]]. The migrate step also needs verification, such as comparing old and new values or monitoring for reads of the old form, since [[Hyrum's Law]] means someone may depend on the old behavior in a way nobody expected.

Expand and contract works hand in hand with [[Feature Flag]] switches, which control when the application starts reading the new form, and with [[Trunk-Based Development]], since every step can merge to the main branch without waiting for the whole change. The same thinking scaled up to entire systems is the [[Strangler Fig Pattern]], which replaces an old system piece by piece while both run.

## See also
- [[Database Migration]]
- [[Zero-Downtime Deployment]]
- [[Strangler Fig Pattern]]
- [[Deprecation]]
- [[Backward Compatibility]]
- [[Rolling Deployment]]
