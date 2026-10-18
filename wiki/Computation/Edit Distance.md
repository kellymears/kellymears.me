---
aliases:
  - Levenshtein distance
  - Diff algorithm
  - Longest common subsequence
  - Myers diff
  - Fuzzy matching
tags:
  - computation
summary: The minimum number of insertions, deletions, and substitutions needed to turn one sequence into another, the idea behind spell checkers, fuzzy search, and every diff.
---
**Edit distance** measures how different two sequences are by counting the fewest edits needed to turn one into the other. The most common version, **Levenshtein distance**, introduced by Vladimir Levenshtein in 1965, allows three operations on single characters: insert, delete, and substitute. Turning "kitten" into "sitting" takes three edits: substitute k with s, substitute e with i, and insert g at the end.

Computing it is a textbook case of [[Dynamic Programming]]. Build a table where each cell holds the distance between a prefix of the first string and a prefix of the second. Each cell depends only on its three neighbors above and to the left, so the whole table fills in time proportional to the product of the two lengths. The bottom-right cell is the answer, and tracing back through the table recovers the actual sequence of edits.

Variants suit different needs:

- **Damerau–Levenshtein** also counts swapping two adjacent characters as one edit, matching common typing mistakes.
- **Hamming distance** allows only substitutions, for sequences of equal length, and counts differing positions.
- **Longest common subsequence** finds the largest set of items appearing in both sequences in the same order, not necessarily adjacent. Everything not in it was inserted or deleted.

**Diff tools** are edit distance applied to lines instead of characters. Comparing two versions of a file means finding the longest common subsequence of lines, then reporting the rest as additions and removals. Eugene Myers published the algorithm most diff tools still use in 1986. It runs quickly when the files are similar, which is the usual case. Git's default diff uses it, and alternatives such as patience diff produce more readable results for code by anchoring on lines that appear only once. Diffs are the basis of a [[Pull Request]] review, a [[Three-Way Merge]], and the way [[Version Control]] reports what changed.

Edit distance turns up in many places:

- **Spell checking and fuzzy search.** Suggest words within one or two edits of a misspelling, or find files and commands despite typos.
- **Biology.** Aligning DNA and protein sequences uses weighted versions of the same algorithm, scoring different mutations differently.
- **Speech and translation.** Word error rate, the standard accuracy measure for [[Automatic Speech Recognition]], is edit distance over words divided by the length of the reference transcript.

Edit distance has limits. A purely textual diff doesn't know what code means, so two changes can merge cleanly line by line and still conflict in behavior, the [[Semantic Conflict]] problem. Comparing trees, such as an [[Abstract Syntax Tree]], instead of lines gives more meaningful diffs for code but is much more expensive. UI frameworks compute a related tree diff when reconciling a [[Virtual DOM]], trading exactness for speed with simplifying assumptions.

## See also
- [[Command Palette]]
- [[Diff]]
- [[Three-Way Merge]]
- [[Semantic Conflict]]
- [[Entity Resolution]]
- [[Autocomplete]]
