---
aliases:
  - STM
  - Transactional memory
  - Hardware transactional memory
tags:
  - computation
summary: A concurrency approach that lets threads update shared memory inside atomic transactions, like database transactions, instead of managing locks by hand, so concurrent code composes safely.
---
**Software transactional memory** (STM) is a way to coordinate threads that share memory by grouping reads and writes into **transactions**, borrowing the idea from databases; see [[ACID]]. The programmer marks a block of code as atomic, and the runtime guarantees that it appears to happen all at once: other threads see either none of its effects or all of them.

The usual alternative is locks. Each piece of shared data gets a lock, and code acquires the right locks before touching it. Locks work but are notoriously hard to get right:

- Take them in the wrong order and threads wait for each other forever; see [[Deadlock]].
- Forget one and threads corrupt each other's data; see [[Race Condition]].
- Hold them too broadly and threads queue up behind each other, losing the benefit of parallelism.
- Most important, **locks don't compose**. Two correct, thread-safe operations, such as removing from one account and adding to another, can't simply be combined into one correct atomic transfer without knowing and coordinating their internal locks.

STM usually runs optimistically. A transaction reads and writes into a private log instead of shared memory, then at commit time checks whether anything it read has changed. If not, its writes are published atomically. If something has, it discards its work and retries; see [[Optimistic concurrency control]] and [[Multiversion Concurrency Control]].

The idea was proposed in hardware form by Maurice Herlihy and Eliot Moss in 1993 and in software by Nir Shavit and Dan Touitou in 1995. Its best-known implementation is in Haskell, added in 2005. Haskell's version allows atomic blocks to be combined into larger ones and includes a `retry` operation that waits until something it read changes. Haskell's [[Type System]] also guarantees that a transaction can't perform input or output, which matters because a transaction may run several times. Clojure built its concurrency model on STM as well; see [[Immutability]].

STM has real limits:

- **Side effects can't be undone.** Printing, sending a network request, or launching a missile inside a transaction would happen again on every retry. Languages either forbid these or defer them until commit; see [[Pure Function]].
- **Overhead.** Logging every read and write slows ordinary code, sometimes severalfold.
- **Contention.** Under heavy competition for the same data, transactions keep aborting and retrying, wasting work.

Hardware support appeared in some processors, but at least one major implementation was later disabled by microcode updates after bugs and security problems; see [[Speculative Execution]].

In most mainstream languages, STM lost out to other models: [[Lock-Free Data Structure]]s for hot paths, message passing to avoid shared state entirely, and databases for transactional state; see [[Actor Model]] and [[Communicating Sequential Processes]].

## See also
- [[Peterson's Algorithm]]
- [[Memory Model]]
- [[Isolation Level]]
