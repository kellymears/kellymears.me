---
aliases:
  - POLA
  - Principle of least surprise
tags:
  - method
summary: The design rule that a system should behave the way most of its users expect, so that when two reasonable behaviors compete, the one that surprises fewer people wins even if the other is more elegant.
---
The **principle of least astonishment** says that each part of a system should behave the way most of its users expect it to. When a design forces a choice between two reasonable behaviors, pick the one that surprises fewer people, even if the other is more elegant or more powerful. It's also called the principle of least surprise, sometimes abbreviated POLA.

The idea has circulated in programming language design for decades, usually as a criticism of languages whose rules produce results nobody predicted. Eric Raymond's The Art of Unix Programming, published in 2003, stated it as a rule: in interface design, always do the least surprising thing. The Unix tradition leans on it heavily, since small tools only compose well when each one behaves predictably; see [[Unix philosophy]].

Surprise is measured against a model in the user's head, not against the specification. A behavior can be documented and consistent and still astonish people if it contradicts what they bring from elsewhere; see [[Mental Model]]. That makes the principle relative to an audience. What surprises a newcomer may be exactly what an expert expects, and designers have to decide whose expectations count.

Classic violations:

- **Implicit conversion.** Languages that quietly convert between strings and numbers can add two values and hand back text; see [[Type coercion]].
- **Destructive defaults.** A command that deletes without asking, when a similar one confirms first, trains people into accidents; see [[Defensive Default]].
- **Misleading names.** A function called get that also writes to a database breaks the promise its name makes; see [[Naming]].
- **Look-alike controls.** Physical and visual cues set expectations before anyone reads a label, and controls that look the same should act the same; see [[Affordance]] and [[Natural Mapping]].
- **Quiet failure.** An operation that reports success after doing nothing is the most expensive surprise, because it's discovered late; see [[Silent Failure]].

The principle shows up in usability reviews, where consistency with platform conventions is listed as a heuristic of its own; see [[Heuristic Evaluation]]. In code it argues for symmetry, so that learning one operation teaches the rest: if open has a close, save should have a load.

It cuts against change. Once users have learned a behavior, even a bad one, fixing it surprises them. That's part of why widely used systems keep odd behavior for decades; see [[Backward Compatibility]] and [[Hyrum's Law]]. The least astonishing choice for a new design and for an established one can differ.

Critics point out that the principle is easy to invoke and hard to apply. Expectations vary, and "surprising" can become a polite way of saying "not what I would have done." It works best paired with evidence about what real users expect, gathered by watching them; see [[Usability Testing]].

## See also
- [[Tesler's Law]]
- [[Leaky Abstraction]]
