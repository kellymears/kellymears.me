---
aliases:
  - a11y
  - WCAG
tags:
  - design
summary: Designing so that people with disabilities can use a thing, and the standards that make it checkable.
---
**Accessibility** is the practice of building so that disabled people can use what you build. On the web the reference standard is the Web Content Accessibility Guidelines, organised around four principles: content must be *perceivable*, *operable*, *understandable*, and *robust*.

Most of it is not exotic. Correct [[Semantic HTML]] delivers a large fraction for free: real buttons are focusable, keyboard-activatable, and announced correctly, while a styled generic element is none of those unless every behaviour is reimplemented. The remainder is mostly [[Keyboard Navigation]], [[Focus Management]], [[Color Contrast]], text alternatives, and respecting stated preferences such as [[Reduced Motion]].

The thing worth internalising is **what automated checking can and cannot do**. Tools like axe reliably catch missing labels, insufficient contrast, invalid ARIA, and duplicated landmarks. They cannot tell whether alternative text describes the image, whether a focus order makes sense, or whether an interaction is comprehensible. An automated pass is a floor.

Automated checks also produce characteristic false signals: a burst of violations across an entire suite usually means the pages failed to load and the tool is scanning an error overlay; a contrast violation on a mid-transition element means the check ran too early. Diagnosing those before treating them as regressions saves a great deal of time.

## See also
- [[ARIA]]
- [[Semantic HTML]]
- [[Focus Management]]
- [[Plain Language]]
- [[Document Object Model]]

## Related
- [[Portal]]
- [[Headless Component]]
