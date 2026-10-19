---
aliases:
  - Forge
  - GitHub
  - SourceForge
tags:
  - delivery
summary: A website that hosts code repositories together with the tools to collaborate on them, such as issues, code review, and continuous integration, a category that runs from SourceForge to GitHub and self-hosted alternatives.
---
**A software forge** is a platform that hosts source code repositories along with the tools teams need to work on them together. A typical forge bundles version control hosting with issue tracking, code review, wikis, release downloads, and automated builds. The term borrows from the blacksmith's workshop, a place where things are made.

Forges grew up with open source. **SourceForge**, launched in 1999, gave free hosting, mailing lists, bug trackers, and download mirrors to hundreds of thousands of projects, and for years was where people found open source software. Others followed, including GNU Savannah, Launchpad, and Google Code, which ran from 2006 until it closed in 2016.

**GitHub**, launched in 2008, changed the category. Built around Git, it made forking a project a single click and introduced pull requests as a social, web-based workflow for proposing changes; see [[Pull Request]], [[Software Fork]], and [[Distributed Version Control]]. Profiles, followers, and stars turned code hosting into something like a social network, and its slogan for a time was "social coding." Microsoft bought GitHub in 2018 for about 7.5 billion dollars. GitLab and Bitbucket became its main commercial rivals.

Common features of modern forges:

- **Issues** for bugs and feature requests; see [[Issue Tracker]].
- **Code review** on proposed changes; see [[Code Review]]. Rules can require approval from particular maintainers before a change merges.
- **Automation** that builds and tests every change; see [[Continuous Integration]].
- **Wikis and pages** for documentation; see [[Wiki]].

Not every project uses a forge's review workflow. The Linux kernel still reviews patches by email, and some large projects use dedicated tools; see [[Email Patch Workflow]] and [[Gerrit]].

Forges show strong network effects. Contributors have accounts on the biggest one, so projects go there, which attracts more contributors; see [[Network Effect]]. That concentration brings risks. Projects become dependent on one company's policies, outages, and pricing; see [[Lock-in]]. SourceForge's history is a cautionary tale: after changes in ownership, it began bundling adware with some downloads in the mid-2010s, and several well-known projects left; see [[Enshittification]].

Self-hosted and community-run forges respond to those concerns. Gitea and its community fork Forgejo let organizations run their own, and Codeberg runs a nonprofit public instance. Some proposals, built on the same protocols as decentralized social networks, would let forges federate, so an account on one can interact with projects on another.

Inside companies, forges also host private code, and their features support practices like opening internal code to other teams; see [[Inner Source]]. For maintainers, the forge is where much of the unpaid labor of open source happens, answering issues, triaging duplicates, and reviewing contributions from strangers; see [[Open Source Sustainability]].

## See also
- [[The Cathedral and the Bazaar]]
