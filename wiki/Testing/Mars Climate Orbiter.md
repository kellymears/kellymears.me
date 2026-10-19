---
aliases:
  - Mars Climate Orbiter failure
tags:
  - testing
summary: A NASA spacecraft lost at Mars in 1999 because one team's software reported thruster impulse in pound-force seconds while the navigation software expected newton-seconds, a units mismatch the interface specification had ruled out on paper.
---
**Mars Climate Orbiter** was a NASA probe meant to study Martian weather and relay data for a lander. On 23 September 1999 it fired its engine to enter orbit and was never heard from again. It had arrived far too low and most likely broke up in the atmosphere. The cause was a mismatch of units between two pieces of software.

During the nine-month cruise, small thruster firings unloaded momentum that built up in the spacecraft's reaction wheels. Ground software written by the contractor, Lockheed Martin, reported the impulse of each firing in pound-force seconds. The navigation team at NASA's Jet Propulsion Laboratory, which used those figures to model the trajectory, expected newton-seconds, as the interface specification required. Every firing was underestimated by a factor of about 4.45. Each error was small, but they added up over months, and at arrival the spacecraft passed about 57 kilometers above the surface instead of the planned 226; see [[Orbit]].

The mismatch was not invisible. Navigators noticed during the cruise that their models disagreed with tracking data and raised concerns, but the concerns were handled informally and never became a formal problem report; see [[Normalization of Deviance]]. A final trajectory correction that might have raised the approach was considered and not carried out.

The investigation board named the units error as the root cause and spent most of its report on contributing factors: ground software that was never verified against its specification, a small and stretched operations team, and communication between teams that relied on assumptions rather than checks; see [[Root Cause Analysis]] and [[Contract Testing]]. It was one of several failures that brought NASA's "faster, better, cheaper" approach under scrutiny, along with the Mars Polar Lander, lost three months later from an unrelated cause.

For testing, the lesson is that tests on each side of an interface can all pass while the system fails, because each side tests against its own assumption; see [[Integration Test]]. A number crossing a boundary without its unit is the weak point. Defenses include carrying units in data formats, rejecting files that don't match their specification, and type systems that treat newton-seconds and pound-force seconds as different types, as the F# language's units of measure do; see [[Type System]] and [[Data Cleaning]].

The same class of error shows up wherever units cross a boundary. Medication errors where milligrams are read as micrograms are a recurring hazard. In 1983 an Air Canada Boeing 767 ran out of fuel in flight after its fuel load was calculated in pounds instead of kilograms, and glided to a landing at a former air force base in Gimli, Manitoba; see [[Checklist]].

## See also
- [[Schiaparelli Lander Crash]]
- [[Interface definition language]]
- [[Space Shuttle Columbia Disaster]]
- [[Mariner 1]]
- [[Mars Polar Lander]]
- [[Apollo 13]]
- [[Gimli Glider]]
