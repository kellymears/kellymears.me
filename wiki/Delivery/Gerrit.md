---
aliases:
  - Patch set
  - Change-Id
  - Rietveld
tags:
  - delivery
summary: The code review server built for Android, descended from Google's internal review tool, where each change is one commit revised through numbered patch sets and must earn approval and a passing build before it is submitted.
---
**Gerrit** is an open source code review system for Git repositories, created at Google by Shawn Pearce for the Android project around 2008. Large projects with strict review rules use it, including Android, Chromium, the Go language, and OpenStack; see [[Code Review]].

Its lineage goes back to Google's internal tools. Guido van Rossum, the creator of Python, wrote a review tool for Google's codebase called Mondrian, and in 2008 published an open source counterpart named **Rietveld**, after the Dutch designer Gerrit Rietveld, which reviewed Subversion changes. Gerrit started as a fork of Rietveld adapted to Git, and took the designer's first name; see [[Subversion]].

Gerrit's unit of review is a single commit, not a branch of commits as in a [[Pull Request]]:

- **Changes and patch sets.** A developer pushes a commit to a special review reference, and Gerrit opens a change for it. To address feedback, the developer amends that same commit and pushes again. Each upload becomes a new **patch set** of the same change, and reviewers can compare any two patch sets to see only what was revised; see [[Diff]].
- **The Change-Id.** Amending a commit changes its hash, so Gerrit needs another way to know two uploads belong together. A [[Git Hook]] adds a footer line with a stable identifier to every commit message, and Gerrit matches on it; see [[Commit Message]].
- **Votes.** Reviewers score a change, typically from minus two to plus two. A plus two means approved; a minus two blocks submission until the person who gave it withdraws it. A separate label records whether automated builds and tests passed; see [[Continuous Integration]].
- **Submission.** When the rules are met, Gerrit itself merges the commit, rebasing or cherry-picking it onto the target branch if the project is set up that way. Developers usually cannot push to protected branches directly.

Because every change is one commit, history stays linear and each commit is reviewed on its own, which suits [[Git Bisect]] and makes reverting easy. Larger work becomes a chain of dependent changes, each reviewed separately, the same idea later rebuilt on GitHub as [[Stacked Pull Requests]]. Amending in place requires comfort with rewriting commits; see [[Interactive Rebase]].

The patch set model inherits from emailed patches, where a revised series is resent as version two or three of the same proposal; see [[Email Patch Workflow]]. Gerrit adds a web interface, inline comments, access control per branch, and a record of who approved what, which matters for projects needing an audit trail; see [[Change Advisory Board]].

Critics find its interface dense and the one-commit discipline unfamiliar to developers raised on pull requests. Its supporters argue that small, individually reviewed commits produce better history and faster review; see [[Trunk-Based Development]].

## See also
- [[Code Owners]]
- [[Merge Train]]
