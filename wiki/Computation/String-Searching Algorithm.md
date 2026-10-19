---
aliases:
  - String matching
  - Knuth-Morris-Pratt
  - Boyer-Moore
  - Rabin-Karp
  - Rolling hash
tags:
  - computation
summary: Algorithms for finding where a pattern occurs in a longer text, from the obvious character-by-character check to methods that skip ahead or use rolling hashes, used in every search box, text editor, and genome browser.
---
A **string-searching algorithm** finds where a pattern, such as a word, occurs within a longer text. It's among the most common operations in computing: every "find" command, text search tool, spam filter, and virus scanner relies on one. The obvious method works, but clever ones can be dramatically faster.

The **naive approach** lines the pattern up at each position in the text and compares characters until one differs. With a pattern of length m and a text of length n, this takes up to n × m comparisons, though on ordinary text mismatches usually happen at the first character; see [[Big-O Notation]].

Three classic improvements appeared in the 1970s and 1980s:

- **Knuth-Morris-Pratt** (1977), found independently by Donald Knuth, Vaughan Pratt, and James Morris, never moves backward in the text. Before searching, it studies the pattern to work out how much of a partial match can be reused after a mismatch. The search then takes time proportional to n + m, even in the worst case. It is equivalent to running a [[Finite State Machine]] built from the pattern.
- **Boyer-Moore** (1977), by Robert Boyer and J Strother Moore, compares from the end of the pattern. If the text character at that position doesn't appear in the pattern at all, the pattern can jump forward its whole length. Longer patterns therefore search faster, often examining only a fraction of the text, which is why variants power many command-line search tools.
- **Rabin-Karp** (1987), by Michael Rabin and Richard Karp, compares hashes instead of characters. A **rolling hash** can be updated in constant time as the window slides one character, so each position costs almost nothing. Matching hashes are confirmed by direct comparison to rule out collisions; see [[Hash Function]].

For thousands of patterns at once, the Aho-Corasick algorithm (1975) builds a [[Trie]] of all of them with extra links for mismatches, then scans the text once. Antivirus scanners and network intrusion detectors use this approach to check for many known signatures simultaneously.

When the text is fixed and searched repeatedly, it pays to index it first. Suffix trees and suffix arrays record every suffix of the text in sorted form, so any pattern can be found in time proportional to its own length. They're central to genome analysis, where texts run to billions of letters. Search engines index words instead; see [[Inverted Index]].

Patterns with wildcards and alternatives need [[Regular Expression]]s. Finding near matches, which tolerate typos, uses [[Edit Distance]]. Rolling hashes also split files into chunks at content-determined boundaries, letting backup and sync tools find shared data between versions; see [[Data Compression]].

Unicode complicates everything, since the same visible text can be encoded in several ways, and case-insensitive matching depends on language; see [[Character Encoding]].

## See also
- [[Text Buffer]]
- [[Autocomplete]]
- [[Suffix Array]]
- [[Collation]]
- [[SIMD]]
- [[Burrows-Wheeler Transform]]
