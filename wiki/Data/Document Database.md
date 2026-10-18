---
aliases:
  - Document store
  - Document-oriented database
  - MongoDB
  - Schema-on-read
tags:
  - data
summary: A database that stores each record as a self-contained JSON-like document, so data used together is stored together, at the cost of awkward relationships and schemas that drift.
---
A **document database** stores data as self-contained documents, usually JSON or a binary form of it, grouped into collections. A document can hold nested objects and arrays, so an order can carry its line items, shipping address, and payment details inside one record rather than spread across several tables. MongoDB, released in 2009, made the model popular; CouchDB, Firestore, and others offer variations, and Amazon's DynamoDB blends it with a key-value model.

The guiding principle is that **data accessed together should be stored together**. Fetching an order is one read, with no [[SQL Join]], and the document maps directly onto the objects in application code, avoiding much of the friction that an [[Object-Relational Mapping]] layer exists to smooth over. Documents can also be spread across machines by key, since each is independent, which makes [[Database Sharding]] straightforward.

Documents are often called *schemaless*, but every application has a schema; the question is where it lives. Relational databases enforce it on write. Document databases are mostly **schema-on-read**: the database accepts any shape, and the code reading it must cope with whatever is there. That flexibility helps early, when the data model changes weekly. It hurts later, when years of documents written by different code versions have drifted into many shapes, the problem described under [[Schema Drift]]. Most document databases now support validation rules, often written as [[JSON Schema]], and managing change deliberately is [[Schema Evolution]].

The main design decision is **embedding versus referencing**:

- **Embed** data that belongs to its parent and is read with it, such as an order's line items or a post's tags.
- **Reference** data shared across many parents or that grows without bound, such as the customer behind many orders or a post's thousands of comments.

Relationships are the weak spot. Many-to-many data, such as students and courses, fits documents poorly. Embedding copies shared data into many documents, which is [[Denormalization]] with all its update anomalies: change a customer's name and every embedded copy must change too. Referencing brings back joins, done either in application code, often producing the [[N+1 Query Problem]], or with aggregation features that resemble SQL with more ceremony.

Transactions were long limited to a single document, which was enough when a document held a whole aggregate. MongoDB added multi-document [[ACID]] transactions in 2018, narrowing the gap with relational systems.

The gap has narrowed from the other side too. PostgreSQL's binary JSON column type, added in 2014, can store, index, and query documents inside a relational database, so many teams keep relational tables for core data and documents for the flexible parts. The choice now depends on the shape of the data: self-contained aggregates read whole favor documents, while richly interconnected records that must stay consistent favor [[Database Normalization]] in a [[Relational Database]].

## See also
- [[Entity-Attribute-Value]]
- [[Key-Value Store]]
- [[Denormalization]]
- [[Graph Database]]
