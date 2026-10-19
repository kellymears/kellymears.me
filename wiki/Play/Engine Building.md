---
aliases:
  - Engine Builder
tags:
  - play
summary: A strategy pattern where early plays exist to make later plays more efficient, spending a game's front half on a multiplier rather than a score.
---
**Engine Building** names a pattern, not a genre: a game rewards moves that don't score directly but instead increase the rate at which future moves will score. A tableau-builder like *Race for the Galaxy* or *Terraforming Mars* is built almost entirely around this — a card that produces two resources a turn is worth more than a card worth four points once, if there's enough game left to let the difference compound. *Factorio* is the pattern taken to a digital, real-time extreme: nearly the entire game is spent building machines whose sole output is feeding other machines, with the shippable product arriving almost as an afterthought.

Because it's a pattern rather than a genre, engine building shows up inside [[Deckbuilder]]s (a card that draws extra cards), inside [[Worker Placement]] games (a worker that generates resources other workers then spend), and inside [[City Builder]]s (a factory zone that feeds a power plant that unlocks more factory zones) without any of those being *about* engine building the way *Wingspan* or *Dominion*'s buy-engine builds are.

The pattern carries a specific risk: a snowball. Once an engine is running well ahead of an opponent's, the gap tends to widen rather than close, because the whole point of an engine is that it compounds. Well-designed engine-building games counter this with catch-up mechanics (rubber-banding scoring, diminishing returns on stacked bonuses) or simply accept the snowball as the genre's honest reward for reading the tableau correctly early — a design choice that separates games explicitly about *building toward* a strong turn from games that want every turn to matter equally.

## See also
- [[Deckbuilder]]
- [[Worker Placement]]
- [[Factory Game]]
- [[City Builder]]
