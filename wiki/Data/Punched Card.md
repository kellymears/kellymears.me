---
aliases:
  - Hollerith card
  - Tabulating machine
  - Jacquard loom
  - Unit record equipment
tags:
  - data
summary: Stiff paper cards that stored data and programs as patterns of holes, from Jacquard's looms through Hollerith's census machines to IBM's 80-column card, whose width still sets the default line length of terminals.
---
A **punched card** stores information as a pattern of holes in stiff paper. For most of the twentieth century it was the main medium for business and government data, and later for computer programs. Each card typically held one record, so a drawer of cards was a table and a machine that sorted them was running a query long before databases existed; see [[Relational Database]].

The idea began in weaving. Joseph Marie Jacquard's loom of 1804 read a chain of punched cards, each row of holes deciding which threads to lift, so a complex pattern could be repeated mechanically. Charles Babbage planned to feed cards to his Analytical Engine, and Ada Lovelace wrote that it would weave algebraic patterns as the loom wove flowers and leaves; see [[Analytical Engine]].

Cards became a data medium through the census. The 1880 US census had taken about eight years to tabulate by hand, so for 1890 the Census Office adopted Herman Hollerith's electric tabulator. A clerk placed a card in a press; pins dropped through the holes into cups of mercury, completing circuits that advanced counters on a dial. The count finished ahead of schedule and under budget; see [[Census]]. Hollerith's company merged with others in 1911 and was renamed IBM in 1924.

Over the following decades a whole family of **unit record equipment** grew around the card: keypunches to create them, sorters, collators to merge decks, and tabulators to total them, wired by hand with plugboards. Businesses ran payroll and billing this way well into the computer era.

IBM's 1928 card, with 80 columns and 12 rows of rectangular holes, became the standard. Its legacy is still visible. Early terminals displayed 80 characters per line to match it, and many style guides and terminals still default to that width; see [[Command-Line Interface]]. Programmers punched one line of code per card, and Fortran reserved the last eight columns for sequence numbers so a dropped deck could be put back in order by machine. Codes for letters on cards shaped early character sets; see [[Character Encoding]].

Cards were also instruments of control. Machines from IBM's German subsidiary tabulated Nazi Germany's censuses, which recorded religion and ancestry, a standard example of why systems holding [[Personal Data]] deserve scrutiny. In the 1960s the phrase printed on many cards, "Do not fold, spindle, or mutilate," became a protest slogan for students who felt processed like records.

Punched-card ballots lasted into the 2000 US presidential election, when partially punched holes, "hanging chads," left thousands of Florida votes in dispute; see [[Data Cleaning]].

Stored-program computers that kept instructions in memory, along with magnetic tape and disk, gradually replaced cards; see [[Von Neumann Architecture]].

## See also
- [[Barcode]]
- [[Spreadsheet]]
- [[Microfilm]]
- [[Mainframe]]
