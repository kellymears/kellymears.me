---
aliases:
  - CSS variable
  - Custom properties
tags:
  - design
summary: A user-defined CSS property that participates in the cascade and inherits down the tree.
---
A **CSS custom property** is a variable declared in a style rule and read with `var()`. Unlike a preprocessor variable, it is a live part of the cascade: it inherits, it can be redefined per element, and it can be changed at runtime.

The behavior that most often surprises people is **where substitution happens**. A `var()` reference is resolved at the element where the *declaration using it* lives, not where the variable was defined. So a rule at the document root that says `--brand-color: var(--scoped-thing)` resolves at the root — where the scoped value does not exist — and inherits an invalid value everywhere, no matter how many descendants define `--scoped-thing`. To make a token overridable inside a scope, the reference has to appear in the rule that ultimately applies to the element. See [[Scoped Styling]].

Two further practical notes. A `var()` that resolves to nothing fails *quietly*: the property becomes invalid at computed-value time and falls back to inherited or initial, so a radius silently becomes zero and a color silently becomes black. That is a [[Silent Failure]] a pixel comparison barely registers. And custom properties are strings until used, so they can hold fragments of any declaration — useful, and a way to build things no type system will check.

## See also
- [[Design Token]]
- [[Cascade]]
- [[Scoped Styling]]
- [[Dark Mode]]
- [[Utility-First CSS]]
- [[Portal]]

## Related
- [[Root Cause Analysis]]
- [[OKLCH]]
