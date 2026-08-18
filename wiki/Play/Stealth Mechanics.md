---
aliases:
  - Stealth Gameplay
tags:
  - play
summary: Systems that model detection as a gradient rather than a boolean, so a player manages suspicion as a resource before violence becomes an option.
---
**Stealth Mechanics** model an enemy's awareness as a gradient — unaware, suspicious, alerted, actively searching — rather than a binary seen-or-not, and the player's real skill is managing that gradient before it tips into open combat. *Metal Gear Solid*'s alert-state system is the genre's reference case: an enemy who spots something odd enters caution, escalates to full alert if the suspicion is confirmed, and eventually stands down through an evasion phase if the player breaks contact long enough — a whole small state machine standing between "unseen" and "shooting at you."

The inputs to that state machine are usually light, shadow, noise, and line of sight, feeding a perception meter the player learns to read the way a driver reads a speedometer. This is different in kind from a general [[Immersive Sim]]'s stealth option, where slipping past unseen is *one* valid approach among several equally viable ones (violence, persuasion, environmental manipulation); a dedicated stealth game usually makes detection the primary fail state, with combat as a costly, undesirable fallback rather than a parallel path.

Games that reward both approaches often score them separately — a "ghost" rating for a no-detection, no-kill run against a "lethal" rating for a loud one — and which rating a game actually rewards more (achievements, narrative approval, better gear) is a real design statement about which playstyle it considers the intended one, whatever its marketing claims about player freedom.

Stealth mechanics are worth distinguishing from a [[Cover System]], though the two share vocabulary like line of sight: cover addresses blocking ballistic fire during active combat, while stealth addresses staying unperceived *before* combat starts — a game can have deep cover mechanics and no stealth layer at all, or the reverse.

## See also
- [[Cover System]]
- [[Immersive Sim]]
- [[Game AI]]
- [[Companion AI]]
