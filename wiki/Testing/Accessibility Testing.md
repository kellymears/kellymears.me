---
aliases:
  - A11y testing
  - Accessibility audit
  - Screen reader testing
  - axe-core
tags:
  - testing
summary: Checking that people using screen readers, keyboards, magnification, or other assistive technology can actually use an interface, through a mix of automated scans and hands-on testing.
---
**Accessibility testing** checks whether people with disabilities can use a product, including people who are blind and use screen readers, people who navigate by keyboard or switch devices, people with low vision who zoom or rely on high contrast, and people with cognitive or motor differences. The usual yardstick is the Web Content Accessibility Guidelines (WCAG), whose success criteria define what [[Accessibility]] means in testable terms.

The problem is common. The WebAIM Million, an annual automated scan of the top million home pages, has found detectable WCAG failures on about 95 percent of them, most often low [[Color Contrast]], images without text alternatives, empty links, and form fields without labels.

Testing happens at several levels:

- **Automated scanning.** Tools such as axe-core and Lighthouse inspect the rendered page for rule violations, a form of [[Static Analysis]] applied to the [[Document Object Model]]. They're fast and fit into [[Continuous Integration]], often running inside an [[End-to-End Test]] in a [[Headless Browser]]. But they find only a minority of problems. A 2017 test by the UK Government Digital Service planted 142 known barriers in a page; the best tool found about 40 percent.
- **Keyboard testing.** Put the mouse away and use Tab, Shift+Tab, Enter, Space, Escape, and the arrow keys. Can every control be reached and operated? Is the focus indicator visible, and does focus land somewhere sensible after a dialog closes? See [[Keyboard Navigation]] and [[Focus Management]].
- **Screen reader testing.** Use VoiceOver, NVDA, or JAWS to hear what the page actually announces. Do buttons have names, do headings outline the page, are dynamic changes announced? This is where misused [[ARIA]] shows up, since incorrect roles and states can make a page worse than none at all.
- **Visual checks.** Zoom to 200 and 400 percent, check reflow on narrow screens, simulate [[Color Vision Deficiency]], and turn on reduced motion.
- **Testing with disabled users.** No checklist replaces watching someone who relies on assistive technology every day.

Automated tools can't judge meaning. They can confirm an image has alternative text but not that the text describes it, or that a button has a name but not that the name makes sense. Much of accessibility also comes down to structure: [[Semantic HTML]] gets most behavior right by default, so tests often find that the fix is replacing a clickable `div` with a real button.

Accessibility testing works best early and continuously. Components built and tested in isolation, as in a [[Component Story]], can carry accessibility checks with them, so every page that uses them inherits the result. Bugs found at the end of a project tend to be structural and expensive, while bugs caught per component are cheap, the same economics that drive the rest of testing.

## See also
- [[Page Object Model]]
- [[Usability Testing]]
