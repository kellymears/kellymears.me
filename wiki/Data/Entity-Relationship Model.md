---
aliases:
  - ER diagram
  - Entity-relationship diagram
  - Crow's foot notation
tags:
  - data
summary: Peter Chen's 1976 way of describing data as things, their attributes, and the relationships between them, drawn as boxes and lines before any table is created.
---
The **entity-relationship model** describes data as **entities** (the things a system keeps track of, such as customers, orders, and products), their **attributes**, and the **relationships** between them. Peter Chen introduced it in a 1976 paper as a way to describe the meaning of data independently of how any database stores it. It is usually drawn as an **ER diagram**, and it remains the most common way to sketch a schema before building one.

The parts:

- **Entity types.** Kinds of things, drawn as boxes. Each instance needs some way to be told apart from the others, which becomes a key; see [[Universally Unique Identifier]].
- **Attributes.** Facts about an entity, such as a name or a price.
- **Relationships.** How entities connect: a customer *places* an order, an order *contains* products.
- **Cardinality.** How many of each side can take part: one-to-one, one-to-many, or many-to-many, and whether participation is required.

Chen's original notation used diamonds for relationships and ovals for attributes. Most practitioners now use **crow's foot** notation, where lines between boxes end in marks: a bar for "one," a circle for "zero," and a three-pronged fork for "many." It is compact enough to fit a whole schema on a whiteboard. UML class diagrams express the same ideas with numbers on the lines.

The model maps onto a [[Relational Database]] in predictable steps. Each entity becomes a table and each attribute a column. A one-to-many relationship becomes a [[Foreign Key]] on the "many" side. A many-to-many relationship can't be stored directly, so it becomes a junction table holding a pair of keys, which often turns out to deserve attributes of its own: the line between student and course becomes an *enrollment* with a grade and a date. [[Database Normalization]] then refines the result.

Drawing the diagram first is useful because the hard questions are about the domain, not the database. Can an order have no customer? Can a product belong to two categories? Getting these answers from the people who know the business is easier with boxes and lines than with SQL, and a shared vocabulary falls out of the exercise. The diagram also exposes the mistakes that are expensive to fix later, like modeling an address as a column when people have several.

The model has limits. It describes structure but not behavior, so rules like "an order can't ship before payment" need to live elsewhere; see [[Database Constraint]]. Large ER diagrams become unreadable, and teams often split them by area. And not every system is relational: [[Dimensional Modeling]] arranges the same entities around events for analysis, and a [[Graph Database]] stores relationships as first-class records, closer to Chen's drawings than tables are.

## See also
- [[Ontology]]
- [[Object-Relational Mapping]]
- [[Information Architecture]]
