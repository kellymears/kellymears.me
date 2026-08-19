---
aliases:
  - Frame counting
  - On block
tags:
  - play
summary: The startup, active and recovery cost of an action measured in simulation ticks, and what it predicts about a matchup.
---
**Frame data** is the breakdown of an action into the frames it costs: **startup** before it can affect anything, **active** frames in which it can actually hit, and **recovery** before the character can act again. A move is described as **plus** or **minus on block** by a standard reckoning — the defender's blockstun minus the attacker's remaining active frames and recovery — where a plus move lets the attacker act first on the next exchange and a minus one hands that advantage away.

The notation began in competitive fighting games, where community testing produced public frame charts for every move in a cast, turning "this move feels safe" into a number anyone could verify. It migrated into broader action-game discourse as brawlers and [[Soulslike]] bosses adopted attack patterns precise enough to reward the same accounting — a boss's recovery window is frame data even unpublished, discovered through repetition or [[Datamining]].

Frame-level accounting exists because it has to: a game running on a fixed simulation tick has no unit smaller than that tick to measure anything in. The precondition is the **fixed tick**, not a fixed render rate — a game can draw at whatever rate the hardware allows while its logic advances at a steady 60 Hz, and "six frames of startup" is still exactly six sixtieths of a second. A variable tick is what makes the notation meaningless, since the same six frames then span a different amount of real time on every machine. [[Determinism]] is not required: frame data holds perfectly well in a game with random damage rolls, because the roll changes the outcome of an exchange and not its timing. Once the tick is fixed, the frame becomes the natural currency for describing [[Invincibility Frames]], [[Poise]] breakpoints, and the timing window of a [[Parry and Riposte]], all of which are frame data wearing a different name.

Knowing a matchup's numbers changes how it is played: a habitually minus move gets punished on reaction once enough of the playerbase has memorized the chart, which is one of the ways a [[Metagame]] calcifies around published information rather than raw skill, and why frame charts sit alongside [[Tier List]] rankings in the same competitive literature.

## See also
- [[Determinism]]
- [[Invincibility Frames]]
- [[Poise]]
- [[Parry and Riposte]]
- [[Metagame]]
- [[Rollback Netcode]]
