---
aliases:
  - AI planning
  - STRIPS
tags:
  - agents
summary: The branch of artificial intelligence that finds sequences of actions leading from a starting state to a goal, using formal descriptions of what each action requires and changes, from the robot Shakey to game characters and logistics.
---
**Automated planning** is the branch of artificial intelligence concerned with finding a sequence of actions that achieves a goal. Given a description of the world's current state, a goal, and a set of possible actions, a planner searches for a plan: stack these blocks, move this robot, schedule these deliveries.

The classic formulation is **STRIPS**, created by Richard Fikes and Nils Nilsson at the Stanford Research Institute in 1971 for Shakey, a mobile robot. Each action has preconditions, facts that must be true before it can run, and effects, facts it adds or removes. Picking up a block requires the hand to be empty and the block to be clear; afterward, the hand holds the block. Everything not mentioned stays the same, a simplifying answer to a deep puzzle about how to represent what doesn't change; see [[Frame Problem]].

Planning is search. States are nodes, actions are edges, and a plan is a path from the start to any state satisfying the goal; see [[Graph Traversal]]. The number of states grows exponentially with the number of facts, and planning in this form is provably hard in general. Modern planners succeed through heuristics: they estimate distance to the goal by solving a relaxed version of the problem, for instance ignoring that actions can undo each other, and use the estimate to guide a search such as A*; see [[A-Star Search Algorithm]]. Others translate planning into logical satisfiability and hand it to fast solvers; see [[Boolean Satisfiability Problem]].

A standard language, PDDL, was introduced in 1998 for the International Planning Competition. **Hierarchical task networks** take another approach, decomposing high-level tasks into smaller ones using recipes supplied by experts.

Games adopted planning for characters. The 2005 shooter F.E.A.R. used a STRIPS-style planner so enemies could combine actions such as flanking and taking cover in ways designers hadn't scripted; see [[Game AI]]. Other games use planners where finite state machines become unmanageable; see [[Finite State Machine]].

Classical planning assumes a fully known world with predictable actions. Where outcomes are uncertain, the problem becomes one of choosing policies rather than fixed sequences; see [[Reinforcement Learning]] and [[Monte Carlo Tree Search]].

Language-model agents revived interest in planning. They can sketch plausible plans in prose, but studies have found them unreliable on formal planning benchmarks, especially when problems are disguised so memorized solutions don't apply. Many agent designs therefore plan loosely and correct course from feedback, or pair the model with a classical planner that checks its plans; see [[Agentic Loop]] and [[World Model]].

Planning shows a familiar asymmetry: logical problems that humans find hard often yield to search, while everyday physical skills remain difficult; see [[Moravec's Paradox]].

## See also
- [[Backtracking]]
- [[Constraint Propagation]]
