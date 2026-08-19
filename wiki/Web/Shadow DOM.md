---
aliases:
  - Shadow Tree
tags:
  - web
summary: An encapsulated DOM subtree whose styles and structure are isolated from the rest of the page.
---
**Shadow DOM** attaches a separate, encapsulated DOM subtree to an element — a "shadow root" — whose contents render as part of the page but are invisible to the page's own CSS selectors and querying, and whose own styles don't leak outward either. It's the mechanism that makes native elements like `<video>`'s controls or `<input type="range">`'s slider track work the way they do: those controls are themselves a shadow tree the browser renders but that `document.querySelectorAll` can't normally see into, which is exactly the isolation [[Web Components]] extends to author-defined elements.

The problem it solves is CSS's biggest structural weakness for component authoring: every selector in a stylesheet is global by default, so a component library shipped without some discipline — BEM naming, CSS Modules, [[Scoped Styling|scoped build-time hashing]] — risks a class name colliding with the host page's own styles, in either direction. Shadow DOM makes that isolation a browser guarantee instead of a naming convention: a `.button` class defined inside a shadow root cannot be matched by a `.button` selector outside it, and vice versa, with no coordination required between the two authors.

The mode matters: `attachShadow({ mode: 'open' })` still lets JavaScript outside reach the shadow root via `element.shadowRoot`, useful for testing and some frameworks' introspection; `mode: 'closed'` refuses that access entirely, which is rarer and mostly used where a component author wants to guarantee its internals stay genuinely private even from cooperating code.

The tradeoff mirrors [[Web Components]]' own: real isolation, at the cost of the page's stylesheet rules not matching inside. The boundary blocks selector matching, though, not inheritance: inherited properties (a design system's typography set on `body`) and each [[CSS Custom Property]] flow in by default, and `::part` and `::slotted` are the deliberate holes punched through for everything else.

## See also
- [[Web Components]]
- [[Document Object Model]]
- [[Same-Origin Policy]]

## Related
- [[Portal]]
