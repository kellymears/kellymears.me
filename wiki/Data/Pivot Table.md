---
aliases:
  - Crosstab
  - GROUP BY
tags:
  - data
summary: A summary that groups rows by categories and aggregates a value at each intersection, rotating one field into columns, invented for spreadsheets in the early 1990s and equivalent to grouping and pivoting in SQL.
---
A **pivot table** summarizes a table of records by grouping them along one or two categories and aggregating a value at each intersection. Given thousands of sales rows, a pivot table can show regions down the side, months across the top, and total revenue in each cell. The "pivot" is the rotation of a field's values, the months here, from rows into column headers.

The idea came from Pito Salas, who designed Lotus Improv, released in 1991 for NeXT computers. Improv separated data from its presentation, so the same numbers could be regrouped by dragging categories around. Improv sold poorly, but Microsoft added PivotTables to Excel in 1994, where they became one of the program's most used advanced features; see [[Spreadsheet]].

In database terms, a pivot table is a grouped aggregation followed by a reshape. SQL's `GROUP BY` produces one row per combination of categories with a sum, count, or average, and pivoting turns one category's values into columns. Some databases have a `PIVOT` keyword; others need one conditional sum per column. Per-row figures such as running totals or share of the group are a related operation that keeps the detail rows; see [[Window Function]].

Data warehouses build the same idea into their structure. Facts such as sales are stored with dimensions such as date, product, and region, so that analysts can slice and regroup them freely; see [[Dimensional Modeling]]. Engines built for this kind of query store data by column; see [[Columnar Storage]].

The pivot also names a reshaping step in data cleaning. Data can be laid out wide, with one column per month, or long, with a month column and a value column. Long data is easier to filter, group, and plot, while wide data is easier to read. Converting between the two is called pivoting longer and wider, and tools like pandas and R make it one function call; see [[Data Cleaning]] and [[CSV]]. Data stored as entity, attribute, and value rows has to be pivoted wide before most analysis; see [[Entity-Attribute-Value]].

Common mistakes:

- **Averaging averages.** The average of each region's average is not the overall average unless regions are the same size. Grouped totals can even reverse when combined; see [[Simpson's Paradox]].
- **Missing versus zero.** A blank cell can mean no sales or no data, and treating them the same distorts totals; see [[Null]].
- **Stale results.** Spreadsheet pivot tables are snapshots that must be refreshed after the source data changes.
- **Hidden filters.** A filter applied while exploring and then forgotten silently changes every number.

Statistics uses the same layout under the name contingency table, counting how often two categories occur together to test whether they are related. Turning a pivot into a chart is the usual next step; see [[Data Visualization]].

## See also
- [[Prefix Sum]]
- [[Faceted Search]]
- [[Tidy Data]]
- [[Data Table]]
