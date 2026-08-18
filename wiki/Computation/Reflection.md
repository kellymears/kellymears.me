---
aliases:
  - Runtime Introspection
tags:
  - computation
summary: A program inspecting or modifying its own structure — types, methods, fields — while it runs.
---
**Reflection** is a program's ability to examine or alter its own structure at runtime: list an object's methods, read a field by name instead of by a hardcoded reference, construct an instance of a class known only as a string, or call a method whose name was computed rather than written. Java's `Class.forName("com.example.Foo").getDeclaredMethod("bar").invoke(instance)` is reflection in its most explicit form — every part of what would normally be static code (which class, which method) is instead a runtime value.

The main legitimate uses are infrastructure that has to work generically over types it can't know in advance: a JSON serializer that turns any annotated class into JSON by walking its fields, a dependency-injection container that constructs objects by matching constructor parameter types to registered providers, a test runner that discovers `test_*` methods by scanning a class rather than requiring them to be registered by hand. In each case reflection replaces what would otherwise be a mountain of generated or hand-written boilerplate, at the cost of moving errors from compile time to runtime.

The cost is exactly that inversion: a typo in a reflectively-looked-up method name compiles fine and fails only when that code path actually runs, unlike a normal method call which a compiler checks against the class's real members. Reflection also defeats most static analysis and refactoring tools, since a rename that would normally be found and updated everywhere by an IDE is invisible to it when the old name only exists as a string.

Python and JavaScript blur reflection into the ordinary language, since `getattr`, `setattr`, and dynamic property access are just how the languages work day to day, not a special reflective API — which is part of why [[Duck Typing]] and heavy reflection tend to travel together, and why both trade a compiler's guarantees for runtime flexibility.

## See also
- [[Duck Typing]]
- [[Compiler]]
- [[Interpreter]]
- [[Type Inference]]
