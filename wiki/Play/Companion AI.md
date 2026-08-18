---
aliases:
  - AI Companion
tags:
  - play
summary: An NPC scripted to travel with the player and act semi-autonomously, judged mainly by whether it reads as a teammate or an obstacle.
---
**Companion AI** describes the behavior model driving an NPC that accompanies the player through combat and traversal, and its whole reputation as a design problem comes from how visibly it fails: getting stuck in a doorway, aggroing an enemy the player was trying to sneak past, blocking a narrow corridor at the exact moment a quick retreat was needed. A companion that fails this way doesn't read as a flawed teammate — it reads as a bug wearing a character model, because the player has no lever to correct it beyond hoping the next patch fixes the pathing.

The genre-defining trick most well-regarded companions use is a fictional cheat: Ellie in *The Last of Us* is scripted to never take damage and never draw enemy aggro during stealth sections, which is not remotely how a real second person moving through that space would behave, but it's invisible in play precisely because it removes the failure mode players actually hate. This is the distinction from an [[Escort Mission]] companion, who *can* die and whose vulnerability is the entire point of the objective — a combat companion is tuned to disappear as a liability; an escort companion is deliberately kept as one.

Companion AI is best understood as a special case of [[Game AI]] generally, but an asymmetric one: most game AI is built to present a fair, competent challenge, while companion AI is built to look competent without ever actually winning or losing on its own — its job is to seem like a teammate, not to play well in any sense that would be measured independently. That asymmetry is also why companion AI ages differently than enemy AI: an enemy that plays dumb is forgiven as an easy fight, but a companion that plays dumb breaks the fiction that anyone else is really there.

## See also
- [[Game AI]]
- [[Escort Mission]]
- [[Stealth Mechanics]]
