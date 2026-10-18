---
aliases:
  - Expert blind spot
  - Tapping study
  - Curse of expertise
tags:
  - mind
summary: Once you know something, it becomes hard to imagine not knowing it, which is why experts explain badly and why documentation skips the step everyone needs.
---
The **curse of knowledge** is the difficulty of imagining what it is like not to know something you know. Once an idea is understood, the understanding colors everything, and it becomes hard to see which steps a newcomer is missing. The economists Colin Camerer, George Loewenstein, and Martin Weber named it in 1989, finding that well-informed traders couldn't stop their knowledge from biasing their predictions of what less-informed traders would do, even when it cost them money.

The best-known demonstration is Elizabeth Newton's 1990 tapping study at Stanford. One person tapped out the rhythm of a well-known song, such as "Happy Birthday," on a table, and another tried to name it. Tappers predicted listeners would guess right about half the time. Listeners named only about 1 in 40. The tappers couldn't stop hearing the melody in their heads, so they couldn't hear what listeners actually heard: a series of knocks.

Expertise makes it worse, not better. Experts compress knowledge into chunks and skip steps they no longer notice taking, an *expert blind spot*. Their explanations jump, assume vocabulary, and leave out the step that seemed too obvious to mention. It is closely related to hindsight bias, in which known outcomes seem to have been predictable all along, and the opposite failure to the [[Dunning-Kruger Effect]]. One is not knowing what you don't know, the other is not remembering what it was like.

It shows up wherever experts write for others:

- **Documentation.** READMEs that skip setup steps, and code comments that explain what the author found hard rather than what the reader will. See [[Code Comment]] and [[Documentation Rot]].
- **Naming.** Abbreviations and in-jokes that are obvious to the team and opaque to anyone else, one reason [[Naming]] is hard.
- **Interfaces.** Designers who know where everything is can't see why a feature is hard to find, which is why usability testing with newcomers and [[Progressive Disclosure]] matter. [[Exploratory Testing]] by someone unfamiliar with a system catches the same gaps.
- **Prompts.** Writing instructions for a [[Large Language Model]] has the same trap. The model lacks the writer's context, so a good [[System Prompt]] states what seemed too obvious to say.

Countermeasures are external, since effort alone doesn't cure it. Test explanations on real newcomers. Use concrete examples. Write in [[Plain Language]]. Explain aloud to an imaginary novice, as in [[Rubber Duck Debugging]]. The fresh eyes of someone new to a project are a scarce, temporary resource, and their confusion is the most useful feedback the documentation will get.

## See also
- [[Metacognition]]
- [[Code Comment]]
- [[Dunning-Kruger Effect]]
- [[Progressive Disclosure]]
- [[Prompt Engineering]]
