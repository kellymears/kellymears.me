---
aliases:
  - Text adventure
  - Parser game
  - Zork
tags:
  - play
summary: Games told entirely in text, where players type commands such as "go north" or "open mailbox" and a parser interprets them, the earliest genre of computer adventure and a living craft today.
---
**Interactive fiction** (IF) is a game told in text, in which the player reads descriptions and types commands to act. The classic opening of *Zork* reads: "You are standing in an open field west of a white house, with a boarded front door. There is a small mailbox here." The player types `open mailbox`, and the story continues.

The genre began with *Colossal Cave Adventure*, written by Will Crowther around 1976 and expanded by Don Woods in 1977. Crowther, a programmer and caver, modeled it on a real cave system in Kentucky. *Zork*, written by students at MIT from 1977, became the foundation of Infocom, the company whose text adventures sold widely through the 1980s.

At the heart of these games is the **parser**, which turns typed sentences into actions; see [[Parsing]]. Early parsers understood two words, verb and noun. Infocom's handled full sentences such as `put the lamp in the case and close it`. The parser is both the genre's strength and its frustration. It lets players try anything, which makes discovering what works a source of delight. But a player who knows what to do and can't find the words, "guess the verb," hits a wall. Good IF anticipates many phrasings, the same problem as designing forgiving input elsewhere; see [[Coyote Time]].

Text gave these games advantages graphics couldn't match on early hardware: rich, detailed worlds that cost only memory for words, and room for the player's imagination to fill in the rest.

Infocom's commercial decline in the late 1980s didn't end the form. A hobbyist community kept it alive, with free development tools, most notably Inform, whose seventh version lets authors write games in a constrained form of English, and an annual IF Competition running since 1995. Modern IF includes:

- **Parser games**, continuing the classic tradition.
- **Choice-based games**, where players click links or options instead of typing, popularized by the free tool Twine; see [[Branching Narrative]] and [[Hypertext]].
- **Commercial hybrids**, such as narrative games built on choice-based IF engines, and text-heavy games like [[Disco Elysium]].

IF's influence runs deep. Text adventures gave rise to MUDs, the text-based multiplayer worlds that preceded MMORPGs; see [[Bartle Taxonomy]]. Their puzzle design shaped graphical adventure games. Their branching structures prefigure the [[Visual Novel]].

Language models have revived old questions. A model can understand any phrasing and improvise responses, solving the parser problem, but it makes it hard to author puzzles with fair solutions and stories with intentional structure; see [[Large Language Model]] and [[Procedural Narrative]].

## See also
- [[Tabletop Role-Playing Game]]
- [[Environmental Storytelling]]
- [[Game Preservation]]
- [[Point-and-Click Adventure]]
- [[Unreliable Narrator]]
