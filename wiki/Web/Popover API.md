---
aliases:
  - Popover attribute
  - Top layer
  - Light dismiss
tags:
  - web
summary: A built-in HTML feature for menus, pickers, and other floating panels that appear above the page, handling stacking, dismissal, and keyboard focus without the scripts and workarounds such overlays used to need.
---
The **Popover API** is a feature of HTML for building floating panels, such as menus, pickers, and info cards, that appear over the page and disappear when the user is done with them. Adding a popover attribute to an element hides it by default; a button with a popovertarget attribute pointing at it toggles it open and closed with no script at all. The feature reached all major browsers by 2024; see [[Web Standards]].

Before it, every overlay was assembled by hand, and the details were notoriously easy to get wrong. A panel rendered inside its parent could be clipped by an ancestor's overflow or buried beneath another element, however high its z-index, because of how browsers group elements into layers; see [[Stacking Context]]. Libraries worked around this by moving the overlay to the end of the document; see [[Portal]]. They also had to close it when the user clicked elsewhere or pressed Escape, return focus to the button that opened it, and make sure screen readers announced it.

Popovers handle these problems natively. An open popover is placed in the **top layer**, a rendering layer above everything else on the page, independent of z-index and stacking contexts; full-screen elements and modal dialogs use the same layer. The default auto mode provides **light dismiss**: clicking outside the popover or pressing Escape closes it, and opening one auto popover closes any others that aren't its ancestors, so nested menus behave as expected. A manual mode leaves closing to the page, which suits notifications that should stay until dismissed; see [[Toast Notification]].

Popovers are deliberately non-modal. The rest of the page stays interactive, and focus isn't trapped inside. When the user must deal with the panel before anything else, the dialog element's modal mode is the right tool; it makes the rest of the page inert; see [[Modal Dialog]] and [[Focus Trap]]. The browser also wires up accessibility relationships between the button and the popover, though authors still choose roles for menus and listboxes; see [[ARIA]].

Positioning arrived separately. A popover in the top layer has escaped its parent, so it needs another way to sit next to the button that opened it. CSS anchor positioning, which spread across browsers from 2024, lets an element declare that its position depends on another element, and flip to the other side when it would run off the screen; see [[Tooltip]].

Together these features replace much of what component libraries shipped as script, a recurring pattern in which a widespread workaround becomes a platform feature; see [[Polyfill]]. Because the attributes work without script, popovers fit pages that load progressively; see [[Progressive Enhancement]]. They cover dropdowns, menus triggered by right-clicks, and teaching hints; see [[Context Menu]].

## See also
- [[Focus Management]]
- [[Hamburger Menu]]
