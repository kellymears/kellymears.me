---
aliases:
  - Definition of Ready
  - Done-done
tags:
  - delivery
summary: A team's shared checklist of what must be true before work counts as finished, such as reviewed, tested, documented, and deployed, which keeps hidden work from piling up behind items marked complete.
---
A **definition of done** is a team's shared, written list of what must be true before any piece of work counts as finished. A typical one says the code is reviewed, tests are written and passing, documentation is updated, and the change is deployed somewhere a person can use it. The term comes from Scrum, where it is a formal commitment, but the idea applies to any team that tracks work.

It exists because "done" means different things to different people. To one developer it means the code runs on their machine; to another it means merged; to a product manager it means customers have it. When a tracker shows an item as complete under the first meaning, the remaining work, review, testing, and release, is still owed but no longer visible. Teams started saying "done-done" to tell the real thing apart.

The definition differs from acceptance criteria, which are specific to one item: this form rejects an empty email address, this report loads in under two seconds; see [[Acceptance criteria]]. The definition of done is general and applies to every item. A story can meet its acceptance criteria and still not be done because nobody reviewed it.

What it does:

- **Exposes hidden work.** Skipped testing and documentation don't vanish; they become [[Technical Debt]] or bugs found later. Counting them in the definition puts them in the estimate.
- **Makes progress honest.** A board where items are truly done gives a real measure of how far along a project is, rather than one where the last tenth takes as long as the first nine tenths.
- **Settles questions in advance.** The list decides once what would otherwise be argued on each item, like whether this change needs tests; see [[Checklist]].

Good ones are short enough to remember and checked mostly by machines. "Tests pass" belongs in [[Continuous Integration]] rather than on a person's honor, and "deployed" is automatic under [[Continuous Deployment]]. The items left for humans are the ones that need judgment, such as whether the docs make sense; see [[Code Review]].

The definition should tighten over time. A team that can't yet release every item might start with "merged and tested" and add "in production" as its pipeline improves. When it is ignored under deadline pressure, the team is borrowing against future time and the board stops reflecting reality; see [[Goodhart's Law]] for what happens when the count of closed items becomes the target.

A **definition of ready** is the matching list at the other end: what an item needs before work starts, such as clear acceptance criteria and no unresolved dependencies. Critics warn that it can harden into a gate that delays starting.

## See also
- [[User Story]]
- [[Product Backlog]]
