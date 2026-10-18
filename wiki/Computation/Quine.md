---
aliases:
  - Self-replicating program
  - Self-reproducing program
  - Kleene's recursion theorem
tags:
  - computation
summary: A program that prints its own source code without reading it, a puzzle whose solution is the same trick behind Gödel's incompleteness proof and a famous compiler backdoor.
---
A **quine** is a program that prints its own source code exactly, without reading its own file or taking input. It sounds impossible: to print itself, the program must contain its own text, which must contain the printing code, which must contain the text again, without end. The puzzle has a standard solution, and it turns out to be a deep idea in computation.

The name comes from Douglas Hofstadter's 1979 book *Gödel, Escher, Bach*, honoring the philosopher W. V. O. Quine, who studied self-reference through sentences like "yields falsehood when preceded by its quotation" yields falsehood when preceded by its quotation.

The trick is to split the program into two parts:

- **Data.** A string holding a description of the code, with a placeholder where the string itself goes.
- **Code.** Instructions that print the string twice, once as a quoted literal and once as plain code.

Because the string is used both as text and as instructions, there is no infinite regress. The program doesn't contain a full copy of itself; it contains a description and a procedure for expanding it. Living cells do something similar, with DNA serving both as instructions for the copying machinery and as the thing copied, a parallel John von Neumann worked out abstractly in the 1940s while designing self-reproducing automata; see [[Cellular Automaton]].

Quines are guaranteed to exist. **Kleene's recursion theorem** (1938) shows that in any Turing-complete language a program can obtain its own description and use it, so a quine can always be written; see [[Turing Completeness]]. The same construction appears in Gödel's proof, which builds a statement that refers to itself, and in the proof that halting is undecidable, which feeds a program its own code; see [[Gödel's Incompleteness Theorems]] and [[Halting Problem]].

Self-reference has practical consequences. In his 1984 lecture "Reflections on Trusting Trust," Ken Thompson described a compiler modified to insert a backdoor when compiling the login program, and to reinsert its own modification when compiling the compiler. After one round the backdoor disappears from all source code but survives in every binary. The defense is to rebuild compilers in independent ways and compare the outputs; see [[Compiler]] and [[Reproducible Build]].

Quines are also a sport. Programmers write them in every language, chase the shortest possible ones, and build stranger variants, such as a program that prints a program in another language, which prints another, cycling through over a hundred languages before returning to the original. They are a staple of [[Esoteric Programming Language]] communities.

A quine's output has a short description, its own source, which bounds its complexity in the sense of [[Kolmogorov Complexity]]. Computer viruses use the same structure to copy themselves, so the theory of self-reproduction is also a theory of malware.

## See also
- [[Recursion]]
- [[Lambda Calculus]]
- [[Interpreter]]
