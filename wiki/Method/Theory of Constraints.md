---
aliases:
  - Bottleneck
  - Drum-buffer-rope
tags:
  - method
summary: Eliyahu Goldratt's management idea that every system's output is limited by a single bottleneck, so improving anything else is wasted until the constraint itself is found, exploited, and raised.
---
The **theory of constraints** is a management approach built on a simple observation: the output of any system that turns work into results is limited by its slowest step, the **bottleneck**. Improving any other step doesn't increase output; it just piles up work in front of the bottleneck. The Israeli physicist Eliyahu Goldratt set out the idea in *The Goal* (1984), a business book written as a novel about a plant manager rescuing a failing factory.

A useful picture is a chain, which is only as strong as its weakest link, or a hiking troop that can move no faster than its slowest hiker. In the novel, the fix is to put the slowest hiker at the front and lighten that hiker's pack.

Goldratt proposed five focusing steps:

1. **Identify** the constraint. In a factory it is usually where inventory piles up; in software it is often where work waits longest.
2. **Exploit** it: make sure the constraint never sits idle and only works on what matters, without spending money yet.
3. **Subordinate** everything else to it. Other steps should work at the constraint's pace, not their own, even if that means idle time elsewhere.
4. **Elevate** it, by adding capacity if exploiting isn't enough.
5. **Repeat.** Once raised, the constraint moves somewhere else, and the process starts over.

The third step is the counterintuitive one. Keeping every machine and person fully busy, which looks efficient, only increases work-in-progress, lengthens queues, and hides the real limit. Queueing theory backs this up: wait times climb steeply as any stage nears full utilization; see [[Queueing Theory]]. The scheduling method Goldratt derived, **drum-buffer-rope**, sets the pace by the constraint (the drum), keeps a small buffer of work in front of it so it never starves, and releases new work only as fast as the constraint can take it (the rope).

The ideas transfer directly to software delivery. If code review is the slowest step, writing code faster just grows the review queue; see [[Code Review]] and [[Pull Request]]. Limiting work in progress, a core rule of [[Kanban]], is subordination in practice. Measuring the time from commit to production often shows that waiting, not working, dominates; see [[DORA Metrics]] and [[Deployment Pipeline]].

Performance engineering is the same idea at a smaller scale. Speeding up code that isn't on the critical path changes nothing, which is why measuring comes before optimizing; see [[Profiling]] and [[Premature Optimization]]. [[Amdahl's Law]] gives the arithmetic: the part that can't be sped up caps the overall gain.

The theory has critics, who note that real systems often have shifting or multiple constraints, and that policy, not machinery, is often the real bottleneck. Goldratt agreed that policy constraints were the most common kind.

## See also
- [[Brooks's Law]]
- [[Pareto Principle]]
- [[Resource Starvation]]
