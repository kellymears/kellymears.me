---
aliases:
  - CSS cascade
  - Specificity
tags:
  - design
summary: The algorithm deciding which declaration wins when several apply to the same element.
---
The **cascade** is CSS's conflict-resolution algorithm. When multiple declarations target the same property on the same element, the winner is chosen by, in order: origin and importance, cascade layer, specificity, and finally document order.

**Specificity** is the part most people internalise — a count of identifiers, classes, and element names in the selector, compared component-wise so that no number of class selectors ever beats a single identifier selector. It is why specificity wars escalate: the reliable way to win is to be more specific, and the result is a stylesheet where nothing can be overridden without escalating further.

Modern CSS provides better tools. *Cascade layers* let you declare precedence explicitly, independent of specificity, so a design system's rules can be authored at low specificity and still lose to consumer overrides on purpose. Utility-first approaches sidestep the problem by keeping every rule at the same low specificity; see [[Utility-First CSS]].

Understanding the cascade also explains a class of cross-application bugs: styles from one application's administrative interface leaking into another's front end and pinning a root-level property, breaking an inherited background further down. The symptom appears at the leaf; the cause is a declaration that won at the root.

## See also
- [[CSS Custom Property]]
- [[Scoped Styling]]
- [[Utility-First CSS]]
- [[Root Cause Analysis]]

## Related
- [[Silent Failure]]
- [[Design Token]]
- [[Portal]]
- [[Dark Mode]]
- [[OKLCH]]
