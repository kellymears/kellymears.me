---
aliases:
  - Spreadsheets
  - VisiCalc
  - Excel
tags:
  - data
summary: A grid of cells where any cell can hold a value or a formula over other cells, the most widely used programming environment in the world, and a frequent source of quiet, expensive errors.
---
A **spreadsheet** is a grid of cells, addressed by column and row, where each cell holds either a value or a formula computed from other cells. Change one number and every formula that depends on it recalculates. That one idea made the spreadsheet the most widely used programming environment in the world, used by many people who would never call themselves programmers.

**VisiCalc**, written by Dan Bricklin and Bob Frankston and released in 1979 for the Apple II, was the first. Accountants bought the computer to run the program; it's often called the first "killer app." Lotus 1-2-3 dominated the 1980s, and Microsoft Excel has dominated since. Google Sheets added real-time collaboration in the browser; see [[Conflict-Free Replicated Data Type]].

Underneath, a spreadsheet is a reactive program. The formulas form a dependency graph, and recalculation updates cells in an order where each cell's inputs are computed before it; see [[Topological Sort]]. A formula that refers back to itself creates a circular reference, which spreadsheets either reject or resolve by iterating. Modern interface frameworks rediscovered this model as fine-grained reactivity; see [[Reactive Signals]]. Excel's formula language became Turing-complete in 2021 with `LAMBDA`, which lets users define their own functions.

Spreadsheets win because they're immediate and visible: data and logic share one surface, every intermediate value is on screen, and there's no deploy step. They're also how much of the world's real data gets entered, shared, and stored.

That visibility hides hazards:

- **Errors are common.** Studies of real spreadsheets, notably by Raymond Panko, find errors in most large ones, and in a small percentage of all formula cells.
- **Logic is hidden in cells.** There are no names, no tests, and no review. A formula that's been copied down a column but missed one row looks identical to a correct one.
- **Silent conversion.** Values typed as text become dates or numbers; long identifiers lose digits to [[Floating-Point Arithmetic]]; see [[Data Cleaning]].
- **Fixed limits.** In 2020, England's public health agency lost nearly 16,000 COVID-19 test results because a pipeline used the old `.xls` format, capped at 65,536 rows, and the extra rows were dropped without warning.

The most cited case is economic. A 2010 paper by Carmen Reinhart and Kenneth Rogoff, used to justify government austerity policies, contained a spreadsheet formula that left out five countries. A graduate student, Thomas Herndon, found it in 2013 while trying to reproduce the results; see [[Reproducibility]].

None of this makes spreadsheets bad tools. They're often the right first version of a system, and many businesses run on them for years. The risk is in the moment they quietly become critical infrastructure without picking up the testing, versioning, and review that critical infrastructure needs; see [[Technical Debt]].

## See also
- [[Local-First Software]]
- [[CSV]]
