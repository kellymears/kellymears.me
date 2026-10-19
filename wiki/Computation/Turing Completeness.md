---
aliases:
  - Turing complete
  - Turing machine
  - Church-Turing thesis
  - Accidental Turing completeness
  - Rule of least power
tags:
  - computation
summary: The property of being able to compute anything any computer can, given enough memory, reached by surprisingly little machinery and sometimes by accident.
---
A system is **Turing complete** if it can compute anything a Turing machine can, which, as far as anyone knows, means anything any computer can compute, given enough time and memory. The *Church–Turing thesis* holds that Turing machines, [[Lambda Calculus]], and every other reasonable model of computation proposed since are equally powerful. All mainstream programming languages are Turing complete, so in principle any of them can express any program, though not equally conveniently or efficiently.

The bar is low. A system needs some way to store an unbounded amount of state, and some way to make decisions and repeat, through conditional branching plus loops or [[Recursion]]. Remove either and the system becomes strictly weaker: a [[Finite State Machine]] has bounded memory, and pure [[Regular Expression]] matching can't count matched parentheses.

Because the requirements are so modest, many systems are Turing complete by accident:

- **Cellular automata.** Conway's Game of Life and the one-dimensional Rule 110 can both simulate a computer. See [[Cellular Automaton]].
- **Games.** Minecraft redstone circuits and the logic networks of [[Factory Game]] titles are used to build working processors. A 2019 paper showed a game of *Magic: The Gathering* can encode a Turing machine, and some console games can be made to execute arbitrary code, a technique speedrunners exploit (see [[Speedrun]]).
- **Software that wasn't meant to compute.** C++ templates, PowerPoint animations, the x86 `mov` instruction alone, and spreadsheets with `LAMBDA` functions have all been shown to be Turing complete.

Accidental completeness has costs, and it inherits the [[Halting Problem]]. If a configuration language is Turing complete, a configuration file can loop forever, and no tool can check in general what it will do. Template systems, build files, and [[Infrastructure as Code]] languages that grow conditionals and loops become programs in disguise, harder to analyze and easier to exploit. Ethereum smart contracts are Turing complete, so every operation costs gas, a budget that guarantees each run halts.

This motivates the **rule of least power**, articulated by Tim Berners-Lee: choose the least powerful language that does the job. Data formats like JSON and HTML are deliberately not programming languages, so they can be parsed, validated, and transformed safely. A declarative description that can't loop can always be checked, compared, and optimized, much as [[Static Analysis]] works best on restricted code.

Turing completeness also underlies [[Emulation]]: any complete system can, given enough resources, imitate any other, which is why one computer can run software written for another, and why an [[Interpreter]] can run any program its language allows.

## See also
- [[Stack Machine]]
- [[Context-Free Grammar]]
- [[Analytical Engine]]
