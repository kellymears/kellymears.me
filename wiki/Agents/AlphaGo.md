---
aliases:
  - Move 37
tags:
  - agents
summary: The DeepMind program that beat the Go champion Lee Sedol in 2016, about a decade sooner than many expected, by combining neural networks trained on human games with tree search and self-play.
---
**AlphaGo** is a Go-playing program built by DeepMind that in March 2016 beat Lee Sedol, one of the strongest players of the previous decade, four games to one in Seoul. Go had been the standard example of a game computers couldn't master, and many researchers had expected that milestone to be about a decade away.

Go is harder for machines than chess for two reasons. A position offers around 250 legal moves on average, against about 35 in chess, so the [[Game tree]] grows far faster; see [[Combinatorial explosion]]. And there's no simple way to score a position mid-game, whereas chess programs could start by counting material. The brute-force search that worked for [[Deep Blue]] got nowhere.

AlphaGo combined three pieces:

- **A policy network** suggested promising moves. It was first trained on about 30 million positions from online games between strong amateurs, learning to predict the next move; see [[Supervised Learning]] and [[Neural Network]].
- **Self-play** then improved that network by having it play against earlier versions of itself and reinforcing moves that led to wins; see [[Self-Play]] and [[Reinforcement Learning]].
- **A value network** estimated who was winning from a position, replacing the hand-written evaluation chess engines relied on.

Both networks guided a [[Monte Carlo Tree Search]], which spent its effort on the lines that looked most promising.

In October 2015 it beat the European champion Fan Hui 5–0, the first win by a program over a professional on a full board without a handicap. The Lee Sedol match drew an enormous audience across East Asia.

The match's best-known moment was **move 37** of game 2, a shoulder hit on the fifth line that commentators first took for a mistake. AlphaGo's own policy network rated it about a one-in-ten-thousand choice for a human, yet it shaped the rest of the game. In game 4, Lee answered with a wedge at move 78 that the program hadn't anticipated, and AlphaGo's play fell apart. It was the only game a human won.

Successors went further. A version playing online as "Master" won 60 straight games against professionals in early 2017, and AlphaGo later beat the top-ranked Ke Jie 3–0. AlphaGo Zero, published that October, skipped human games entirely and learned from self-play alone. Lee Sedol retired in 2019, calling AI an entity that cannot be defeated.

That turned out not to be the whole story. In 2023, researchers used an adversarial program to find a blind spot in top Go engines, and an amateur player then beat them by slowly encircling a large group the engine failed to see was in danger; see [[Adversarial Example]].

AlphaGo is often cited as evidence for the [[Bitter Lesson]], since learning and search beat decades of hand-coded Go knowledge.

## See also
- [[Elo rating]]
- [[Moravec's Paradox]]
- [[World Model]]
- [[Alpha-Beta Pruning]]
- [[Abstract Strategy Game]]
