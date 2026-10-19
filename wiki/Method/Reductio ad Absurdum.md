---
aliases:
  - Proof by contradiction
tags:
  - method
summary: Refuting a claim by assuming it and deriving something absurd or contradictory from it, a move as old as Greek mathematics that powers proofs about primes, infinity, and computation and doubles as a tool of everyday argument.
---
**Reductio ad absurdum**, Latin for "reduction to absurdity," refutes a claim by assuming it's true and showing that it leads to something false, impossible, or self-contradictory. If the consequences can't hold, neither can the assumption. In mathematics the form is usually called **proof by contradiction**: to prove a statement, assume its opposite and derive a contradiction.

The move is ancient. Greek mathematicians used it to show that the square root of 2 can't be written as a fraction: assume it can, reduce the fraction to lowest terms, and both top and bottom turn out to be even, which contradicts lowest terms. The proof that there are infinitely many primes is usually presented the same way: suppose there's a largest one, multiply all the primes together and add 1, and the result has a prime factor not on the list; see [[Prime Number]]. Zeno of Elea built paradoxes that drew absurd conclusions from ordinary assumptions about motion and space.

Some of the most important results of modern mathematics and computing have this shape:

- **Different sizes of infinity.** Assume the real numbers can be listed, then build a number that differs from every entry; see [[Cantor's Diagonal Argument]].
- **Undecidability.** Assume a program could decide whether any program halts, then feed it a program built to do the opposite of whatever it predicts; see [[Halting Problem]].
- **Limits of formal systems.** Self-reference turns a system's own consistency into a source of statements it can't prove; see [[Gödel's Incompleteness Theorems]].
- **Naive set theory.** A set of all sets that don't contain themselves contains itself exactly when it doesn't; see [[Russell's Paradox]].

Not every mathematician accepts every use. Intuitionists, following L. E. J. Brouwer, reject proving that something exists merely by showing that its nonexistence leads to contradiction. They want a construction. Some proof assistants, which check proofs by machine, are built on this stricter logic; see [[Proof assistant]].

In ordinary argument, reductio means taking an opponent's principle and following it to a conclusion they would reject. It's fair when the steps are valid and the principle is stated accurately; see [[Steelmanning]]. It turns into a fallacy when the steps are speculative, as in claiming one small change will inevitably cascade into disaster; see [[Slippery slope]]. Thought experiments often work as reductios; see [[Thought Experiment]].

Science uses the same logic in softer form. A hypothesis is tested by deriving what it predicts and checking whether that happens. A failed prediction counts against it, though rarely as decisively as a contradiction does in mathematics; see [[Falsifiability]].

The method also helps in debugging: when the obvious explanation can't be confirmed directly, assume it and look for what else would have to be true; see [[Rubber Duck Debugging]].

## See also
- [[Abductive Reasoning]]
- [[Occam's Razor]]
- [[Scientific Method]]
- [[Socratic Method]]
