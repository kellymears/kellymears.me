---
aliases:
  - Tree-walking interpreter
tags:
  - computation
summary: A program that executes source code directly, statement by statement, without a separate translation step first.
---
**Interpreter** runs a program by reading and executing its source (or a lightly-processed form of it) directly, one construct at a time, rather than translating the whole program into another language first as a [[Compiler]] does. Python's default implementation, CPython, compiles source to bytecode internally, but that bytecode is then interpreted by a virtual machine rather than turned into native machine code, which is why Python is conventionally called an interpreted language even though a compilation phase technically happens.

The practical consequence is the read-eval-print loop: an interpreter can execute a single expression and show its result immediately, with no separate build artifact to produce first, which is what makes a shell like Python's REPL, a browser's JavaScript console, or a Lisp top-level useful for exploration — type an expression, see the value, without a compile-link-run cycle in between.

The cost is speed: re-parsing and re-dispatching on each statement every time it runs is slower than executing pre-translated machine code, which is why performance-sensitive interpreted languages add a JIT compiler that watches which code paths run often and compiles just those to native code mid-execution — V8 (Chrome's and Node's JavaScript engine) and the JVM's HotSpot both work this way, straddling the interpreter/compiler line rather than sitting cleanly on one side.

An interpreter also changes where errors surface: a type or name error in a branch that never executes can go completely unnoticed in an interpreted language (syntax errors are still caught up front, since the whole file gets parsed), since nothing inspects code that isn't reached, whereas a compiler that does full static analysis ahead of time would catch a type error in dead code before the program ever ran. This is one reason dynamically typed interpreted languages lean more heavily on [[Code Coverage|test coverage]] — the interpreter offers no static safety net for the paths tests don't exercise.

## See also
- [[Compiler]]
- [[Type Inference]]
- [[Event Loop]]
- [[Garbage Collection]]
