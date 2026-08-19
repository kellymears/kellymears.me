---
aliases:
  - GGPO
tags:
  - play
summary: A networking model that hides latency by predicting inputs and silently resimulating when the prediction was wrong, instead of freezing to wait.
---
**Rollback Netcode** is a networking scheme, popularized under the name *GGPO*, that solves online fighting-game latency by refusing to make the local player wait for a remote input before showing something on screen. Instead, the game predicts the opponent's next input (almost always "no change"), simulates forward on that guess, and only rewinds and resimulates the last several frames if the real input turns out to differ from the guess. The correction happens in a handful of milliseconds and is usually invisible; the local player's own inputs feel instant regardless of connection quality.

This replaced the older model, delay-based netcode, which instead added a fixed input-lag buffer on both sides so every player's inputs would already be known by the time they needed to display — safe, but it makes every button press feel late, visibly and uniformly, even on a connection that's otherwise fine. Rollback trades that guaranteed-but-slow feel for occasional visible correction (a hit that appeared to connect suddenly not registering, or a character's position snapping) in exchange for keeping the common case instant.

Rollback depends entirely on [[Determinism]]: the resimulation only produces the same result as it would have with correct information if the game's logic is bit-for-bit reproducible from the same inputs, which is also why the technique reads naturally alongside [[Frame Data]] — a game whose hit windows are frame-exact has clean seams to resimulate across, while a game with any hidden randomness or floating-point drift will desync in ways rollback can't fix. Its arrival reshaped competitive fighting games' online scenes more than any single character balance patch has, because it changed what "playable" meant at all outside a LAN.

## See also
- [[Frame Data]]
- [[Determinism]]
- [[Parry and Riposte]]
- [[Matchmaking Rating]]
- [[Latency and Jitter]]
- [[Peer-to-Peer]]
