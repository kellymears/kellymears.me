---
aliases:
  - Subtype polymorphism
  - Ad hoc polymorphism
  - Subtyping
  - Type class
  - Liskov substitution principle
tags:
  - computation
summary: The ability of one piece of code to work with values of different types, in its three main forms, subtyping, generics, and overloading, and the rule that keeps subtypes honest.
---
**Polymorphism**, from the Greek for "many forms," is the ability of one piece of code to work with values of different types. A function that draws any shape, or sorts any comparable list, is polymorphic. In 1967 Christopher Strachey distinguished two broad kinds, and later work by Luca Cardelli and Peter Wegner refined them into the three usually taught today:

- **Subtype polymorphism.** Code written for a general type also accepts more specific ones. A function taking a `Shape` accepts a `Circle` or a `Square`, and each responds to `draw()` in its own way. This is what most people mean by polymorphism in [[Object-Oriented Programming]], and it's implemented with [[Dynamic Dispatch]], choosing the method at runtime from the object's actual type.
- **Parametric polymorphism.** Code works uniformly for any type, without knowing anything about it, like a list that holds elements of any type. This is [[Generics]].
- **Ad hoc polymorphism.** The same name has different implementations for different types, chosen by the types involved. Operator and function **overloading**, where `+` adds numbers but concatenates strings, is the simple form.

**Type classes**, introduced in Haskell in the late 1980s by Philip Wadler and Stephen Blott, made ad hoc polymorphism systematic. A type class such as `Eq` declares operations, and each type supplies its own implementation separately from the type's definition. Rust's traits and Swift's protocols work similarly. Unlike class inheritance, an implementation can be added for a type you didn't write, which avoids forcing everything into one hierarchy.

Subtyping comes with a rule. The **Liskov substitution principle**, from Barbara Liskov's 1987 keynote, says that if `S` is a subtype of `T`, anything true of `T` objects must hold for `S` objects, so code using a `T` keeps working when handed an `S`. The classic violation is making `Square` a subtype of `Rectangle`: code that sets a rectangle's width and expects its height to stay the same breaks for a square. Subtypes may accept more and promise more, but never demand more or deliver less, the same logic as [[Design by Contract]].

Languages also differ in how subtyping is decided. *Nominal* typing requires an explicit declaration that one type extends another. *Structural* typing, as in [[TypeScript]] and Go interfaces, counts any type with the right shape as a subtype. [[Duck Typing]] is the dynamic version, checked only when a method is called.

Polymorphism is what lets code depend on abstractions rather than specifics. That supports testing, since a [[Test Double]] can stand in for a real dependency, and it underlies [[Dependency Injection]]. Overused, it scatters behavior across many small classes and makes the flow hard to follow; [[Pattern Matching]] on an [[Algebraic Data Type]] is often the clearer alternative when the set of cases is fixed.

## See also
- [[Type System]]
- [[Higher-Order Function]]
- [[Reflection]]
