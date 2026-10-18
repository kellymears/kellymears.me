---
aliases:
  - Data cleansing
  - Data wrangling
  - Data quality
  - Imputation
tags:
  - data
summary: Finding and fixing the duplicates, gaps, inconsistent formats, and impossible values that real data always contains, the unglamorous work that decides whether any analysis built on top can be trusted.
---
**Data cleaning** is detecting and correcting errors, inconsistencies, and gaps in data before it's analyzed or used. Real data is messy: collected by different people, systems, and forms over years, with typos, missing fields, and conflicting conventions. It's often said that analysts spend most of their time cleaning rather than analyzing, and the old phrase "garbage in, garbage out" explains why it's worth it.

Common problems:

- **Duplicates.** The same customer entered twice as "Jon Smith" and "John Smith." Matching them is its own discipline; see [[Entity Resolution]].
- **Missing values.** Empty fields, placeholder values such as `0` or `9999`, and the many meanings of absent data; see [[Null]].
- **Inconsistent formats.** Dates written as `03/04/2026` and `2026-04-03`, phone numbers with and without country codes, text in mixed encodings; see [[Character Encoding]].
- **Inconsistent categories.** "NY," "New York," and "new york " as three different states.
- **Units.** Pounds mixed with kilograms. NASA lost the Mars Climate Orbiter in 1999 because one team's software produced thrust in pound-seconds and another's expected newton-seconds.
- **Impossible values.** Negative ages, birthdays in the future, totals that don't equal the sum of their parts.

Some damage comes from tools. Spreadsheets silently convert gene names such as `SEPT2` and `MARCH1` into dates. A 2016 study found such errors in about a fifth of genomics papers with supplementary gene lists, and in 2020 the official committee renamed several human genes to avoid them; see [[Spreadsheet]].

Missing data needs particular care. Rows can be dropped, values can be filled in, which is called *imputation*, using an average or a model's prediction, or missingness can be flagged as information in itself. Each choice changes results. If data is missing for a reason, such as sicker patients skipping follow-up surveys, dropping those rows biases what remains; see [[Selection Bias]] and [[Survivorship Bias]].

Outliers deserve investigation before removal. Some are errors; others are the most important points in the dataset. Deleting values because they look inconvenient is a quiet way to manufacture a result.

Good practice:

- **Keep the raw data untouched.** Clean with code, not by hand, so every step can be rerun and reviewed; see [[Data Lineage]].
- **Validate at the boundary.** Reject or flag bad values when data enters, through types and constraints, rather than discovering them downstream; see [[Data Contract]] and [[Schema Drift]].
- **Test assumptions.** Assertions such as "every order has a customer" catch new kinds of mess as data changes; see [[Assertion]].
- **Look at the data.** Plots reveal problems summary statistics hide; see [[Data Visualization]].

Clean data also isn't the same as correct data. A perfectly formatted dataset can still measure the wrong thing; see [[Ground Truth]].

## See also
- [[Tidy Data]]
- [[Pivot Table]]
- [[Mars Climate Orbiter]]
