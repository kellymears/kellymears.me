---
aliases:
  - Input buffering
  - Jump buffering
  - Input leniency
tags:
  - play
summary: Small, invisible allowances that let a jump register a few frames after leaving a ledge or a button press count slightly early, so controls feel fair even though they aren't literally accurate.
---
**Coyote time** is a short grace period, usually a few frames, during which a player can still jump after running off the edge of a platform. It's named after Wile E. Coyote in the Road Runner cartoons, who runs off cliffs and hangs in the air for a moment before noticing and falling.

It exists because human timing and perception are imprecise. Players press jump when they *see* their character at the edge, but by the time the press is processed, the character may already be a pixel past it. Without coyote time, the game is technically correct and the player feels cheated: "I pressed jump!" With it, the game accepts what the player meant. Typical windows are around 80–150 milliseconds, five to nine frames at 60 frames per second.

Coyote time is one of a family of **input leniency** techniques:

- **Jump buffering.** A jump pressed slightly *before* landing is remembered and executed the moment the character touches ground, rather than ignored.
- **Input buffering in action games.** The next attack in a combo can be entered during the current one and plays as soon as it's allowed; see [[Frame Data]].
- **Generous hitboxes.** Player hurtboxes smaller than the sprite, and pickup or enemy hitboxes bigger, so near misses go the player's way; see [[Hitbox and Hurtbox]].
- **Corner correction.** A jump that clips the corner of a ceiling gets nudged around it instead of stopping dead.
- **Aim assist.** Gentle pull toward targets for players using analog sticks, which are less precise than a mouse.

These techniques are mostly invisible, and that's the point. Players describe the result as "tight" or "responsive" controls, not as forgiving ones. They're a major part of [[Game Feel]], alongside animation and feedback. Celeste is often cited as a showcase: its developers documented a long list of hidden assists, and the game still has a reputation for demanding precision.

They also compensate for latency the player can't see. Displays, controllers, and game engines each add delay between a press and its visible result, so leniency windows absorb some of that gap; see [[Input Latency]] and [[Game Loop]].

The design question is how much. Too little and the game feels unfair; too much and it feels floaty, and skilled players lose the sense that precision matters. Competitive games usually keep windows tight and consistent so outcomes reflect skill, while single-player games lean generous. Making these windows adjustable is one form of [[Assist Mode]].

The broader principle applies outside games: an interface that interprets what someone clearly meant, rather than exactly what they did, feels better to use; see [[Fitts's Law]] and [[Postel's Law]].

## See also
- [[Invincibility Frames]]
- [[Difficulty Curve]]
- [[Collision Detection]]
- [[Fighting Game]]
