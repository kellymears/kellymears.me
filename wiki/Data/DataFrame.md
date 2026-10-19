---
aliases:
  - Data frame
  - pandas
  - Polars
  - Split-apply-combine
tags:
  - data
summary: The in-memory table with named, typed columns that statistics languages and data science libraries share, mixing the flexibility of a spreadsheet with the operations of a database, and its pitfalls.
---
A **DataFrame** is a table held in a program's memory, with named columns that each hold one type of value, such as numbers, text, or dates. It is the central structure of data analysis in R, Python, and many other languages: load a file into one, clean it, reshape it, summarize it, and plot it.

The idea came from the S statistics language at Bell Labs, where a 1992 book on statistical models introduced the data frame as the input to model fitting. R, an open-source descendant of S, made it a core type. In 2008 Wes McKinney, then working at an investment firm, began **pandas**, bringing data frames to Python; it became the backbone of Python's data science ecosystem. Later libraries include distributed DataFrames that spread across clusters, and Polars, released in 2020, written for speed and multicore use.

The common operations echo a database's:

- **Select** columns and **filter** rows by conditions.
- **Add** columns computed from others.
- **Group** rows and summarize each group, a pattern Hadley Wickham named **split-apply-combine**; see [[Pivot Table]].
- **Join** two frames on matching keys; see [[SQL Join]].
- **Reshape** between wide and long forms; see [[Tidy Data]].
- **Window** calculations such as running totals or moving averages; see [[Window Function]].

Most implementations store each column contiguously, the way analytical databases do, so arithmetic on a whole column runs as tight loops over arrays and can use the processor's vector instructions; see [[Columnar Storage]] and [[SIMD]]. Writing a loop over rows instead is a classic beginner's mistake that can be hundreds of times slower. Apache Arrow, from 2016, defines a shared columnar memory format so different tools can pass DataFrames without copying or converting them.

Pitfalls:

- **Memory.** A DataFrame usually lives in RAM, and intermediate copies multiply its footprint; a file that fits on disk may not fit in memory.
- **Missing values.** Implementations have represented missing data in inconsistent ways, sometimes as a special floating-point value that silently converts integer columns to decimals; see [[Null]].
- **Silent alignment.** pandas matches rows by their labels when combining data, which surprises people expecting position-by-position arithmetic.
- **Type guessing.** Loading a [[CSV]] means guessing each column's type, and leading zeros in postal codes or IDs disappear when a column is read as numbers; see [[Data Cleaning]].

DataFrames and databases have converged. Early libraries ran each step immediately, in order. Newer ones offer lazy modes that record the whole pipeline and optimize it before running, as a database plans a query; see [[Lazy Evaluation]] and [[Query Planner]]. Embedded analytical databases, meanwhile, can run SQL directly over DataFrames in memory; see [[Relational Database]].

Compared with a [[Spreadsheet]], a DataFrame trades visible cells for reproducible code: every step is written down and can be rerun on next month's data.

## See also
- [[Spreadsheet Error]]
- [[Data Lake]]
