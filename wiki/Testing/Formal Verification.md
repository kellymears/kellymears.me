---
aliases:
  - Formal methods
  - Model checking
  - TLA+
  - Proof assistant
  - Hoare logic
tags:
  - testing
summary: Proving mathematically that a system meets its specification for every possible input or execution, rather than sampling behavior with tests.
---
**Formal verification** uses mathematics to prove that a system meets a precise specification for all possible inputs and executions. Testing samples behavior and can show bugs exist but never prove their absence, as Edsger Dijkstra put it. Formal verification aims for that proof. It is used where bugs are catastrophically expensive or nearly impossible to find by testing: chip design, aviation, cryptography, operating system kernels, and distributed protocols.

Two broad approaches dominate:

- **Theorem proving.** The program and its properties are expressed in logic, and a proof is constructed, often interactively with a proof assistant such as Coq (now Rocq), Isabelle, or Lean, which checks every step. The foundations go back to Tony Hoare's 1969 logic of preconditions and postconditions, the idea behind [[Design by Contract]].
- **Model checking.** A tool exhaustively explores every reachable state of a model, often a [[Finite State Machine]], checking that properties hold in each. It is automatic and produces a concrete counterexample trace when a property fails. Edmund Clarke, Allen Emerson, and Joseph Sifakis shared the 2007 Turing Award for it.

Landmark results show what is possible. The seL4 microkernel was proven in 2009 to correctly implement its specification, down to the C code. CompCert is a C [[Compiler]] proven to preserve program meaning, and studies that fuzzed compilers found bugs in other compilers but none in its verified core. After Intel's 1994 Pentium division bug cost the company about $475 million, hardware makers adopted formal methods heavily.

Lightweight formal methods have spread further. Leslie Lamport's TLA+ specifies designs rather than code, letting engineers model-check a [[Consensus Algorithm]] or replication protocol before writing it. Amazon engineers reported in 2015 that TLA+ found subtle bugs in core storage systems, including one that required a 35-step sequence of events to trigger, the kind of [[Race Condition]] no test suite would plausibly hit.

The limits are real. A proof shows the system matches its specification, not that the specification is what anyone wanted, and the model may omit details that matter in the real world. Proofs are expensive: seL4's took roughly 20 person-years for about 10,000 lines of code. Model checking runs into state explosion as systems grow.

Practical verification therefore sits on a spectrum with testing. [[Static Analysis]] and type systems prove narrower properties cheaply. [[Property-Based Testing]] checks specification-like properties on many random inputs. [[Deterministic Simulation Testing]] explores executions of the real code. Each trades some certainty for reach.

## See also
- [[Static Analysis]]
- [[Design by Contract]]
- [[Property-Based Testing]]
- [[Logical Clock]]
- [[Two-Phase Commit]]
- [[Halting Problem]]
- [[Symbolic Execution]]
