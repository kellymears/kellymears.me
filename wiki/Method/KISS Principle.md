---
aliases:
  - Keep it simple
  - Keep it simple, stupid
tags:
  - method
summary: The engineering maxim that designs should be as simple as the job allows, because simple systems are easier to build, understand, repair, and trust, with the hard part being which complexity can actually be removed.
---
The **KISS principle**, short for "keep it simple, stupid," holds that most systems work best when kept simple, and that unnecessary complexity should be avoided. The phrase is usually traced to American military aviation around 1960 and is commonly credited to Kelly Johnson, the lead engineer of Lockheed's Skunk Works, which built the U-2 and SR-71 spy planes.

The story attached to it is about repair. A jet, the reasoning went, had to be fixable by an average mechanic in the field, under combat conditions, with ordinary tools. Read that way, "stupid" isn't an insult aimed at the designer. It describes the conditions the design has to survive: tired people, missing parts, and no time to consult a manual. Gentler expansions such as "keep it short and simple" came later.

Simplicity pays off in several ways at once:

- **Fewer failure points.** Every part that exists can break, and every interaction between parts can break in combination; see [[Murphy's Law]].
- **Easier understanding.** People can hold only so much in mind, and a design that fits in one head gets fewer mistakes; see [[Cognitive Load]].
- **Easier repair.** Faults in simple systems are faster to find, a point the programming version of the idea makes sharply; see [[Kernighan's Law]].
- **Easier growth.** Working complex systems tend to evolve from working simple ones, not to be designed complex from scratch; see [[Gall's Law]].

The principle has many relatives. Philosophy prefers explanations with fewer assumptions; see [[Occam's Razor]]. Software culture argues that a simpler design which ships can beat a more correct one that doesn't; see [[Worse Is Better]]. Industrial design's "less, but better" makes the same case for objects; see [[Dieter Rams]]. Choosing familiar, well-understood tools over exciting new ones is simplicity applied to technology choices; see [[Boring technology]].

What the slogan doesn't say is how. Some complexity belongs to the problem itself and can only be moved around, not removed. Strip it from the design and it reappears in the user's workload; see [[Tesler's Law]]. A system can also be made to look simple by hiding complexity behind an interface that eventually fails to hide it; see [[Leaky Abstraction]].

The forces pushing the other way are steady. Each added feature looks small on its own; see [[Feature Creep]]. A team's second attempt at a system often tries to include everything left out of the first; see [[Second-System Effect]]. And clever optimizations added before they're needed trade clarity for speed nobody asked for; see [[Premature Optimization]].

Simple is also not the same as easy. Getting to a simple design usually takes more thinking than getting to a complicated one, which is why the maxim needs repeating.

## See also
- [[You Aren't Gonna Need It]]
- [[Unix Pipeline]]
