---
aliases:
  - Platform game
  - Variable jump height
  - Precision platformer
tags:
  - play
summary: The genre built around running and jumping between platforms, from Donkey Kong and Super Mario Bros. to modern precision games, where the feel of a single jump decides almost everything.
---
A **platformer** is a game built around moving a character through a level by running and jumping between platforms, over gaps, and past hazards. It was the defining genre of the 1980s and early 1990s and remains one of the clearest showcases of how much a game's controls matter.

*Donkey Kong* (1981) introduced a jumping hero, and *Super Mario Bros.* (1985) set the template: a side-scrolling world, momentum that builds as you run, and levels that teach their own rules. Its first screen famously teaches without text: the first enemy walks toward the player, who must jump or lose a life, and a block nearby rewards curiosity with a power-up; see [[Level Design]]. The genre shaped hardware too: smooth side-scrolling needed graphics chips that could move a background built from tiles, with characters drawn on top; see [[Tile Map]], [[Sprite]], and [[Parallax Scrolling]].

The core of a platformer is the jump, and most of a good jump is invisible:

- **Variable jump height.** Holding the button longer jumps higher, usually by cutting upward speed when the button is released, so short taps and long presses do different things.
- **Asymmetric gravity.** Falling faster than rising makes jumps feel snappy instead of floaty.
- **Air control.** Players can steer mid-air, which is physically impossible and feels essential.
- **Forgiveness windows.** Accepting a jump pressed a few frames after leaving a ledge, or just before landing; see [[Coyote Time]].
- **Corner correction.** Nudging the character past a ceiling edge it barely clipped, so near-misses aren't punished.

These choices are why two platformers with identical levels can feel completely different; see [[Game Feel]]. They also depend on running the physics at a steady rate, so that a jump behaves the same on every machine; see [[Game Loop]].

The genre branched in several directions:

- **3D platformers.** *Super Mario 64* (1996) moved the genre into three dimensions and had to solve camera control and depth perception, still the hardest problems in 3D jumping.
- **Exploration.** Large connected maps unlocked by new movement abilities; see [[Metroidvania]].
- **Precision platformers.** *Super Meat Boy* (2010) and *Celeste* (2018) make jumps demanding but respawn instantly, so dying costs seconds and players attempt a hard section dozens of times; see [[Difficulty Curve]]. *Celeste* also popularized accessible difficulty options; see [[Assist Mode]].
- **Puzzle platformers.** Movement becomes a tool for solving spatial puzzles, as in *Braid* (2008), which added time rewinding.

Platformers are a favorite of speedrunners, since tight controls reward mastery and physics quirks reward discovery; see [[Speedrun]]. They are also a common first project for new game developers, though making a jump feel right takes much longer than making one work.

## See also
- [[Invincibility Frames]]
- [[Collision Detection]]
- [[Video Game Crash of 1983]]
