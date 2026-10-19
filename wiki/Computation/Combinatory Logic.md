---
aliases:
  - SKI combinator calculus
  - Point-free style
tags:
  - computation
summary: A model of computation with no variables at all, only a few fixed functions combined by application, which turns out to be as powerful as any programming language and shaped how functional languages were implemented.
---
**Combinatory logic** is a system of computation with no variables. Everything is built from a few fixed functions, called combinators, and a single operation: applying one thing to another. Despite that austerity, it can express any computation a computer can perform.

Moses Schönfinkel introduced the idea in a 1924 paper aimed at eliminating variables from logic. Haskell Curry rediscovered it independently a few years later and developed it into a full theory over the following decades. The Haskell programming language, and the technique of turning multi-argument functions into chains of single-argument ones, are both named after Curry; see [[Currying]].

Two combinators are enough:

- **K** takes two arguments and returns the first, discarding the second.
- **S** takes three arguments, applies the first to the third, applies the second to the third, and then applies the first result to the second.

A third, I, which returns its argument unchanged, is convenient but can itself be built from S and K. Together they form the SKI calculus. Any function expressible in the lambda calculus can be translated into an expression made only of S and K, a process called bracket abstraction; see [[Lambda Calculus]]. Because the lambda calculus is Turing-complete, so is combinatory logic; see [[Turing Completeness]].

Removing variables removes a source of difficulty. In the lambda calculus, substituting one expression into another must avoid accidentally capturing variable names; see [[Lexical Scope]]. Combinators have no names to capture, which made them attractive for logic and for machines.

That attraction was practical. In 1979, David Turner showed how to implement a lazy functional language by compiling it to combinators and evaluating them by repeatedly rewriting a graph. The technique influenced the implementation of languages such as SASL and Miranda, and through them Haskell; see [[Lazy Evaluation]] and [[Interpreter]]. Later compilers moved to other strategies, but graph reduction remained central to how lazy languages run.

The idea survives in everyday programming as **point-free style**, writing functions by combining other functions without naming their arguments; see [[Higher-Order Function]] and [[Pure Function]]. Chaining commands in a Unix pipeline has a similar spirit, since each stage transforms data without naming it; see [[Unix Pipeline]]. Taken too far, point-free code becomes cryptic, which its critics sometimes call pointless style.

Combinatory logic has also inspired deliberately minimal languages. Unlambda, created in 1999, is a programming language based on S and K with almost nothing else; see [[Esoteric Programming Language]]. Fixed-point combinators, which make recursion possible without names, are another legacy; see [[Recursion]].

Curry also noticed that the types of combinators correspond to axioms of logic, an early glimpse of a deep connection between programs and proofs; see [[Curry-Howard Correspondence]].

## See also
- [[Monad]]
- [[Lisp]]
