---
aliases:
  - Docs-as-code
  - Documentation as code
  - Diátaxis
  - README
tags:
  - delivery
summary: Writing documentation in plain text beside the source, reviewed in pull requests, checked by CI, and published by a build, so docs follow the same workflow as the code and drift from it less.
---
**Docs as code** is the practice of treating documentation with the same tools and workflow as software. Pages are plain text files, usually [[Markdown]], stored in [[Version Control]] beside or near the code they describe. Changes go through a [[Pull Request]] and review, automated checks run on every commit, and a build turns the source into a published site.

It replaced two older arrangements: wikis that anyone could edit but nobody owned, and documents written in word processors by a separate team after the code shipped. Both drift. A wiki page describes the system as it was the day someone last cared, and nothing connects it to the change that made it wrong; see [[Documentation Rot]].

Putting the docs in the repository changes the incentives:

- **Same change, same review.** A pull request that changes behavior can update the docs in the same commit, and reviewers can ask for it. Some teams make it a requirement; see [[Definition of Done]].
- **Automated checks.** [[Continuous Integration]] can catch broken internal links, dead external ones, spelling, style rules, and code examples that no longer run; see [[Doctest]].
- **History.** Every page carries its own log, so readers can see when a statement was last touched and why; see [[Git Blame]].
- **Generated reference.** API reference can be built from the code itself, from type signatures or a schema, so the most detailed docs can't fall out of date.

The **README** is the smallest instance: one file at the root that a hosting service renders as the project's front page. A good one states what the project is, how to install and run it, and where to go next, in that order, for a reader who has never seen it before; see [[Curse of Knowledge]].

Format and tooling solve only half the problem. The other half is knowing what kind of page to write. **Diátaxis**, a framework developed by Daniele Procida, sorts documentation into four types by what the reader needs: tutorials for learning by doing, how-to guides for completing a task, reference for looking things up, and explanation for understanding why. Mixing them, for example by burying reference tables inside a tutorial, is a common reason docs feel hard to use; see [[Information Architecture]] and [[Progressive Disclosure]].

The approach has costs. Writers outside engineering must learn Git, and code review tends to check accuracy more carefully than clarity; see [[Plain Language]]. It also assumes the docs belong to the people who change the code, which holds only when the team treats writing as part of shipping rather than something done afterward. Decision records and release notes are the same idea applied to choices and versions, and they live in the same repository for the same reasons.

## See also
- [[OpenAPI]]
- [[Changelog]]
- [[Onboarding]]
