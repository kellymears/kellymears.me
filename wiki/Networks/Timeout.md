---
aliases:
  - Timeouts
  - Deadline propagation
  - Request deadline
tags:
  - networks
summary: The limit on how long to wait for a remote call, the most basic defense against a hung dependency, and the harder problems of choosing the number and passing the remaining time down a chain of services.
---
A **timeout** is a limit on how long a program waits for something, usually a response from another machine. Over a network, the caller can't tell a slow server from a dead one, a lost request, or a lost reply; see [[Two Generals Problem]]. Without a timeout, a caller waiting on a server that will never answer waits forever. A timeout turns that silence into a definite failure the program can handle.

Many network libraries default to no timeout at all, or to one measured in minutes. That's how a single hung dependency takes down a whole service: every request that touches it holds a thread or connection while waiting, until none are left for anything else; see [[Connection Pool]] and [[Cascading Failure]].

Most clients distinguish several limits:

- **Connect timeout.** How long to wait to establish a connection. Usually short, since an unreachable server rarely becomes reachable seconds later.
- **Read timeout.** How long to wait between bytes once connected.
- **Total timeout.** The whole operation, including retries. This is the one that matters to the caller.

Choosing the value is a tradeoff. Too long, and resources stay tied up during an outage. Too short, and normal slow requests fail, and their retries add load; see [[Exponential Backoff]]. A good default comes from measurement: set it somewhat above the dependency's 99th or 99.9th percentile latency, so only genuinely abnormal requests are cut off; see [[Tail Latency]].

In a chain of services, timeouts must nest. If a front end gives up after two seconds but a backend keeps working for ten, the backend wastes eight seconds on an answer no one will read. **Deadline propagation** fixes this by passing the remaining time budget along with each request. Each service subtracts its own elapsed time and passes the rest downstream, so every layer knows when to stop. Frameworks for [[Remote Procedure Call]] build this in; deadlines are usually sent as a remaining duration rather than a clock time, because clocks on different machines disagree; see [[Network Time Protocol]].

A timeout means "I stopped waiting," not "it failed." The server may have finished the work after the caller gave up. Retrying a timed-out payment can charge a customer twice unless the operation is designed to be repeated safely; see [[Idempotence]]. Messaging systems face the same ambiguity, which is why exactly-once delivery is so hard; see [[Delivery Guarantees]].

Timeouts appear at every layer. TCP retransmits lost packets on a timer it adjusts from measured round-trip times; see [[TCP and UDP]]. [[Failure Detection]] declares a node dead after missing heartbeats for a period. A [[Circuit Breaker]] counts timeouts to decide when to stop calling a failing service. [[Hedged Requests]] use a shorter internal threshold not to give up, but to try a second server.

## See also
- [[Load Shedding]]
- [[Sliding Window Protocol]]
