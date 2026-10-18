---
aliases:
  - S-expression
  - Homoiconicity
  - Lisp macro
  - Scheme
  - Clojure
tags:
  - computation
summary: A family of programming languages dating to 1958 whose code is written as nested lists the program can itself manipulate, the source of garbage collection, the REPL, and macros, and still influential well beyond its own users.
---
**Lisp** is a family of programming languages whose programs are written as nested, parenthesized lists. John McCarthy designed it at MIT in 1958, making it the second-oldest high-level language still in use, after Fortran. Its dialects include Common Lisp, Scheme, Racket, Clojure, and Emacs Lisp. Though never mainstream, it introduced ideas that most languages eventually adopted.

Lisp code is made of **S-expressions**: an atom, such as a number or symbol, or a list of S-expressions in parentheses. A call puts the function first: `(+ 1 (* 2 3))`. This uniform syntax means Lisp code is also Lisp data, a nested list a program can build, inspect, and transform. That property is called **homoiconicity**. The parenthesized text is essentially the [[Abstract Syntax Tree]] that other languages create internally while parsing.

McCarthy's 1960 paper defined a function, `eval`, that interprets Lisp written in Lisp itself, as a theoretical exercise. His student Steve Russell realized it could be compiled into machine code and produced the first Lisp [[Interpreter]]. McCarthy drew on the [[Lambda Calculus]], and the language's core data structure is the [[Linked List]].

Lisp introduced or popularized:

- **Automatic memory management**, invented for Lisp so programmers didn't have to free list cells by hand; see [[Garbage Collection]].
- **Functions as values**, passed to and returned from other functions; see [[Higher-Order Function]] and [[Closure]].
- **Recursion** as the normal way to process data; see [[Recursion]].
- **The read-eval-print loop**, an interactive prompt that evaluates expressions as you type them.
- **Conditional expressions** and dynamic typing.

**Macros** are Lisp's most distinctive feature. Because code is data, a macro is just a function that runs at compile time, takes code as lists, and returns new code. Programmers can add control structures or whole embedded languages that look like built-in syntax. Few languages match this power, though several offer weaker versions; see [[Reflection]].

Lisp was the dominant language of artificial intelligence research for decades. Companies built dedicated Lisp machines in the 1980s, and their collapse was part of the [[AI winter]]. Scheme, created by Gerald Sussman and Guy Steele in 1975, stripped the language to a small core with proper [[Tail Call Optimization]] and first-class [[Continuation]]s, and became the basis of a famous MIT introductory course. Clojure, released in 2007, runs on the Java virtual machine and builds on immutable data; see [[Persistent Data Structure]].

Greenspun's tenth rule, a joke, holds that any sufficiently complicated program contains a slow, buggy, informally specified implementation of half of Common Lisp. Its point is that large systems end up building the dynamic features Lisp had from the start.

## See also
- [[Logic Programming]]
- [[Time-Sharing]]
