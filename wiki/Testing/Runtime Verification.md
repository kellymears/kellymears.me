---
aliases:
  - Runtime monitoring
  - Temporal logic
  - Linear temporal logic
tags:
  - testing
summary: Checking a running system's actual execution against a formal specification, using monitors that watch events and flag violations of properties like "every request gets a response" as they happen.
---
**Runtime verification** checks a program's actual execution against a formal specification while it runs, or from a log afterward. Instead of proving that every possible execution is correct, as [[Formal Verification]] tries to, or checking a few chosen inputs, as ordinary tests do, it watches the executions that really happen and flags any that break the rules.

The core component is a **monitor**: a small piece of code, often generated automatically from a specification, that receives a stream of events from the system, such as function calls, messages, state changes, or log entries, and decides whether the trace so far satisfies the property. Monitors are usually built as state machines, cheap enough to run alongside the program.

Properties are often written in **temporal logic**, which adds operators about time to ordinary logic. **Linear temporal logic** (LTL), introduced by Amir Pnueli in 1977, lets specifications say things like:

- **Always.** A file is never written after it's closed.
- **Eventually.** Every request eventually gets a response.
- **Until.** A lock is held until it's released, with no other thread entering.
- **Next.** After a login failure, the next attempt is delayed.

Some properties can be fully checked on a finite trace; others, like "eventually," can only be judged once the run ends or a deadline passes.

Runtime verification sits between testing and proof:

- **More rigorous than assertions.** An [[Assertion]] checks a condition at one moment; a monitor checks patterns across a whole sequence of events, including ordering and timing.
- **More practical than proof.** It works on real code, real environments, and real inputs, without requiring a model of the whole system.
- **Limited to what happens.** It can only find violations on executions that actually occur, so it depends on good test inputs or real traffic.

The technique appears in several forms. Test suites can attach monitors to catch protocol violations that individual assertions miss; see [[Test Oracle]]. Production systems can run lightweight monitors as a safety net, triggering alerts or switching to a safe mode; see [[Testing in Production]] and [[Watchdog Timer]]. Spacecraft and other safety-critical software use monitors to detect when the system leaves its expected behavior. Distributed systems analysis records event histories and checks them afterward; see [[Linearizability Checking]] and [[Distributed Tracing]].

Many familiar tools are runtime verification in all but name. Memory and thread sanitizers monitor every memory access and synchronization for rule violations; see [[Sanitizer]] and [[Race Condition]]. Log-based alerting rules that fire when an expected event doesn't follow another are simple temporal monitors; see [[Logging]].

The main costs are overhead, since instrumentation slows the program, and specification effort, since writing correct temporal properties is a skill; see [[Instrumentation]] and [[Design by Contract]].

## See also
- [[Model-Based Testing]]
- [[Observability]]
- [[Property-Based Testing]]
