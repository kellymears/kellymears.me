---
aliases:
  - Virtual method
  - Vtable
  - Late binding
  - Multiple dispatch
  - Static dispatch
tags:
  - computation
summary: Deciding at runtime which implementation of a method to call based on the actual type of the object, the mechanism behind polymorphism in object-oriented languages.
---
**Dynamic dispatch** is choosing which implementation of an operation to run while the program is running, based on the actual type of the value involved. Call `shape.area()` on a list of mixed circles and squares, and each element runs its own `area` code, although the calling code only knows it holds "shapes." This is the core mechanism of polymorphism in object-oriented programming.

The alternative is **static dispatch**, where the compiler knows the exact function at compile time and calls it directly. Static calls are faster and can be inlined; dynamic ones buy flexibility, since new types can be added without changing the code that uses them.

Implementations vary by language:

- **Virtual method tables.** C++, Java, and C# give each class a table of function pointers, the *vtable*, and each object a hidden pointer to its class's table. A call looks up the right slot and jumps there: two memory loads and an indirect jump.
- **Message sending.** Smalltalk, Objective-C, and Ruby look methods up by name at runtime, walking the class hierarchy if needed. This is slower but allows changing classes on the fly, and it underpins [[Duck Typing]] and [[Reflection]].
- **Multiple dispatch.** Most languages choose the implementation by the type of one value, the receiver. Common Lisp and Julia choose by the types of all arguments, so `collide(asteroid, ship)` and `collide(ship, ship)` can have separate implementations without nested type checks.

Making dispatch fast has driven a lot of compiler and runtime engineering. **Inline caching**, pioneered in Smalltalk and the Self language in the 1980s and 1990s, remembers at each call site which type it saw last and checks for that type first. Most call sites only ever see one type, so the check almost always hits. JavaScript engines rely on it. Just-in-time [[Compiler|compilers]] go further and *devirtualize*, replacing a dynamic call with a direct one when profiling shows only one type appears, falling back if that changes. Ahead-of-time compilers do the same when they can prove the type, and languages with generics often *monomorphize*, generating a separate static copy of the code for each concrete type, trading binary size for speed.

The cost of a dynamic call is mostly indirect: an unpredictable target defeats inlining and can stall the processor's branch predictor, and following a pointer to the vtable can miss the cache, as described under [[Locality of Reference]].

Dispatch on types is one answer to the *expression problem*: making it easy to add both new types and new operations. Object-oriented dispatch makes new types easy and new operations hard; [[Pattern Matching]] over an [[Algebraic Data Type]] does the reverse. [[Higher-Order Function|Higher-order functions]] and [[Closure|closures]] offer a third route, passing behavior directly as a value instead of attaching it to a type.

## See also
- [[Interpreter]]
- [[Type Inference]]
- [[Lambda Calculus]]
- [[Event Delegation]]
