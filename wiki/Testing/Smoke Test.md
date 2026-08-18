---
aliases:
  - Sanity Test
tags:
  - testing
summary: A fast, shallow check that a build isn't catastrophically broken, run before investing in a deeper test pass.
---
**Smoke test** is a small, fast set of checks run against a build to confirm it isn't catastrophically broken — the app starts, the homepage loads, login works — before spending time on a deeper, slower [[Integration Test]] or [[Unit Test]] pass. The name comes from hardware testing: power on a circuit and check whether it visibly smokes before doing anything more refined, and the software usage keeps that spirit intact — a smoke test isn't trying to find subtle bugs, it's trying to find the ones so severe that everything downstream would be a waste of time to run.

The defining property is speed and shallowness on purpose. A smoke suite for a web app might be five checks — server responds, a logged-in session loads a page, a core API returns 200 — run in seconds, versus a full suite that might take an hour and cover edge cases three levels deep. That asymmetry is the whole design intent: a smoke test is meant to run on every deploy, every merge, maybe every few minutes against production, as a tripwire, while the expensive full suite runs less often or only pre-merge.

In CI pipelines, smoke tests commonly gate whether the expensive suite even runs at all — fail the smoke test, and the pipeline stops immediately rather than burning twenty minutes of compute discovering the deeper suite also fails for the same root cause. In production, the same pattern shows up as a post-deploy health check: hit a few critical endpoints immediately after a deploy completes, and roll back automatically if they don't respond, catching a broken deploy in seconds rather than waiting for a user report or a slower monitoring alert to surface it.

## See also
- [[Integration Test]]
- [[Unit Test]]
- [[Coverage Gate]]
- [[Flaky Test]]
