---
aliases:
  - Change log
  - CHANGELOG
  - Release notes
  - Keep a Changelog
tags:
  - delivery
summary: A curated, human-readable record of the notable changes in each version of a project, written for the people who use it rather than the people who built it.
---
A **changelog** is a file, conventionally `CHANGELOG.md`, that lists the notable changes in each released version of a project, newest first. Its audience is the people who use the software: someone deciding whether to upgrade, a maintainer of a downstream package, or a user trying to work out when a behavior changed. That makes it different from the [[Commit]] history, which records every step the developers took, including typo fixes, reverted experiments, and merge commits.

The *Keep a Changelog* convention, published by Olivier Lacan in 2014, is the most widely followed format. Each version gets a heading with its number and release date, written in ISO 8601 form, and its entries are grouped by kind of change:

- **Added** for new features.
- **Changed** for changes to existing behavior.
- **Deprecated** for features that will be removed, giving users warning (see [[Deprecation]]).
- **Removed** for features that are gone.
- **Fixed** for bug fixes.
- **Security** for vulnerabilities, so users know how urgently to upgrade.

An *Unreleased* section at the top collects changes as they merge, and becomes the next version's entry at release time. The categories map onto [[Semantic Versioning]]: anything under Removed, or a breaking entry under Changed, implies a major version bump.

The convention's main warning is against dumping the commit log into the file. A list of commit subjects is noise to a user and buries the one change that matters. Writing a good entry means describing the effect on the user, not the implementation, which is harder than it sounds because the author already knows what the change was for, a case of the curse of knowledge. Breaking changes deserve migration instructions, not just a mention, since [[Hyrum's Law]] means someone depended on the old behavior.

Tooling can automate much of it. With [[Conventional Commits]], a `feat:` or `fix:` prefix tells a release tool which section an entry belongs in and which version bump it implies. A [[Squash Merge]] workflow, where each [[Pull Request]] becomes one commit, makes those subjects more meaningful. Other tools have contributors add a short change file with each pull request, which is collected into the changelog at release, a pattern common in a [[Monorepo]] with many independently versioned packages.

*Release notes* are the companion form: a narrative summary of a release's highlights, often with screenshots and context, aimed at a broader audience. Large projects publish both. A changelog that isn't kept up is a form of [[Documentation Rot]], and an inaccurate one is worse than none, because readers trust it when deciding what to upgrade. Regular releases on a [[Release Train]] keep each entry short.

## See also
- [[Commit Message]]
