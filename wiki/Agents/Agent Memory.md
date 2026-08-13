---
aliases:
  - Persistent memory
tags:
  - agents
summary: Durable facts stored outside the context window and recalled into later sessions.
---
**Agent memory** is state an assistant keeps across conversations, since a [[Context Window]] does not survive a session. In its simplest and most durable form it is a set of small files, each holding one fact, with enough metadata to decide later whether the fact is relevant.

What makes memory useful is discipline about *what belongs in it*. Things worth storing are those a future reader could not reconstruct: a preference and the reason for it, a decision and what it foreclosed, a constraint discovered the expensive way. Things not worth storing are those the artifact already records — the structure of the code, the history of past fixes, anything already written down elsewhere. Duplicating those creates two sources that drift; see [[Documentation Rot]].

Memory is also *dated*. A stored fact reflects what was true when written, and a note naming a file, a flag, or an interface can be silently wrong months later. Treating recalled memory as a hypothesis to verify rather than a fact to act on is the habit that keeps it from becoming a source of confident errors.

The related design question is retrieval: a memory that is never surfaced at the right moment is inert, and one that is always surfaced is just a longer prompt. Summaries carrying enough to judge relevance, with the full text loaded on demand, is the shape that scales.

## See also
- [[Context Window]]
- [[Knowledge Graph]]
- [[Zettelkasten]]
- [[Provenance]]
- [[Agent Skill]]

## Related
- [[Wiki]]
- [[System Prompt]]
- [[Prompt]]
