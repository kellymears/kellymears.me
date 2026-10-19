---
aliases:
  - Refcount
  - Refcounting
  - Automatic Reference Counting
  - ARC
  - Reference cycle
  - Weak reference
tags:
  - computation
summary: Freeing memory by tracking how many references point at each object and reclaiming it the moment the count drops to zero, simple and prompt but blind to cycles.
---
**Reference counting** is a way to manage memory automatically. Each object keeps a count of how many references point to it. Creating a reference increments the count, dropping one decrements it, and when the count reaches zero, nothing can reach the object any more, so it is freed immediately.

George Collins described the technique in 1960, the same year John McCarthy described tracing [[Garbage Collection]] for Lisp. The two remain the main approaches to automatic memory management. Reference counting is used in CPython, Swift and Objective-C (as Automatic Reference Counting, where the compiler inserts the increments and decrements), PHP, and in Rust and C++ through optional smart pointers (`Rc`, `Arc`, `shared_ptr`).

Its strengths:

- **Prompt reclamation.** Memory is freed the moment it's no longer used, not at some later collection, so memory use stays low and predictable.
- **No long pauses.** Work is spread across ordinary operations instead of done in bursts, which suits interactive apps and real-time systems.
- **Deterministic cleanup.** Since objects die at a known moment, they can release other resources, such as closing files or sockets, exactly when the last user lets go.

Its weaknesses:

- **Cycles.** If A refers to B and B refers back to A, both counts stay at least one even after everything else lets go of them. Neither is ever freed, a [[Memory Leak]]. Cycles arise easily, for example a parent and child that point to each other, or an object stored in a [[Closure]] that the object itself holds. The usual fix is a **weak reference**, which points to an object without adding to its count; the child holds a weak reference to its parent, breaking the cycle. CPython adds a backup tracing collector that periodically searches for unreachable cycles.
- **Overhead on every assignment.** Each reference copy touches the count, which costs time and memory traffic. In multithreaded code the updates must be atomic, which is slower, and this is one reason CPython long relied on its global interpreter lock.

Counts also enable a useful optimization. If an object's count is exactly one, nobody else can see it, so it can be modified in place instead of copied. This makes [[Copy-on-Write]] cheap, and languages built on [[Immutability]] use it to update values safely without copying.

The idea appears outside programming languages. A file system counts the directory entries pointing to each [[Inode]] and frees the file's data when the last link is removed and no process has it open, which is why deleting a file that is still open doesn't free its space.

Finding cycles requires a [[Graph Traversal]] from known roots, which is exactly what tracing collectors do, and why many runtimes combine both approaches.

## See also
- [[Garbage Collection]]
- [[Memory Leak]]
- [[Copy-on-Write]]
- [[Immutability]]
- [[Ownership and Borrowing]]
- [[Tagged Pointer]]
- [[Read-Copy-Update]]
