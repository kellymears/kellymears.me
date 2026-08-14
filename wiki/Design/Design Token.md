---
aliases:
  - Design variables
tags:
  - design
summary: Named design decisions — color, spacing, radius, type — stored as data so they can be shared and re-themed.
---
A **design token** is a named design decision stored as data rather than repeated as a literal: a color role, a spacing step, a radius, a font family, a shadow. Tokens are the interface between design intent and implementation, and the substrate that makes theming possible.

The distinction that gives them their power is between *primitive* tokens (a specific color value) and *semantic* tokens (the role that color plays — surface, accent, danger). Components should consume roles. A component referring to a raw value has hard-coded a decision that the system exists to keep changeable.

Two governance problems recur once tokens are shared across teams.

**One name, two values.** Two pieces of parallel work can each introduce the same token name with a slightly different value, and whichever lands second silently overwrites the other. The convention that resolves it is to never disagree on a name: if two shades are genuinely both needed, they get distinct names.

**Orphaned tokens.** Rerouting a token so it becomes overridable can leave the previous name referenced by nothing, while documentation, tooling, and editor fields keep advertising it. Writes to it then succeed and render nothing — a [[Silent Failure]] no test can catch. The check is to search the *compiled* output for the name and confirm zero hits.

## See also
- [[CSS Custom Property]]
- [[Design System]]
- [[Scoped Styling]]
- [[OKLCH]]
- [[Dark Mode]]
- [[Utility-First CSS]]
- [[Typographic Scale]]

## Related
- [[Cascade]]
- [[Root Cause Analysis]]
