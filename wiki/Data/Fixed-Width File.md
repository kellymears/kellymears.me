---
aliases:
  - Flat file
  - Fixed-length record
  - Copybook
tags:
  - data
summary: A text format where every field sits at fixed character positions with no delimiters, inherited from punched cards and mainframes and still running much of banking and government data exchange.
---
A **fixed-width file** stores records as lines of text in which each field occupies a set number of characters at set positions. There are no commas or tabs between fields. A customer record might put the account number in columns 1 to 10, the name in columns 11 to 40, and the balance in columns 41 to 52. Shorter values are padded, text usually with trailing spaces and numbers with leading zeros.

The format descends from punched cards, where each card held 80 columns and programs read fields by position; see [[Punched Card]]. Business systems on mainframes kept the same layouts on tape and disk; see [[Mainframe]]. In COBOL, a record's layout is written in a **copybook**, a definition that names each field and its width, shared between every program that reads the file.

Fixed-width files are still common where those systems still run. Bank payment files in the United States use fixed-length records of 94 characters. Many government agencies, insurers, and payroll processors exchange data this way, and statistical agencies have long published public data files in fixed layouts with a separate document describing the columns; see [[Data Dictionary]].

The design has real advantages:

- **No escaping.** A name containing a comma or quotation mark causes no trouble, unlike delimited text; see [[CSV]].
- **Random access.** Any field can be read by jumping to its offset, without scanning for separators.
- **Predictable size.** Every record is the same length, so the nth record can be found by arithmetic.

The disadvantages are just as real:

- **Truncation.** A value longer than its field gets cut off silently. Long names and addresses lose their ends; see [[Postal Address]].
- **Wasted space.** Padding inflates files full of short values, though compression mostly recovers it; see [[Data Compression]].
- **A required key.** Without the layout, the file is an unreadable wall of characters. Losing the copybook can strand the data.
- **Encoding traps.** Widths are often defined in bytes, so a character that takes two bytes shifts every following field; see [[Character Encoding]] and [[Mojibake]]. Mainframe files may also use an older character set entirely.

Space pressure shaped fields in ways that lasted. Storing years as two digits saved columns on every record, and decades later the saved columns became an expensive problem; see [[Year 2000 Problem]]. Unused fields were often filled with zeros or nines carrying special meanings; see [[Sentinel Value]].

Converting fixed-width files is a staple of data pipelines, and spreadsheet import tools still offer a fixed-width mode beside the delimited one; see [[ETL Pipeline]] and [[Spreadsheet]]. Displaying them requires a font where every character has the same width, or the columns stop lining up; see [[Monospace]].

## See also
- [[Serialization]]
- [[Magnetic Tape]]
