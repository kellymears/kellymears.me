---
aliases:
  - Golden Master Testing
  - Approval Testing
tags:
  - testing
summary: Comparing an output against a checked-in reference file the whole team agreed was correct, rather than an inline assertion.
---
**Golden file testing** compares a program's output — rendered HTML, a generated report, a compiler's output, an image — against a reference file checked into the repository and previously agreed to be correct, rather than asserting the expected result inline in the test code. The reference is the "golden file" (or "golden master"), and updating it is a deliberate, reviewable act: regenerate it, diff the change, and commit the new version only once someone has confirmed the new output is right, not just different.

The technique predates modern testing frameworks by decades — "golden master" as a term comes from characterization testing of legacy systems, where the goal was often just to pin down *current* behavior before refactoring, without claiming that behavior was correct, only that it shouldn't change accidentally. That's a meaningfully different intent from a normal test asserting known-correct behavior, and it's worth keeping straight: a golden file test can assert "don't regress" without ever asserting "this is right," which makes it well suited to legacy code nobody fully understands yet dangerous applied uncritically to new code, where it can bless a bug on day one simply by capturing it as the baseline.

Golden files are close kin to [[Snapshot Testing]] — the underlying mechanism (save baseline, diff future runs against it, human approves changes) is the same idea under a different name, with "snapshot" more common in JS/frontend tooling (Jest) and "golden file" more common in compilers, CLIs, and backend output comparison. Both share the same central risk: a diff that's large, frequent, or hard to read gets rubber-stamped rather than reviewed, at which point the test stops verifying anything and just tracks whatever last got approved. The mitigation is the same for both — keep the compared output small and semantically meaningful, and treat every approval as a real code-review decision rather than a formality.

## See also
- [[Snapshot Testing]]
- [[Integration Test]]
- [[Visual Regression Testing]]
- [[Assertion]]
