---
aliases:
  - Front matter
  - YAML frontmatter
tags:
  - data
summary: A metadata block at the top of a text document, separated from the body by delimiters.
---
**Frontmatter** is a block of structured metadata at the head of a text file, conventionally YAML fenced by triple dashes. It is how a plain document carries fields — title, date, tags, status — without leaving plain text.

It is the mechanism behind file-based content systems: documents in a directory, parsed at build time into records with typed fields, from which everything else is derived. Sorting, filtering, tag indexes, feeds, and structured metadata all fall out of the frontmatter rather than requiring a database. See [[Static Site Generation]].

Designing the field set is the part that repays thought, and the useful question is *what will be queried*. A field exists to support a listing, a filter, a feed, or a rendering decision; one that supports none of those is a note in a structured position. Fields for search — synonyms, categories, likely queries — are worth adding deliberately rather than discovering the need for later.

The same pattern extends beyond publishing. Notes in a personal knowledge system use frontmatter as properties, agent instruction files use it for name and description, and configuration files use it as a header. In each case it is the same trade: structure where structure helps, prose everywhere else.

## See also
- [[Markdown]]
- [[Static Site Generation]]
- [[Zettelkasten]]
- [[Taxonomy]]

## Related
- [[Wiki]]
- [[RSS]]
- [[Knowledge Graph]]
- [[Search Engine Optimization]]
- [[Naming]]
- [[Structured Data]]
