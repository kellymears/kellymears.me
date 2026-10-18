---
aliases:
  - Macro
  - Hygienic macro
  - Code generation
  - Template metaprogramming
tags:
  - computation
summary: Programs that write or modify programs, through macros, code generators, templates, or runtime reflection, which removes repetition at the cost of code that is harder to read and debug.
---
**Metaprogramming** is writing programs that write, inspect, or modify other programs, often themselves. The term usually means code within an ordinary project that generates or transforms code, so a pattern is described once instead of repeated.

It happens at different moments:

- **Before compiling.** **Code generation** produces source files from a description, such as client libraries from an API schema or data classes from a database. The C preprocessor works on raw text, substituting macros before the compiler sees the code, which is powerful and notoriously error-prone, since it knows nothing about the language's structure.
- **During compiling.** **Macros** in languages such as Lisp, Rust, and Scala run inside the compiler, receive code as a syntax tree, and return new code; see [[Abstract Syntax Tree]]. C++ templates turned out, by accident, to be a complete programming language evaluated at compile time; see [[Turing Completeness]] and [[Generics]].
- **At runtime.** Dynamic languages let a program inspect and change its own classes and methods while running, defining methods on the fly or intercepting calls to methods that don't exist; see [[Reflection]] and [[Duck Typing]].

Lisp made the idea central. Because Lisp code is written as the language's own lists, a macro is just a function from lists to lists, and programmers routinely extend the language with new control structures; see [[Lisp]]. Early Lisp macros had a subtle flaw: a variable introduced by the macro could collide with one of the same name where it was used. **Hygienic macros**, developed for Scheme in the 1980s, rename such variables automatically.

Uses:

- **Removing boilerplate.** Generating serialization, equality, and comparison code for data types, or database access methods from a schema; see [[Object-Relational Mapping]].
- **Domain-specific languages.** Build files, test frameworks, and configuration languages that read almost like prose are often macros or clever method calls underneath.
- **Performance.** Generating specialized code for each case at build time, or at runtime with [[Just-in-Time Compilation]], avoids the overhead of general code. **Partial evaluation** specializes a program for some known inputs; applying it to an [[Interpreter]] with a fixed program yields, in effect, a compiled program.

The costs are about understanding. Code that writes code is harder to read, because the program that runs isn't the program on screen. Error messages point into generated code, debuggers step through lines nobody wrote, and editors and analysis tools may not understand what a macro produces. Heavy runtime metaprogramming can hide where a method is even defined. Many teams therefore treat it as a last resort, reaching for functions and types first and for metaprogramming only when repetition becomes the larger risk.

A program that does nothing but reproduce itself is the limiting case; see [[Quine]]. Treating code as data also runs through [[Lambda Calculus]], where functions are the only values.

## See also
- [[Assembly Language]]
- [[Higher-Order Function]]
- [[Lexical Scope]]
