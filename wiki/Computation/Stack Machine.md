---
aliases:
  - Register machine
  - Stack-based virtual machine
tags:
  - computation
summary: A processor or virtual machine whose instructions take their operands from a stack instead of naming registers, a design that lost out in hardware but became the standard format for portable bytecode.
---
A **stack machine** is a processor or virtual machine whose instructions find their operands on a stack rather than in named locations. To add two numbers, a program pushes both onto the stack and then issues a single add instruction, which pops the top two values and pushes their sum. The alternative is a **register machine**, whose instructions name where to get each operand and where to put the result, as in "add register 1 to register 2 and store the result in register 3."

The difference shows in how expressions are written. The expression (2 + 3) × 4 becomes push 2, push 3, add, push 4, multiply. This is reverse Polish notation, the order used by some classic calculators, and it falls directly out of walking the expression's tree and emitting each operator after its operands; see [[Abstract Syntax Tree]]. A compiler targeting a stack machine is correspondingly simple to write; see [[Compiler]].

Stack machines have a long history in hardware. Burroughs mainframes of the 1960s were built around a stack, and small stack-based processors have appeared repeatedly since, partly because the design needs little circuitry. Most general-purpose processors, though, became register machines; see [[Assembly Language]]. Registers keep frequently used values in the fastest storage and make it easier to run independent operations in parallel, and deciding which values live in which registers became a central compiler problem; see [[Graph Coloring]].

The idea thrived instead in virtual machines. The Java Virtual Machine, the .NET runtime, CPython's interpreter, and WebAssembly all use stack-based instruction sets; see [[WebAssembly]]. Stack code is compact, since instructions don't need to name operands, which matters for code sent over a network. It's also easy to generate and easy to check: a verifier can confirm before running that every instruction will find the right number and type of values on the stack.

Performance is a mixed story. A simple interpreter for stack code spends much of its time shuffling values on and off the stack, and a 2005 study found that a register-based design ran the same programs with far fewer executed instructions, though each instruction was larger; see [[Interpreter]]. Lua's virtual machine switched to registers in 2003 for similar reasons. Fast runtimes, though, translate stack code into register-based machine code anyway, so for them the stack is mostly a convenient format for shipping programs; see [[Just-in-Time Compilation]].

The operand stack is distinct from the call stack that holds function frames, though many machines keep both; see [[Call Stack]]. Some languages expose the stack directly, most famously Forth and the page description language PostScript. Deliberately strange languages favor stacks as well, since a few stack operations suffice for general computation; see [[Turing Completeness]].

## See also
- [[Von Neumann Architecture]]
- [[Esoteric Programming Language]]
- [[Lisp]]
- [[Intermediate Representation]]
