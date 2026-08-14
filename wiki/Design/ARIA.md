---
aliases:
  - WAI-ARIA
  - Accessible Rich Internet Applications
tags:
  - design
summary: Attributes that describe roles, states, and relationships to assistive technology when HTML cannot.
---
**ARIA** is a specification of attributes that convey an element's role, state, and relationships to assistive technology. It exists to describe interface patterns that HTML has no element for — a tab set, a combobox, a live region.

Its first rule is the one most worth remembering: **do not use ARIA if a native element will do.** A native button already has the role, the keyboard behavior, and the states. Applying a role to a generic element declares a contract that the element does not fulfil — announcing "button" to a screen reader while doing nothing on Enter is worse than the unlabeled original.

Practical hazards accumulate around the details. Some attributes are computed by the browser and must not be supplied by hand, while their siblings must be. An accessible name derived from a related element outranks a directly supplied label, so a menu can end up announcing its trigger's text instead of its own — and clearing that requires explicitly passing nothing, not simply omitting it. Hiding content outside a modal can be done by marking it hidden from the accessibility tree or by making it truly inert; those are different, and only one of them stops pointer events, which produces a very specific class of bug where clicks land on elements a screen reader cannot see.

## See also
- [[Accessibility]]
- [[Semantic HTML]]
- [[Headless Component]]
- [[Focus Trap]]
- [[Portal]]

## Related
- [[Keyboard Navigation]]
- [[Focus Management]]
- [[Document Object Model]]
- [[UI Primitive]]
