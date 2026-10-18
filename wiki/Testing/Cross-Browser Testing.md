---
aliases:
  - Browser compatibility
  - Can I Use
tags:
  - testing
summary: Checking that a website works and looks right across different browsers, engines, devices, and versions, a job that shrank as standards converged but never went away, since engines, fonts, and screens still differ.
---
**Cross-browser testing** is the practice of checking that a website works across the browsers, engines, operating systems, and devices people actually use. Two browsers given the same code can lay it out differently, support different features, or fail in different ways, and a site that works in the developer's browser can be broken in someone else's.

The problem was worst during the [[Browser Wars]]. In the late 1990s and 2000s, Netscape and Internet Explorer implemented features their own way, and Internet Explorer 6 stayed dominant for years with well-known layout bugs. Developers wrote separate code paths, used hacks that only one browser would read, and kept old computers around for testing. Some sites simply told visitors to use a different browser.

Things improved as browsers converged on shared standards and began updating themselves automatically; see [[Web Standards]]. Most traffic now goes through three engines: Blink in Chrome and its relatives, WebKit in Safari, and Gecko in Firefox; see [[Browser Engine]]. Since 2022 the major vendors have run a joint effort, Interop, that picks known inconsistencies each year and fixes them together, backed by a shared suite of tests run against every engine.

Differences remain:

- **Feature support.** New features arrive in engines at different times. The website Can I Use, started in 2009, tracks which browser versions support what. Sites detect features rather than browser names and fill gaps with a [[Polyfill]] or by building in layers; see [[Progressive Enhancement]].
- **Rendering.** Fonts, anti-aliasing, and form controls differ across operating systems, so pixel-perfect matching is impossible; see [[Font Rendering]].
- **Devices.** Screen sizes, touch input, and mobile browsers behave differently from desktop ones; see [[Responsive Breakpoint]].
- **Assistive technology.** Screen readers interact with each browser's accessibility layer differently, and some combinations need checking by hand; see [[Accessibility]].

Testing every combination is impossible, so teams choose based on their analytics and on risk; see [[Risk-Based Testing]]. Automated tools drive real browsers through scripted interactions; see [[Headless Browser]] and [[End-to-End Test]]. Cloud services rent access to thousands of real device and browser combinations. Screenshot comparison catches visual differences, though small rendering variations between platforms require per-browser reference images; see [[Visual Regression Testing]].

Browser-specific tests are among the slowest and least reliable, so most teams keep them few and rely on faster tests for logic; see [[Test Pyramid]]. Emulated mobile screens in desktop browsers are a quick check, but they use the desktop engine and miss real device behavior.

Checking user-agent strings to guess the browser, rather than detecting features, causes its own breakage, and the strings have become a tangle of legacy names that every browser imitates.

## See also
- [[Pseudolocalization]]
- [[Browser Fingerprinting]]
