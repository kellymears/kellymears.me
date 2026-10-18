---
aliases:
  - Protected branch
  - Protected branches
  - Required status checks
  - Branch rules
  - Rulesets
tags:
  - delivery
summary: Server-side rules that stop anyone, including administrators by default, from pushing straight to important branches, requiring reviews, passing checks, and intact history instead.
---
**Branch protection** is a set of rules a Git hosting platform enforces on important branches, typically the main branch and release branches. Instead of allowing anyone with write access to push anything, the platform requires that changes arrive by [[Pull Request]] and meet conditions before merging. It turns team agreements, such as "everything gets reviewed" and "never merge red builds," into rules the server enforces.

Common rules include:

- **Required reviews.** A minimum number of approvals before merging, sometimes from specific people via [[Code Owners]]. New pushes can dismiss stale approvals, so a reviewer cannot approve one version and see another merged.
- **Required status checks.** Named [[Continuous Integration]] jobs must pass. Optionally the branch must be up to date with the target, so checks ran against the code that will actually land.
- **No force pushes.** Rewriting the branch's history is blocked, protecting everyone who has already fetched it. Recovering from a rewritten shared branch is far harder than using a personal [[Reflog]].
- **No deletion.** The branch cannot be removed by accident.
- **Linear history.** Merge commits are rejected, requiring [[Squash Merge]] or [[Rebase]] merges.
- **Signed commits.** Only commits with verified signatures are accepted, as in [[Commit Signing]].

Platforms have moved from per-branch settings toward rulesets, which apply rules across many branches, tags, and repositories at once.

The rules exist because good intentions fail under pressure. During an incident, at the end of a long day, or when a change looks trivial, people skip review or merge on a red build. Protection makes the safe path the only path, a [[Defensive Default]] for collaboration. It also supports the separation of duties that auditors look for, since nobody can author and approve their own change alone.

Server-side enforcement matters because client-side checks can be skipped. A [[Git Hook]] on a developer's machine is easily bypassed or never installed, whereas the server cannot be.

Strict rules have costs:

- **Up-to-date requirements serialize merges.** On busy repositories, requiring the branch to be current means each merge forces every other open request to rebase and re-run checks. A merge queue, covered under [[Merge Train]], solves this by testing changes in order automatically.
- **Admin bypass.** Most platforms let administrators override rules by default. Leaving that on makes the rules advisory for the people most likely to be rushing during an incident.
- **Process friction.** Requiring two reviews on a solo or tiny team stalls work. Rules should match how the team actually works, which in [[Trunk-Based Development]] means fast reviews and fast checks.
- **Required checks must be reliable.** A [[Flaky Test]] in a required check blocks merges at random and teaches people to rerun rather than read failures.

## See also
- [[Code Review]]
- [[Coverage Gate]]
- [[Force Push]]
