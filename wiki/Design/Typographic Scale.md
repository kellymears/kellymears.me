---
aliases:
  - Type scale
  - Leading
  - Tracking
tags:
  - design
summary: A constrained set of type sizes and their paired line heights and spacing.
---
A **typographic scale** is a small, deliberately chosen set of font sizes — usually related by a ratio — with each size paired with the line height, letter spacing, and weight appropriate to it. Constraining sizes to a scale is what makes a document look composed rather than assembled.

The pairings matter as much as the sizes. *Leading* (line height) should tighten as type gets larger: body text wants generous leading for readability, display type wants tight leading or it falls apart into disconnected lines. *Tracking* (letter spacing) moves in the opposite direction, opening slightly for small uppercase text and tightening for large display. Treating these as independent knobs rather than properties of a scale step is how interfaces end up with headings that read as accidents.

Scale is also contextual. Application chrome — toolbars, menus, controls — generally wants a compact scale that is quite different from content typography, and menus should match the control that opened them. Mixing content scale into chrome makes an interface feel bloated; mixing chrome scale into content makes it feel cramped.

Measure line length too. Readability falls off sharply beyond roughly seventy-five characters, and in a terminal or a narrow column it must be derived from the available width rather than assumed. See [[Terminal User Interface]].

## See also
- [[Design System]]
- [[Design Token]]
- [[Web Font Loading]]
- [[Plain Language]]

## Related
- [[Utility-First CSS]]
- [[Naming]]
- [[UI Primitive]]
- [[Taxonomy]]
- [[Silent Failure]]
