---
aliases:
  - Doubling cube
  - TD-Gammon
  - Tables game
tags:
  - play
summary: A two-player race game of moving checkers by dice rolls, descended from ancient tables games, whose doubling cube turns it into a lesson in probability and whose 1992 neural network player changed how experts play.
---
**Backgammon** is a two-player board game in which each side races fifteen checkers around a track of 24 triangular points and off the board, moving according to rolls of two dice. It belongs to a family of tables games that goes back to antiquity. The Romans played a version called tabula, Persian nard is closely related, and medieval Europe played many variants under the name tables. The English name appears in the seventeenth century.

The race is not a simple one. A single checker left alone on a point, called a blot, can be hit by the opponent and sent back to the start, while two or more checkers on a point block it. Players must balance running home against building blockades and attacking. Winning before the opponent has removed any checkers counts double, a gammon, or triple, a backgammon. Both players can see the whole board, so the game has no hidden information, but the dice mean even perfect play loses often; see [[Perfect Information]] and [[Input and Output Randomness]].

The **doubling cube**, introduced in New York gambling clubs in the 1920s, changed the game's character. Before rolling, a player can offer to double the stakes. The opponent must accept and play on for twice as much, or resign and pay the current stake. Deciding when to offer and when to accept a double depends on estimating winning chances, and a well-known rule of thumb says a double should be accepted if the player has at least about a 25 percent chance of winning; see [[Expected Value]]. It rewards an accurate sense of probability more than a feel for the board and punishes the urge to keep playing a lost position; see [[Sunk Cost Fallacy]] and [[Push Your Luck]].

Backgammon also has a place in the history of AI. In 1992 Gerald Tesauro at IBM built **TD-Gammon**, a neural network that learned by playing itself millions of times and adjusting its estimates after each move. It reached close to the level of top human players, and some of its unusual choices changed expert opinion about how to play several opening rolls; see [[Self-Play]] and [[Temporal difference learning]]. Later programs became stronger than any human, and serious players now measure their skill by their average error against a bot's evaluation.

The dice create endless suspicion online. Players regularly accuse servers of rigged rolls, mistaking ordinary streaks for manipulation, a pattern the [[Gambler's Fallacy]] helps explain; reputable sites use audited random number generators; see [[Pseudorandom Number Generator]]. Bots also raise the familiar problem of players consulting a program mid-game; see [[Anti-Cheat]]. Tournament play uses ratings similar to the [[Elo Rating System]], adjusted for match length, since luck evens out over longer matches.

## See also
- [[Go]]
- [[Mahjong]]
