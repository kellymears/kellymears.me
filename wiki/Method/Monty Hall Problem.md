---
aliases:
  - Monty Hall
  - Three doors problem
tags:
  - method
summary: A conditional-probability puzzle in which switching wins twice as often as staying.
---
**Monty Hall problem** is a probability puzzle set on a game show. A prize sits behind one of three doors, goats behind the other two. A contestant picks a door; the host, who knows what is where, opens a *different* door revealing a goat and offers a switch. Switching wins two times in three. The name comes from the original host of *Let's Make a Deal*; a 1990 magazine column giving the correct answer drew thousands of letters insisting it was wrong.

**Where the intuition fails.** "Two doors left, so it is fifty-fifty" treats the reveal as though a door had blown open by itself — a [[Plausible Mechanism]] that sounds like a derivation. The host is constrained: never the contestant's door, never the prize door. When the first pick was wrong, which happens two times in three, those constraints leave exactly one door the host may open, and the prize is forced behind the other closed door. When the first pick was right, the host chooses freely and switching loses. The original door keeps the one-third it earned when chosen in ignorance; the rest concentrates onto a single door.

**The host's rule is the problem.** If the host opens one of the other doors at random and happens to reveal a goat, the odds really are even, because the branches where the prize would have been revealed are eliminated from the sample rather than never occurring. Same visible outcome, different probability, because the process generating the observation differs — which is why ambiguous statements of the puzzle are underdetermined.

Scaling makes it obvious: with a hundred doors and a host who opens ninety-eight goats, nobody stays. Conditioning on evidence requires knowing how the evidence was selected, the failure behind [[Truncation Bias]] and behind the inverted conditionals of [[Sensitivity and Specificity]]. Where argument stalls, a short simulation under [[Seeded Randomness]] settles it, turning intuition into [[Falsifiability]] and disagreement into a [[Reproducible Case]].

## See also
- [[Sensitivity and Specificity]]
- [[Falsifiability]]
- [[Truncation Bias]]
- [[Seeded Randomness]]
- [[Fermi Estimation]]

## Related
- [[Ground Truth]]
- [[Root Cause Analysis]]
- [[Exhaustive Claim]]
