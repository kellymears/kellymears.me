---
aliases:
  - Variance
  - Covariance
  - Contravariance
  - Invariance
tags:
  - computation
summary: The rules that decide when a generic type built from a subtype can stand in for the same generic type built from its supertype, which turn out to depend on whether values flow out of the type, into it, or both.
---
**Variance** describes how subtyping between simple types carries over to the types built from them. If every Cat is an Animal, is a list of cats a list of animals? Is a function that accepts any animal usable where a function that accepts cats is expected? The answers depend on which way values flow, and getting them wrong opens holes in a type system; see [[Type System]] and [[Generics]].

A generic type is **covariant** if its subtyping follows the subtyping of its contents: a producer of cats can be used as a producer of animals. Anything that only hands values out is safely covariant. A read-only list of cats is a perfectly good read-only list of animals, because everything read from it will be an animal.

A type is **contravariant** if the relation reverses. A consumer of animals can be used as a consumer of cats: a function that can feed any animal can certainly feed a cat. Anything that only takes values in is safely contravariant. Function types combine both directions: they're contravariant in their parameters and covariant in their return values. A function accepting any animal and returning a cat can stand in for one accepting cats and returning animals; see [[Higher-Order Function]].

A type that both accepts and returns values must be **invariant**, matching exactly. A mutable list of cats isn't a mutable list of animals: if it were, someone could add a dog to it through the animal-typed view, and code expecting only cats would later find one. This follows from the Liskov substitution principle, which says a subtype must be usable anywhere its supertype is expected; see [[Polymorphism]].

Java's arrays famously got this wrong in 1995. They're covariant, so an array of strings can be passed where an array of objects is expected, and storing a number into it compiles. The error appears only at run time, as an exception. Java's later generics, added in 2004, are invariant by default, with wildcard annotations for each use. The mnemonic "producer extends, consumer super" captures when to use which.

Languages differ on where variance is declared. C# and Kotlin annotate it on the type definition with in and out keywords, so a read-only interface is covariant everywhere it's used. Scala uses plus and minus signs. TypeScript checks most function parameters strictly but treats method parameters bivariantly, a deliberate unsoundness chosen for compatibility with common JavaScript patterns; see [[TypeScript]] and [[Duck Typing]]. Immutable collections can be covariant safely, one practical argument for immutability; see [[Immutability]].

Variance usually stays invisible, inferred or handled by library authors; see [[Type Inference]]. It surfaces when code that seems obviously fine is rejected, and the rejection is usually preventing the dog-in-the-cat-list bug; see [[Curry-Howard Correspondence]].

## See also
- [[Expression Problem]]
- [[Algebraic Data Type]]
- [[Ownership and Borrowing]]
