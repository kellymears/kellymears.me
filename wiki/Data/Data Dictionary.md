---
aliases:
  - Codebook
  - Business glossary
tags:
  - data
summary: A reference describing every field in a dataset or database, its name, type, meaning, units, and allowed values, the unglamorous document that decides whether anyone else can use the data correctly.
---
A **data dictionary** describes each element of a dataset or database: its name, data type, meaning, units, allowed values, and where it comes from. Without one, a column named "status" holding the numbers 1 through 5 is a puzzle. With one, it says that 3 means "shipped" and that the value was added in 2019.

The term has two overlapping senses:

- **The system catalog.** Every relational database keeps an internal dictionary of its own tables, columns, types, and constraints, which software can query. The SQL standard defines a portable version called the information schema; see [[Database Constraint]].
- **Documentation for people.** A written reference, often a spreadsheet or web page, that explains what fields mean, how they're calculated, and how to use them correctly.

Social scientists call the second kind a **codebook**. Survey datasets ship with one explaining each question, how answers were coded, and what special values like "refused" or "not asked" look like. Analysts who skip the codebook routinely mistake a code such as 99 for a real value. Missing data needs particular care, because blanks, zeros, and placeholders can mean very different things; see [[Null]].

A useful entry records:

- the field's name and plain-language definition;
- its type and format, such as a date or a currency amount;
- its units, which cause famous failures when assumed; see [[Mars Climate Orbiter]];
- allowed values or ranges, and what each code means;
- its source and how it's derived; see [[Data Lineage]];
- who owns it and when it changed.

Businesses distinguish a data dictionary, which is technical and tied to specific tables, from a **business glossary**, which defines concepts such as "active customer" or "revenue" across the organization. Arguments over definitions are often real disagreements about the business; two departments counting customers differently will produce reports that never match. Formal vocabularies take this further; see [[Ontology]].

Dictionaries go stale. Columns get added, meanings drift, and the documentation lags behind; see [[Documentation Rot]] and [[Schema Drift]]. Practices that keep them current include generating parts from the database itself, storing descriptions alongside the schema in version control, and treating definitions as agreements between the teams that produce and consume data; see [[Docs as Code]] and [[Data Contract]].

A dictionary also supports cleaning and validation, since knowing the allowed values reveals the ones that don't belong; see [[Data Cleaning]]. Datasets arranged with one variable per column and one observation per row are much easier to document; see [[Tidy Data]].

The underlying idea is that data separated from its meaning is close to worthless; see [[Metadata]]. Numbers without definitions invite confident misreadings, and analyses built on them inherit every error; see [[Garbage In, Garbage Out]].

## See also
- [[Data Governance]]
- [[Data Profiling]]
