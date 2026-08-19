---
aliases:
  - Compilation
tags:
  - computation
summary: A program that translates source code into another form, ahead of running it, checking it along the way.
---
**Compiler** translates a program from one language into another — typically source code into machine code or bytecode — before the program runs, as a distinct step from execution. This "ahead of time" property is the definitional contrast with an [[Interpreter]], which reads and executes source directly, one step at a time, without producing a separate translated artifact first.

A compiler's pipeline is usually lexing (characters into tokens), parsing (tokens into an abstract syntax tree), semantic analysis (type checking, scope resolution — the phase that catches most of what a reader thinks of as "compiler errors"), optimization (rewriting the tree or an intermediate representation into an equivalent but faster form), and code generation (emitting the target language). Each phase can reject the program before ever reaching the next one, which is why a compiled language tends to catch entire classes of bugs — a misspelled variable, a type mismatch, a missing case in a [[Pattern Matching]] match — before a single instruction runs, unlike an interpreted script that fails only when execution reaches the bad line.

The line between compiler and interpreter has blurred in practice: most production JavaScript and Java runtimes use a JIT (just-in-time) compiler, which starts by interpreting bytecode and compiles the hot paths to native code partway through execution, getting an interpreter's fast startup and a compiler's steady-state speed. TypeScript compiles to JavaScript rather than machine code — a "transpiler," informally — but does the same essential job: translate ahead of running, and reject what doesn't type-check along the way.

The trade-off a compiler imposes is a build step between writing code and seeing it run, which costs iteration speed compared to an interpreter's immediate feedback — the reason a scripting language is often preferred for exploratory work and a compiled one for anything shipped, even when both are available for the same problem.

## See also
- [[Interpreter]]
- [[Type Inference]]
- [[Pattern Matching]]
- [[Garbage Collection]]
