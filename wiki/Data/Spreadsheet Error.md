---
aliases:
  - Spreadsheet risk
  - Excel error
tags:
  - data
summary: The mistakes that hide in spreadsheets, from wrong ranges to silent type conversions, which audits find in most large models and which have distorted economic policy, banking losses, public health reporting, and genetics research.
---
**Spreadsheet errors** are mistakes in the formulas, data, or structure of spreadsheets. They're common because spreadsheets are the most widely used programming environment in the world, built mostly by people who don't think of themselves as programmers and checked far less than ordinary software; see [[Spreadsheet]].

Research by Raymond Panko and others, auditing real business spreadsheets, has consistently found errors in a large majority of substantial models. The individual error rate per cell is small, comparable to typing errors, but a model with thousands of formulas almost certainly contains some. Typical mistakes include:

- formulas referencing the wrong range, or a range that wasn't extended when rows were added;
- hardcoded numbers typed over formulas;
- copied formulas whose relative references shift in unintended ways;
- units or periods mixed up, such as monthly against annual figures;
- logic errors, where the formula does exactly what was typed but not what was meant.

Several cases became famous:

- **Economics.** In 2013, Thomas Herndon, with Michael Ash and Robert Pollin, found that a 2010 paper by Carmen Reinhart and Kenneth Rogoff on government debt and growth had a formula that left out several countries, along with other disputed choices. The paper had been cited in debates over austerity. The authors acknowledged the coding error but argued it didn't overturn their main conclusions; see [[Replication Crisis]].
- **Banking.** A 2013 internal review of JPMorgan's "London Whale" trading losses found that a risk model involved manual copying between spreadsheets, and that one calculation divided by a sum instead of an average, understating risk.
- **Public health.** In 2020, England's public health agency failed to report nearly 16,000 positive COVID-19 tests because a process used an old spreadsheet file format limited to about 65,000 rows, so newer results were cut off.
- **Genetics.** Spreadsheets converted gene names such as SEPT2 and MARCH1 into dates. A 2016 study found such errors in roughly a fifth of published papers with gene lists. In 2020, the committee that names human genes renamed several to avoid the problem, and Excel later added an option to turn the conversion off.

Silent conversions are a recurring theme. Leading zeros vanish from postal codes and phone numbers, long identifiers lose digits to limited precision, and text that looks like a date becomes one; see [[Floating-Point Arithmetic]] and [[Type System]].

Remedies borrow from software engineering: separating inputs, calculations, and outputs; review by a second person; test cases with known answers; and tracking versions; see [[Code Review]], [[Unit Test]], and [[Version Control]]. Clear definitions of each column help, as does storing data in a consistent tabular shape; see [[Data Dictionary]] and [[Tidy Data]].

The broader lesson is that unchecked inputs produce confident wrong outputs; see [[Garbage In, Garbage Out]].

## See also
- [[Data Cleaning]]
- [[CSV]]
- [[Software Inspection]]
- [[Data Profiling]]
- [[Double-Entry Bookkeeping]]
