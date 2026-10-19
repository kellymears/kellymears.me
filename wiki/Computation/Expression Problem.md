---
aliases:
  - Visitor pattern
  - Open classes
  - Extension method
tags:
  - computation
summary: The long-standing design tension, named by Philip Wadler in 1998, of making a program easy to extend with both new kinds of data and new operations on that data, without modifying or recompiling existing code and without giving up type safety.
---
The **expression problem** asks how to structure a program so that it can be extended in two directions: adding new kinds of data, and adding new operations on that data. The goal is to do both without editing existing code and while keeping static type checking. Philip Wadler named the problem in a 1998 mailing-list post, using the example of a small expression language, though the tension had been described decades earlier.

Picture a table. The rows are data variants: for an expression language, numbers, additions and multiplications. The columns are operations: evaluate, print, simplify. Every cell needs code. The question is which direction the table can grow cheaply.

**Object-oriented** languages organize the table by rows. Each variant is a class, and each class implements every operation as a method. Adding a new variant is easy: write one class with all its methods. Adding a new operation is hard: every existing class must gain a method, and code that can't be modified, such as a library, can't be extended; see [[Object-Oriented Programming]] and [[Dynamic Dispatch]].

**Functional** languages with algebraic data types organize the table by columns. The variants are listed in one type definition, and each operation is a function that pattern-matches over all of them. Adding an operation is easy: write one function. Adding a variant is hard: every existing function needs a new case, and the compiler will flag each one; see [[Algebraic Data Type]] and [[Pattern Matching]].

Neither is wrong; each makes one kind of change cheap. Compilers, for example, have a fairly fixed set of syntax node types and an ever-growing list of passes over them, which favors the functional layout; see [[Abstract Syntax Tree]] and [[Compiler]]. Graphical interfaces add widget types far more often than operations, which favors objects.

Many techniques try to get both. The **visitor pattern** lets object-oriented code add operations without touching the classes, but in doing so it makes adding variants hard again, swapping one problem for the other. **Multiple dispatch**, as in Julia or Common Lisp, chooses a method based on the runtime types of all arguments, so new methods and new types can both be defined separately; see [[Polymorphism]]. **Type classes** in Haskell and **traits** in Rust let new operations be attached to existing types, and some languages allow extension methods or reopening classes. Each approach has costs, in type safety, in ambiguity when two extensions collide, or in the ability to compile modules separately; see [[Type Inference]] and [[Generics]].

The problem is a useful lens beyond language design. Choosing an architecture often means guessing which axis will change more, and an interface stable in one direction tends to be brittle in the other; see [[Lambda Calculus]] and [[Duck Typing]].

## See also
- [[Covariance and Contravariance]]
- [[Monad]]
- [[Fold]]
