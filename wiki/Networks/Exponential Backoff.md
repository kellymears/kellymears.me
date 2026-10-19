---
aliases:
  - Backoff
  - Retry with jitter
  - Full jitter
  - Retry budget
tags:
  - networks
summary: Waiting longer after each failed attempt, with a dose of randomness, so retries give a struggling system room to recover instead of hammering it.
---
**Exponential backoff** is a retry strategy in which each failed attempt is followed by a longer wait than the last, usually doubling: one second, then two, four, eight, up to some cap. The idea is that failures often mean a system is overloaded, and retrying immediately makes it worse. Backing off gives it room to recover, while still retrying quickly when the failure was a brief blip.

The technique is old. Ethernet's original design in the 1970s used *binary exponential backoff* to share a cable: when two machines transmitted at once and collided, each waited a random number of time slots, with the range doubling after every collision. TCP doubles its retransmission timeout each time a packet goes unacknowledged, part of the Congestion Control that keeps the internet from collapsing.

Doubling alone has a flaw. If many clients fail at the same moment, say when a server restarts, they all retry on the same schedule and arrive together in waves, a thundering herd. The fix is **jitter**: randomizing each wait. An influential 2015 analysis by Marc Brooker at Amazon Web Services compared variants and found that *full jitter*, waiting a random time between zero and the current backoff ceiling, spread load best and finished work fastest overall.

A good retry policy has several more parts:

- **A cap and a limit.** The wait stops growing at some maximum, and the client eventually gives up and reports the failure rather than retrying forever.
- **Only retry what is safe.** Retrying a request that might have succeeded can repeat its effect, such as charging a card twice. Retries need [[Idempotence]], often via an idempotency key, and a clear idea of the Delivery Guarantees involved.
- **Only retry what might succeed.** A timeout or a 503 is worth retrying. A 400 Bad Request will fail the same way every time.
- **Respect the server's hints.** A 429 Too Many Requests or 503 response may carry a `Retry-After` header, the polite signal of [[Rate Limiting]] and [[Backpressure]].
- **A retry budget.** Limiting retries to a fraction of total traffic stops them from multiplying load during an outage, especially when several layers each retry, since three layers making three attempts each turn one request into twenty-seven.

Backoff pairs naturally with a [[Circuit Breaker]], which stops calling a failing dependency altogether for a while. [[Message Queue]] systems apply it when redelivering failed jobs, [[Webhook]] senders use it when a receiver is down, and Durable Execution frameworks build it into each step. Within a test suite, automatic retries can hide real problems, which is how a [[Flaky Test]] survives.

## See also
- [[Idempotency Key]]
- [[Long Polling]]
