---
aliases:
  - Ninety-ninety rule
  - Last ten percent
tags:
  - method
summary: The joke that the first 90 percent of a project takes 90 percent of the time and the last 10 percent takes the other 90 percent, a fair description of how finishing work hides from estimates.
---
The **ninety-ninety rule** says that the first 90 percent of the code accounts for the first 90 percent of the development time, and the remaining 10 percent of the code accounts for the other 90 percent. The arithmetic adds up to 180 percent, which is the joke. It is attributed to Tom Cargill of Bell Labs and was popularized by Jon Bentley's "Programming Pearls" column in 1985.

The rule describes something real: the end of a project contains work that nobody counted at the start. Early progress is fast and visible, because the main path through a feature is the part everyone pictured. The remainder is made of things that only appear once the main path works:

- **Edge cases.** Empty inputs, huge inputs, odd characters, slow networks, and the user who clicks twice; see [[Defensive Default]].
- **Integration.** Pieces that worked alone fail together, and the joins need work nobody assigned.
- **Polish.** Error messages, loading states, accessibility, and the small inconsistencies that make software feel unfinished.
- **Operations.** Deployment, monitoring, migrations, documentation, and the support questions from the first real users; see [[Observability]].

Each is small enough to leave off the estimate, and together they rival the main work. The tail of a project behaves like a long tail of small items, where no single item matters but the sum dominates; see [[Pareto Principle]].

Several other effects compound it. People estimate from the best case and underweight the obstacles they will meet; see [[Planning Fallacy]]. Even knowing this does not fully correct it; see [[Hofstadter's Law]]. Teams report progress by what fraction of features exist, which stays near 90 percent for a long time, so status reports lose their meaning near the end. Adding people at that stage tends to slow things further; see [[Brooks's Law]].

Practical responses:

- **Define done.** Agree in advance what finished means, including tests, docs, and deployment, so the last 10 percent is in the estimate rather than discovered.
- **Build end to end early.** A thin working version of the whole path, deployed early, exposes integration and operations work while there is still time; see [[Minimum Viable Product]] and [[Gall's Law]].
- **Measure what's left, not what's done.** Track remaining known work and how fast new work appears, since a backlog that grows as fast as it shrinks means the end is not near.
- **Cut scope deliberately.** When time runs out, choose which tail items to drop instead of letting them drop silently; see [[Feature Creep]].

Recognizing the pattern doesn't make the tail shorter, but it makes it less of a surprise, and keeps unfinished edges from being shipped as [[Technical Debt]] by accident.

## See also
- [[Software Crisis]]
- [[Cone of Uncertainty]]
- [[Definition of Done]]
- [[Walking Skeleton]]
- [[Burndown Chart]]
