---
aliases:
  - Nielsen's heuristics
  - Usability heuristics
  - Expert review
  - Usability inspection
tags:
  - design
summary: An inexpensive usability inspection in which a few evaluators independently check an interface against a short list of established principles, most famously Jakob Nielsen's ten heuristics.
---
A **heuristic evaluation** is a usability inspection in which a few evaluators examine an interface against a short list of recognized principles and note every place it falls short. Jakob Nielsen and Rolf Molich described the method in 1990, and Nielsen's refined list of ten heuristics from 1994 remains the standard checklist:

1. **Visibility of system status.** Keep people informed with timely feedback, within the [[Response Time Limits]], using progress indicators or a [[Skeleton Screen]] for longer waits.
2. **Match between system and the real world.** Use the user's words and concepts, not internal jargon, in line with [[Plain Language]].
3. **User control and freedom.** Provide clear exits, and support [[Undo]] and redo.
4. **Consistency and standards.** Follow platform conventions so people can reuse what they already know, the expectation described in [[Mental Model]]. A [[Design System]] enforces this across a product.
5. **Error prevention.** Better than a good error message is a design that prevents the error, through constraints, good defaults and confirmation before irreversible actions.
6. **Recognition rather than recall.** Make options visible instead of requiring people to remember them.
7. **Flexibility and efficiency of use.** Offer accelerators, such as shortcuts and [[Keyboard Navigation]], that experts can use without confusing novices.
8. **Aesthetic and minimalist design.** Every extra element competes with the relevant ones.
9. **Help users recognize, diagnose and recover from errors.** Error messages should say what went wrong in plain words and how to fix it.
10. **Help and documentation.** Searchable, task-focused and brief.

Three to five evaluators each inspect the interface alone, usually by working through key tasks, and list every problem with the heuristic it violates. Only then do they merge their lists and rate each problem's severity. Working independently matters: Nielsen's data showed a single evaluator finds only about a third of the problems, while five together find around three quarters.

The appeal is cost. An evaluation needs no recruited users, works on sketches, and fits in a day. It resembles [[Code Review]] for interfaces: a structured inspection by people who know what to look for.

The limits are real:

- **False alarms.** Evaluators flag things that bother experts but not actual users, and miss problems that come from the users' domain, vocabulary or context.
- **Expert blind spots.** Evaluators who know the product too well suffer the [[Curse of Knowledge]] and can no longer see it as a newcomer would.
- **No evidence of severity.** A checklist violation is a hypothesis. Watching real people struggle with it is evidence.

That is why heuristic evaluation complements [[Usability Testing]] rather than replacing it: inspect first to clear away obvious problems, then test with users to find the ones only they reveal. WCAG audits for [[Accessibility Testing]] apply the same approach.

## See also
- [[Command Palette]]
- [[Recognition Rather Than Recall]]
- [[Signifier]]
- [[Error Message]]
