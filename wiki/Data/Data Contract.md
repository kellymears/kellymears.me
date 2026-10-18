---
aliases:
  - Data contracts
  - Data product
tags:
  - data
summary: An explicit agreement between the team that produces a dataset and the teams that consume it, covering schema, meaning, and quality, so upstream changes stop silently breaking downstream analytics.
---
A **data contract** is a formal agreement between the producer of a dataset and its consumers about what the data will look like and how it will behave. It specifies the schema, what each field means, quality guarantees, and how changes will be made, and it's checked automatically so violations are caught before they reach anyone downstream.

The idea emerged in data engineering in the early 2020s in response to a familiar failure. Analytics pipelines often read directly from application databases, sometimes by copying every change as it happens; see [[Change Data Capture]]. The application team, unaware anyone depends on a column, renames it, changes its type, or starts storing amounts in cents instead of dollars. Their application works fine. Days later, dashboards show nonsense, a model retrains on broken features, or a pipeline fails at 3 a.m.; see [[Schema Drift]]. Nobody broke a rule, because no rule existed.

A contract makes the dependency explicit. It typically covers:

- **Schema.** Field names, types, and which can be null; see [[JSON Schema]].
- **Semantics.** What each field means, its units, and its valid values. "Revenue" needs to say whether it includes tax and refunds.
- **Quality.** Freshness, such as "updated within an hour," along with completeness and uniqueness.
- **Ownership.** Which team is responsible and how to reach them.
- **Change policy.** How breaking changes are announced, versioned, and phased in; see [[Semantic Versioning]] and [[Backward Compatibility]].

Enforcement is what separates a contract from documentation. Checks run in the producer's build pipeline, so a change that violates the contract fails before deployment, and again when data arrives, so bad batches are quarantined rather than loaded; see [[Continuous Integration]].

The pattern borrows from software APIs. A service doesn't let callers read its private database tables; it publishes an interface. Data contracts apply the same discipline to data: producers publish a stable, intentional dataset, often called a *data product*, and keep their internal tables free to change. Publishing events through a [[Transactional Outbox]] rather than exposing raw tables is one way to build it. Testing that producers still meet consumers' expectations is the data version of [[Contract Testing]].

Limits and criticisms:

- **Organization over tooling.** A contract only works if the producing team accepts responsibility for downstream consumers, which is a change in incentives, not a schema file.
- **Unobserved dependencies.** Consumers will depend on behavior no contract mentions, such as ordering or timing; see [[Hyrum's Law]].
- **Semantics resist formalization.** Types are easy to check; whether a number still means the same thing is not.

Contracts sit alongside other data reliability practices: tracing where data came from and where it flows ([[Data Lineage]]), cleaning what arrives ([[Data Cleaning]]), and versioning schemas deliberately ([[Schema Evolution]]).

## See also
- [[Design by Contract]]
- [[ETL Pipeline]]
