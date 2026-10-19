---
aliases:
  - Static single assignment
  - SSA
  - LLVM
  - Control-flow graph
tags:
  - computation
summary: The internal language a compiler translates source code into between parsing and code generation, designed to be easy to analyze and optimize, and the reason one compiler back end can serve many source languages and many processors.
---
An **intermediate representation**, or **IR**, is the form a program takes inside a compiler after the source has been parsed and before machine code is produced. Neither the source language nor the target machine's instructions are convenient for analysis. Source code is full of syntax meant for humans, and machine code is tied to one processor's registers and quirks. An IR sits between them, simple and regular enough that optimization passes can reason about it; see [[Compiler]] and [[Abstract Syntax Tree]].

A common design is **three-address code**, a list of small instructions each doing one operation, such as adding two values and storing the result in a temporary. Instructions are grouped into basic blocks, straight runs with no jumps in or out except at the ends, and the blocks are connected into a **control-flow graph** showing every path execution might take. Many analyses walk this graph: which variables are still needed at each point, which code can never run, which values never change; see [[Graph Traversal]] and [[Static Analysis]].

**Static single assignment** form, developed at IBM in the late 1980s, adds one rule: every variable is assigned exactly once. A variable assigned in a loop becomes a series of distinct versions. Where control-flow paths merge, a special phi function picks whichever version arrived. The rule makes many optimizations simpler and faster, because each use of a variable points to exactly one definition. Most modern optimizing compilers use SSA internally. Assigning SSA values to a limited set of machine registers later becomes a graph coloring problem; see [[Graph Coloring]].

The biggest practical payoff is reuse. Without a shared IR, supporting M languages on N processors means writing M times N compilers. With one, it's M front ends that translate into the IR and N back ends that translate out. **LLVM**, begun by Chris Lattner and Vikram Adve at the University of Illinois around 2000, made this concrete: its typed SSA-based IR is the target of front ends for C, C++, Swift, Rust and many others, and every one of them benefits from the same optimizer.

Some IRs are meant to travel. Java bytecode and .NET's intermediate language are shipped to users and translated to machine code at run time; see [[Just-in-Time Compilation]] and [[Stack Machine]]. WebAssembly plays a similar role in browsers; see [[WebAssembly]]. These portable forms trade some optimization opportunity for running anywhere.

Real compilers often use several IRs in sequence, each lower-level than the last, since some optimizations are easiest close to the source's structure and others close to the machine. Designing an IR is a balance between keeping enough information, such as types and loop structure, to optimize well, and discarding enough detail to stay simple; see [[Interpreter]] and [[Type System]].

## See also
- [[Compiler Bootstrapping]]
- [[Lexical Analysis]]
- [[Von Neumann Architecture]]
