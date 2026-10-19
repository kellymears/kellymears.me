---
aliases:
  - Barber paradox
  - Naive set theory
tags:
  - computation
summary: The 1901 discovery that the set of all sets not containing themselves can't consistently exist, which wrecked the first attempt to found mathematics on logic and led to type theory and to the type systems of programming languages.
---
**Russell's paradox** is a contradiction Bertrand Russell found in 1901 in the simplest idea of a set. Consider the set of all sets that don't contain themselves. Does it contain itself? If it does, then by its own definition it doesn't. If it doesn't, then it qualifies, so it does. Either answer contradicts itself.

The trouble lies in the assumption that any property defines a set, the principle behind what's now called **naive set theory**. Most sets don't contain themselves, the set of cats is not a cat, so the property seems harmless. Russell showed that allowing every property lets a contradiction in, and in classical logic a single contradiction makes every statement provable.

The timing was brutal. Gottlob Frege had spent years building arithmetic on exactly that assumption. Russell wrote to him in 1902, as the second volume of Frege's work was being printed, and Frege added an appendix admitting that the foundation had given way.

A popular version is the **barber paradox**: a village barber shaves all and only those villagers who don't shave themselves; who shaves the barber? That version has an easy answer, which is that no such barber can exist. The set-theory version is harder, because the theory claimed that such sets always exist.

There were two main repairs:

- **Restrict which collections count as sets.** Zermelo-Fraenkel set theory, the usual foundation of mathematics today, only lets a property select members from a set that already exists, so the universal set and Russell's set can't be formed.
- **Stratify by types.** Russell's own theory of types, worked out in Principia Mathematica with Alfred North Whitehead, sorts objects into levels, so a set can only contain things of a lower level and self-membership can't even be stated.

Type theory went on to become the basis of typed programming languages. A type system rules out some programs as meaningless before they run, as Russell's types ruled out some sentences; see [[Type System]]. In the untyped [[Lambda Calculus]], a function can be applied to itself, which allows unbounded recursion; simple types forbid exactly that kind of self-application. Modern type theories double as logics; see [[Curry-Howard Correspondence]] and [[Dependent Types]].

The paradox shares its structure with other limit results: a thing defined in terms of a whole collection that includes it. Cantor's proof that some infinities are larger, Gödel's incompleteness theorems, and the undecidability of halting all turn on a similar diagonal twist; see [[Cantor's Diagonal Argument]], [[Gödel's Incompleteness Theorems]], and [[Halting Problem]]. A program that prints its own source is self-reference made harmless; see [[Quine]].

A librarian's version asks about a catalog of all catalogs that don't list themselves; see [[Library Classification]].

## See also
- [[Recursion]]
- [[Ontology]]
