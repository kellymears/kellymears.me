---
aliases:
  - Structural Typing
tags:
  - computation
summary: Treating an object as suitable for a role based on what it can do, not what type it's declared to be.
---
**Duck Typing** decides whether an object fits a role by checking whether it supports the operations that role requires, not by checking its declared type. "If it walks like a duck and quacks like a duck" — a Python function that calls `.read()` on its argument works on a file, a socket, or an in-memory `io.StringIO`, with no shared base class required, because none of them need to declare "I am readable" up front; they only need the method to exist.

This is a runtime discipline in dynamically typed languages: nothing checks that the object supports `.read()` until the call actually happens, so a duck-typed program can fail with an `AttributeError` deep inside a function, well after the mismatched object was first passed in. Statically typed languages get a checked version of the same idea through structural typing — TypeScript's interfaces and Go's interfaces are satisfied by any type with the matching shape, with no explicit `implements` declaration needed, so the compiler verifies the "quacks like a duck" claim before the program runs instead of after.

The distinction that matters is structural vs. nominal typing, not static vs. dynamic: Java's interfaces require an explicit `implements` clause (nominal — the type's name is what matters), while Go's and TypeScript's require only the right method set (structural — the shape is what matters), and duck typing is the dynamically-checked, no-declaration-at-all limit of the structural side.

The common failure is an object that has the right method name but a subtly wrong contract — a `.close()` that doesn't release the resource, a `.length` that isn't actually a count — passing every duck-typing check while breaking the caller's assumption, since nothing in the mechanism verifies behavior, only presence.

## See also
- [[Type Inference]]
- [[Reflection]]
- [[Schema Validation]]
- [[Pattern Matching]]
