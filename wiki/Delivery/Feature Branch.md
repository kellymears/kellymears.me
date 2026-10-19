---
aliases:
  - Integration hell
  - Long-lived branch
  - Topic branch
tags:
  - delivery
summary: A branch created to develop one change in isolation before merging it back, a workflow that keeps the main line stable but grows riskier the longer the branch lives, since its divergence from everyone else's work compounds.
---
A **feature branch** is a branch created to develop one change, such as a new feature or a bug fix, separately from the main line of a project. The developer commits to it freely, and when the work is done it's merged back. Until then, unfinished work stays out of the code everyone else depends on; see [[Branching Model]].

Feature branches became the default way of working once distributed version control made branches cheap. In older centralized systems, branching was slow and merging was painful, so teams branched rarely. Git made a branch little more than a pointer to a commit, and hosting platforms built their review flow around them: open a branch, push it, and propose merging it; see [[Pull Request]].

The appeal is real. Each branch is a natural unit of review. Half-built work never breaks the main line, and an abandoned idea can simply be deleted. Several people can work on unrelated changes without stepping on each other; see [[Code Review]]. Branches are usually named for their purpose, often with a prefix such as feature or fix and an issue number, so tooling can link them to tracked work.

The trouble is **time**. A branch records the main line as it was when the branch was created. Every day it stays open, other people merge their own work, and the branch's view of the codebase grows staler. When it finally merges, all of that divergence must be reconciled at once. Textual conflicts are the visible part. The worse part is changes that merge cleanly but no longer fit together, such as a renamed function called from new code the other branch added; see [[Merge Conflict]] and [[Semantic Conflict]]. Teams that let many branches live for weeks end up in what's called **integration hell**, where merging takes longer than the features did. This was the problem continuous integration was originally named to solve: integrate everyone's work at least daily so divergence can't pile up; see [[Continuous Integration]].

Remedies mostly shrink the branch's lifetime. Keeping branches to a day or two keeps merges small. Merging the main line into the branch, or rebasing onto it, regularly keeps the branch current; see [[Rebase]]. Large changes can be split into a sequence of small reviewable steps; see [[Stacked Pull Requests]].

At the far end is trunk-based development, where branches last hours if they exist at all and unfinished features ship hidden behind runtime switches; see [[Trunk-Based Development]] and [[Feature Flag]]. Long-lived branches still have legitimate uses, such as maintaining an old release line, where divergence is intended; see [[Long-Term Support]].

## See also
- [[Three-Way Merge]]
- [[Squash Merge]]
- [[Merge Train]]
