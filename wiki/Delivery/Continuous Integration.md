---
aliases:
  - CI
tags:
  - delivery
summary: Automatically building and testing every change, so integration problems surface immediately.
---
**Continuous integration** is the practice of automatically building and validating every change as it is proposed, so that problems appear within minutes of being created rather than at some later integration event.

The value is proportional to how quickly and how reliably it reports. A slow pipeline gets worked around; an unreliable one gets ignored, which is the more dangerous outcome — once reruns are routine, real failures are indistinguishable from noise. See [[Flaky Test]].

Several failure modes are worth knowing because they all produce a *false* green.

**A partial check set.** Immediately after a push only the fastest checks have registered, so a watcher counting pending items sees none and declares success. Confirming against the checks recorded for a specific revision, rather than the current row set, closes it. See [[Vacuous Truth]].

**A skipped job.** Jobs conditioned on a target branch or dependent on an earlier job report "skipping" rather than failing, and a skip looks like a pass at a glance.

**A missing run.** A pipeline can simply fail to be created for a push while sibling workflows fire normally, and no amount of waiting produces it.

**A stale reference.** A run computed against a merge preview that predates a recent merge tells you nothing about the current state.

## See also
- [[Continuous Deployment]]
- [[Coverage Gate]]
- [[Merge Train]]
- [[Trunk-Based Development]]
- [[Branching Model]]
- [[Semantic Conflict]]

## Related
- [[Stacked Pull Requests]]
- [[Three-Way Merge]]
