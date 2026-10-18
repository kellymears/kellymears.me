---
aliases:
  - User testing
  - Think-aloud protocol
  - Hallway testing
  - System Usability Scale
  - Moderated testing
tags:
  - design
summary: Watching representative people try to complete real tasks with a design while they think aloud, the most direct way to find out where an interface confuses the people it is for.
---
**Usability testing** means watching representative people try to complete realistic tasks with a product or prototype, and noting where they hesitate, misunderstand or fail. The designers already know how it is supposed to work, a case of the [[Curse of Knowledge]], so only a fresh user shows where it doesn't.

The standard technique is the **think-aloud protocol**, which Clayton Lewis brought to interface research at IBM in the early 1980s. Participants narrate what they are looking for, what they expect and why they click, exposing the [[Mental Model]] they are forming. Like [[Rubber Duck Debugging]], talking aloud makes hidden reasoning visible.

A session follows a simple structure:

- **Tasks, not features.** "Book a table for four on Friday" rather than "use the date picker". Tasks should come from real goals and not hint at the interface's own vocabulary.
- **Don't help.** The facilitator stays neutral, resists explaining, and answers questions with questions: "What would you expect to happen?" Every rescue hides a problem.
- **Watch behavior, not opinions.** What people *do* is reliable. What they say they would do, or whether they "like" it, often isn't, and participants tend to blame themselves for problems the design caused.

Jakob Nielsen and Thomas Landauer's 1993 analysis suggested that about **five users** find most of the usability problems in a round of testing, since later sessions mostly repeat the common ones. The point is to test small and often: five users, fix what they found, then test again, rather than one large study at the end. Joel Spolsky's "hallway testing", grabbing whoever walks by, captures the spirit.

Variants include moderated sessions in person or by video, unmoderated remote tests where people record themselves, and quick tests on paper prototypes. A short questionnaire such as the **System Usability Scale** (1986), ten statements rated one to five, gives a rough score to compare designs over time. [[Accessibility Testing]] with assistive-technology users finds problems no sighted, mouse-using participant would.

Common pitfalls:

- **The wrong participants.** Testing with coworkers, power users or friends is a form of [[Selection Bias]] and finds the problems of the wrong people.
- **Leading.** Tasks that name the button to press, or a facilitator who nods at the right answer, confirm what the team hoped, a setup for [[Confirmation Bias]].
- **Polish.** Beautiful prototypes get gentler criticism, an instance of the [[Aesthetic-Usability Effect]], so early tests often work better with rough sketches.

Usability testing explains *why* people struggle. [[AB Testing]] and analytics measure *what* happens at scale but not the reason. An inexpensive [[Heuristic Evaluation]] can clear away obvious problems first, so the time with real users goes to the ones only they can reveal. Like [[Exploratory Testing]], it discovers failures rather than confirming behavior.

## See also
- [[Form Design]]
- [[AB Testing]]
- [[Wireframe]]
- [[Mental Model]]
- [[Acceptance Testing]]
