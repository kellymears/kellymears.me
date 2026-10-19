---
aliases:
  - Propositions as types
tags:
  - computation
summary: The discovery that logical propositions correspond to types and proofs correspond to programs, so that a type checker is also a proof checker, the idea behind proof assistants and verified software.
---
**The Curry-Howard correspondence** is the observation that logic and typed programming are the same structure seen from two sides. A proposition corresponds to a type, and a proof of the proposition corresponds to a program of that type. Writing a program that type-checks is proving a theorem, and checking a proof is type-checking a program.

Haskell Curry noticed the first hints in the 1930s, when the axioms of a simple logic matched the types of basic combinators. William Howard spelled out the full correspondence for a standard proof system and the typed [[Lambda Calculus]] in a 1969 manuscript published in 1980.

The dictionary runs piece by piece:

- **Implication is a function type.** A proof that A implies B is a function that turns any proof of A into a proof of B.
- **And is a pair.** Proving A and B means supplying a proof of each, the way a pair holds two values.
- **Or is a tagged union.** Proving A or B means supplying one of them, labeled with which; see [[Algebraic Data Type]]. Using such a proof is case analysis; see [[Pattern Matching]].
- **False is the empty type**, which has no values, so there's nothing to construct. True is a type with one trivial value.
- **"For all" is a function over values**, whose result type depends on its input; see [[Dependent Types]].

Running a program corresponds to simplifying a proof, removing detours, so evaluation and proof normalization are the same process.

The logic that falls out is constructive. A proof of "A or B" must say which one holds, so the classical law that every statement is either true or false can't be proved in general. Classical reasoning corresponds to control operators that can jump back in time, a link found in 1990; see [[Continuation]].

There's a catch for programmers. A function that loops forever can claim any return type, so in an ordinary language, a well-typed program proves nothing. Proof languages require every function to terminate, which rules out some programs, a trade forced by the [[Halting Problem]].

That restriction is the basis of proof assistants such as Coq, now renamed Rocq, Agda, and Lean. Mathematicians use them to check proofs too long to verify by hand; the four color theorem was fully checked in Coq in 2005; see [[Graph Coloring]]. Engineers use them to build verified software, such as the CompCert C compiler, proved to translate programs without changing their meaning; see [[Formal Verification]] and [[Compiler]].

Everyday languages get smaller doses. A generic function's type can guarantee what it is unable to do, since it can't inspect values whose type it doesn't know; see [[Generics]]. Good type inference amounts to automated proof search; see [[Type Inference]] and [[Type System]].

## See also
- [[Russell's Paradox]]
- [[Pure Function]]
