---
aliases:
  - Color scheme
  - Theme toggle
tags:
  - design
summary: Serving an alternate palette for low-light preference, and the three states that implies.
---
**Dark mode** is an alternate colour scheme for interfaces, driven either by the operating system's stated preference or by an explicit choice within the application.

The important structural fact is that there are **three** states, not two: light, dark, and *unset*. An explicit choice usually stamps a marker on the document root; the default "follow the system" setting stamps nothing, leaving only the media query to distinguish light from dark. A theme implementation that handles only two states will get the third wrong, usually by ignoring an explicit choice or by ignoring the system preference.

The robust shape is: define the complete light palette on the bare root selector, redefine only the changed tokens under the dark media query guarded against an explicit light choice, and redefine them again under an explicit dark marker so the toggle wins in both directions. No colour should have its only definition inside a media query.

Two practical notes. Because the common implementation toggles a class on the root element, code that needs to *observe* the current theme must watch that element rather than the media query — the media query reports the system preference, not the applied theme. And dark mode is not an inversion: shadows, image treatment, and contrast ratios all need separate consideration; see [[Color Contrast]].

## See also
- [[Design Token]]
- [[CSS Custom Property]]
- [[Scoped Styling]]
- [[OKLCH]]

## Related
- [[Utility-First CSS]]
- [[Silent Failure]]
- [[Portal]]
- [[Motion Design]]
