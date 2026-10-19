---
aliases:
  - Let it crash
  - Microreboot
  - Recovery-oriented computing
  - Supervision tree
tags:
  - testing
summary: Designing software whose only way to stop is to crash and whose only way to start is to recover, so the recovery path is exercised constantly and restarting becomes a safe, routine fix.
---
**Crash-only software** is software designed so that crashing is the only way it stops and recovering is the only way it starts. There is no separate clean shutdown path. George Candea and Armando Fox proposed the idea in a 2003 paper, arguing that since every system eventually crashes, it's better to make crashing safe than to pretend it won't happen.

The argument is about testing as much as design. Most systems have a rarely used recovery path that runs only after a failure, which means it is the least tested code in the system, run at the worst possible moment. Making every stop a crash and every start a recovery means the recovery path runs on every restart and every deploy, so its bugs are found early; see [[Chaos Engineering]].

Crash-only design needs a few properties:

- **Durable state lives in crash-safe stores.** Anything that must survive goes into a database or log built to withstand sudden termination; see [[Write-Ahead Logging]]. Everything else in memory is disposable.
- **Requests can be retried.** Clients use timeouts and retry with backoff, so a request lost during a restart is simply sent again; see [[Exponential Backoff]].
- **Operations are repeatable.** A retried request mustn't charge a card twice; see [[Idempotence]].
- **Components are small and restart fast.** Candea and Fox called restarting a single component a **microreboot**, often a fraction of a second rather than a full system restart.

The Erlang language arrived at the same philosophy earlier, under the slogan **let it crash**. Joe Armstrong and colleagues built telephone switches out of many small isolated processes, organized into **supervision trees**: when a process hits an unexpected state, it dies, and its supervisor restarts it in a known good state; see [[Actor Model]]. Code doesn't try to handle every conceivable error, which keeps it simple; see [[Fail Fast]] and, for the opposite approach, [[Defensive Programming]].

Restarting works because many production bugs are transient. In a 1985 study of Tandem systems, Jim Gray found that most failures in mature software disappeared on retry, because they depended on rare timing or state; see [[Heisenbug]]. A restart also clears slow accumulations such as leaked memory, which is why some systems restart components on a schedule, a practice called software rejuvenation; see [[Memory Leak]].

Modern infrastructure builds the pattern in. Service managers restart processes that exit; see [[Systemd]]. Container orchestrators kill and replace containers whose health checks fail; see [[Kubernetes]]. Hardware uses a [[Watchdog Timer]] to reset a hung processor.

Restarts aren't free. A component that crashes on every start loops forever, so supervisors limit restart rates and escalate; see [[Circuit Breaker]]. Fast, automatic recovery is the goal that [[Mean Time to Recovery]] measures.

## See also
- [[Fail-Safe]]
