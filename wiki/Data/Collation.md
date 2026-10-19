---
aliases:
  - Sort order
  - Natural sort
  - Alphabetical order
  - Case folding
tags:
  - data
summary: The rules for comparing and ordering text, which differ by language and are surprisingly hard to get right, and which can silently corrupt database indexes when they change underneath them.
---
A **collation** is a set of rules for comparing and ordering text: which strings are equal, and which comes first. Alphabetical order seems obvious until a program has to implement it.

Sorting by raw character codes is wrong for people. In ASCII order every capital letter comes before every lowercase one, so "Zebra" sorts before "apple," and accented letters land after "z." Real collations compare at several levels: first the base letters, then accents, then case, then punctuation, so "resume" and "résumé" sit together and differ only at the second level.

Languages disagree about the base order:

- **Swedish** places å, ä, and ö after z, while German treats ä as a variant of a.
- **German phone books** traditionally sort ä as if it were "ae."
- **Spanish** treated "ll" and "ch" as single letters until 1994.
- **Lithuanian** puts y between i and k.

So "alphabetical" depends on the reader's language; see [[Internationalization]]. The Unicode Collation Algorithm defines a default multi-level ordering, and a shared database of language rules customizes it. Most software uses the ICU library to apply both.

Equality is just as tricky. The letter é can be stored as one code point or as e followed by a combining accent, which look identical and must compare equal; see [[Character Encoding]]. Case-insensitive comparison needs case folding, and Turkish breaks the usual assumptions: its lowercase dotted i capitalizes to a dotted İ, and its undotted ı to I. Code that uppercases text without knowing the language has failed on Turkish input often enough that "the Turkey test" became a name for checking it.

In databases, collation is a property of each text column, and it matters well beyond sorting:

- **Uniqueness.** Under a case-insensitive collation, "Bob" and "bob" are duplicates; see [[Database Constraint]].
- **Indexes.** An index stores values in collation order, so it can only serve queries that use the same collation; see [[Database Index]].
- **Upgrades.** In 2018 the GNU C library changed its collation rules. PostgreSQL databases that relied on the operating system's rules found, after upgrading, that existing indexes no longer matched the new order, so some rows became unfindable until the indexes were rebuilt. Replicas on different operating system versions could disagree in the same way; see [[Database Replication]].

**Natural sort** handles a different expectation: people expect "file10" after "file9," treating runs of digits as numbers, while plain text comparison puts it after "file1"; see [[Sorting Algorithm]].

Inconsistent collation between layers causes subtle bugs. If an application sorts differently from its database, pagination that resumes from the last value seen can skip or repeat rows; see [[Pagination]]. Search usually wants looser matching still, ignoring accents and case entirely; see [[Stemming and Lemmatization]].

## See also
- [[Inverted Index]]
- [[Spreadsheet]]
- [[Postal Address]]
- [[Mojibake]]
- [[Radix Sort]]
