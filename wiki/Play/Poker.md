---
aliases:
  - Texas hold 'em
  - Bluffing
  - Poker face
tags:
  - play
summary: A family of card games built on hidden information and betting, where bluffing turns out to be mathematically necessary, which became a televised mass hobby in the 2000s and a landmark challenge for game-playing AI.
---
**Poker** is a family of card games in which players bet on the strength of hands that are partly hidden from each other. The best hand wins at a showdown, but most hands never reach one. A player who bets strongly enough can make everyone else fold, whatever their cards. So poker is less about cards than about what others believe about them.

The game took shape in the United States in the early nineteenth century, around New Orleans and the Mississippi riverboats, drawing on older European betting games. Draw and stud variants long dominated. Texas hold 'em, in which each player holds two private cards and shares five face-up cards with the table, reached Las Vegas in the 1960s and later became the standard.

What separates poker from chess is hidden information. In chess, both players see the whole position; see [[Perfect Information]]. In poker, each player knows something the others don't, so it's a contest of inference and concealment; see [[Information Asymmetry]]. Players estimate an opponent's likely hands from their bets and update as more is revealed, a process formalized by [[Bayes' Theorem]].

Bluffing isn't just psychology. In their 1944 book founding modern [[Game theory]], John von Neumann and Oskar Morgenstern analyzed a simplified poker and showed that optimal play requires bluffing at a precise rate. A player who bets only with strong hands is easy to read. Mixing bluffs in at the right frequency makes a player's bets uninformative.

Good play rests on a few ideas:

- **Expected value.** Each call or fold should be judged by its average result over many repetitions, not by whether it wins this time; see [[Expected Value]].
- **Pot odds.** Calling is worthwhile when the chance of winning exceeds the share of the final pot the call costs.
- **Variance.** Luck dominates in the short run, so good players lose often and bad players win often; see [[Input and Output Randomness]] and [[Law of Large Numbers]].
- **Tilt.** Losing streaks push players into emotional, reckless play, so discipline matters as much as skill; see [[Emotional Regulation]].

A televised boom began in 2003, when an amateur who had qualified through an inexpensive online tournament won the main event of the World Series of Poker. Cameras that showed players' hidden cards made broadcasts watchable, and online poker rooms filled with new players.

Poker became a benchmark for artificial intelligence because hidden information defeats the search methods that worked for chess; see [[Deep Blue]]. Researchers at the University of Alberta essentially solved two-player limit hold 'em in 2015; see [[Solved Game]]. Carnegie Mellon's Libratus beat top professionals at two-player no-limit in 2017, and Pluribus won at six-player tables in 2019, both trained largely by playing against themselves; see [[Self-Play]].

## See also
- [[Mahjong]]
- [[Backgammon]]
- [[Trick-Taking Game]]
- [[Push Your Luck]]
