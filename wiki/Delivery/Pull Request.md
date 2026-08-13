---
aliases:
  - PR
  - Merge request
tags:
  - delivery
summary: A proposal to merge a branch, carrying review, automated checks, and the discussion around it.
---
A **pull request** is a request to merge one branch into another, with a description, a diff, automated checks, and a discussion thread attached. It has become the standard unit of change in collaborative software, largely because it is where review and automation converge.

Its description is a durable artifact, not a formality. On a [[Squash Merge]] it becomes the permanent commit message. A useful one states what changed, why, and how it was verified — with the verification claims being genuinely verifiable. A test-plan bullet describing something nobody actually did reads as an observation and is not one, and a reviewer comparing revisions of the description will notice.

Size is the single strongest predictor of review quality. Reviewers engage carefully with small diffs and skim large ones, so a large change gets less scrutiny precisely when it needs more. Splitting into a sequence is the usual remedy; see [[Stacked Pull Requests]].

Two mechanical notes. Changing only the target branch of a pull request does not necessarily re-trigger validation, since the platform's default event set may not include it. And a proposal whose work is visual needs the evidence embedded where the review happens — a path to a local screenshot is invisible on the platform.

## See also
- [[Code Review]]
- [[Continuous Integration]]
- [[Squash Merge]]
- [[Human in the Loop]]
- [[Branching Model]]

## Related
- [[Trunk-Based Development]]
- [[Merge Train]]
- [[Provenance]]
