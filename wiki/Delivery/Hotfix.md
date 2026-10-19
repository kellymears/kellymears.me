---
aliases:
  - Hotfix branch
  - Emergency change
  - Emergency fix
tags:
  - delivery
summary: An urgent fix shipped outside the normal release flow, how teams branch and backport it, and why the healthiest hotfix process is the normal process run fast.
---
A **hotfix** is an urgent change shipped outside the normal release schedule to fix a problem in production: a security hole, data corruption, or an outage. The term comes from the idea of patching a "hot" running system. Hotfixes are a test of a team's delivery process, because urgency pushes people to skip the very checks that keep releases safe.

How a hotfix flows depends on the [[Branching Model]]:

- **Release branches.** If production runs from a release branch or a [[Git Tag]], the fix is made on a branch from that tag, released, and then merged or cherry-picked back to the main line so the next release doesn't reintroduce the bug. Forgetting that last step is a classic way a fixed bug comes back.
- **[[Trunk-Based Development]].** The fix goes into the main branch like any other change and is deployed through the usual pipeline. If main has moved on with unreleased work, the fix may also be cherry-picked to a release branch.
- **Multiple supported versions.** Projects with [[Long-Term Support]] releases backport the fix to every affected version, which is why backporting is a large share of maintenance work.

Fixing forward isn't always the right first move. If the problem appeared with the latest release, a [[Rollback]] or turning off a feature flag restores service in minutes, and a proper fix can follow without time pressure. A hotfix makes sense when rolling back isn't possible, such as after a database migration or a fix for a long-standing security flaw.

Under pressure, teams tend to skip review, tests, or staging. The risk is real: a rushed fix is itself a change, and changes cause most outages. Many organizations have a story of an emergency change that caused a bigger incident than the original problem. Safer practices:

- **Keep the fix minimal.** Change only what's needed; save refactoring for later.
- **Keep review.** A second pair of eyes, even briefly, catches the obvious mistake; see [[Code Review]].
- **Run the pipeline.** If the full suite is too slow for emergencies, that's a problem to fix beforehand, not to work around during an incident; see [[Deployment Pipeline]].
- **Write the regression test** with the fix, so the bug can't return silently.

The deeper lesson, reflected in [[DORA Metrics]], is that teams who deploy frequently barely need a special hotfix process. If the normal path from commit to production takes minutes and is safe, a hotfix is just a normal change that skipped the queue. Teams with infrequent, heavy releases need elaborate emergency procedures, and those procedures are used least and tested least.

A hotfix usually belongs to an incident, and the [[Incident Response]] review that follows should ask why the bug reached production and whether the fix process itself worked.

## See also
- [[Patch Tuesday]]
- [[Code Freeze]]
- [[Gitflow]]
- [[Live Patching]]
