---
aliases:
  - Law of Leaky Abstractions
  - Leaky abstractions
tags:
  - method
summary: The observation that every abstraction meant to hide complexity eventually lets some of it through, so working well with a tool means understanding a layer below it.
---
A **leaky abstraction** is one that fails to fully hide the details it was meant to hide. Joel Spolsky coined the *Law of Leaky Abstractions* in 2002: "All non-trivial abstractions, to some degree, are leaky." An abstraction lets us work at a higher level by pretending something complicated is simple. It works most of the time, and then, under load, at the edges, or when something fails, the hidden complexity shows through.

Spolsky's main example was TCP, which presents a reliable stream of bytes on top of an unreliable network that loses and reorders packets. It hides that well, until the network cable is unplugged or a link becomes congested, and suddenly a program has to handle timeouts and stalls that the abstraction promised weren't there; see [[TCP and UDP]]. Computing is full of others:

- **Remote calls that look local.** A [[Remote Procedure Call]] looks like a function call, but it can time out, fail halfway, or run twice. Treating it as local is the first of the [[Fallacies of Distributed Computing]].
- **ORMs.** An [[Object-Relational Mapping]] lets code ignore SQL, until a loop quietly issues hundreds of queries, the [[N+1 Query Problem]].
- **Memory.** Arrays and linked lists are both just sequences, but one is many times faster because of how caches work, as [[Locality of Reference]] explains. Virtual memory makes RAM look unlimited until the system starts swapping.
- **Numbers.** Programming languages present floats as real numbers, until `0.1 + 0.2` doesn't equal `0.3`; see [[Floating-Point Arithmetic]].
- **Garbage collection.** Memory management disappears, until a collection pause causes a latency spike.

The consequence Spolsky drew is that abstractions save time when things work but not when learning or debugging, because fixing a leak requires understanding the layer underneath. A developer who knows only the framework is stuck when the framework misbehaves. This is one reason experienced engineers keep learning one layer down, and why a [[Reproducible Case]] often has to reach below the abstraction to isolate a bug.

Leaks aren't failures of design so much as the price of usefulness. Hiding everything would make an abstraction too limited to use. Good abstractions are honest about their leaks: they document performance characteristics, expose escape hatches such as raw SQL, and fail loudly instead of quietly, unlike a [[Silent Failure]].

Leaks also become dependencies. Users come to rely on behavior that was never promised, such as the order of a hash map or the timing of an error, which is [[Hyrum's Law]]. The abstraction's real interface becomes everything observable, not just what was documented. And people new to a system see the abstraction, while experts see what's under it, which is part of why explanations from experts can be hard to follow, the [[Curse of Knowledge]].

## See also
- [[Hourglass Model]]
- [[Principle of Least Astonishment]]
- [[OSI Model]]
- [[Kernighan's Law]]
