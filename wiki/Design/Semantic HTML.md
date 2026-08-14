---
aliases:
  - Semantics
  - Landmarks
tags:
  - design
summary: Using elements for their meaning, so the document conveys structure without extra description.
---
**Semantic HTML** means choosing elements for what they mean rather than how they look: a button for something that does a thing, a heading for a heading, a list for a list, a navigation landmark for navigation. The payoff is that meaning is conveyed to browsers, assistive technology, and machines without any additional description.

Concretely, native elements bring behavior that is otherwise expensive to rebuild: focusability, keyboard activation, form participation, correct announcement, and platform conventions that vary by operating system. Reimplementing that on a generic element is a lot of code that will be subtly wrong, which is why [[ARIA]]'s first rule is to prefer the native element.

Landmarks — header, navigation, main, footer, and named regions — give screen-reader users a structural map they can jump around. They are also easy to get wrong through duplication: several cards each using a footer element produce several page-level footer landmarks, which an automated check will correctly flag. The fix is usually to nest them inside a sectioning element so each footer belongs to its own region.

Semantics also help outside accessibility. A well-structured document is what makes reader modes, link previews, search indexing, and content extraction work; see [[Structured Data]] and [[Search Engine Optimization]].

## See also
- [[Accessibility]]
- [[ARIA]]
- [[Document Object Model]]
- [[Progressive Enhancement]]
- [[Keyboard Navigation]]
- [[UI Primitive]]

## Related
- [[Headless Component]]
- [[Focus Management]]
