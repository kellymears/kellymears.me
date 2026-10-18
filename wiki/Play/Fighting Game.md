---
aliases:
  - Motion input
  - Combo
  - Street Fighter
tags:
  - play
summary: The one-on-one competitive genre built on frame-precise attacks, special-move inputs, and reading an opponent, which Street Fighter II defined in 1991 and which now runs on rollback netcode and open tournaments.
---
A **fighting game** pits two characters against each other at close range, each controlled by a player, until one runs out of health. The genre looks simple from outside, two people mashing buttons, but at a high level it is among the most demanding in games: execution measured in sixtieths of a second, combined with constant guessing about what the opponent will do next.

*Street Fighter II* (1991) defined the form. Its arcade cabinets let two players face each other side by side, offered a roster of distinct characters, and introduced special moves performed with **motion inputs**, such as a quarter-circle forward on the joystick followed by a punch to throw a fireball. Its developers also discovered, by accident, that some attacks could be chained before the opponent recovered, creating **combos**; rather than fix it, the series made combos central.

The genre's structure rests on a few ideas:

- **Frame data.** Every move has a startup, active, and recovery period counted in frames, and whether a move is safe depends on those numbers; see [[Frame Data]] and [[Hitbox and Hurtbox]].
- **Spacing and neutral.** Much of a match is spent at a distance, each player probing for an opening, before a single hit leads to a combo.
- **Mix-ups.** Attacks that must be blocked high, low, or not at all force the defender to guess, turning the game into rapid rounds of [[Prisoner's Dilemma]]-like prediction rather than pure reflexes.
- **Character matchups.** Each pair of characters plays differently, and players study the specifics; see [[Tier List]] and [[Metagame]].

Precision affects the design throughout. Games give players a small window to enter the next input early, called an input buffer, so combos aren't impossibly strict; see [[Coyote Time]] for the same forgiveness in platformers. Hits pause both characters for a few frames, which makes impacts feel heavy and gives players time to confirm a hit before continuing; see [[Game Feel]].

Online play was a weak point for years, because waiting for the other player's inputs added lag that ruined timing. **Rollback** netcode, which predicts the opponent's inputs and corrects mistakes by quietly re-simulating, spread through the genre in the 2010s and 2020s and made online matches feel close to local ones; see [[Rollback Netcode]].

The fighting game community grew around open tournaments, most famously Evo, where anyone can enter and unknowns sometimes beat professionals. Its culture values sportsmanship, studying replays, and labbing specific situations in training mode, the slow repetition that builds reliable execution; see [[Motor Learning]].

Barriers to entry are a long-running problem: new players often face opponents far better than them and quit. Modern games add simplified control schemes, detailed tutorials, and skill-based matching; see [[Matchmaking Rating]] and [[Assist Mode]].

## See also
- [[Parry and Riposte]]
- [[Hit Stop]]
- [[Skill Check]]
- [[Dominant Strategy]]
