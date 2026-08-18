---
aliases:
  - Message-passing concurrency
tags:
  - computation
summary: A concurrency model where isolated actors communicate only by asynchronous message, never by shared memory.
---
**Actor Model** structures concurrent computation as independent actors, each with private state nothing else can touch directly, that interact only by sending each other asynchronous messages. An actor processes one message at a time, can change its own state, create new actors, and send messages in response — but there is no shared mutable variable for two actors to race over, because there is no shared memory at all, only mailboxes.

This sidesteps the [[Race Condition]] problem at its root rather than managing it with locks: a lock coordinates access to memory that's still, in principle, reachable from multiple threads at once, while the actor model simply never exposes an actor's state to anything but that actor. Erlang (and by extension Elixir) builds its entire concurrency and fault-tolerance story on this — a crashed actor ("process," in Erlang's terminology, unrelated to an OS [[Process]]) can be restarted by a supervisor without any other actor's state being at risk, because nothing else ever held a reference into the crashed one's memory to begin with.

The trade-off is that message passing is asynchronous and ordering between different actors is not guaranteed the way sequential code's ordering is — an actor can't assume a message it sent has been processed, or processed before some other message, without an explicit reply protocol, so actor-model code trades data races for a different class of bug: message-ordering bugs, and the need to model conversations rather than just calls.

Akka (JVM), Erlang/OTP, and Orleans (.NET) are the systems most associated with the model in production; it's a heavier commitment than the [[Event Loop]]'s callback queue, since it requires structuring an entire application's state around actor boundaries rather than adding async callbacks to otherwise ordinary code, but it scales to distributed systems more naturally — a message to a remote actor and a message to a local one look the same to the sender.

## See also
- [[Event Loop]]
- [[Race Condition]]
- [[Process]]
- [[Concurrency and Parallelism]]
- [[Finite State Machine]]
