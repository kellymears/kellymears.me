---
aliases:
  - Last-player-standing mode
tags:
  - play
summary: A many-player elimination format that uses a shrinking play area to force an ending the players would otherwise avoid.
---
**Battle royale** is a multiplayer format in which a large number of players — typically around a hundred — start with nothing on a shared map and play until one remains. The lineage runs from *DayZ* and *H1Z1* mods through *PUBG* and *Fortnite*, and its design contribution is narrow, specific, and borrowed constantly: the shrinking circle.

**The circle exists to solve a game-theoretic problem, not an atmospheric one.** In a large elimination match where hiding is cheap and engaging is risky, the individually rational play is to avoid contact and let others thin the field. If every player reasons that way the match never resolves — a [[Collective Action]] problem whose equilibrium is a stalemate nobody chose. A play area that contracts on a timer imposes a cost on waiting that rises until it exceeds the cost of fighting, and a match that could last indefinitely instead terminates on a schedule the designer sets. The mechanism is a forcing function, and its lesson generalises far beyond games: when the patient strategy dominates, change what patience costs rather than appealing to players to be bolder.

The format's other structural choice is that **loot placement is random and the drop path is chosen**. Randomised gear means engagements are asymmetric in ways neither player selected, which caps how reliably skill converts to victory; [[Seeded Randomness]] here is a deliberate variance floor keeping weaker players in contention. Choosing where to land restores agency over that variance by letting the player pick the risk tier of their opening minutes, and the tension between those two knobs is most of what separates the genre's entries.

Technically the format is demanding because a hundred players in one contiguous world resists the usual shortcuts. Interest management has to decide what each client is told about the others, since sending everything invites both bandwidth collapse and cheating — a [[Least Privilege]] argument enforced at the network layer. Early-match density and late-match sparsity mean the load profile changes shape within a single session, and the authoritative-server model that prevents client-side manipulation makes latency a permanent balance concern rather than a [[Race Condition]] to be fixed once.

## See also
- [[Live Service Game]]
- [[Seeded Randomness]]
- [[Peer-to-Peer]]
- [[Game AI]]
- [[Meta-Progression]]
