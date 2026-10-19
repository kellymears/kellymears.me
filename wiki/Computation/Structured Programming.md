---
aliases:
  - Goto considered harmful
  - Spaghetti code
tags:
  - computation
summary: The discipline of building programs only from sequence, choice, and loops instead of arbitrary jumps, argued for by Dijkstra in 1968, which won so completely that its rules now look like the only way to write code.
---
**Structured programming** is the practice of building programs from a small set of control structures: steps in sequence, choices with if and else, and loops, each with one entry and one exit. It replaced the unrestricted use of jumps, the `goto` statement, that dominated early programming. The victory was so complete that most programmers today have never seen the style it replaced.

Early languages like Fortran and assembly relied on jumps to labeled lines. Programs grew into tangles in which control could leap from anywhere to anywhere, called **spaghetti code**. Understanding one line meant knowing every path that might lead to it.

In 1966 Corrado Böhm and Giuseppe Jacopini proved that sequence, selection, and iteration are enough to express any computable function, so jumps were never necessary. In 1968 Edsger Dijkstra published a letter that the editor, Niklaus Wirth, titled "Go To Statement Considered Harmful." Dijkstra argued that a program's text should reveal how it runs: with structured control, the position in the code tells you where you are in the computation. The title spawned countless imitations, "considered harmful" becoming a stock phrase.

The argument was partly about proof. With single-entry, single-exit blocks, each piece can be reasoned about on its own, and a loop's correctness argued with an invariant; see [[Loop Invariant]] and [[Formal Verification]]. Measures of complexity count the paths through code for the same reason; see [[Cyclomatic Complexity]].

The debate was heated. In 1974 Donald Knuth published "Structured Programming with go to Statements," showing cases where jumps produced clearer or faster code, such as escaping from nested loops. Languages answered by adding constrained jumps: `break`, `continue`, early `return`, and later exceptions, which exit many levels at once in a disciplined way; see [[Exception Handling]]. C kept `goto`, and the Linux kernel uses it in a narrow pattern for jumping to cleanup code when an error occurs.

Structured programming sits under nearly everything that followed. Procedures with their own local variables rely on the [[Call Stack]]; see [[Recursion]]. Compilers parse these structures into trees rather than flat lists of jumps; see [[Abstract Syntax Tree]]. Object-oriented and functional programming both assume it; see [[Object-Oriented Programming]].

The idea keeps getting applied to new kinds of control. Unstructured concurrency, where a function starts a background task that outlives it, causes the same problems jumps did: you can't tell from the code when work finishes or where its errors go. **Structured concurrency**, described in a 2018 essay titled "Go Statement Considered Harmful," requires that tasks started inside a block finish before the block exits; see [[Coroutine]] and [[Concurrency and Parallelism]].

Some code still benefits from explicit jumps: state machines, interpreters, and generated code; see [[Finite State Machine]] and [[Continuation]].

## See also
- [[Software Crisis]]
- [[Tail Call Optimization]]
- [[Esoteric Programming Language]]
