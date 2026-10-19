---
aliases:
  - Lehman's laws
  - Laws of software evolution
  - E-type software
tags:
  - delivery
summary: Meir Lehman's observations, from studying IBM's OS/360 in the 1970s, that software used in the real world must keep changing, grows more complex unless work is spent against it, and declines in quality if left alone.
---
**Lehman's laws of software evolution** are a set of observations about how long-lived software changes over time, proposed by Meir "Manny" Lehman. They began with his study, with László Bélády, of successive releases of IBM's OS/360 operating system in the early 1970s, and grew to eight laws by 1996.

The laws apply to what Lehman called **E-type** software, programs embedded in the real world and used for real tasks. He contrasted these with S-type programs, which solve a fully specified problem, such as sorting a list, and can be finished. An E-type program can never be finished, because using it changes the world it is part of, which changes what it is asked to do.

The eight laws, in short:

1. **Continuing change.** A program in use must be adapted continually, or it becomes progressively less satisfactory.
2. **Increasing complexity.** As a program evolves its complexity grows, unless work is done specifically to reduce it; see [[Technical Debt]] and [[Refactoring]].
3. **Self-regulation.** The evolution process is self-regulating, with measures such as release size following statistical patterns over time.
4. **Conservation of organizational stability.** The average rate of effective work on a system stays roughly constant over its life, regardless of resources added; see [[Brooks's Law]].
5. **Conservation of familiarity.** Each release can contain only so much new material, because everyone involved has to understand it, so release sizes stay roughly constant.
6. **Continuing growth.** Functionality must keep growing to keep users satisfied.
7. **Declining quality.** Quality appears to decline unless the system is rigorously maintained and adapted to its changing environment.
8. **Feedback system.** Evolution is a feedback process with many loops and agents, and must be treated as one to be improved; see [[Feedback Loop]].

The second and seventh laws are the ones most often quoted. Together they say software decays without anyone touching it badly: the environment moves, requirements drift, and each change made under deadline adds a little complexity. The decline is the default and resisting it takes deliberate, ongoing effort, much as order in a physical system takes energy to maintain; see [[Entropy]] and [[Broken Windows Theory]].

The laws were drawn from a small number of large, mostly commercial systems, and later studies of open source projects found exceptions. Some projects grew faster than the laws predicted, sustained by many contributors. The laws are best read as tendencies, not as physics.

They also explain several familiar temptations. A system grown complex enough invites starting over, which usually costs more than expected because the old system's knowledge was in its accumulated changes; see [[Big Rewrite]] and [[Second-System Effect]]. The usual alternative is to replace it piece by piece while it keeps running; see [[Strangler Fig Pattern]].

## See also
- [[Hyrum's Law]]
- [[Conway's Law]]
- [[Ship of Theseus]]
- [[Mainframe]]
