---
aliases:
  - Recognition over recall
  - Recognition versus recall
  - Recall
tags:
  - design
summary: The usability principle that people should be able to see options and recognize the right one instead of remembering it, because recognizing is far easier than recalling.
---
**Recognition rather than recall** is one of Jakob Nielsen's ten usability heuristics, published in 1994. It says that interfaces should make objects, actions, and options visible, so people recognize what they need instead of having to remember it. The principle rests on a well-established fact about memory: recognizing something you've seen is much easier than retrieving it unprompted.

Psychology has measured the gap for decades. Recall means producing information from memory with few cues, like naming a capital city from scratch. Recognition means identifying it among options, like picking the capital from a list. People recognize far more than they can recall, because the item itself acts as a retrieval cue. A multiple-choice test is easier than an essay question on the same material for exactly this reason.

Interfaces apply the principle constantly:

- **Menus over commands.** A graphical menu lists every available action, while a command line expects people to remember exact commands. The menu's arrival in the 1980s made computers usable for people who would never memorize syntax.
- **Recently used items.** Recent files, recent searches, and frequently used contacts put likely choices in view.
- **[[Autocomplete]].** Typing a few letters turns recall into recognition by showing candidates to choose from.
- **Visible context.** Showing a selected item's name in the header, or keeping a form's earlier answers on screen, saves people from holding it in [[Working Memory]].
- **Icons with labels.** An icon alone must be recalled; a labeled one can be read. See [[Iconography]].
- **Examples and defaults.** A filled example in a form field shows the expected format instead of making people remember it.

The cost of recall is [[Cognitive Load]]. Every fact an interface asks people to carry in their heads is effort taken from the task itself, and it's especially costly for people with ADHD or other differences in [[Executive Function]], or for anyone tired, distracted, or interrupted.

Recall still has a place. Experts often prefer it because it's faster once learned: keyboard shortcuts, command lines, and a [[Command Palette]] let them act without scanning menus. The best tools offer both, a visible path for novices and a fast recalled path for experts, with the visible path teaching the shortcut, as menus do by listing key combinations beside each item. [[Progressive Disclosure]] manages the trade-off by showing common options first.

The principle interacts with others. Showing everything at once, in the name of recognition, creates clutter and slows decisions, as [[Hick's Law]] predicts, so visibility needs organization through [[Visual Hierarchy]]. Recognized options are only useful if their labels carry [[Information Scent]]. And interfaces that follow familiar conventions let people recognize patterns from other products, which is the point of matching their [[Mental Model]].

## See also
- [[Context Menu]]
- [[Onboarding]]
- [[Direct Manipulation]]
- [[Serial Position Effect]]
