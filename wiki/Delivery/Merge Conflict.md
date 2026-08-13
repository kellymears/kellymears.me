---
aliases:
  - Conflict resolution
tags:
  - delivery
summary: Overlapping changes that a merge cannot combine automatically, requiring a decision.
---
A **merge conflict** arises when two lines of work modify the same region and the merge algorithm cannot determine the correct combination. Git marks the region with both versions and hands it to a person.

Resolving well is a design activity, not a text-editing one. The question is what the code should be given both intentions, which sometimes means neither side verbatim.

Several practical points recur:

**Resolve toward the branch's own trajectory.** A branch may already contain a commit that deliberately reconciles the very interface in conflict, sitting at its tip. Reading the branch's log before proposing a resolution avoids overriding a decision that was already made — and inventing a third design forces the author to rewrite their work.

**Preserve per-commit shape when rebasing.** Resolving each intermediate commit toward the branch's final design, rather than jumping straight to it, keeps each commit sound.

**A reported conflict is not always real.** Hosting platforms cache mergeability and go stale in both directions. Performing the merge locally is the only ground truth; a conflict a platform reports and the tool cannot reproduce should never be hand-resolved.

**Additive conflicts have a standard answer.** Two branches adding properties to one interface conflict wholesale; the resolution is the union, in whatever order the file already uses.

## See also
- [[Three-Way Merge]]
- [[Rebase]]
- [[Semantic Conflict]]
- [[Ground Truth]]
- [[Stacked Pull Requests]]

## Related
- [[Merge Train]]
- [[Continuous Integration]]
- [[Trunk-Based Development]]
