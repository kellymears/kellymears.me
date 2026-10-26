---
aliases:
  - INVEST
  - Story mapping
  - Epic
tags:
  - delivery
summary: A short description of something a user wants, written in their terms and meant as a reminder to have a conversation, which became agile development's basic unit of planning.
---
A **user story** is a short description of a feature from the point of view of the person who wants it. The best-known template, from the London company Connextra around 2001, reads "As a *type of user*, I want *some goal* so that *some reason*." For example: as a returning customer, I want to reorder a past purchase so that I don't have to search for it again.

Stories came from Extreme Programming, where customers wrote them on index cards during planning. The card was never meant to be a specification. Ron Jeffries described stories with three Cs:

- **Card.** A few words, small enough to fit on an index card, to stand for the feature.
- **Conversation.** The detail lives in discussion between the people who want the feature and those who build it.
- **Confirmation.** Agreed tests that show when the story is done; see [[Acceptance criteria]].

The point was to replace long requirements documents, which tried to settle everything in writing before work began, with a placeholder for talking. A written requirement invites people to build exactly what it says. A story invites a question about what the user is trying to accomplish.

Bill Wake's **INVEST** checklist from 2003 describes a good story: Independent of others, Negotiable rather than fixed, Valuable to a user, Estimable, Small enough to finish in one iteration, and Testable. A story too large for an iteration is often called an **epic** and is split into smaller ones, ideally slicing through every layer of the system, a thin version of the whole feature, rather than building one layer at a time.

Common problems:

- **Fake users.** "As a developer, I want a database table" names a task, not a user need.
- **Missing reasons.** The "so that" clause is the most useful part, because it lets the team suggest a better way to reach the goal, and it is the part most often left out.
- **Stories as contracts.** When stories are written by one group and handed to another, the conversation disappears, and the card becomes a thin requirements document.

Jeff Patton's **story mapping** arranges stories along the sequence of steps a user takes, with more detailed or optional stories stacked beneath each step. Cutting horizontally across the map yields a release that works end to end, which helps teams choose a first version; see [[Minimum Viable Product]].

Teams usually estimate stories in relative units and track them on a shared board. The acceptance tests that confirm a story are often written in a structured "given, when, then" form that can be automated.

## See also
- [[Product Backlog]]
