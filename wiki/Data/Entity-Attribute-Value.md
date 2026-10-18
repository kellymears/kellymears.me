---
aliases:
  - EAV
  - Open schema
  - Custom fields
tags:
  - data
summary: Storing data as rows of entity, attribute, and value instead of columns, which allows arbitrary fields without schema changes and gives up types, constraints, and simple queries in return.
---
**Entity-attribute-value** (EAV) is a way of storing data in which each fact is its own row with three parts: the thing described, the name of the property, and its value. Instead of a `products` table with columns for color and weight, there is one row saying product 42's color is red, and another saying its weight is 1.2.

It began in medicine. Clinical record systems of the 1970s and 1980s had to record thousands of possible findings, symptoms, and test results, of which any patient had only a handful. A table with a column per finding would be enormous and almost entirely empty, and adding a new test would mean changing the schema; see [[Schema Evolution]]. EAV stores only the facts that exist and accepts new attributes as data.

The same need, letting users define their own fields, put EAV into many content and commerce systems. WordPress keeps custom post fields in a meta table of keys and values, and Magento stores product attributes this way.

The costs are steep:

- **No types.** Values usually share one text column, so numbers and dates are stored as strings, compared as strings, and validated by application code if at all.
- **No constraints.** The database can't require an attribute, restrict its values, or point it at another table, because every attribute lives in the same column; see [[Database Constraint]] and [[Foreign Key]].
- **Hard queries.** Reassembling one record with ten attributes takes ten joins of the table to itself, or a pivot; see [[SQL Join]] and [[Pivot Table]]. Filtering on two attributes at once gets worse.
- **Poor planning.** The database's statistics describe one huge mixed column, so the [[Query Planner]] estimates badly.

Database books treat it as an antipattern for these reasons. It is also a version of the inner-platform effect: building a small, worse database inside a real one.

Better options now exist for most of its uses. PostgreSQL's `jsonb` type and similar JSON columns store flexible fields on the row they belong to, can be indexed, and can still be queried with SQL; see [[JSON]] and [[Document Database]]. A [[Wide-Column Store]] keeps sparse columns efficiently by design. A common hybrid keeps well-known fields as real columns and puts only the truly open-ended ones in a JSON column.

EAV is still the right shape in places. The web's linked data standard stores everything as subject-predicate-object triples, which is EAV at internet scale, because no one can fix a schema for the whole web; see [[Ontology]] and [[Structured Data]]. Audit trails that record which field changed, and from what to what, take the same form; see [[Audit Log]].

## See also
- [[Database Normalization]]
- [[Key-Value Store]]
