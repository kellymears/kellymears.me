---
aliases:
  - Content editable
  - Inline editing
tags:
  - web
summary: The HTML attribute that makes an element directly editable, and the surface behind most rich-text editors.
---
**`contenteditable`** is an HTML attribute that makes an element and its descendants editable in place. It is the browser primitive behind every rich-text editor, and it is notoriously awkward, because it hands you the browser's native editing behaviour with very little control over it.

Its difficulties are consistent across browsers even where the behaviour differs. Pressing Enter inserts markup whose shape is browser-defined. Pasting brings arbitrary HTML. Selection and caret position live in the [[Document Object Model]] and are destroyed by any re-render. The native undo stack is only fed by real user input, so programmatic changes are invisible to it — and synthetic events dispatched by test tooling are not real user input, which means editor behaviour frequently cannot be driven from a test at all without using the browser's own command interface.

Two rules save the most time. **Own the behaviour you care about**: intercept the key, prevent the default, and perform the edit through an undoable command rather than hoping the native behaviour matches. And **read the raw text, not the rendered text** — a field displayed in uppercase by a style rule will save as uppercase if read through the rendered-text property.

A related discipline: whatever element carries an editable value must contain *exactly* that value. Decorative characters rendered inside it — quotation marks around a quote, a currency symbol — are read back on save and accumulate.

## See also
- [[Document Object Model]]
- [[Hydration]]
- [[Focus Management]]
- [[Headless Browser]]

## Related
- [[Portal]]
- [[Component Story]]
- [[Accessibility]]
- [[Keyboard Navigation]]
- [[Headless Component]]
- [[Focus Trap]]
