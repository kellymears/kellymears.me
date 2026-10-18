---
aliases:
  - Imperfect information
  - Hidden information
tags:
  - play
summary: Whether every player can see the entire state of a game, as in chess, or some of it is hidden, as in poker, a distinction that decides whether a game rewards calculation or reading other people.
---
A game has **perfect information** when every player can see its entire state and everything that has happened, as in chess, Go, and checkers. It has **imperfect information** when some of the state is hidden from some players: the cards in an opponent's hand, the units behind the [[Fog of War]], or who among the players is secretly the traitor.

The distinction comes from [[Game theory]], and it changes what kind of thinking a game rewards.

In perfect-information games, the best move depends only on the position. There is nothing to infer about what an opponent knows, so play is a matter of calculation and judgment. Deterministic games of this kind have a definite outcome under perfect play, even if it is too costly to compute; see [[Solved Game]]. Skill shows up as depth of calculation and pattern recognition built through years of study.

Imperfect information adds layers that perfect information lacks:

- **Inference.** Players reason about what the hidden state probably is, from what others have done. A poker player who raises is telling the table something, truthfully or not.
- **Bluffing.** Because others infer from actions, actions can mislead. Optimal poker strategy requires bluffing at certain frequencies, because a player who only bets with strong hands is easy to read.
- **Randomized strategy.** The best play is often a mix of actions chosen with set probabilities, so that opponents can't exploit a pattern, as in rock-paper-scissors.
- **Signaling.** In partnership games such as bridge, players communicate through their legal choices about what they hold; see [[Trick-Taking Game]].

These layers make imperfect-information games much harder for computers. Searching a [[Game AI]]'s tree of moves doesn't work directly, since the program must reason about beliefs as well as positions. Poker resisted strong programs long after chess fell. In 2017 Libratus beat top professionals at heads-up no-limit Texas hold'em, and in 2019 Pluribus beat them in six-player games, using methods that compute strategies balanced against any opponent rather than predictions about a particular one.

Chance is a separate question. Backgammon has perfect information but random dice, while some card games are deterministic once dealt but hidden. Designers combine both to tune how much skill, luck, and reading of people a game rewards.

For designers, hidden information is a powerful tool:

- **Social play.** Games built around hidden roles turn every conversation into a puzzle about who is lying; see [[Social Deduction Game]] and [[Theory of Mind]].
- **Tension.** Not knowing what an opponent holds keeps games open longer, where perfect information can make an advantage obvious and the result foregone; see [[Catch-Up Mechanic]].

The idea reaches beyond games. Markets where one side knows more than the other behave very differently from open ones; see [[Information Asymmetry]].

## See also
- [[Collectible Card Game]]
- [[Matchmaking Rating]]
