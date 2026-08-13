---
aliases:
  - TUI
  - CLI design
tags:
  - graphics
summary: An interface rendered as text in a terminal, and the design conventions that make command-line tools humane.
---
A **terminal user interface** is an application rendered as characters in a terminal — either a full-screen interactive layout or the ordinary output of a command-line program. Both have design, and the conventions are well documented; the *Command Line Interface Guidelines* is the standard modern reference.

The principles that matter most are about respect for the person and the ecosystem. Human-readable output by default, machine-readable on request. Errors that state what went wrong and what to do about it. Confirmation before anything destructive. Help that is actually helpful. Exit codes that mean something. Configuration that follows platform conventions rather than inventing a location; see [[XDG Base Directory Specification]]. And output that degrades gracefully when it is not a terminal — no colour codes into a pipe, no progress spinner in a log file.

Layout in a terminal has its own constraints. Width is unknown until read, so line length has to be derived rather than assumed, or a narrow window destroys the layout. Character widths vary — East Asian characters occupy two columns, combining marks none — so alignment must use display width. Component libraries that bring a declarative model to terminal rendering make this considerably more tractable.

The aesthetic ceiling is higher than most people assume. Colour, spacing, and restraint go a long way; animation goes further, provided it can be skipped.

## See also
- [[Shell]]
- [[Character Encoding]]
- [[Plain Language]]
- [[Keyboard Navigation]]
- [[Typographic Scale]]
- [[Tarot]]
- [[Trick-Taking Game]]

## Related
- [[Environment Variable]]
