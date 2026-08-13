---
aliases:
  - Portalled content
tags:
  - web
summary: Rendering an element into a different part of the document than its logical parent.
---
A **portal** renders a component's output into a different location in the [[Document Object Model]] than its position in the component tree — usually at the end of the document body. Overlays use it: dialogs, popovers, tooltips, dropdown menus.

The reason is containment. An overlay rendered inside its logical parent inherits that parent's clipping, transforms, and stacking context, any of which can crop or mislayer it. Escaping to the body sidesteps all of them.

The escape is exactly what creates the difficulties.

**Scoped styling breaks.** Custom properties defined under a selector on an ancestor are not inherited by a portalled element, so any rule depending on them resolves to nothing — silently. The fix is to re-apply the scope marker on the portalled element itself; see [[Scoped Styling]] and [[CSS Custom Property]].

**Layering must be reasoned about globally.** The portalled element joins the body's [[Stacking Context]], where it competes with every other overlay and any fixed chrome.

**Tests must query the right root.** A test helper scoped to a component's own container will not find portalled content, because the content is not in that container — a failure that looks like a library bug and reproduces only under test.

Accessibility also needs explicit work, since the visual position and the tree position disagree; see [[Focus Management]] and [[ARIA]].

## See also
- [[Stacking Context]]
- [[Headless Component]]
- [[Focus Trap]]
- [[Component Story]]
