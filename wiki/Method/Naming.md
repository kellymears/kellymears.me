---
aliases:
  - Naming things
tags:
  - method
summary: Choosing identifiers so the code states its own meaning without commentary.
---
**Naming** is the primary documentation mechanism in code. An identifier is read far more often than it is written, appears at every call site, and — unlike a [[Code Comment]] — cannot drift away from the thing it names.

Good names are usually a matter of naming the *contract* rather than the implementation. A function called `rewriteContent` promises that structure is preserved and only copy changes; one called `regenerateSection` promises nothing in particular, so callers guess. Renaming the first to the second is a genuine bug fix, because the wrong name licensed the wrong assumption. The deliberate exception is the [[Metasyntactic Variable]] — `foo`, `bar`, `baz` — a placeholder chosen to state nothing at all, because an example about structure is spoiled by an identifier that smuggles a domain into it.

Names also carry scope information. A name that is accurate but too general invites use outside the range where it holds. A name that mentions a specific case ("template options") when the thing is general ("block registry") makes readers hunt for templates that do not exist.

Naming interacts with the [[Taxonomy]] problem: a vocabulary is a shared model, and every additional near-synonym costs everyone a decision. Preferring an existing term over a new one, and reusing the sibling component's exact prop name rather than inventing a parallel, is what lets independent work converge instead of colliding — see [[Design System]].

Test names are a special case: they should describe the scenario and the expected behaviour, not the function under test, so a failure reads as a statement about the system.

## See also
- [[Code Comment]]
- [[Design System]]
- [[Taxonomy]]
- [[Code Review]]
- [[Documentation Rot]]
- [[Chesterton's Fence]]
- [[Information Architecture]]
- [[Linguistic Relativity]]

## Related
- [[Plain Language]]
- [[Zettelkasten]]
