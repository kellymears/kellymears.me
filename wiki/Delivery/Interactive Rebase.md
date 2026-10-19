---
aliases:
  - Fixup commit
  - Autosquash
tags:
  - delivery
summary: Git's tool for rewriting a series of commits before sharing them, reordering, combining, splitting, and rewording them so the history tells a clear story rather than recording every false start.
---
**Interactive rebase** is a Git command, `git rebase -i`, that lets a developer rewrite a series of their own commits before sharing them. It opens a list of recent commits in a text editor, one per line, and the developer edits the list to say what should happen to each. Git then replays them according to those instructions; see [[Rebase]].

The main instructions:

- **pick** keeps a commit as it is. Reordering the lines reorders the commits.
- **reword** keeps the change but edits the message; see [[Commit Message]].
- **squash** and **fixup** fold a commit into the one before it, keeping or discarding its message.
- **edit** pauses on a commit so it can be amended or split into several.
- **drop**, or deleting the line, removes a commit entirely.

The purpose is a readable history. Real work is messy: a feature commit followed by "fix typo," "actually fix it," and "address review comments." Each of those is noise to a future reader trying to understand the change, and noise to tools that rely on history. Rewritten, the same work becomes a few commits, each a coherent step that builds and passes tests; see [[Atomic Commit]]. That pays off when [[Git Bisect]] searches for a regression, since every commit it lands on works, and when someone reverts one piece; see [[Git Revert]].

**Fixup commits** make this routine. Running `git commit --fixup` with a target commit creates a commit marked to be folded into that one later. Rebasing with `--autosquash` moves each fixup into place automatically, so small corrections made during [[Code Review]] can be recorded separately for reviewers and merged into the right commits before landing.

Rewriting history has a hard rule: don't rewrite commits other people have already built on. Rebasing replaces commits with new ones that have different identifiers. Anyone holding the old versions now has diverged history, and pushing the rewrite requires overwriting the remote branch; see [[Force Push]]. Most teams rewrite freely on private branches and never on shared ones. Lost commits aren't truly gone for a while, since Git records where branches pointed; see [[Reflog]].

Teams disagree about how much to care. Some squash every pull request into one commit at merge time, which makes cleanup unnecessary but discards the intermediate steps; see [[Squash Merge]]. Others want each commit reviewed and kept, which makes interactive rebase part of daily work. Workflows built on chains of small dependent branches lean on it heavily, since changing an early commit means replaying everything above it; see [[Stacked Pull Requests]].

Replaying commits can cause conflicts at each step, which must be resolved one at a time; see [[Merge Conflict]]. Moving a single commit to another branch is a smaller operation; see [[Cherry-Pick]].

## See also
- [[Detached HEAD]]
- [[Pull Request]]
- [[Jujutsu]]
