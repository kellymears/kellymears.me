---
aliases:
  - Atomic CSS
  - Tailwind
tags:
  - design
summary: Composing styles from many small single-purpose classes rather than authoring semantic rules.
---
**Utility-first CSS** builds interfaces by composing many small, single-purpose classes — one for padding, one for colour, one for display — directly in markup, rather than writing named rules for components. The approach is most associated with Tailwind CSS.

Its argument is about the cascade rather than about typing less. Utilities have flat specificity, do not leak, and are removed automatically when unused, which eliminates the classic failure mode of a growing stylesheet nobody dares delete from. It also converts styling from an open-ended language into a constrained vocabulary: the available values come from the theme, so [[Design Token]]s are enforced by construction.

The criticisms are real too — markup becomes visually dense, and repetition moves from stylesheet to template. In practice the repetition is absorbed by components, so the pattern pairs naturally with a [[UI Primitive]] layer where the utility strings live in one place per concern.

Recent versions push configuration into CSS itself, defining the theme in a stylesheet block rather than a JavaScript config. That makes one distinction load-bearing: whether a theme mapping substitutes its value at definition time or at each point of use. Only the latter allows a token to be overridden inside a scope, which is exactly what scoped theming needs. See [[Scoped Styling]] and [[CSS Custom Property]].

## See also
- [[Design Token]]
- [[Cascade]]
- [[UI Primitive]]
- [[Design System]]

## Related
- [[Silent Failure]]
- [[Dark Mode]]
- [[Typographic Scale]]
