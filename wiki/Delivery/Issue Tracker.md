---
aliases:
  - Bug tracker
  - Bugzilla
  - Jira
tags:
  - delivery
summary: The shared database of bugs, requests, and tasks that a software team works from, from Bugzilla's resolutions to Jira's workflows to GitHub issues, and the ways such a list grows faster than anyone can work through it.
---
An **issue tracker** is a shared database of the problems, requests, and tasks a software project knows about. Each issue gets a number, a title, a description, and a history of comments and changes, so a problem reported once can be found, discussed, assigned, and eventually closed instead of living in someone's inbox or memory. Bug trackers came first; the broader name reflects that most trackers now hold feature work too; see [[User Story]].

Some landmarks:

- **Bugzilla**, written at Netscape in 1998 for the newly open-sourced Mozilla project, set the vocabulary many trackers still use. Its resolutions, FIXED, DUPLICATE, WONTFIX, WORKSFORME, and INVALID, distinguish the many ways an issue can be closed without a fix.
- **Jira**, released by Atlassian in 2002, became the standard in companies, with configurable fields, workflows, and boards; see [[Kanban]].
- **Forge trackers.** GitHub and GitLab built simple issue lists next to the code, where a [[Commit Message]] or [[Pull Request]] that says it fixes issue 123 closes it automatically on merge.

The typical fields carry the questions a team needs answered. Severity is how bad the problem is; priority is how soon it will be fixed, and the two often differ. A component points to the code involved, an assignee owns it, and a milestone or version says when it is due. Deciding these for incoming issues is [[Bug Triage]], and the quality of what comes in depends on good bug reports.

Every tracker gathers more issues than the team can address. Issues are cheap to open and expensive to close, so the open count climbs for years. Old issues go stale as the code changes beneath them, duplicates multiply because searching is harder than filing, and a long list hides the few that matter; see [[Technical Debt]]. A tracker full of neglected issues also tells contributors their reports go nowhere; see [[Broken Windows Theory]].

Projects respond in different ways. Some periodically declare bankruptcy and close everything older than a cutoff, inviting people to reopen what still matters. Some run bots that close issues after a period of silence, which shrinks the list but frustrates reporters whose bugs are still real. Some keep only what they intend to do and say no to everything else; see [[Shape Up]]. Others accept the long list as a searchable record of known behavior, which has value on its own; see [[Hyrum's Law]].

Trackers also shape how work is measured. Counting closed tickets or [[Story Points]] rewards splitting work and closing quickly, which can drift from what users actually need; see [[Goodhart's Law]]. For open source maintainers, the tracker is often the main source of unpaid support load; see [[Open Source Sustainability]].

## See also
- [[Flaky Test]]
- [[Incident Response]]
- [[Gantt Chart]]
