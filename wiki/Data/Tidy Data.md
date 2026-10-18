---
aliases:
  - Long format
  - Wide format
  - Melt
tags:
  - data
summary: A convention for arranging tables for analysis, one variable per column, one observation per row, and one kind of thing per table, which makes data easy to filter, plot, and model even when it is harder for people to read.
---
**Tidy data** is a set of rules for arranging a table so that it is easy to analyze. The statistician Hadley Wickham set them out in a 2014 paper:

1. Each variable forms a column.
2. Each observation forms a row.
3. Each kind of observational unit forms its own table.

The rules sound obvious, but most real data breaks them. Wickham opened by adapting Tolstoy: tidy datasets are all alike, but every messy dataset is messy in its own way.

The common kinds of mess:

- **Values as column headers.** A table with one row per country and a column for each year from 2000 to 2020. The years are values of a "year" variable, but they have been spread across the top.
- **Several variables in one column.** A column named "m1524" holding counts for males aged 15 to 24 packs sex and age band into one name.
- **Variables in both rows and columns**, as in weather data with measurement types listed both down and across.
- **Several kinds of thing in one table**, such as song details repeated on every row of a weekly chart.
- **One kind of thing split across tables**, such as a separate file for each year.

The fix is mostly reshaping. Turning many columns into key–value pairs is called pivoting longer, or **melting**; the reverse is pivoting wider. A tidy table is usually long: more rows, fewer columns; see [[Pivot Table]].

Wide format suits people. A grid with years across the top fits a page and makes comparison by eye easy, which is why reports, [[Spreadsheet]]s, and published tables use it. Long format suits machines. Filtering, grouping, and summarizing work on columns, so when every variable is a column, the same few operations handle any question. Plotting tools map columns to visual properties, such as year to the horizontal axis and country to color; see [[Data Visualization]]. Statistical models take variables as columns too.

The rules restate an older idea in different language. Tidy data is close to the normalized form that database designers reach for, where each fact is stored once in a table about one kind of thing; see [[Database Normalization]] and [[Relational Database]]. Analysts typically arrive from the opposite direction, starting with messy exports and spreadsheets rather than designed schemas; see [[Data Cleaning]].

Like any rule, it can be taken too far. Pushed to the extreme, every fact becomes a row of entity, attribute, and value, which is maximally flexible and miserable to query; see [[Entity-Attribute-Value]]. Analytical warehouses often deliberately widen tables for speed; see [[Dimensional Modeling]] and [[Denormalization]].

Wickham built a family of R packages, the tidyverse, around the idea, and the same verbs now appear in data tools across languages; see [[DataFrame]].

## See also
- [[Columnar Storage]]
- [[Schema Drift]]
- [[Data Table]]
