---
aliases:
  - DDA
  - Adaptive difficulty
  - Rubber banding
tags:
  - play
summary: A game changing its own difficulty while it's being played, based on how the player is doing, to keep them challenged without frustrating them, ideally without them noticing.
---
**Dynamic difficulty adjustment** (DDA) is a game changing its own challenge while it's being played, based on how well the player is doing. A player who keeps dying faces fewer or weaker enemies; one who breezes through faces more. The goal is to keep each player in the zone between boredom and frustration, the state psychologists call [[Flow]].

Fixed difficulty settings ask players to predict their own skill before they've played, and a single [[Difficulty Curve]] can't suit everyone. DDA tries to fit the curve to the player as they go.

Well-known examples:

- **Resident Evil 4** (2005) tracked hidden performance measures and quietly adjusted enemy aggression and damage.
- **Left 4 Dead** (2008) had an "AI Director" that paced zombie hordes, items, and quiet moments based on the team's health and stress; see [[Game AI]].
- **Crash Bandicoot** gave players extra shields after repeated deaths at the same spot.
- **Mario Kart** gives trailing players better items, a form of *rubber banding*.

**Rubber banding** in racing games makes computer opponents speed up when they fall behind and slow down when they lead, keeping races close as if the cars were linked by a rubber band. It produces drama, but when players notice it, it feels unfair: winning by skill seems pointless if opponents are kept artificially close.

That points to DDA's central tension, which is that players want to feel they earned their victories. Several problems follow:

- **Detection undermines it.** Players who notice the game easing off may feel patronized, and those who notice it pushing back feel punished for playing well.
- **It can be gamed.** If dying makes the game easier, a player can die on purpose before a hard section, much like [[Save Scumming]].
- **It flattens mastery.** If difficulty always matches skill, improving never feels like improvement, because the game stays exactly as hard.
- **Signals are noisy.** Deaths, damage taken, and time spent are imperfect measures of whether someone is struggling or enjoying a challenge.

Alternatives make the adjustment visible or chosen. Settings players can change at any time put them in control; see [[Assist Mode]]. Optional challenges, such as harder side areas, let skilled players opt into difficulty. Rewarding failure with progress, as many roguelites do, softens difficulty without changing it; see [[Meta-Progression]].

DDA connects to broader ideas: [[Matchmaking Rating]] adjusts difficulty in multiplayer by choosing opponents rather than changing the game, and adaptive tests adjust question difficulty to the test taker. All rest on estimating skill from performance and feeding it back, a negative feedback loop like a thermostat's; see [[Negative feedback]].

## See also
- [[Skill Check]]
- [[Compulsion Loop]]
- [[Self-Determination Theory]]
- [[Self-Play]]
