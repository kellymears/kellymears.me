---
aliases:
  - λ-calculus
  - Lambda expression
  - Anonymous function
  - Beta reduction
  - Y combinator
  - Church encoding
tags:
  - computation
summary: Alonzo Church's model of computation built from nothing but functions, the theoretical root of functional programming and of every anonymous function.
---
The **lambda calculus** is a model of computation built entirely from functions. Alonzo Church introduced it in the early 1930s as part of a project on the foundations of logic, and used it in 1936 to prove, months before Alan Turing did with his machines, that some problems can't be solved mechanically (see [[Halting Problem]]). It has only three kinds of expression:

- **Variables**, such as `x`.
- **Abstraction**, `λx. M`: a function with parameter `x` and body `M`.
- **Application**, `M N`: applying function `M` to argument `N`.

Computation is just substitution. Applying `λx. x + 1` to `2` replaces `x` with `2` in the body, a step called *beta reduction*. There are no numbers, booleans, loops, or data structures built in. All of them can be encoded as functions. *Church numerals* represent the number n as a function that applies another function n times. True and false are functions that pick their first or second argument. Pairs and lists follow.

Even [[Recursion]] needs no built-in support. A function can't refer to itself by name in the pure calculus, but a *fixed-point combinator* such as the **Y combinator** lets any function call itself anyway. That made the system as powerful as a Turing machine, a key piece of [[Turing Completeness]].

Its influence on programming is direct:

- **Functions as values.** Functions that take or return other functions, [[Higher-Order Function]] style, come straight from lambda calculus, as does capturing variables from an enclosing scope, which a [[Closure]] implements.
- **Multiple arguments.** Every lambda takes one argument, and multi-argument functions are functions returning functions, which is [[Currying]], named after Haskell Curry, though Moses Schönfinkel described it first.
- **Languages.** John McCarthy's Lisp (1958) borrowed the `lambda` keyword. ML and Haskell are close to typed lambda calculus with conveniences added, and the [[Type Inference]] in those languages comes from the Hindley–Milner system built for it.
- **Anonymous functions everywhere.** Python's `lambda`, JavaScript's arrow functions, and lambdas added to Java in 2014 and C++ in 2011 all carry the name.

The order in which reductions happen matters. Evaluating arguments only when needed corresponds to [[Lazy Evaluation]], while evaluating them first is the strict order most languages use. Without side effects, every expression is a [[Pure Function]] application, which is why functional programmers lean on [[Immutability]]. Typed versions of the calculus underpin proof assistants, through the Curry–Howard correspondence: a type is a proposition and a program of that type is its proof. That idea connects programming to [[Formal Verification]].

## See also
- [[Continuation]]
- [[Currying]]
- [[Gödel's Incompleteness Theorems]]
- [[Monad]]
