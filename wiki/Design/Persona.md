---
aliases:
  - User persona
  - Personas
  - Elastic user
tags:
  - design
summary: A fictional but research-based portrait of a typical user, used to keep a team designing for real goals rather than for an imagined user who conveniently wants whatever is being built.
---
A **persona** is a fictional character that represents a group of real users: their goals, context, behaviors, and frustrations. A team designing a scheduling app might work with "Dana, a clinic manager who books forty appointments a day between phone calls and needs to fix mistakes fast." The persona gives the team a specific person to design for.

Alan Cooper popularized personas in his 1999 book *The Inmates Are Running the Asylum*. His argument was about a failure he called the **elastic user**. When a team talks about "the user" in the abstract, that user stretches to fit whatever is convenient. Engineers who want a power feature imagine an expert; marketers who want simplicity imagine a novice. Every decision can be justified, and the product ends up serving nobody well; see [[Feature Creep]]. A defined persona can't stretch. "Would Dana use this?" has an answer.

A useful persona describes:

- **Goals.** What the person is trying to accomplish, which is more stable than the tasks they perform.
- **Context.** Where, when, and with what tools and interruptions they work.
- **Behaviors and skills.** How they approach the task now, what they know, and where they get stuck.
- **Frustrations.** What fails them today.

Most products have several personas, with one chosen as *primary*: the person whose needs win when designs conflict.

Personas go wrong in predictable ways:

- **Invented rather than researched.** A persona made up in a meeting encodes the team's assumptions and then gives them false authority. Good personas are distilled from interviews and observation; see [[Usability Testing]].
- **Stereotyping.** Demographic details such as age, a stock photo, and hobbies are easy to write and invite assumptions that have nothing to do with behavior. Many teams now drop them and describe behavior only.
- **Shelfware.** Personas made at a project's start and never consulted again change nothing.
- **Averaging away edges.** A composite "typical" user can hide people who use the product differently, including disabled users; see [[Inclusive Design]].

A rival framing focuses on situations rather than people. [[Jobs to Be Done]] argues that what predicts behavior is the job someone is trying to get done, not who they are: a commuter and a parent might "hire" the same product for the same job. Many teams combine the two, using jobs to define what to build and personas to keep the people in view.

Personas connect to a broader principle: design for the user's [[Mental Model]], not the designer's. A persona is a tool for remembering that the team is not the user, and that its own preferences are a sample of one; see [[Confirmation Bias]]. They're also a lightweight way to make requirements concrete enough to test, much as examples do in [[Behavior-Driven Development]].

## See also
- [[Card Sorting]]
- [[Heuristic Evaluation]]
- [[Minimum Viable Product]]
