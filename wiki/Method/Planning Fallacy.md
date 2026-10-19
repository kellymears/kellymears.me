---
aliases:
  - Optimism bias
  - Reference class forecasting
  - Outside view
  - Inside view
tags:
  - method
summary: The tendency to underestimate how long our own plans will take even when we know similar tasks ran late, and the outside-view technique that corrects it.
---
The **planning fallacy** is the tendency to predict that a task will take less time, money, and effort than it actually does, even when we know that similar tasks have overrun before. Daniel Kahneman and Amos Tversky named it in 1979. Its odd feature is that experience doesn't cure it. People who freely admit that their past projects ran late still predict the next one will be on time.

In a well-known 1994 study, students estimated when they would finish their theses. Asked for a realistic date, fewer than a third finished by it. Asked for a date by which they were 99% sure to finish, fewer than half made that one either. Large projects show the same pattern at scale. Public infrastructure overruns are so common that some governments now require forecasts to be adjusted upward by default.

The cause is how we build estimates. We picture the specific steps of this plan, the *inside view*, and imagine them going roughly as intended. The scenario leaves out the interruptions, illnesses, unclear requirements, rework, and dependencies that nobody can predict individually but that almost always appear somewhere. Optimism and motivation add to it: estimates are often made by the people who want the project approved. [[Anchoring Effect]] keeps later revisions close to the first number, and in software the same gap is captured by [[Hofstadter's Law]], which says a task takes longer than expected even when you account for that law.

The best-supported correction is **reference class forecasting**, also called taking the *outside view*. Instead of building up from this plan's details, start from how long similar projects actually took, then adjust for what makes this one different. It's the same move as respecting the base rate in the [[Base Rate Fallacy]]. A team that has shipped twenty features can look at how long they really took, not how long they were estimated to take.

Other practical defenses:

- **Break work down, then add buffer.** Small tasks are easier to estimate, though the sum still misses the integration work between them.
- **Estimate in ranges.** A best case and a likely case expose uncertainty a single number hides, and [[Fermi Estimation]] helps sanity-check scale.
- **Run a [[Pre-mortem]].** Imagining the project has failed surfaces risks the inside view leaves out.
- **Ship smaller.** A [[Minimum Viable Product]] limits how much can go wrong before feedback.

Adding people late rarely saves a late project, as [[Brooks's Law]] warns, and work also expands to fill whatever time is given, per [[Parkinson's Law]]. For individuals, especially people with ADHD, the difficulty of feeling how long things take is described in [[Time Blindness]].

## See also
- [[Burndown Chart]]
- [[Spiral Model]]
- [[Sinking of the Vasa]]
- [[Time Perception]]
- [[Delphi Method]]
- [[Superforecasting]]
