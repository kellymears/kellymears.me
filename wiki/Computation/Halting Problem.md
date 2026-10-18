---
aliases:
  - Undecidability
  - Undecidable problem
  - Entscheidungsproblem
  - Busy beaver
tags:
  - computation
summary: Turing's proof that no program can decide, for every program and input, whether it will finish or run forever, the founding limit of computation.
---
The **halting problem** asks whether there is a general procedure that can look at any program and its input and decide whether the program eventually stops or runs forever. In 1936 Alan Turing proved there isn't. It was one of the first results to show that some well-defined questions can't be answered by any algorithm, no matter how clever or how much time it is given.

Turing was answering the *Entscheidungsproblem*, posed by David Hilbert in 1928: is there a mechanical method for deciding whether any mathematical statement is provable? To make "mechanical method" precise, Turing invented the abstract machine now named after him. Alonzo Church reached the same negative answer months earlier using [[Lambda Calculus]], and the two formalisms turned out to be equivalent, the basis for the idea of [[Turing Completeness]].

The proof is short and self-referential. Suppose a program `halts(p, x)` always correctly answers whether program `p` halts on input `x`. Build a new program that takes a program `p`, asks `halts(p, p)`, and then does the opposite: loops forever if the answer is yes, stops if the answer is no. Now run that program on itself. If it halts, it must loop, and if it loops, it must halt. The contradiction means `halts` can't exist. The trick, *diagonalization*, echoes Georg Cantor's proof that some infinities are larger than others and Kurt Gödel's incompleteness theorems.

The consequences reach far into everyday software:

- **No perfect analyzer.** Rice's theorem generalizes the result: every nontrivial question about what a program does is undecidable. That is why [[Static Analysis]] tools must accept false alarms or missed bugs, and why [[Formal Verification]] needs human-written proofs or restricted models.
- **No perfect virus scanner.** Deciding whether arbitrary code is malicious is undecidable, so detection relies on signatures and heuristics.
- **Conservative approximations.** [[Garbage Collection]] frees memory that is unreachable rather than memory that will never be used again, because the second question is undecidable.
- **Timeouts.** Since nobody can tell whether a long computation will finish, practical systems impose limits. An [[Agentic Loop]] gets a step cap, and a [[Circuit Breaker]] gives up on a slow call.

Undecidability applies to the general case. For restricted models, such as a [[Finite State Machine]] or a program limited to a fixed amount of memory, halting can be decided in principle. That is one reason simpler models, like [[Regular Expression]] matching without extensions, are easier to reason about. The *busy beaver* function, the longest any halting machine of a given size can run, grows faster than any computable function. Its fifth value was only settled in 2024, by a collaborative proof checked by machine.

## See also
- [[Ackermann Function]]
- [[Abstract Interpretation]]
- [[Collatz Conjecture]]
- [[Cantor's Diagonal Argument]]
- [[Symbolic Execution]]
- [[Gödel's Incompleteness Theorems]]
