---
aliases:
  - Unicode
  - UTF-8
tags:
  - systems
summary: The mapping between characters and bytes, and the source of a specific family of invisible bugs.
---
**Character encoding** is the correspondence between characters and their byte representation. Unicode assigns a code point to every character; UTF-8 encodes those code points as one to four bytes, is backward-compatible with ASCII, and has won.

Even with the encoding war settled, several distinctions still cause bugs. A code point is not a character a person would recognize: emoji with modifiers, and accented letters written as a base plus a combining mark, span several. So "length" has at least three meanings — bytes, code points, and grapheme clusters — and string operations that split or reverse text will produce nonsense if they use the wrong one. Normalization matters too, since visually identical strings can differ in bytes.

The sharpest practical hazard is **control characters**, and particularly the null byte. A file containing a real null is still valid text to a compiler and a formatter, renders as innocuous whitespace in most viewers, and causes search tools to treat the file as binary and *suppress all matches silently*. A search that returns nothing therefore looks like an absent symbol rather than a corrupted file. Inspecting the bytes is the only way to see it. See [[Silent Failure]].

Terminal alignment is a related concern: East Asian characters occupy two columns and combining marks occupy none, so column arithmetic must use display width. See [[Terminal User Interface]].

## See also
- [[Token]]
- [[Shell]]
- [[Terminal User Interface]]
- [[Silent Failure]]

## Related
- [[Vacuous Truth]]
- [[Glob]]
- [[Truncation Bias]]
- [[Ground Truth]]
- [[Falsifiability]]
- [[Coverage Gate]]
