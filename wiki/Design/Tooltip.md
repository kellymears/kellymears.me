---
aliases:
  - Toggletip
  - Popover
  - Hover card
  - Anchor positioning
tags:
  - design
summary: A small label that appears when hovering or focusing an element, useful for naming icons and easy to make inaccessible, unreachable on touch, or covered by other layers.
---
A **tooltip** is a small, temporary label that appears beside an element when a pointer hovers over it or keyboard focus lands on it, then disappears when the pointer or focus leaves. Its classic job is naming an icon-only button: hover the little floppy disk and "Save (⌘S)" appears. Apple shipped Balloon Help with System 7 in 1991, and Microsoft's toolbar *ToolTips* in the early 1990s gave the pattern its name.

Tooltips solve a narrow problem well: supplementary information for people who want it, out of the way for those who do not, an application of [[Progressive Disclosure]]. They become a problem when they hold anything essential, because many people will never see them:

- **Touch screens have no hover.** A tooltip triggered only by hovering does not exist on a phone.
- **Keyboard users need focus triggers.** Tooltips must appear on focus, not just mouse hover, to support [[Keyboard Navigation]].
- **Discovery depends on curiosity.** Nobody hovers over everything, so content hidden in tooltips is content most people skip.

For information people need, a visible label or inline help text is better. Icons with visible text labels outperform icons with tooltips, the argument made under [[Iconography]].

The accessibility rules are specific. WCAG 2.1, from 2018, requires that content appearing on hover or focus be *dismissible* without moving the pointer, usually with Escape; *hoverable*, so the pointer can move onto the tooltip without it vanishing; and *persistent* until the person dismisses it or moves away. The tooltip should be linked to its trigger with [[ARIA]], typically `role="tooltip"` and `aria-describedby`, so screen readers announce it. Tooltips should never contain interactive content such as links; that requires a dialog or popover with proper [[Focus Management]].

A **toggletip** is the touch-friendly variant: a small info button that shows its text on click or tap and hides it on a second tap or Escape, working the same way on every input method. For anything richer, such as a profile preview on hovering a username, a *hover card* or popover is the right pattern.

A short delay, often a few hundred milliseconds, prevents tooltips from flashing as the pointer passes by; once one tooltip is showing, neighbors can appear instantly.

Positioning is harder than it looks. A tooltip must avoid being clipped by a scrolling container, must flip sides near the edge of the screen, and must sit above other layers, which runs into [[Stacking Context]] rules. Libraries traditionally render tooltips through a [[Portal]] at the end of the document and compute positions in script. The web platform now handles much of this natively: the HTML `popover` attribute puts content in the browser's top layer, and CSS anchor positioning tethers it to its trigger. [[Headless Component]] libraries package the remaining behavior.

## See also
- [[Iconography]]
- [[Text Truncation]]
- [[ARIA]]
- [[Touch Target Size]]
- [[Microcopy]]
- [[Signifier]]
