---
aliases:
  - Migrations
  - Schema migration
tags:
  - data
summary: A versioned, ordered change to a database schema, applied once and recorded.
---
A **database migration** is a versioned script that changes a schema, applied in order and recorded so it runs exactly once per environment. Migrations are how a schema evolves without anyone hand-editing production.

The discipline has a few unforgiving rules, most of which are learned by violating them.

**A migration that has run anywhere is frozen.** Editing or renaming it does nothing to the environments that already recorded it, so their schema no longer matches any file. Changes must be *appended*.

**Order is the whole mechanism**, and ordering is by name. An appended migration must sort into the right place — and if the sequence includes a data-seeding step, a schema addition must sort *before* it, because a data layer's insert typically names every column in its current model and a fresh environment will fail on a column that does not yet exist.

**Reversal is often a lie.** A down migration that deletes data cannot distinguish seeded data from authored data, so refusing to run is more honest than guessing. And bulk deletion inside a migration transaction can hang indefinitely rather than failing.

The only verification that proves any of this is running the real path: reset, migrate, build, start in production mode, and request the result.

## See also
- [[Relational Database]]
- [[Seed Data]]
- [[Continuous Deployment]]
- [[Idempotence]]
- [[Schema Drift]]

## Related
- [[Write-Ahead Logging]]
- [[Hash Table]]
