---
aliases:
  - Elo
  - Elo rating
  - Glicko
  - TrueSkill
tags:
  - play
summary: A method for rating players from the results of their games, devised for chess by Arpad Elo, in which each result moves a rating by how surprising it was, and the ancestor of nearly every matchmaking and leaderboard system since.
---
The **Elo rating system** estimates a player's skill from the results of their games against other rated players. It was devised by Arpad Elo, a Hungarian-born American physics professor and chess master, adopted by the United States Chess Federation in 1960 and by the international chess federation, FIDE, in 1970. Its logic now underlies most competitive rankings in games and many outside them.

The core idea is that a rating is a prediction. The difference between two ratings gives each player's expected score, the share of points they should win on average. A gap of 200 points means the stronger player is expected to score about 76 percent; a gap of 400, about 91 percent. Elo modeled each performance as varying randomly around a player's true strength, originally with a bell curve; see [[Normal Distribution]]. Most implementations now use a logistic curve, which has fatter tails.

After each game, both ratings move by a fixed factor, called K, times the gap between actual and expected score. Beat someone you were expected to beat and you gain little; upset a much stronger player and you gain a lot. Points flow from one player to the other, so the system is zero-sum. Over many games, ratings settle where predictions match results, which is a form of [[Calibration]].

The choice of K trades responsiveness against noise. A large K tracks improving players quickly but jitters with luck; a small K is stable but slow. Federations give new players a higher K, since a rating built on few games is mostly guesswork and later results pull it back toward reality; see [[Regression to the Mean]].

Later systems fix Elo's blind spots:

- **Glicko**, devised by the statistician Mark Glickman in 1995, adds a rating deviation that measures uncertainty. Ratings of players who have not played recently become less certain and move faster when they return. Glicko-2 adds a volatility term.
- **TrueSkill**, built by Microsoft Research for Xbox Live, handles teams and many-player matches by treating skill as a probability distribution updated after each game; see [[Bayes' Theorem]].

Online games use descendants of these to pair opponents, often hiding the true number behind a visible rank; see [[Matchmaking Rating]]. The same arithmetic ranks sports teams, chess engines trained by playing themselves, and language models compared head to head by human voters; see [[Self-Play]].

A rating can also become the target instead of the measure. Chess players have avoided games to protect a rating, and pools drift as players enter and leave with points they never repaid, so a 2400 in one decade doesn't mean the same as in another; see [[Goodhart's Law]]. Strong players who open new accounts to beat beginners, called smurfing, exploit the slow start of an unrated player.

## See also
- [[Tier List]]
- [[Ranked-Choice Voting]]
- [[Esports]]
- [[AlphaGo]]
- [[Arrow's Impossibility Theorem]]
