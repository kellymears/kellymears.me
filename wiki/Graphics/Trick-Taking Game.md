---
aliases:
  - Daifugo
  - Climbing game
tags:
  - graphics
summary: A card-game family in which players contest a series of small rounds, and a source of unusually clean rule systems.
---
**Trick-taking games** are a family in which a round consists of each player contributing cards and one of them winning what was played. The family is enormous — bridge, hearts, whist, spades — and the variations concern what may be played, what beats what, and how winning is scored.

The *climbing* subfamily, which includes the Japanese game Daifugō and its western relatives, works differently and is worth distinguishing: each play must **beat** the previous one, players may pass, and the round ends when everyone has passed. Its defining feature is a social one — finishing order assigns roles for the next round, and those roles come with an obligatory card exchange in which the loser hands their best cards to the winner. The game therefore builds in its own rubber-banding, and the fun sits in escaping a bad role.

Two commonly-played rules add most of the character: an "eight stop", where playing an eight immediately ends the round, and a "revolution", where playing four of a kind inverts the rank order for the remainder.

As software, this family is unusually pleasant to model: a card type, a move as a small union of shapes, a legality function, and a state machine. The design attention goes almost entirely into making the rhythm of play legible — who leads, who passed, what just happened, and why the turn moved.

## See also
- [[Game AI]]
- [[Seeded Randomness]]
- [[Terminal User Interface]]

## Related
- [[Tarot]]
- [[Roguelike]]
- [[Constraint Propagation]]
- [[Procedural Generation]]
- [[Cellular Automaton]]
- [[L-System]]
