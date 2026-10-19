---
aliases:
  - NPC
tags:
  - play
summary: Any character in a game not controlled by a player, from shopkeepers and quest-givers to townsfolk with daily routines, whose behavior ranges from a single line of dialogue to elaborate simulation and now to language models.
---
A **non-player character**, or NPC, is any character in a game that no player controls. The term comes from tabletop role-playing, where the game master voices everyone the players meet: innkeepers, villains, rival adventurers, the whole populated world; see [[Game Master]]. Video games took the term over for the shopkeepers, quest-givers, townsfolk, allies, and often enemies run by the computer.

NPCs do several jobs at once. They give out information and tasks, sell and buy goods, make a place feel inhabited, and carry much of a game's story. A single villager repeating one line can do the job of a signpost. A companion who comments on the player's choices for dozens of hours can be the reason people remember a game; see [[Companion AI]].

Their behavior is built from a few standard techniques:

- **Scripts.** Fixed lines and actions triggered by events, the simplest and most controllable approach.
- **State machines.** A guard switches between patrolling, investigating, and attacking depending on what it notices; see [[Finite State Machine]] and [[Stealth Mechanics]].
- **Behavior trees.** Hierarchies of tasks and fallbacks, popularized by shooter games in the mid-2000s, that let designers compose complex behavior from simple parts; see [[Game AI]].
- **Schedules and needs.** Some games give townsfolk daily routines, sleeping, working, and eating at set hours, which makes towns feel alive but also produces strange emergent results when simulations collide; see [[Emergent Gameplay]].

Dialogue is the hardest part. Most games use authored branching conversations, where the player picks from a few responses; see [[Branching Narrative]]. These can be beautifully written but are finite, and players quickly exhaust them. Short ambient lines, called barks, are repeated so often that some became memes.

Large language models raised the prospect of NPCs that converse about anything. A 2023 research project populated a small simulated town with characters driven by language models, which formed plans, remembered conversations, and organized a party among themselves; see [[Large Language Model]]. The obstacles are cost, consistency, and keeping characters within the story's limits. A character that can say anything can also say something that breaks the world or contradicts the plot.

Players attribute minds to NPCs readily. A few lines and a name are enough to make people feel guilty for betraying a character; see [[ELIZA Effect]] and [[Theory of Mind]]. Very realistic characters can trigger the opposite reaction when they come close to human but miss in small ways; see [[Uncanny Valley]].

Escorting a weak NPC through danger is one of the most criticized tasks in game design, largely because the character's behavior is outside the player's control; see [[Escort Mission]]. In text-based multiplayer worlds, NPCs shared space with real players, and telling them apart was sometimes part of the fun; see [[Multi-User Dungeon]].

## See also
- [[Navigation Mesh]]
- [[Procedural Narrative]]
