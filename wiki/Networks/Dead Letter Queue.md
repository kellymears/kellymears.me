---
aliases:
  - DLQ
  - Poison message
tags:
  - networks
summary: A holding area for messages a system has repeatedly failed to process, so that one bad message can't block or crash everything behind it, and the discipline of actually looking at what lands there.
---
A **dead letter queue** (DLQ) is a separate queue where a messaging system puts messages it has failed to process, usually after several attempts. The name comes from the postal service's dead letter office, which handled mail that could be neither delivered nor returned.

The problem it solves is the **poison message**: a message that will never succeed, because it's malformed, refers to a record that no longer exists, or triggers a bug. In a queue with retries, a poison message fails, goes back on the queue, fails again, and repeats forever; see [[Message Queue]] and [[Delivery Guarantees]]. Depending on the system, it may block every message behind it, a form of [[Head-of-Line Blocking]], or crash the consumer each time it's picked up, taking the whole pipeline down with it.

A DLQ breaks the loop. The usual rule is a maximum delivery count: after, say, five failed attempts, the broker moves the message to the dead letter queue with a record of why, and processing continues with the next message.

Telling the two kinds of failure apart matters:

- **Transient failures** — a timeout, a database briefly unavailable, a rate limit — will likely succeed later. They deserve retries, spaced out with [[Exponential Backoff]].
- **Permanent failures** — a validation error, a missing field — will fail no matter how often they're retried. Retrying wastes work and delays everything else. Many systems send these to the DLQ immediately; see [[Fail Fast]].

Classifying errors correctly is the hard part, and a misclassified transient error dead-letters messages that would have worked.

A DLQ is only useful if someone looks at it. The common failure is a dead letter queue quietly filling with thousands of messages nobody checks, turning a visible error into lost data; see [[Silent Failure]]. Good practice:

- **Alert on depth.** Any message arriving should be noticed; a growing queue is an incident; see [[Observability]].
- **Keep context.** Store the original message, the error, the attempt count, and timestamps, so the failure can be diagnosed.
- **Make redrive possible.** After fixing the bug, move messages back to the main queue to be processed again. That only works safely if processing is idempotent, since some may have partly succeeded; see [[Idempotence]].
- **Watch ordering.** Replaying a message out of order can apply an old change over a new one, a hazard in [[Event Sourcing]] pipelines.

The same pattern appears outside queues: webhook providers that disable an endpoint after repeated failures and keep the undelivered events, and job schedulers that move repeatedly failing jobs to a "dead" set; see [[Webhook]] and [[Durable Execution]]. It's also a form of the [[Circuit Breaker]] idea: stop spending effort on something that keeps failing, and set it aside where it can be dealt with properly.

## See also
- [[Backpressure]]
- [[Saga Pattern]]
