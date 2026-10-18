---
aliases:
  - Lineage
  - Data provenance
  - Data catalog
  - Impact analysis
  - OpenLineage
tags:
  - data
summary: A record of where each dataset came from, what transformed it, and what depends on it, used to trace bad numbers upstream and predict what a change will break downstream.
---
**Data lineage** records where data came from, what happened to it along the way, and where it goes next. For any table, dashboard, or model, lineage answers which sources fed it, which jobs transformed it, and which reports, exports, or models consume it. Lineage can be tracked per dataset or per column, showing, say, which billing columns feed a dashboard's revenue figure.

It is the data version of [[Provenance]], and it serves two directions of question.

- **Upstream, for debugging.** When a number looks wrong, lineage traces it back through every transformation to the source, turning a vague hunt into [[Root Cause Analysis]] along a known path. Was the source late, did a join drop rows, or did an upstream column change meaning?
- **Downstream, for impact.** Before renaming a column, changing a calculation, or retiring a table, lineage lists everything that depends on it. That turns an unknown risk into a checklist, and catches the reports that would quietly break from [[Schema Drift]].

Lineage forms a directed graph of datasets and jobs, normally acyclic, so it can be ordered with a [[Topological Sort]], the structure orchestrators use to run pipeline steps in order. Tools such as dbt build this graph from references between models, so lineage comes free with declared dependencies.

There are several ways to capture it:

- **Parsing.** Reading SQL and pipeline code to infer which columns feed which, accurate for declared logic but blind to anything computed dynamically.
- **Runtime instrumentation.** Jobs report what they read and wrote as they run. The OpenLineage standard, started in 2020, defines a common format so different tools can emit and collect these events.
- **Manual documentation.** Diagrams and wiki pages, quick to start and quick to go stale.

Lineage usually lives in a **data catalog**, a searchable inventory of datasets with owners, descriptions, freshness, quality checks, and the lineage graph. Open-source examples include Lyft's Amundsen and LinkedIn's DataHub. The catalog is what keeps a [[Data Lake]] from becoming a swamp: nobody trusts a dataset they cannot trace.

Regulation increasingly demands lineage. After the 2008 financial crisis, banking supervisors issued principles in 2013 requiring banks to show how risk figures were aggregated from source data. Privacy law requires organizations to know where [[Personal Data]] flows so they can answer access requests and delete it everywhere. Machine learning adds training data: knowing exactly which data trained a model matters for copyright, consent, reproducing results, and detecting [[Benchmark Contamination]].

Lineage pairs with pipeline [[Observability]]: freshness, volume, and schema monitors detect a problem; lineage shows what caused it and who else is affected. Systems built on [[Change Data Capture]] and [[Event Sourcing]] have an advantage, since an append-only history of changes is itself a lineage record.

## See also
- [[Audit Log]]
- [[ETL Pipeline]]
- [[Data Cleaning]]
- [[Data Mesh]]
- [[Data Contract]]
