---
aliases:
  - MMR
tags:
  - play
summary: A hidden or semi-hidden number a matchmaker uses to pair similarly skilled players, distinct from the visible rank a player is shown.
---
**Matchmaking Rating** (MMR) is the number a game's matchmaker actually uses to decide who plays against whom, and it is very often not the number displayed to the player. A player's visible rank — a tier, a league, a numeric score like Elo or LP — is frequently a smoothed, decayed, or gated presentation layer sitting on top of a rawer MMR that updates faster and factors in things the rank display doesn't, like recent win streaks, opponent strength, or placement-match uncertainty.

This split exists because the two numbers serve different audiences. MMR exists to make queues fast and matches close — its only job is prediction accuracy. The visible rank exists to make progress feel earned and legible to the player, which means it has to move more slowly and more fairly than raw prediction would, or every loss would feel like a demotion. The gap between the two is why players routinely feel "I performed well but didn't rank up" — the MMR moved, the display didn't, yet.

New accounts and returning players go through placement matches specifically because MMR estimation needs data — an initial rating with no track record is a bad prediction, so most matchmakers accept looser matches early and tighten as confidence grows. Smurfing (an experienced player queuing on a fresh account) exploits exactly this window, since a low-confidence, low-placement MMR gets matched against players far below the smurf's real skill until the system catches up.

MMR should not be confused with a [[Tier List]]: a tier list is a static, community-authored ranking of *things within the game* — characters, decks, builds — while MMR is a live, per-player number tracking people, recalculated after every match rather than every patch.

## See also
- [[Tier List]]
- [[Live Service Game]]
- [[Battle Royale]]
