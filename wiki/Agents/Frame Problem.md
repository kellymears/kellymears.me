---
aliases:
  - Qualification problem
  - Ramification problem
tags:
  - agents
summary: The puzzle of how a reasoning system can know what doesn't change when it acts, first a technical problem in logic-based AI and then a broader question about how any mind decides what's relevant.
---
The **frame problem** is the difficulty of representing what stays the same when something happens. If a robot paints a box red, the box's color changes. Its position doesn't, nor does the weather, the time zone, or the color of every other object in the world. People never think about those non-changes. A system reasoning in formal logic has to be told about each one, or it can't conclude that anything persists.

John McCarthy and Patrick Hayes named the problem in 1969, working in a logical formalism for actions and their effects. Stating explicitly that each action leaves each unrelated fact unchanged requires a separate axiom for every pair, and the number of these frame axioms explodes as the world grows; see [[Combinatorial explosion]]. Early symbolic AI depended on hand-written logical knowledge, so this was a real obstacle; see [[Expert System]].

Several technical solutions followed:

- **Default persistence.** The STRIPS planner, from 1971, simply assumed that anything an action didn't mention stayed the same.
- **Nonmonotonic logic.** New formalisms allowed conclusions to be drawn by default and withdrawn later, so persistence could be assumed unless contradicted.
- **Compact axioms.** Later work showed how to describe what changes for each fact in a single statement, avoiding the explosion.

Two related puzzles came along. The **qualification problem** is that an action's preconditions never end: a car starts if there's fuel, unless the battery is dead, unless there's a potato in the tailpipe. The **ramification problem** is that actions have indirect effects: moving a box also moves everything on it.

Philosophers broadened the frame problem into a question about relevance. Daniel Dennett, in a 1984 essay, described robots that fail to rescue their battery from a room with a bomb because they either overlook a side effect or get lost deducing irrelevant ones. The deeper question is how any intelligent system decides what to ignore, a puzzle that echoes how hard everyday common sense proved for machines; see [[Moravec's Paradox]].

Humans seem to solve it with expectation instead of deduction. Perception and thought run on predictions of what normally happens, attending to surprises; see [[Predictive Processing]] and [[Mental Model]].

Large language models sidestep the logical version by absorbing common sense statistically from text; see [[Large Language Model]]. The practical version still bites agents. A coding agent must track which files its edit affected and which still hold, and long tasks drift when a model loses track of the current state; see [[Agentic Loop]] and [[Context Rot]]. Deciding what belongs in a model's limited context is itself a relevance problem; see [[Context Engineering]].

Systems that learn a predictive model of their environment address the same question from another direction; see [[World Model]].

## See also
- [[Dartmouth Workshop]]
- [[Agent Memory]]
- [[Automated Planning]]
