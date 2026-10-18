---
aliases:
  - Foreign keys
  - Primary key
  - Referential integrity
  - Cascading delete
  - Natural key
tags:
  - data
summary: A column that points at a row in another table, with the database refusing any change that would leave the pointer dangling.
---
A **foreign key** is a column, or set of columns, in one table that refers to the *primary key* of another. An `orders` table might have a `customer_id` column that refers to `customers.id`. Declaring it as a foreign key tells the database to enforce **referential integrity**: every value in `customer_id` must match an existing customer. Insert an order for customer 999 when no such customer exists, and the database rejects it.

The **primary key** is the column that uniquely identifies each row. It may be a *natural key*, something that already exists in the data such as an ISBN or email address, or a *surrogate key* invented for the purpose, such as an auto-incrementing integer or a [[Universally Unique Identifier]]. Natural keys tend to change more than people expect: people change email addresses, and countries change codes. Most schemas therefore use surrogate keys and add unique constraints on the natural ones.

When a referenced row is deleted or its key changes, the foreign key's *referential action* decides what happens to the rows pointing at it:

- **Restrict** or **No action.** Refuse the delete while references exist. This is the default and the safest.
- **Cascade.** Delete or update the referring rows too. Deleting a blog post can remove its comments automatically. Powerful, and dangerous on deep chains, where one delete can remove far more than intended.
- **Set null** or **Set default.** Keep the referring rows but clear the reference, as when a deleted author's posts become authorless.

Foreign keys are the glue of [[Database Normalization]]: splitting data into tables only works if the links between them can be trusted. Without enforcement, orphaned rows accumulate, comments for deleted posts and line items for missing orders, and every query must defend against them.

Some teams skip foreign key constraints, especially at large scale. Checking them costs time on every write, they make bulk loads and some [[Database Migration]] steps harder to order, and they can't span the boundaries of [[Database Sharding]] or separate services. In a microservices architecture, each service owns its data, so references across services are just IDs that may dangle, and consistency is maintained by events and patterns such as the [[Saga Pattern]] instead. Those trade-offs are real, but dropping constraints moves the integrity check into application code, where a bug or a [[Race Condition]] lets bad data in silently.

Foreign keys interact with other choices. A [[Soft Delete]] leaves rows in place, so cascades never fire and references to "deleted" rows stay valid. Columns used as foreign keys usually need a [[Database Index]], since joins and cascading checks look rows up by them, and some databases don't create one automatically. [[Seed Data]] must be inserted in dependency order, parents before children, a small [[Topological Sort]].

## See also
- [[Database Constraint]]
- [[Common Table Expression]]
- [[Stored Procedure]]
- [[Hierarchical Data]]
