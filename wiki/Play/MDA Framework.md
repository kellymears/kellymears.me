---
aliases:
  - MDA
  - Mechanics-Dynamics-Aesthetics
tags:
  - play
summary: A model of games as three layers, the rules designers write, the behavior those rules produce in play, and the experience players feel, which explains why designers can only shape fun indirectly.
---
The **MDA framework** describes a game in three layers: *mechanics*, *dynamics*, and *aesthetics*. Game designers Robin Hunicke, Marc LeBlanc, and Robert Zubek presented it in a 2004 paper, and it became one of the most widely taught models in game design.

- **Mechanics** are the rules and components: the data, algorithms, and actions available. In poker, the deck, the hand rankings, and the betting rules.
- **Dynamics** are the behavior that emerges when the mechanics run with players: strategies, patterns, and interactions over time. In poker, bluffing, reading opponents, and managing a bankroll.
- **Aesthetics** are the emotional responses the game produces in players. In poker, tension, the thrill of a bluff that works, and the fellowship of the table.

The central insight is about perspective. Designers work from the mechanics outward: they write rules, which produce dynamics, which produce feelings. Players experience the game in the opposite direction: they feel the aesthetics first, notice the dynamics, and may never think about the mechanics at all. A designer can't directly make a game "tense"; they can only change rules and see whether tension emerges. That makes design an indirect, iterative process, built on watching people play; see [[Usability Testing]].

The paper also tried to replace the vague word "fun" with a vocabulary of aesthetic goals. It listed eight: sensation, fantasy, narrative, challenge, fellowship, discovery, expression, and submission (play as a pastime). Different games aim at different ones. A [[Rhythm Game]] focuses on sensation and challenge; a [[Visual Novel]] on narrative; a [[Sandbox Game]] on expression.

MDA is a useful frame for:

- **Diagnosing problems.** A game that feels repetitive is an aesthetic problem caused by dynamics, which are caused by specific mechanics.
- **Explaining emergence.** Simple mechanics producing rich dynamics is the essence of [[Emergent Gameplay]].
- **Predicting exploits.** Players will find dynamics the designer didn't intend, such as degenerate strategies that dominate a [[Metagame]].

Criticisms:

- **Aesthetics is a confusing word.** It usually means visual style; MDA uses it for emotional experience, and the paper largely ignores art, sound, and story as things designers make directly.
- **It undersells narrative and presentation.** Later frameworks, such as the Design, Play, Experience model, add story, character, and user experience.
- **Mechanics-first bias.** Some designers start from the desired experience and work backward, which MDA allows but doesn't emphasize.

The model has parallels in other fields. In software, simple components interacting can produce system behavior nobody wrote down, including failures nobody designed for; see [[Cascading Failure]]. In product design, teams distinguish what a feature does from the outcome users want from it; see [[Jobs to Be Done]].

## See also
- [[Game Feel]]
- [[Compulsion Loop]]
- [[Bartle Taxonomy]]
