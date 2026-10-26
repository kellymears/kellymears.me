---
aliases:
  - E2E test
  - End-to-end testing
  - E2E
  - System test
  - Browser test
tags:
  - testing
summary: A test that drives the whole running system the way a user would, from the interface down through every real dependency, buying the most confidence at the highest cost.
---
An **end-to-end (E2E) test** exercises a complete, running application the way a user would. For a web app, that usually means a script drives a real browser, often a [[Headless Browser]], to load pages, click buttons, fill in forms, and check what appears, while the real server, database, and queues run behind it. Nothing is replaced with a [[Test Double]]. If an E2E test of checkout passes, a user could check out.

That realism is the whole point. A [[Unit Test]] proves a function works in isolation, and an [[Integration Test]] proves a few components cooperate, but neither can see failures in the seams between everything: a misconfigured environment variable, a wrong route, a migration that wasn't run, a broken script tag, or two services that disagree about a field name. End-to-end tests catch exactly these, because they cross every seam.

They come with costs that grow with suite size:

- **Slow.** Each test starts browsers, seeds data, and waits on real network calls. Suites take minutes to hours.
- **Flaky.** Real timing, animations, network latency, and shared state make E2E suites the main source of [[Flaky Test]] failures. A test that clicks before a button is ready fails one run in fifty.
- **Vague failures.** A failed checkout test says something is broken somewhere between the button and the database, and finding where takes debugging.
- **Expensive setup.** Each test needs [[Test Fixture]] data, and tests that share a database can interfere with each other unless [[Test Isolation]] is designed in.

The usual conclusion is the test pyramid: a small number of E2E tests covering the critical user journeys, such as signing up, logging in, and paying, sitting on a much larger base of fast, focused tests. [[Contract Testing]] covers service boundaries without spinning up everything. [[Visual Regression Testing]] often rides along on the same browser automation to catch layout breakage.

Good E2E tests are written against what a user sees, such as visible labels and roles, rather than CSS classes or DOM structure, which ties them to [[Accessibility]] semantics and keeps them from breaking on every restyle. A [[Smoke Test]] after deploy is often just a handful of E2E checks run against production.

## See also
- [[Service Virtualization]]
- [[Test Impact Analysis]]
- [[Regression Testing]]
