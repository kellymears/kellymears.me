---
aliases:
  - Y2K
  - Millennium bug
  - Y2K bug
tags:
  - testing
summary: The flaw of storing years as two digits so that 2000 would read as 1900, fixed worldwide by a decade of remediation and testing whose very success left people asking whether the danger had ever been real.
---
The **Year 2000 problem**, or **Y2K**, came from storing years as their last two digits, so that 1999 was 99 and 2000 would be 00. Programs that compared, sorted, or subtracted dates would treat 2000 as 1900. A loan would run for minus 99 years, a person born in 1950 would be minus 50 years old, and records from January 2000 would sort before 1999.

The habit made sense when it began. In the 1960s and 1970s memory and storage were expensive, data was often entered on 80-column punched cards, and two characters saved per date added up over millions of records. Programmers expected their code to be replaced long before 2000. Much of it wasn't, and was still running decades later in banks, governments, and utilities, often in COBOL whose authors had moved on or retired; see [[Technical Debt]] and [[Legacy code]].

Remediation took much of the 1990s and cost hundreds of billions of dollars worldwide. Organizations first had to find every place a date was stored or computed, across code, databases, file formats, and the clock chips embedded in equipment; see [[Real-Time Clock]]. Two fixes dominated:

- **Expansion** widened years to four digits. It was the correct fix, but it changed record layouts and every program that read them; see [[ISO 8601]].
- **Windowing** kept two digits and picked a pivot, treating, for example, 00 to 49 as the 2000s and 50 to 99 as the 1900s. It was cheaper, and it only moved the problem to a later date.

Testing was the bulk of the work. Teams set system clocks forward in isolated environments, called time-machine testing, and checked how software behaved across the rollover and other critical dates; see [[Test environment]] and [[Regression Testing]]. One was 29 February 2000. Some programs knew that century years are usually not leap years but missed the exception for years divisible by 400; see [[Boundary Value Analysis]]. Many organizations froze changes for the last months of 1999; see [[Code Freeze]].

New Year's Day 2000 passed with few serious failures, along with scattered small ones, such as wrong dates on websites and receipts. Because so little went wrong, a common view holds that the danger was exaggerated. People who did the work answer that little went wrong because of the work. When prevention succeeds, it is hard to show that a disaster was averted rather than never coming, a situation sometimes called the preparedness paradox; see [[Self-Fulfilling Prophecy]].

The same class of bug is still ahead. Systems that count seconds from 1970 in a signed 32-bit integer will overflow in January 2038; see [[Year 2038 problem]] and [[Unix Time]]. Windowed fixes from the 1990s also expire as their pivot years arrive, and some already have.

## See also
- [[Time Zone]]
- [[Data Cleaning]]
- [[Leap second]]
- [[Mainframe]]
