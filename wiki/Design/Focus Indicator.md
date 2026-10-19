---
aliases:
  - Focus ring
  - Focus-visible
tags:
  - design
summary: The visible outline or highlight showing which element on a screen will receive keyboard input, essential for anyone who doesn't use a mouse, and for years routinely removed by designers who found it unattractive.
---
A **focus indicator** is the visual marker, usually an outline or ring, showing which element on a screen currently has keyboard focus: the link, button, or field that will respond when someone presses Enter or starts typing. For people who navigate with a keyboard, switch device, or other alternative input, it plays the role a mouse pointer plays for everyone else; see [[Keyboard Navigation]].

Browsers draw a default indicator, traditionally a dotted or blue outline. For years, many designers removed it because it appeared when people clicked buttons with a mouse and looked out of place. A single line of CSS, setting the outline to none, became one of the most common accessibility failures on the web, leaving keyboard users unable to tell where they were. Accessibility advocates campaigned against the practice for over a decade.

Standards require a visible indicator. The Web Content Accessibility Guidelines have required since 2008 that keyboard focus be visible; see [[WCAG]]. Version 2.2, published in 2023, added that a focused element must not be entirely hidden by other content, such as a sticky header or cookie banner, and set out stricter optional requirements for the indicator's size and contrast; see [[Sticky Header]] and [[Color Contrast]].

The design problem was that the same indicator served two audiences. A newer CSS feature, the focus-visible selector, widely supported from 2022, lets the browser decide when an indicator is needed: it appears when someone navigates with the keyboard and usually stays hidden after a mouse click on a button. Text fields still show focus after a click, since a person needs to know where typing will go. Designers could finally style a clear indicator without bothering mouse users.

A good indicator is easy to see against every background it might appear on. A two-color ring, such as a dark outline with a light outer edge, stays visible on both light and dark surfaces; see [[Dark Mode]]. Offsetting the ring from the element keeps it from merging with borders. Indicators shouldn't rely on color alone, since some viewers can't distinguish the change; see [[Color Vision Deficiency]]. Some operating systems' high-contrast modes override page colors entirely, so indicators built from backgrounds or shadows can disappear, while outlines survive.

Focus must also go somewhere sensible. When a dialog opens, focus should move into it, and when it closes, focus should return to what opened it; see [[Focus Management]] and [[Focus Trap]]. Focus that jumps unexpectedly or lands on invisible elements breaks the indicator's usefulness even if it's styled well.

The indicator is a clear example of a design detail that matters little to most users and enormously to some, and of how serving everyone often helps more people than expected; see [[Inclusive Design]] and [[Signifier]].

## See also
- [[Visual Hierarchy]]
- [[Design System]]
