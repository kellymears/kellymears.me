---
aliases:
  - Comma-separated values
  - TSV
  - Tab-separated values
  - RFC 4180
  - CSV injection
tags:
  - data
summary: The plain-text table format of rows separated by line breaks and fields separated by commas, universal and simple until quoting, encoding, and spreadsheets get involved.
---
**CSV**, comma-separated values, stores a table as plain text: one record per line, fields separated by commas, usually with a header row naming the columns. Every spreadsheet, database, and programming language reads and writes it, making it the common way to move tables between systems that share nothing else. Comma-separated input was supported by IBM's Fortran compiler as early as 1972, decades before anyone wrote down a standard.

That standard, RFC 4180, arrived only in 2005, and it is informational rather than binding. Its main rule handles the obvious problem: a field containing a comma, quote, or line break is wrapped in double quotes, and a quote inside a quoted field is doubled. The address `12 Main St, Apt 4` becomes `"12 Main St, Apt 4"`. Splitting lines on commas, or using a [[Regular Expression]], breaks on exactly these cases, which is why parsing CSV by hand is a classic bug.

Much of what makes CSV painful is what it leaves out:

- **No types.** Every value is text. Whether `007` is a number, `1/2/2025` is January or February, or an empty field is an empty string or [[Null]], is guessed by the reader.
- **No declared encoding.** Files arrive as UTF-8, Windows-1252, or UTF-8 with a byte-order mark that Excel needs and other tools choke on, a recurring [[Character Encoding]] mess.
- **No single delimiter.** In locales that write decimals with a comma, such as much of Europe, spreadsheets use semicolons instead. Tab-separated values avoid the problem when fields never contain tabs.
- **No schema.** Columns can be added, reordered, or renamed between exports without warning, a common source of [[Schema Drift]].

Spreadsheets add their own damage when they open a CSV and guess types. Long numeric IDs lose digits as [[Floating-Point Arithmetic]] or display in scientific notation, ZIP codes and phone numbers lose leading zeros, and text that looks like a date becomes one. Genetics suffered the most visible case: Excel turned gene symbols such as SEPT2 and MARCH1 into dates, corrupting published supplementary data so often that in 2020 the HUGO Gene Nomenclature Committee renamed 27 human genes rather than wait for spreadsheet software to change.

**CSV injection** is the security version. A field beginning with `=`, `+`, `-`, or `@` may be executed as a formula when an exported file is opened in a spreadsheet, so an attacker who controls a name field can plant a formula that runs on an administrator's machine. Exporters defend by prefixing such fields with a quote, a cousin of the escaping that prevents [[SQL Injection]].

For anything beyond simple interchange, better formats exist: JSON Lines for records with nested fields, and Parquet, a form of [[Columnar Storage]], for large analytical data with real types and compression.

## See also
- [[Serialization]]
- [[Open Data]]
- [[Tidy Data]]
- [[Line Ending]]
- [[JSON]]
- [[Spreadsheet]]
