---
aliases:
  - Baduk
  - Weiqi
  - Komi
tags:
  - play
summary: An ancient two-player board game of placing stones to surround territory, whose few rules produce such depth that it held off strong computer play until AlphaGo in 2016.
---
**Go** is a two-player strategy game in which players take turns placing black and white stones on the intersections of a grid, usually 19 by 19 lines, trying to surround more territory than the opponent. It originated in China, where it's called **weiqi**, and is mentioned in Chinese texts from the first millennium BCE, which makes it one of the oldest board games still played in something like its original form. It spread to Korea, where it's called **baduk**, and to Japan, whose name for it gives the English one. In imperial China it counted among the four arts expected of a cultivated scholar, alongside music, painting and [[Calligraphy]].

The rules fit on a page. A stone or connected group with no empty points next to it is captured and removed. A rule called ko forbids immediately recapturing in a way that would repeat the position forever. The game ends when both players pass, and the larger area wins. Black moves first, so white receives **komi**, compensation points usually set at 6.5 or 7.5, the half point ruling out ties. Weaker players can instead receive handicap stones placed before play, which lets players of very different strength have a close game.

From those rules comes enormous depth; see [[Emergent Gameplay]]. Every stone is identical, so a move's value comes entirely from its relationship to the others. There are about 2 times 10 to the 170th power legal positions on a full board, vastly more than in chess, and no hidden information or dice; see [[Perfect Information]] and [[Abstract Strategy Game]]. Exhaustive search is hopeless, which is why the game is far from being solved; see [[Combinatorial explosion]] and [[Solved Game]].

Japan built the first professional system. In the Edo period, from the seventeenth century, the shogunate supported Go houses that trained players and held official games. The dan ranks later adopted by judo and other martial arts are usually credited to Go. Today professional associations in China, Korea and Japan run tournaments, and online servers rate amateurs on systems related to the [[Elo Rating System]].

For decades Go resisted computers. Chess programs could search ahead and score positions with hand-written rules, but Go positions defied simple scoring; see [[Deep Blue]]. Programs built on random playouts reached strong amateur level in the 2000s; see [[Monte Carlo Tree Search]]. Then in March 2016 DeepMind's [[AlphaGo]] beat Lee Sedol, one of the strongest players in the world, four games to one, including an unconventional fifth-line move in the second game that commentators first took for a mistake. A successor learned from scratch by playing itself; see [[Self-Play]] and [[Reinforcement Learning]]. Lee Sedol retired in 2019, citing the AI's dominance. Professionals now study machine moves, and opening fashions have shifted as a result.

## See also
- [[Backgammon]]
- [[Mahjong]]
