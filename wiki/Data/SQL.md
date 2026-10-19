---
aliases:
  - Structured Query Language
  - SEQUEL
  - Query language
tags:
  - data
summary: The declarative language for asking questions of relational databases, designed at IBM in the 1970s, standardized in 1986, repeatedly declared obsolete and still the most widely used way to read and write structured data.
---
**SQL** is the language used to define, query and change data in a [[Relational Database]]. A query describes the result wanted, such as every customer in Ohio with an unpaid invoice, and leaves the database to decide how to find it. That separation of what from how is the language's defining idea.

Its roots are in Edgar Codd's 1970 paper proposing that data be stored as tables of rows and manipulated with set operations, instead of by programs following pointers from record to record. Two IBM researchers, Donald Chamberlin and Raymond Boyce, designed a language for Codd's model in 1974 and called it SEQUEL, for Structured English Query Language. A trademark conflict shortened the name to SQL, which is why it is still pronounced both as letters and as "sequel." The first commercial implementation came from the company that became Oracle in 1979, ahead of IBM's own. ANSI standardized the language in 1986, and it has been revised many times since.

A query is a handful of clauses: which columns to select, from which tables, filtered how, grouped and sorted how. Combining tables is done with joins, and later standards added recursive queries and analytic functions that compute running totals and rankings across rows. Because the query says nothing about method, the database's planner chooses which indexes to use and in what order to join, and the same query can run in milliseconds or hours depending on that choice.

The language has well-known rough edges. Missing values follow a logic with three outcomes, true, false and unknown, so a comparison with an empty value is neither true nor false and rows quietly disappear from results; see [[Three-valued logic]]. Every major database speaks its own dialect, so code written for one rarely runs unchanged on another. Building queries by pasting user input into strings remains one of the most common security holes on the web; see [[SQL Injection]].

Application programmers have often tried to hide SQL behind libraries that map tables to objects, with mixed results; see [[Object-Relational Mapping]]. In the late 2000s, the NoSQL movement argued that relational databases couldn't scale to web workloads and dropped the language along with the tables. Many of those systems later added query languages that look a lot like SQL, and newer distributed databases offer SQL on top of horizontally scaled storage; see [[NoSQL]].

SQL now runs everywhere from phones to analytics engines over petabytes, often embedded in a single file; see [[SQLite]]. With recursion, it is even Turing complete.

## See also
- [[Isolation Level]]
- [[Upsert]]
- [[Materialized View]]
