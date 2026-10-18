---
aliases:
  - Star schema
  - Snowflake schema
  - Fact table
  - Dimension table
  - Slowly changing dimension
tags:
  - data
summary: Organizing analytical data into fact tables of measured events surrounded by dimension tables describing them, the star-shaped design behind most data warehouses.
---
**Dimensional modeling** organizes data for analysis rather than for running an application. It splits data into two kinds of table. **Fact tables** record measurable events, one row per sale, click, shipment, or ride, with numeric measures such as amount, quantity, or duration. **Dimension tables** describe the context of those events: the date, the product, the customer, the store, the route. Drawn out, a fact table in the middle with dimensions around it looks like a star, hence the *star schema*. Ralph Kimball laid out the method in *The Data Warehouse Toolkit* in 1996, and it still shapes analytics.

The design follows from the questions analysts ask: totals and averages of some measure, filtered and grouped by descriptive attributes. "Revenue by product category and month for stores in the Northeast" is a sum over facts, joined to three dimensions, grouped by two of their columns. Every query has the same shape, simple to write and easy for a [[Query Planner]] to optimize.

Key practices:

- **Declare the grain.** Decide exactly what one fact row represents, such as one line item on one receipt, before anything else. Mixing grains in one table produces double counting.
- **Use surrogate keys.** Facts reference dimensions through warehouse-generated keys rather than source system IDs, so dimensions can keep history and survive changes upstream.
- **Build a date dimension.** One row per day, with columns for weekday, month, quarter, holiday, and fiscal period, so time questions become simple filters, sidestepping repeated date math and [[Time Zone]] confusion.
- **Conform dimensions.** Share the same customer and product dimensions across fact tables so results from different business processes line up.

Dimensions are denormalized: a product row carries its category, department, and brand directly. That is [[Denormalization]] on purpose, trading storage for fewer joins. A *snowflake schema* normalizes dimensions back into sub-tables, saving space at the cost of more joins, and is generally discouraged unless dimensions are huge.

**Slowly changing dimensions** handle attributes that change over time, such as a customer moving to another region. Type 1 overwrites the old value, losing history. Type 2 adds a new row with validity dates, so old sales stay attributed to the old region, much as [[Event Sourcing]] preserves what was true at the time. Type 3 keeps a column for the previous value.

Kimball's approach competed in the 1990s with Bill Inmon's, which built a normalized enterprise warehouse first and derived departmental marts from it. Modern practice mixes both. Cloud warehouses built on [[Columnar Storage]] make wide denormalized tables cheap, and some teams skip dimensions for "one big table" designs, while transformation tools rebuild star schemas from raw data in an [[ETL Pipeline]].

Warehouses often leave [[Foreign Key]] constraints unenforced for loading speed, and keep pre-aggregated summaries as a [[Materialized View]].

## See also
- [[Pivot Table]]
- [[Bitemporal Data]]
- [[Entity-Relationship Model]]
- [[Data Lake]]
