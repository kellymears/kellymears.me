---
aliases:
  - Borrow checker
  - Ownership types
  - Affine types
  - Move semantics
  - RAII
tags:
  - computation
summary: Rust's compile-time rules that give every value one owner and strictly limit references to it, removing whole classes of memory and concurrency bugs without a garbage collector.
---
**Ownership and borrowing** are the rules a compiler uses to guarantee memory safety without a [[Garbage Collection|garbage collector]], checking at compile time what other languages check at runtime or not at all. Rust brought the approach into wide use.

Three rules carry most of the weight:

- **Every value has exactly one owner.** When the owner goes out of scope, the value is freed automatically. This extends C++'s *RAII* pattern, "resource acquisition is initialization," in which cleanup is tied to scope, to the whole language.
- **Ownership can move.** Assigning a value or passing it to a function transfers ownership, and the original variable can no longer be used. The compiler rejects any later use, so a value can never be freed twice or used after it is freed.
- **Borrowing is restricted.** Code that isn't the owner can borrow a reference, but at any moment there can be either any number of read-only references or exactly one mutable reference, never both. This is often summarized as *aliasing XOR mutability*.

The third rule is the clever one. Most memory and concurrency bugs need two things at once: a value that can be reached from two places, and a change through one of them. So does a data race, which is why the same rule that prevents dangling pointers also prevents many kinds of [[Race Condition]] across threads, at compile time. The *borrow checker* enforces it, tracking each reference's *lifetime* to prove it never outlives what it points to.

The motivation is practical. Microsoft and Google have each reported that around 70 percent of their serious security vulnerabilities are memory-safety bugs, such as use-after-free and buffer overflows, the kind a [[Sanitizer]] hunts for at runtime. Ownership rules them out in safe code, with no collector pauses, at speeds comparable to C.

The type-theory name for the core idea is *affine types*: values that can be used at most once. *Linear types*, used exactly once, are a stricter relative that can also guarantee resources are released.

The costs are real. Newcomers spend weeks "fighting the borrow checker," rewriting code that was correct but that the compiler couldn't prove correct. Structures with cycles, such as doubly linked lists and graphs where nodes point at each other, fit badly with single ownership. The usual answers are storing nodes in an array and referring to them by index, shared ownership through [[Reference Counting]], or an explicitly marked `unsafe` block whose correctness the programmer vouches for. A [[Memory Leak]] remains possible, since leaking is not unsafe; a reference-counted cycle still leaks.

The idea spreads beyond Rust. Swift, C++, and newer research languages have added ownership and move features, and the rule of [[Immutability]] by default makes a related trade.

## See also
- [[Garbage Collection]]
- [[Type Inference]]
- [[Lock-Free Data Structure]]
- [[Least Privilege]]
