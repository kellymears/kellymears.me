---
aliases:
  - MDX
  - CommonMark
tags:
  - data
summary: A plain-text formatting syntax designed to be readable as written, now the default for technical writing.
---
**Markdown** is a lightweight markup syntax created by John Gruber, designed so the source reads naturally without rendering. Its ubiquity comes from that property: it is legible in a terminal, diffable in version control, and convertible to almost anything.

Its weakness was ambiguity — the original had no specification and implementations disagreed. **CommonMark** fixed that, and most dialects are now extensions on top of it: tables, footnotes, task lists, and so on. **MDX** goes further and allows components to be embedded, which turns a document into something closer to a template.

Two authoring points are worth stating.

**Fenced code blocks are delimited by a run of backticks, and a closing run must be at least as long as the opening one.** That makes any system splicing untrusted text into markdown a correctness problem: content containing a long backtick run must be fenced with a longer one, and any truncation that re-closes a fence has to know the original width. A closing fence shorter than its opening is inert, and one unterminated block swallows everything after it.

**Wrapping is the editor's job.** Hard-wrapping paragraphs at a column turns every edit into a re-wrap diff; one paragraph per line keeps diffs meaningful.

## See also
- [[Frontmatter]]
- [[Static Site Generation]]
- [[Plain Language]]
- [[Wiki]]
- [[RSS]]
- [[Subtitling]]

## Related
- [[Zettelkasten]]
- [[Search Engine Optimization]]
- [[Naming]]
