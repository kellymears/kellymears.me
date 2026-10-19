---
aliases:
  - Column profiling
tags:
  - data
summary: Systematically summarizing what a dataset actually contains, its value counts, gaps, ranges, patterns, and hidden keys, before trusting or transforming it, the step that catches problems documentation never mentions.
---
**Data profiling** is the systematic examination of a dataset to learn what it actually contains, as opposed to what its documentation says it contains. Before loading, joining, or analyzing data, a profile summarizes each column and the relationships between them. It's the data equivalent of inspecting a used car before buying it.

A typical column profile reports:

- **Completeness.** How many values are empty, and in what forms. Missing data hides behind blanks, the word "none," and placeholder numbers such as 9999; see [[Null]] and [[Sentinel Value]].
- **Cardinality.** How many distinct values appear. A supposedly unique ID with duplicates is a problem worth finding early.
- **Range and distribution.** Minimums, maximums, averages, and a histogram of frequencies, which expose impossible values and suspicious spikes; see [[Histogram]].
- **Patterns.** The shapes values take, such as five digits for one kind of postal code or several date formats mixed in one column.
- **Types.** Whether numbers stored as text, or text stored as numbers, will convert cleanly, and whether codes with leading zeros will survive.

Profiling across columns finds structure nobody wrote down. If knowing a ZIP code always determines the city, the data has a hidden dependency. Columns in two tables whose values overlap are candidates for a join; see [[Foreign Key]]. Sometimes the same entity appears under several spellings, which is a deeper problem; see [[Entity Resolution]].

The approach descends from exploratory data analysis, which the statistician John Tukey championed in the 1970s: look at the data in many ways before testing hypotheses about it. Profiling applies that habit to every column before any modeling starts. Tools now automate much of the work. A single command in a data-analysis library can summarize every column; see [[DataFrame]]. Exact distinct counts get expensive on huge tables, so profilers often estimate them; see [[HyperLogLog]].

Profiling surfaces problems that are invisible downstream:

- **Encoding damage.** Garbled accented characters in a name column point to a file read with the wrong encoding; see [[Mojibake]].
- **Spreadsheet artifacts.** Gene names turned into dates, or leading zeros stripped from codes, survive silently until someone looks; see [[Spreadsheet Error]].
- **Drift.** A profile compared against last month's shows that a source changed shape; see [[Schema Drift]].

The results feed several later steps. They guide cleaning, document the dataset, and become rules that incoming data must satisfy; see [[Data Cleaning]] and [[Data Dictionary]]. In pipelines, automated profiling checks act as tests for data, failing a load when values fall outside what's expected.

Even a statistical fingerprint can be informative. Some naturally occurring numbers follow a predictable pattern in their leading digits, and fabricated figures often don't; see [[Benford's Law]].

## See also
- [[Reference Data]]
- [[Phonetic Algorithm]]
