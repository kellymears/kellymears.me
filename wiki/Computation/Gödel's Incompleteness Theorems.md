---
aliases:
  - Incompleteness theorem
  - Gödel numbering
  - Hilbert's program
tags:
  - computation
summary: Kurt Gödel's 1931 proofs that any consistent formal system strong enough for arithmetic contains true statements it cannot prove, and cannot prove its own consistency.
---
**Gödel's incompleteness theorems** are two results in mathematical logic, published by Kurt Gödel in 1931, that set permanent limits on what formal systems can prove. A formal system here means a fixed set of axioms and rules of inference from which theorems are derived mechanically, with each proof checkable step by step.

- **First theorem.** Any consistent formal system that can express basic arithmetic contains statements that are true but can't be proved within the system.
- **Second theorem.** Such a system can't prove its own consistency, unless it is in fact inconsistent.

The theorems ended **Hilbert's program**, the early twentieth-century project, led by David Hilbert, to put all of mathematics on a complete and consistent set of axioms and prove that consistency by finite, mechanical means. Gödel showed that no single system could capture all mathematical truth, and that consistency couldn't be certified from inside.

The proof's central trick is **Gödel numbering**: encoding every symbol, formula, and proof as a number, so that statements *about* proofs become statements about numbers, which arithmetic can express. Gödel then constructed a sentence that says, in effect, "this sentence is not provable." If the system could prove it, it would prove something false, so a consistent system can't. Then the sentence is true and unprovable. The construction echoes the liar paradox, but replaces "true" with "provable", which turns a paradox into a theorem.

The same idea, a system turned back on itself, reappears throughout computing:

- **The [[Halting Problem]].** In 1936, Alan Turing used similar self-reference to show that no program can decide whether every program halts. Incompleteness and undecidability are closely related results; see [[Turing Completeness]].
- **[[Rice's theorem]]**, which follows from the halting problem, shows that no program can decide any interesting property of all programs' behavior, which is why [[Static Analysis]] always approximates.
- **[[Kolmogorov Complexity]].** Gregory Chaitin later showed that a formal system can't prove that any particular string has complexity much above the size of the system itself, another form of incompleteness.
- **Self-reference.** Programs that print their own source code and compilers that compile themselves use the same encoding trick; see [[Lambda Calculus]] and [[Recursion]].

The theorems don't make mathematics or formal methods useless. Unprovable statements are rare in everyday mathematics, and proof assistants routinely check large real proofs; see [[Formal Verification]]. A program's correctness can often be proved even though not every program's can.

They are also frequently misapplied. Claims that incompleteness proves minds aren't machines, that all knowledge is uncertain, or that legal systems must contain contradictions stretch a precise result about formal arithmetic far beyond its scope. The theorems apply to formal systems meeting specific conditions, not to arguments in general.

## See also
- [[P versus NP Problem]]
- [[Type System]]
- [[Falsifiability]]
- [[Dependent Types]]
- [[Quine]]
