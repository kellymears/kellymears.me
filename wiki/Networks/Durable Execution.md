---
aliases:
  - Durable workflow
  - Workflow engine
  - Durable functions
tags:
  - networks
summary: Running long, multi-step processes so that their progress is persisted at every step, letting them survive crashes, restarts, and waits of days without losing their place.
---
**Durable execution** is a way of running long, multi-step processes so that their progress survives failure. A plain program keeps its state in memory: if the machine restarts halfway through a ten-step process, the work and the knowledge of where it stood are lost, and someone has to work out what was done. A durable execution engine records every step's result as it completes. After a crash, the process resumes from where it stopped, on any machine, as if nothing had happened.

The common implementation records an **event history** and uses **replay**. The workflow is written as ordinary code. Every interaction with the outside world, such as calling an API, querying a database, or waiting for a timer, goes through the engine, which persists the result. To recover, the engine re-runs the workflow code from the start, feeding it the recorded results instead of repeating the calls, until it reaches the point where history ends. It is the same idea as [[Write-Ahead Logging]] applied to application logic, and it has the same requirements:

- **Workflow code must be deterministic.** Replay only works if the code takes the same path given the same recorded inputs, so randomness, the clock, and direct I/O must go through the engine. See [[Determinism]].
- **Side effects should be idempotent.** A step can run, succeed, and crash before its result is recorded, and then it runs again. [[Idempotence]] makes the retry safe.

Durable execution makes some hard patterns ordinary. A workflow can sleep for thirty days waiting for a trial to end, wait indefinitely for a human approval delivered by [[Webhook]], or retry a flaky dependency with backoff for hours, all without a server process staying alive the whole time. Multi-step operations across services that cannot share a transaction use the [[Saga Pattern]]: each step has a *compensating action*, such as refunding a charge or releasing a reservation, which the workflow runs in reverse order if a later step fails.

Before such engines, the same reliability was assembled by hand from a [[Message Queue]], a status column, [[Cron]] jobs that hunt for stuck rows, and an implicit [[Finite State Machine]]. Durable execution makes that state machine explicit and the bookkeeping automatic. [[Background Agent|Long-running agents]] are a natural fit, since an agent run is a long sequence of expensive, failure-prone steps.

## See also
- [[Write-Ahead Logging]]
- [[Idempotence]]
- [[Determinism]]
- [[Message Queue]]
- [[Finite State Machine]]
- [[Background Agent]]
- [[Circuit Breaker]]
- [[Transactional Outbox]]
