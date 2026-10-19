---
aliases:
  - Data as a product
  - Domain-oriented data ownership
tags:
  - data
summary: An approach to analytical data that hands ownership of each data set to the team that produces it, published as a product with a contract, instead of funneling everything through one central data team.
---
A **data mesh** is a way of organizing analytical data in a large organization by handing each data set to the team that knows it best. Zhamak Dehghani proposed it in 2019 as a reaction to the central [[Data Lake]] and warehouse, where one data team ingests everything from everywhere and becomes the bottleneck for every question.

The diagnosis was organizational. In the centralized model, the teams producing data, such as checkout or shipping, don't own what happens to it downstream. A central team of data engineers writes pipelines against source schemas they don't control, which break when those schemas change; see [[Schema Drift]] and [[ETL Pipeline]]. That team understands neither domain deeply and is always behind. It's [[Conway's Law]] applied to data: the architecture mirrors a structure in which one team sits between everyone else.

Dehghani's four principles:

1. **Domain ownership.** Each business area owns its analytical data as well as its operational systems. The team that runs checkout publishes checkout data.
2. **Data as a product.** Published data sets are treated as products, with users, documentation, quality checks, and promises about freshness and shape. A **data product** has an owner and a [[Data Contract]], and changes to it are versioned like any public interface; see [[Service Level Objective]].
3. **Self-serve platform.** A shared platform team provides storage, pipelines, access control, and discovery, so each domain doesn't rebuild them; see [[Platform Engineering]].
4. **Federated governance.** Rules that must hold everywhere, such as identifiers, privacy handling, and naming, are set jointly and enforced automatically by the platform; see [[Personal Data]].

The idea borrows directly from [[Microservices]], which split a monolith by business capability, and from the inverse Conway maneuver, which shapes teams to get the architecture wanted; see [[Team Topologies]].

Critics raise several points. A mesh needs domain teams that have, or can hire, data skills, and many don't. Data that spans domains, like a customer seen by sales, support, and billing, still needs reconciling, which reintroduces a central function; see [[Entity Resolution]]. Without strong platform tooling, decentralization produces many incompatible data sets nobody can join. And the name was widely applied to tooling purchases that changed no ownership at all.

Where it works, the gains are clear ownership, fewer broken pipelines, and data that comes with someone to ask about it. Many organizations adopt parts of it, especially contracts and named owners, while keeping a central warehouse; see [[Data Lineage]] for tracing what feeds what. The underlying lesson is older than the term: data quality is decided where the data is produced, not where it is cleaned; see [[Data Cleaning]].

## See also
- [[Federated Learning]]
- [[Big Data]]
