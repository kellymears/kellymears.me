---
aliases:
  - Branching strategy
tags:
  - delivery
summary: The convention governing what branches exist, what they mean, and how work reaches production.
---
A **branching model** is the agreed answer to what branches a project has, what each means, and how a change travels from a working copy to production. It is a social convention rather than a technical constraint — the tool permits nearly anything.

The main families are long-lived release branches with staged promotion, which suit software shipped in versions to customers who upgrade on their own schedule; and [[Trunk-Based Development]], where everything merges to one integration branch continuously, which suits software deployed constantly.

What matters more than the choice is that the model is *stated and current*. A stale model is a specific and expensive hazard: documentation naming an integration branch that has since been superseded sends people to branch from something that no longer receives changes, and the resulting work merges badly or not at all. When an integration branch changes, every reference to it — documentation, tooling configuration, continuous-integration conditions — has to change too, and the ones that do not fail quietly. See [[Documentation Rot]] and [[Silent Failure]].

The model also determines what a merge means and therefore what history looks like; see [[Squash Merge]] and [[Merge Train]].

## See also
- [[Trunk-Based Development]]
- [[Pull Request]]
- [[Continuous Integration]]
- [[Version Control]]

## Related
- [[Three-Way Merge]]
- [[Semantic Conflict]]
