---
aliases:
  - Client-side prediction
  - Tick rate
  - Favor the shooter
tags:
  - play
summary: The techniques online shooters use to hide network delay, predicting the player's own movement locally and rewinding the server's view of the world to check shots, which makes play feel responsive at the cost of occasional hits that look impossible.
---
**Lag compensation** is the set of techniques online action games use so that network delay doesn't make them unplayable. A message from a player's computer to the server and back can take a tenth of a second or more. Without compensation, every movement would feel sluggish and shots at moving targets would miss, since the target would have moved by the time the shot arrived; see [[Input Latency]].

Most shooters use an authoritative server, which runs the real simulation and decides what happened, while each player's computer shows an approximation; see [[Anti-Cheat]]. The server advances the world in fixed steps, and the number of steps per second is called the **tick rate**. Competitive games often run at 64 or 128 ticks per second; higher rates give finer timing at the cost of bandwidth and server power.

Three techniques do most of the work. **Client-side prediction** lets a player's own movement happen immediately on screen, without waiting for the server's confirmation. The client keeps a record of its inputs, and when the server's authoritative position arrives, it replays any inputs the server hasn't yet processed, correcting small differences smoothly; see [[Optimistic UI]]. Quake's QuakeWorld update in 1996 made the approach widely known.

**Interpolation** handles other players. Updates about them arrive in irregular bursts, so the client draws them slightly in the past, blending between two known positions instead of guessing ahead; see [[Linear Interpolation]]. Movement looks smooth, but everyone else is shown a fraction of a second behind where the server has them.

**Lag compensation** proper resolves shots. When a shot arrives, the server estimates what the shooter was seeing, by subtracting their latency and interpolation delay, then rewinds every player's position and collision shapes to that moment and checks whether the shot hit; see [[Hitbox and Hurtbox]]. A widely read 2001 paper by Yahn Bernier at Valve described the method used in Half-Life and its successors. The policy is often summarized as favoring the shooter.

The trade-off shows up as oddities. A player who has already ducked behind a wall can still be hit, because on the shooter's screen they were exposed. Someone moving around a corner can see a stationary defender a moment before the defender sees them, called peeker's advantage. Rewind is capped for players with very high latency; see [[First-Person Shooter]].

Other genres choose differently. Real-time strategy games often run in lockstep, every machine simulating the same deterministic game and exchanging only commands, which handles huge unit counts with little bandwidth; see [[Real-Time Strategy]] and [[Determinism]]. Fighting games, where single frames decide outcomes, predict the opponent's input and roll back when wrong; see [[Rollback Netcode]] and [[Fighting Game]]. Clocks on every machine must stay closely aligned for any of this to work; see [[Network Time Protocol]].

## See also
- [[Peer-to-Peer]]
- [[Frame Data]]
