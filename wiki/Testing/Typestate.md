---
aliases:
  - Session types
  - Typestate pattern
tags:
  - testing
summary: Tracking which operations are valid on an object given its current state, such as not reading a closed file, so the compiler can reject calls made in the wrong order before the program ever runs.
---
**Typestate** is the idea that the operations allowed on an object depend on what state it is in, and that a compiler can track that state and reject calls made at the wrong time. A file can be read only after it is opened and before it is closed. A network connection must be established before data is sent. Ordinary type systems check that a value is a file, not whether it is a usable one. Robert Strom and Shaula Yemini proposed typestate in 1986 to close that gap.

The states and the allowed transitions form a [[Finite State Machine]]. Opening moves a file from "closed" to "open"; reading keeps it "open"; closing moves it back. Typestate checking follows each variable through the program and confirms every call is a legal transition from the state the object must be in at that point. Calling `read` after `close` becomes a compile error rather than a runtime failure; see [[File Descriptor]] and [[Network Socket]].

A whole class of bugs follows this pattern: use after free, double close, sending on a closed channel, forgetting to release a lock, and calling methods before initialization finishes; see [[Memory Safety]] and [[Deadlock]]. Most languages check these only at runtime, if at all, with exceptions or [[Assertion]]s.

The hard part is **aliasing**. If two variables refer to the same file and one closes it, the other's state has changed without any code touching it. Typestate therefore needs some way to know that only one reference can change an object's state at a time. Rust's ownership rules provide exactly that, which is why typestate works well there: a method like `close` takes ownership of the file and consumes it, so the old variable can no longer be used; see [[Ownership and Borrowing]].

In languages without built-in support, a common workaround encodes each state as a separate type. A `Request` builder might return a `RequestWithUrl`, which alone has a `send` method, so a request without a URL can't be sent. The same approach uses [[Generics]] with a type parameter for the state, or variants of an [[Algebraic Data Type]]. The slogan is "make illegal states unrepresentable"; see [[Null]] and [[TypeScript]].

**Session types** extend the idea to communication. They describe a protocol between two parties, such as "send a request, then receive either a result or an error, then stop," and check that each side follows it. Research languages and libraries use them for message-passing systems.

Typestate sits between ordinary types and full specification. It checks the order of operations, not whether their results are correct; see [[Design by Contract]] and [[Dependent Types]]. Where a language can't express it, tools check the same properties after the fact; see [[Static Analysis]].

## See also
- [[Covariance and Contravariance]]
