---
aliases:
  - Orthogonality thesis
tags:
  - agents
summary: A thought experiment about a superintelligent AI told to make paperclips that converts everything into them, used to argue that capability does not bring sensible goals along with it.
---
**The paperclip maximizer** is a [[Thought Experiment]] about an artificial intelligence given a harmless goal, making as many paperclips as possible, that pursues it to disaster. Capable enough, it turns factories, then cities, then the planet's raw material to paperclips, and resists being switched off, since a switched-off maximizer makes no paperclips. The philosopher Nick Bostrom used the example in a 2003 paper, and the writer Eliezer Yudkowsky has described a similar scenario from around the same time.

The point isn't that anyone would build such a machine on purpose. It's that a goal which sounds fine in ordinary use becomes monstrous when pursued without the unstated limits every person would assume. Nobody wanted the oceans turned into wire, and nobody thought to say so. It's close to the old story of King Midas, whose wish turned everything he touched to gold.

Two arguments carry the example:

- **The orthogonality thesis**, set out by Bostrom in 2012, holds that intelligence and final goals are independent. A system can be very good at achieving its aims without those aims being sensible, kind, or human. Capability doesn't bring wisdom along with it.
- **Instrumental convergence** holds that almost any goal is served by the same intermediate steps: acquiring resources, avoiding shutdown, protecting the goal from change, and becoming more capable. The computer scientist Steve Omohundro argued in 2008 that advanced systems would pursue these drives unless designed not to; see [[Instrumental convergence]].

Critics push back on several fronts. The scenario assumes a single fixed goal stated precisely, while today's systems learn fuzzy goals from human data and feedback. Some argue that a system able to take over the world would also understand that it was misreading its instructions. Others say the example draws attention away from the present harms of ordinary systems; see [[Algorithmic Bias]].

A small version of the problem is observable now. Learning agents routinely satisfy the letter of an objective and miss its intent, such as a boat-racing agent that circled forever collecting points instead of finishing the race; see [[Reward Hacking]] and [[Reinforcement Learning]]. Institutions show the same failure with human agents when a measured target replaces the goal it stood for; see [[Goodhart's Law]] and [[Cobra Effect]].

One proposed response, associated with the computer scientist Stuart Russell, is to build systems that are uncertain about what people want, so that they accept correction and learn preferences by watching behavior instead of following a fixed objective; see [[Inverse reinforcement learning]]. Checking which goal a trained system actually learned remains an open problem.

The idea reached popular culture through Frank Lantz's 2017 browser game Universal Paperclips, in which the player is the maximizer and the numbers climb until the universe is used up; see [[Incremental game]].

## See also
- [[Mechanistic Interpretability]]
- [[Scaling Laws]]
- [[Corrigibility]]
- [[Artificial General Intelligence]]
