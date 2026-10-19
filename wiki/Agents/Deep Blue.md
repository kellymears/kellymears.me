---
aliases:
  - Computer chess
  - Kasparov versus Deep Blue
tags:
  - agents
summary: IBM's chess machine that beat world champion Garry Kasparov in 1997, using custom chips to search hundreds of millions of positions a second, a landmark won by brute-force search rather than anything like human understanding.
---
**Deep Blue** was a chess-playing computer built by IBM that defeated the reigning world champion, Garry Kasparov, in a six-game match in New York in May 1997. It was the first time a computer had beaten a world champion in a match under standard tournament time controls, and it became a public landmark for artificial intelligence.

Chess had been a target since the start of computing. Claude Shannon outlined how a program could play it in 1950, and Alan Turing wrote a chess algorithm he had to execute by hand. The approach that prevailed was search: look ahead through possible moves and replies, score the resulting positions, and pick the move that leads to the best position assuming the opponent also plays well; see [[Minimax]]. The difficulty is that the number of positions explodes with each move looked ahead, so programs depend on pruning lines that can't matter and on an evaluation function that scores positions without searching further; see [[Combinatorial explosion]].

Deep Blue began as a graduate project at Carnegie Mellon, where Feng-hsiung Hsu designed a chess chip, and the team moved to IBM in 1989. The 1997 machine used hundreds of custom chess chips working in parallel and could examine around 200 million positions a second. Its evaluation function weighed thousands of features, tuned with the help of grandmasters, much as expert systems encoded specialists' rules, and an opening book drew on centuries of recorded games; see [[Expert System]].

Kasparov won their first match, in 1996, 4–2, after losing the opening game. In the 1997 rematch he won the first game, then lost the second after the machine made a quiet positional move he believed no computer would choose. He suggested human intervention, which IBM denied. Shaken, he drew three games and lost the last, for a final score of 3½–2½. IBM declined a third match and retired the machine.

The result was taken two ways. To many it was a turning point, the moment machines matched human intellect at a game long treated as a test of it; see [[Turing Test]]. To others it showed the opposite: Deep Blue won by fast, specialized search, not by anything like understanding, a conclusion that fed the habit of redefining intelligence as whatever machines can't yet do; see [[Moravec's Paradox]]. In hindsight it is an early case of a general pattern, in which methods that scale with computation beat those built on human expertise; see [[Bitter Lesson]] and [[Moore's Law]].

Within a decade, chess programs on ordinary computers were stronger than any human. Later engines learned their own evaluation from play rather than hand-tuned rules; see [[Self-Play]] and [[Monte Carlo Tree Search]]. Go, with far more possible positions, held out until 2016. Human chess changed too, with players now preparing against engines.

## See also
- [[Alpha-Beta Pruning]]
- [[Dartmouth Workshop]]
- [[AlphaGo]]
