---
aliases:
  - Screen readers
  - Assistive technology
  - Accessibility tree
tags:
  - design
summary: Software that turns an interface into speech or braille for people who can't see the screen, which navigates by structure rather than reading top to bottom, and exposes every shortcut a sighted design took.
---
A **screen reader** is software that conveys what's on a screen through synthesized speech or a refreshable braille display. It's the primary way blind people use computers and phones, and it's also used by people with low vision, dyslexia, and some cognitive disabilities. Major options include JAWS and the free NVDA on Windows, VoiceOver built into Apple devices, and TalkBack on Android.

Screen reader users rarely listen to a page from top to bottom. They navigate by structure: jumping between headings, landmarks such as the main content or navigation, links, form fields, and tables. Surveys of screen reader users consistently find that navigating by headings is the most common way to find content on a long page. Experienced users also speed speech up far beyond conversational rates, skimming by ear much as sighted people skim by eye.

To do this, the screen reader doesn't read pixels. The browser builds an **accessibility tree** from the page's [[Document Object Model]]: a parallel structure listing each meaningful element's *role* (button, link, heading), *name* (its label), and *state* (expanded, checked, disabled). The screen reader reads that tree through the operating system's accessibility interfaces. Everything it can say comes from there.

That makes markup decisive:

- **Semantic elements carry meaning for free.** A real `<button>` is announced as a button, is focusable, and responds to the keyboard. A `<div>` styled to look like one is announced as nothing; see [[Semantic HTML]].
- **ARIA fills gaps** where no native element fits, such as tabs or comboboxes, but it only changes what's announced, not behavior; see [[ARIA]].
- **Images need text alternatives.** An image without alt text is announced by file name or skipped. An icon-only button needs an accessible name; see [[Iconography]].
- **Labels must be connected.** A form field's visible label has to be programmatically tied to the field; see [[Form Design]].

Dynamic interfaces add failure modes:

- **Route changes.** When a [[Single-Page Application]] swaps content without a page load, nothing tells the screen reader, so focus must be moved deliberately; see [[Focus Management]].
- **Modals.** Focus should move into a dialog and stay there until it closes; see [[Modal Dialog]] and [[Focus Trap]].
- **Updates.** Messages that appear without focus moving, such as a saved confirmation, need a *live region* to be announced; see [[Toast Notification]].
- **Visual order.** Content rearranged by CSS is still read in source order; see [[Flexbox]].

Automated checkers catch only a minority of these problems. The reliable test is to use a screen reader yourself, keyboard only, eyes off the screen, and try to complete a real task. It quickly shows whether the interface has structure or only appearance, the gap that [[Accessibility]] work tries to close.

## See also
- [[Optical Character Recognition]]
- [[Inclusive Design]]
- [[Emoji]]
