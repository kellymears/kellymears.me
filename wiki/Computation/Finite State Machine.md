---
aliases:
  - FSM
  - State Machine
tags:
  - computation
summary: A model with a fixed set of states, one active at a time, and defined transitions between them on each input.
---
**Finite State Machine** models a system as a fixed, finite set of states — exactly one active at any moment — plus a set of transitions specifying which state comes next given the current state and an input. A traffic light is the textbook example: three states, transitions that only ever go red→green→yellow→red, and no way to reach a fourth state or skip one, because the machine's definition doesn't allow it.

The value of the model is exhaustiveness made checkable: because the state set and the transition table are both finite and explicit, it's possible to enumerate every state and verify a transition is defined for every input in every state — no forgotten case, no reachable-but-unhandled combination — the same guarantee [[Pattern Matching]]'s exhaustiveness checking gives at the level of a single match, extended across an entire object's lifecycle. A parser's tokenizer, a network protocol's handshake, and a UI component's loading/error/success states are all naturally state machines whether or not anyone models them that way explicitly.

A [[Regular Expression]] is exactly a finite state machine in another notation — every regex compiles to an FSM internally, which is the concrete reason the class of language it can match is bounded (it can count "any number of a's" but not "an equal number of a's and b's," since that requires unbounded memory a finite state machine doesn't have).

The failure mode of *not* modeling something explicitly as a state machine is scattering the same state logic across a pile of boolean flags — `isLoading`, `isError`, `hasData` — that combinatorially permit invalid combinations no single state should allow (`isLoading && isError` both true), a bug a proper FSM makes structurally impossible rather than merely untested. This is the usual argument for a library like XState over ad hoc flags: not extra power, but ruling out invalid states by construction.

## See also
- [[Pattern Matching]]
- [[Regular Expression]]
- [[Actor Model]]
- [[Determinism]]
