---
aliases:
  - Dynamic music
  - Interactive music
  - iMUSE
tags:
  - play
summary: Game music that changes with what the player does, by crossfading layers, switching sections at musical boundaries, or rearranging pieces live, so the score follows play it can't predict.
---
**Adaptive music** is game music that changes in response to what is happening in play. Film composers know exactly when every moment will happen; a game composer doesn't, because the player decides when to open a door, start a fight, or stand still for ten minutes. Adaptive music systems let a score follow along without awkward cuts or loops that drag on too long.

Early games changed music in simple ways. *Space Invaders* (1978) has a four-note bass line that speeds up as the aliens descend and the player shoots them down, raising tension with the game state itself; see [[Difficulty Curve]]. *Super Mario Bros.* speeds up its theme when time runs low.

LucasArts' **iMUSE** system, patented in 1994 and first used in *Monkey Island 2* (1991), was a landmark. The game told the music engine what was happening, and the engine waited for a musically sensible point, such as the end of a bar, before moving to a new section through a composed transition. Walking from one part of a town to another changed the arrangement smoothly, with no audible seam.

Modern games use a few main techniques, often combined:

- **Vertical layering.** The piece is recorded as stacked tracks, such as percussion, strings, and a melody, all in sync. The game fades layers in and out with intensity, adding drums when enemies appear and dropping them when combat ends.
- **Horizontal resequencing.** The music is split into sections that can play in different orders, with transitions written to connect them at bar lines.
- **Stingers.** Short musical phrases play on top of the score to mark events, such as spotting an enemy or finding a secret; see [[Stealth Mechanics]].
- **Parameter-driven mixing.** Middleware tools let designers tie volume, filters, and tempo to game values like health or speed.

Some games go further and make music from the actions themselves. In *Rez* (2001), each shot adds a note in time with the beat; see [[Rhythm Game]]. Generative systems assemble music from rules and randomness so it never quite repeats; see [[Procedural Generation]].

Adaptive music faces real constraints. Changes have to wait for musical boundaries, which can add a beat or two of delay; immediate cuts are responsive but jarring. Players also notice when the music announces danger before they see it, which can spoil surprises, a problem in [[Survival Horror]]. And repeated loops in long sessions wear on players, which is why many open-world games use silence generously; see [[Open World Design]].

Sound design overlaps with music here. Combat music and effects need to fit together in [[Timbre]] and loudness so important cues stay audible; see [[Sound]]. Done well, adaptive music becomes part of what makes play feel responsive; see [[Game Feel]] and [[Flow]].

## See also
- [[Diegetic Interface]]
- [[Emergent Gameplay]]
- [[Game Loop]]
