---
aliases:
  - Input randomness
  - Output randomness
  - Pseudo-random distribution
tags:
  - play
summary: The distinction between chance that sets up a decision, like a card draw, and chance that resolves one, like an attack roll, which shapes whether luck feels like a puzzle to solve or an unfair verdict.
---
Game designers distinguish two kinds of chance by when it happens relative to a player's decision.

**Input randomness** comes before the decision. A card is drawn, a map is generated, or a shop is stocked, and the player then plans around what they got. The skill is in adapting; see [[Procedural Generation]] and [[Deckbuilder]].

**Output randomness** comes after the decision. The player commits to an attack, and a roll decides whether it lands. The skill is in managing odds and preparing for failure, but the result can overturn a good choice.

Most games mix both, and the balance shapes how luck feels. Input randomness tends to feel like a puzzle to solve. Output randomness can feel like a verdict delivered by the game, especially when the stakes are high and the odds looked favorable. Roguelikes lean on input randomness: each run deals a different hand, which keeps replay fresh while leaving outcomes in the player's control; see [[Roguelike]].

Output randomness collides with how people perceive probability. Players remember the 95% shot that missed and treat a run of bad luck as a sign that good luck is owed; see [[Gambler's Fallacy]]. A single battle doesn't contain enough rolls for the odds to even out; see [[Law of Large Numbers]]. Designers have responded by quietly changing the math:

- **Two rolls averaged.** Several *Fire Emblem* games roll twice and average for hit chance, so a displayed 90% hits about 99% of the time and a displayed 10% almost never.
- **Hidden bonuses.** Some strategy games add an unseen bonus to the player's odds after misses, or on easier settings.
- **Pseudo-random distribution.** *Warcraft III* and *Dota 2* start a 25% critical strike at a much lower chance and raise it after each miss, keeping the long-run rate while making streaks rare. Guaranteed rewards after a dry spell work the same way; see [[Pity Timer]].

How randomness is generated matters too. A seed fixes the sequence, so every player can face the same daily challenge; see [[Seeded Randomness]]. If the result of a roll is decided at a known moment, players can reload a save until it comes out well; see [[Save Scumming]]. Speedrunners go further and manipulate the generator through precise timing and movement; see [[Speedrun]].

Chance also has social uses. It lets weaker players win sometimes, which keeps mixed groups at the table; see [[Catch-Up Mechanic]]. Uncertain rewards are compelling for the same reason slot machines are, a property that monetization can exploit; see [[Variable-Ratio Reinforcement]].

Games without any chance are a different design space, where depth must come from opponents and hidden choices; see [[Perfect Information]]. The useful question for any random element is whether it creates decisions or replaces them; see [[Interesting Decisions]].

## See also
- [[Backgammon]]
- [[Mahjong]]
