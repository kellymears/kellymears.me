---
aliases:
  - Save point
  - Autosave
  - Respawn point
tags:
  - play
summary: The places a game restarts you after failure or lets you record progress, whose spacing quietly sets how much a death costs and so shapes difficulty, tension, and how willing players are to experiment.
---
A **checkpoint** is a place in a game where progress is recorded, so that a player who fails starts again from there instead of from the beginning. Along with save points and autosaves, checkpoints decide how much a mistake costs, and so they shape a game's difficulty as much as its enemies do.

Early arcade games had none: a player who ran out of lives started over, or put in another coin to continue. Home games added passwords that encoded progress, then battery-backed memory for save files, then generous checkpoints within levels.

The forms differ in who decides when to record:

- **Checkpoints.** The game records progress automatically at set places, usually before a hard section.
- **Save points.** Specific locations where the player chooses to save, such as typewriters in *Resident Evil* or bonfires in *Dark Souls*.
- **Save anywhere.** The player can save at any moment, common in long role-playing games on computers.
- **Autosave.** The game saves continuously or frequently without asking.
- **No saves.** Each run is final, the defining rule of some genres; see [[Permadeath]].

Spacing is the main lever. Far-apart checkpoints make each death expensive, which raises tension and makes careful play matter, but repeating a long, already-mastered section before each attempt at the hard part is tedious. Close checkpoints let players attempt a hard sequence over and over; precision games like *Celeste* respawn the player instantly a few seconds back, so dozens of failures feel fine; see [[Platformer]] and [[Difficulty Curve]].

Scarcity also creates fear. Survival horror games often limit saves, sometimes requiring a consumable item to use them, so every step between save rooms carries risk; see [[Survival Horror]]. Soulslike games put checkpoints far apart and make the player recover what they lost at the spot where they died, turning the run back into a tense part of the game; see [[Soulslike]].

Free saving has its own problem. When players can save before every risky choice and reload until it goes well, the game's chances stop mattering, and many players find themselves doing it even though it drains the experience; see [[Save Scumming]]. Designers counter with fewer save slots, saves that can't be made in combat, or outcomes decided before the player can see them.

Checkpoints also serve practical ends. They protect against crashes and lost progress, and on consoles and phones they let players stop at short notice, which matters for people with limited time. Accessibility options sometimes add checkpoints or let players skip sections; see [[Assist Mode]].

Under the hood, a checkpoint is a snapshot of game state, which needs to capture everything that matters and nothing that will break when restored, a problem shared with other kinds of saved state; see [[Serialization]].

## See also
- [[Roguelike]]
- [[New Game Plus]]
- [[Arcade Game]]
- [[Boss Battle]]
- [[Extra Life]]
- [[Distributed Training]]
