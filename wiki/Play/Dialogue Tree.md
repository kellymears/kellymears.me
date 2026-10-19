---
aliases:
  - Conversation tree
  - Dialogue wheel
tags:
  - play
summary: The common game structure for conversations, in which the player picks from a menu of responses and each choice leads to new lines, used from adventure games to role-playing games and constrained by how fast branches multiply.
---
A **dialogue tree** is the structure most games use for conversation. A character speaks, the player chooses a reply from a short list, and the choice leads to new lines and new options. Despite the name, most aren't strict trees: branches loop back, rejoin, and check what the player has already done; see [[Branching Narrative]].

The form grew out of adventure games and role-playing games in the 1980s, as an alternative to typing commands to a text parser; see [[Interactive Fiction]]. Lucasfilm's adventure games made dialogue menus a centerpiece, and The Secret of Monkey Island (1990) turned them into a combat system, with sword fights won by choosing the right comeback to an insult; see [[Point-and-Click Adventure]]. Role-playing games used dialogue to hand out quests, gate information, and test the player's character sheet; see [[Computer Role-Playing Game]] and [[Skill Check]].

Branches multiply fast. If every exchange offered three replies that each led somewhere new, a ten-step conversation would need tens of thousands of lines. Writers control this in several ways. Hub-and-spoke conversations return to a central menu after each topic. Branch-and-bottleneck structures let choices diverge briefly and then reconverge on key moments. Flags record earlier choices so later lines can acknowledge them without separate branches. In practice a dialogue system behaves like a state machine whose states are conversation nodes; see [[Finite State Machine]].

BioWare's Mass Effect (2007) introduced the dialogue wheel, placing short paraphrases of each reply in consistent positions so the player could choose quickly while the scene kept moving. Paraphrases create their own problem: a reply summarized as "sarcastic" can come out as cruel, and players feel misrepresented. Telltale's adventure games popularized the on-screen note that a character "will remember that," making consequences visible even when they were small.

Some games push the form. Disco Elysium makes the player's own skills speak as voices in the conversation, so the tree doubles as an inner monologue; see [[Disco Elysium]]. Visual novels are built almost entirely on dialogue choices; see [[Visual Novel]]. Others drop menus in favor of timed replies that close if the player hesitates, or let characters react to what the player does instead of what they say.

The writing burden is large. A major role-playing game can contain hundreds of thousands of lines, all of which must be voiced, translated, and tested; see [[Video Game Localization]]. Tools such as Ink and Yarn Spinner let writers script branching dialogue as plain text.

Language models raise the prospect of characters that answer anything, with no fixed tree at all; see [[Large Language Model]] and [[Non-Player Character]]. Designers note that open conversation is harder to direct toward the moments a story needs, which is what a tree is for.

## See also
- [[Multiple Endings]]
- [[Procedural Narrative]]
- [[Morality System]]
