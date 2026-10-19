---
aliases:
  - Sortable table
  - Zebra striping
  - Table design
tags:
  - design
summary: Rows and columns of values designed for looking things up and comparing exact figures, which read best with right-aligned numbers, light rules, and headers that stay put, and remain one of the hardest components to make work on a phone.
---
A **data table** arranges values in rows and columns so readers can look up a specific figure or compare exact numbers. Charts show patterns at a glance; tables answer precise questions, such as what a given item cost last March. Many dashboards and reports need both, and choosing which to use comes down to whether the reader needs the shape of the data or its values; see [[Data Visualization]].

Most of the craft is alignment and restraint:

- **Align numbers right**, and text left, so digits of the same place value line up and magnitudes can be compared by eye.
- **Use tabular figures**, which give every digit the same width, so columns of numbers line up exactly.
- **Keep precision consistent** within a column, and no more decimal places than the reader needs.
- **Remove heavy borders.** Full grids add visual noise; light horizontal rules, or white space alone, usually separate rows enough.
- **Order columns** by importance, with the identifying column first, and keep units in the header rather than repeated in every cell.

**Zebra striping**, shading alternate rows, is meant to help the eye track across wide rows. Research on whether it helps is mixed, and it can compete with rows highlighted for meaning; a hover highlight on the row under the pointer does a similar job with less noise.

Interactive tables add their own patterns. **Sorting** by clicking a column header is expected, with an arrow indicating direction. **Filtering** narrows long tables. Long tables need either pages or rendering only the rows on screen; see [[Pagination]] and [[Virtual Scrolling]]. Headers should stick to the top while scrolling, and the first column to the left in wide tables. Long text in cells is usually [[Text Truncation|truncated]], with the full value available on hover or focus.

Small screens are the hardest case. Common approaches are horizontal scrolling with a sticky first column, hiding less important columns, or turning each row into a stacked card, which keeps it readable but makes comparison across rows harder; see [[Responsive Breakpoint]].

Accessibility depends on real [[Semantic HTML|table markup]]. Header cells marked as headers, with their scope, let a [[Screen Reader]] announce the row and column for each cell as a user moves through, and a caption names the table. For years web pages used tables for page layout, which made screen readers announce meaningless grids; modern layout tools ended that. Arrow keys moving between cells, as in a spreadsheet, help keyboard users in dense interactive grids; see [[Keyboard Navigation]].

Tables are also the usual accessible fallback for charts, giving every value in text; see [[Alt Text]].

## See also
- [[CSS Grid]]
