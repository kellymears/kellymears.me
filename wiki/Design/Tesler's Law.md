---
aliases:
  - Law of conservation of complexity
  - Conservation of complexity
  - Larry Tesler
  - Irreducible complexity
tags:
  - design
summary: Larry Tesler's observation that every task carries some complexity that cannot be removed, only moved, so the design question is whether the user or the system should handle it.
---
**Tesler's law**, also called the law of conservation of complexity, holds that every application has an inherent amount of complexity that cannot be eliminated, only moved. Someone has to deal with it, either the user or the system and the people who build it. Larry Tesler, who worked at Xerox PARC and later Apple, formulated it in the mid-1980s and argued that engineers should absorb it: an engineer spending an extra week to save millions of users a minute each is a good trade.

Email needs a sender, a recipient and a server. A mail client can ask the user to type the recipient's full address and configure server settings by hand, or it can autocomplete from contacts and detect settings automatically.

The idea separates two kinds of complexity, a distinction Fred Brooks also drew in 1986:

- **Essential complexity** comes from the problem itself. Scheduling a meeting across offices really involves [[Time Zone]] differences.
- **Accidental complexity** comes from the tools: confusing terminology, unnecessary steps, settings nobody needs. This kind can and should be removed.

Tesler's law concerns the first kind. It warns against designs that look simple by hiding essential complexity rather than handling it. A form with fewer fields is not simpler if the missing information has to be supplied later through support calls, or if the system guesses wrong. "Simplifying" an interface by dropping a necessary choice moves the complexity into the edge cases, where it reappears as confusion or bugs.

Ways designs absorb complexity well:

- **Smart defaults.** Choose the right answer for most people, and let the rest change it, an application of [[Defensive Default]].
- **Inference.** Detect location, language and formats rather than asking.
- **[[Progressive Disclosure]].** Keep rare options available but out of the way, so the complexity exists without burdening everyone.
- **Abstraction in code.** A [[Headless Component]] or a [[Design System]] component absorbs accessibility and edge cases once so every product using it doesn't redo them.

Absorbed complexity has costs: automation is harder to build, and a misfiring inference confuses more than a question would. Hidden complexity also leaks: when automation fails, the user faces the full complexity at the worst moment.

Tesler is also known for inventing cut, copy and paste with Tim Mott, and for his campaign against **modes**, interface states where the same action means different things. His license plate read "NO MODES". Modes are a classic way of pushing complexity onto users, who must track which mode they are in, which is why each [[Modal Dialog]] deserves scrutiny.

The law connects to [[Worse Is Better]], which argues that simple implementations sometimes beat correct ones even when that leaves work for users, and to [[Cognitive Load]], the cost users pay when complexity lands on them.

## See also
- [[Platform Engineering]]
- [[Choice Architecture]]
- [[Form Design]]
- [[Clipboard]]
