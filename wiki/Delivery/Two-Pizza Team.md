---
aliases:
  - Two-pizza rule
tags:
  - delivery
summary: Amazon's rule of thumb that a team should be small enough to be fed by two pizzas, resting on the observation that coordination costs grow much faster than headcount and that small teams with clear ownership move faster.
---
A **two-pizza team** is a team small enough that two pizzas can feed it, usually understood as somewhere under ten people. The rule is attributed to Jeff Bezos and became part of Amazon's organizational folklore in the early 2000s. It's less a precise number than a reminder that small teams work differently from large ones.

The arithmetic behind it is about communication. In a group of people who all need to coordinate with one another, the number of possible pairwise connections grows roughly with the square of the group's size. Five people have ten such connections; ten people have forty-five; twenty people have a hundred and ninety. Each connection is a potential meeting, misunderstanding, or dependency. Beyond a certain size, a team spends more effort keeping itself aligned than doing its work; see [[Metcalfe's law]], which describes the same growth as a benefit for networks.

Fred Brooks made a similar point decades earlier: adding people to a late software project makes it later, partly because new members must be brought up to speed and partly because of the extra communication; see [[Brooks's Law]]. Even with perfect communication, any part of the work that can't be divided limits how much adding people helps; see [[Amdahl's Law]].

Small teams also tend to feel more ownership. Each member's contribution is visible, decisions can be made quickly, and the team can hold a shared picture of its work in their heads; see [[Self-Determination Theory]]. Larger groups fragment into informal subgroups anyway, and anthropologists have proposed limits on how many stable relationships a person can sustain; see [[Dunbar's Number]].

At Amazon, the idea came paired with an architectural one. Small teams were meant to own their services end to end and to interact with other teams through well-defined interfaces, not through meetings and shared databases. This mirrors the observation that a system's structure tends to reflect the communication structure of the organization that builds it; see [[Conway's Law]] and [[Microservices]]. Teams that own a service fully also tend to operate it; see [[You Build It, You Run It]].

The rule has limits. Small teams can become isolated, duplicate each other's work, or accumulate dependencies that require just the coordination they were meant to avoid. A team of three also has a dangerous concentration of knowledge, where losing one person cripples it; see [[Bus Factor]]. Later frameworks for organizing teams focus less on size and more on how teams interact, distinguishing teams that deliver features from those that provide platforms or specialist help; see [[Team Topologies]].

Short daily coordination meetings are one way small teams stay aligned without heavy process; see [[Daily Standup]].

## See also
- [[Platform Engineering]]
- [[Pair Programming]]
