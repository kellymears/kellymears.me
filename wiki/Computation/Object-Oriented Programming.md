---
aliases:
  - OOP
  - Object orientation
  - Inheritance
  - Composition over inheritance
  - Information hiding
tags:
  - computation
summary: Organizing programs around objects that bundle data with behavior, from Simula and Smalltalk to Java, and the long retreat from inheritance toward composition.
---
**Object-oriented programming** organizes software around *objects*, units that bundle data together with the operations on it. Instead of functions acting on passive data, objects receive requests and respond using their own internal state. It became the dominant programming paradigm from the late 1980s through the 2000s, through C++, Java, C#, Python, and Ruby.

The ideas came from two sources. Simula, created by Ole-Johan Dahl and Kristen Nygaard in Norway in the 1960s for simulation, introduced classes, objects, and inheritance. Alan Kay and colleagues at Xerox PARC built Smalltalk in the 1970s and coined the term "object-oriented." Kay later said the big idea was *messaging*: objects as small computers communicating only by messages, more like the [[Actor Model]] than like the class hierarchies OOP became known for.

The commonly listed pillars:

- **Encapsulation and information hiding.** An object's internal state is private, accessed only through its methods, so internals can change without breaking callers. David Parnas argued in 1972 that modules should hide design decisions likely to change.
- **[[Polymorphism]].** Code written against a general type works with any object that responds to the same requests, implemented through [[Dynamic Dispatch]].
- **Inheritance.** A class can extend another, reusing and overriding its behavior.
- **Abstraction.** Callers depend on what an object does, not how.

Inheritance turned out to be the troublesome pillar. Deep hierarchies couple subclasses to their parents' internals, so a change at the top ripples unpredictably below, a problem known as the fragile base class. Subclasses that don't truly honor the parent's behavior break code that relies on it, violating the Liskov substitution principle. The 1994 *Design Patterns* book by the so-called Gang of Four advised **"favor composition over inheritance"**: build objects by combining smaller ones rather than extending classes. Newer languages took that to heart. Go has no inheritance at all, and Rust uses traits instead.

Objects with mutable state also complicate concurrency, since two threads calling methods on the same object can interfere; see [[Race Condition]]. Functional programming offers the contrast, with [[Immutability]], [[Pure Function]]s, and data kept separate from behavior. Modern mainstream languages blend the two, with classes alongside [[Closure]]s, [[Higher-Order Function]]s, and [[Pattern Matching]].

OOP's lasting contributions are modularity and interfaces. Programming against an interface rather than a concrete class makes code easier to test with a [[Test Double]] and to rewire with [[Dependency Injection]]. Its most-cited failures are over-engineering, layers of abstract factories and managers, and the [[Leaky Abstraction]] of object-relational mapping, which tries to make relational tables look like object graphs and never quite succeeds. Some critics argue that most of OOP's benefits come from modules and interfaces, not from objects themselves.

## See also
- [[Iterator]]
- [[Expression Problem]]
- [[Covariance and Contravariance]]
