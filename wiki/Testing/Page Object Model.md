---
aliases:
  - Page object
  - Page objects
  - Screenplay pattern
tags:
  - testing
summary: Wrapping each page or component of a UI in an object that exposes what a user can do there, so browser tests describe intent and selectors live in one place.
---
The **page object model** is a pattern for browser and UI tests in which each page or significant component of the interface is represented by an object that exposes what a user can do there. A test calls something like "sign in as this user" or "add the first result to the cart" instead of finding inputs by selector, typing into them, and clicking buttons. The pattern emerged in the Selenium community in the late 2000s, and Martin Fowler's 2013 write-up made it the default structure for [[End-to-End Test]] suites.

It addresses the two classic problems of UI tests:

- **Brittleness.** Tests that reach directly into markup break whenever a class name, ID, or layout changes. With page objects, each selector lives in one place, so a markup change means one fix rather than dozens.
- **Readability.** Tests full of selectors and clicks hide what is being checked. Tests written against page objects read like a description of the user's journey.

Fowler's guidance is that page objects should model what the user sees and does, not the HTML structure, and should usually not contain assertions. They return data or other page objects, and the test decides what to check. A sign-in method that lands on the dashboard returns a dashboard object, which makes navigation explicit and lets the type system catch tests that skip a step.

Large pages are split into component objects, such as a header, a search box, or a date picker, reused wherever that component appears. This mirrors component-based front ends, and a component tested in isolation as a [[Component Story]] can share its page object with full-page tests.

The choice of selectors matters as much as their location. CSS classes change with styling, and positional selectors break when content moves. Modern practice favors locating elements the way users and assistive technology do: by role, label, and visible text, as Testing Library popularized. That makes tests sturdier and doubles as a check that elements have proper names and [[ARIA]] roles, a modest form of [[Accessibility Testing]].

Page objects also concentrate waiting logic. Many UI tests are a [[Flaky Test]] because they act before the page is ready, and a page object that waits for its own readiness fixes that once for every test using it.

The **Screenplay pattern**, developed by Antony Marcano and others, takes the idea further. Tests are written in terms of actors who have abilities, such as browsing the web or calling an API, and perform tasks made of smaller interactions. It suits large suites and pairs naturally with [[Behavior-Driven Development]] scenarios, at the cost of more ceremony.

Like any abstraction, page objects can be overdone: one that mirrors every element adds indirection without hiding anything.

## See also
- [[End-to-End Test]]
- [[Headless Browser]]
- [[Test Smell]]
- [[Visual Regression Testing]]
