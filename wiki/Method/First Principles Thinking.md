---
aliases:
  - First principles
  - Reasoning by analogy
tags:
  - method
summary: Reasoning up from basic facts that can't be reduced further rather than from convention or comparison, powerful for questioning inherited assumptions and costly when it discards knowledge the conventions held.
---
**First principles thinking** means breaking a problem down to the basic facts that can't be reduced further, then reasoning up from those, rather than starting from how things are usually done. Its opposite is **reasoning by analogy**: doing something because it resembles what worked before or what others do.

The term comes from Aristotle, who defined a first principle as the first basis from which a thing is known. Geometry is the model. Euclid derived hundreds of results from a handful of axioms, and René Descartes tried to rebuild all knowledge by doubting everything until he reached what he could not doubt.

The method works by separating facts from assumptions. A commonly told example is estimating a rocket's cost from the market price of its raw materials, which turns out to be a small fraction of the price of a finished rocket. The gap is made of habits, suppliers, and processes, and any of those can be questioned. Physicists use the same move when they estimate an answer from known quantities rather than looking it up; see [[Fermi Estimation]].

In technical work it shows up as questioning the request itself:

- **What is actually needed?** A requested feature often stands in for a different underlying goal; see [[XY Problem]].
- **Why does this happen?** Repeatedly asking why moves past the symptom to the cause; see [[Five Whys]] and [[Root Cause Analysis]].
- **What must be true?** Checking which requirements are physical or legal constraints and which are preferences someone once stated.

Its opposite is the [[Cargo Cult]], copying a practice's form without understanding it.

The costs are real:

- **Conventions hold knowledge.** A practice that has lasted often survives for reasons nobody wrote down. Before removing it, find out why it is there; see [[Chesterton's Fence]] and [[Lindy Effect]].
- **Rebuilding is expensive.** Starting from scratch throws away years of fixes for problems the newcomer hasn't met yet; see [[Not Invented Here]] and [[Second-System Effect]].
- **Working systems grow.** Complex systems that work usually evolved from simple ones that worked, rather than being designed whole; see [[Gall's Law]].
- **"Basic facts" are models.** What one treats as bedrock is often a simplification that holds only in a range; see [[Map and Territory]].

Reasoning by analogy is also not simply worse. Experienced practitioners recognize situations quickly from past cases, and that pattern-matching is often more reliable than fresh derivation under time pressure; see [[Expert Intuition]]. A practical balance is to work from analogy by default and from first principles when the stakes are high, the old approach is clearly failing, or the ground has changed, such as when a key cost drops by orders of magnitude.

Ideas reached this way still need testing against the world; see [[Falsifiability]].

## See also
- [[Inversion]]
- [[Thought Experiment]]
