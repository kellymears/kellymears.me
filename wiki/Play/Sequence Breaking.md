---
aliases:
  - Sequence break
  - Out-of-bounds
  - Softlock
tags:
  - play
summary: Reaching parts of a game earlier than its designers intended, by clever movement, glitches, or overlooked routes, a practice that delights players and that some designers now build for on purpose.
---
**Sequence breaking** is reaching an area, item, or event in a game before the designers intended, skipping the order the game was built to enforce. A player might get past a locked door without its key, collect an upgrade meant for later, or reach the final boss while most of the game is still unplayed.

The term comes from the *Metroid* community around Super Metroid (1994), where players found ways to collect items out of order using precise wall jumps and the "bomb jump." These games gate progress behind abilities, so finding ways past those gates is the most direct way to break them; see [[Metroidvania]].

Methods range from skill to exploitation:

- **Movement tech.** Using intended mechanics in unintended combinations, such as chaining jumps, boosting off explosions, or carrying momentum.
- **Clipping.** Passing through walls by exploiting gaps in [[Collision Detection]], often because a fast-moving character moves far enough in a single frame to skip past a wall.
- **Out-of-bounds.** Leaving the playable area entirely and traveling outside the level's walls to arrive somewhere else.
- **Memory manipulation.** At the extreme, glitches that let a player write data into the game's memory and jump to the credits, called arbitrary code execution; see [[Buffer overflow]].

Sequence breaking is central to [[Speedrun]] culture, where skipping content is the goal. It's also a form of [[Emergent Gameplay]]: outcomes the designers didn't plan, arising from systems interacting.

It has risks. A **softlock** leaves a game running but impossible to progress, for example because the player is stuck in an area whose exit requires an item they skipped. Designers who don't anticipate breaks can't prevent these, and players may lose hours of progress; see [[Save Scumming]].

Designers respond in different ways:

- **Patching.** Closing exploits, which speedrunners sometimes resent; communities often keep playing old versions.
- **Tolerating.** Leaving breaks in, since they reward curiosity and cost nothing for players who never find them.
- **Designing for it.** Some games deliberately allow breaks. The Legend of Zelda: Breath of the Wild lets players walk to the final boss immediately. Metroid Dread's designers added hidden routes for skilled players. Immersive sims treat multiple routes as a core principle; see [[Immersive Sim]].
- **Defensive design.** Making sure every reachable state still has a path forward, the game equivalent of handling every edge case; see [[Boundary Value Analysis]].

Knowledge-gated games take this further: the player can technically go anywhere from the start, and what holds them back is understanding, not abilities; see [[Metroidbrainia]].

Sequence breaking resembles security work: finding paths around intended controls by understanding a system better than its designers did; see [[Penetration Testing]].

## See also
- [[Datamining]]
- [[Open World Design]]
- [[Game Modding]]
