---
aliases:
  - Clever code
tags:
  - method
summary: The observation that debugging is twice as hard as writing code, so code written as cleverly as possible is by definition too clever to debug, an argument for plain, readable programs over impressive ones.
---
**Kernighan's law** comes from The Elements of Programming Style, a 1974 book by Brian Kernighan and P. J. Plauger, in a line from its second edition of 1978: everyone knows that debugging is twice as hard as writing a program in the first place, so if you're as clever as you can be when you write it, how will you ever debug it? The conclusion is that code should be written comfortably within the author's ability, leaving headroom for the harder job of fixing it.

The "twice as hard" figure is rhetorical, not measured, but the asymmetry is real. Writing code means holding one intended behavior in mind. Debugging means working backward from a symptom to a cause, considering every behavior the code could actually have, including ones its author never imagined. Code that's barely within reach to write leaves no margin for that search; see [[Cognitive Load]].

Clever code takes recognizable forms:

- **Compression.** Packing logic into as few characters or lines as possible, a sport in its own right but a liability in production; see [[Code golf]].
- **Exploiting edge cases of the language.** Tricks that depend on obscure rules, or on behavior the language doesn't guarantee, break silently when a compiler changes; see [[Undefined behavior]].
- **Hand-tuned performance.** Optimizations that obscure intent, added before anyone measured a problem; see [[Premature Optimization]].
- **Abstraction for its own sake.** Layers of indirection that make a simple flow hard to trace; see [[Leaky Abstraction]].

The remedy is ordinary. Choose clear names; see [[Naming]]. Explain the why in comments where the code can't; see [[Code Comment]]. Prefer the obvious algorithm until measurement says otherwise. Have someone else read the code, since anything a reviewer can't follow is a warning; see [[Code Review]].

The law also says something about the people who'll do the debugging. Often it isn't the author but a colleague, or the author months later with no memory of the trick. Code is read many more times than it's written, so effort spent making it easy to read is repaid repeatedly. Readable code tends to survive longer and accumulate less cost over time; see [[Technical Debt]].

Debugging tools narrow the gap but don't close it. A debugger shows what code is doing, not why it was written that way; see [[Debugger]]. Some bugs vanish when observed, and those are hardest of all in code that's already hard to reason about; see [[Heisenbug]]. Explaining code aloud, line by line, works well partly because it forces the explainer to confront the gap between what the code says and what was meant; see [[Rubber Duck Debugging]].

Kernighan's law is a specific case of a general engineering instinct: favor the simplest design that does the job; see [[KISS Principle]].

## See also
- [[Refactoring]]
- [[Static Analysis]]
