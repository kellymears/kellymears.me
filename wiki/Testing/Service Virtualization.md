---
aliases:
  - Mock server
  - API mocking
  - Mock Service Worker
tags:
  - testing
summary: Replacing a real external service with a simulated one that speaks the same protocol over the network, so tests can run without the real dependency and can reproduce its failures on demand.
---
**Service virtualization** replaces a real external service, such as a payment provider, a partner's API, or another team's microservice, with a simulated one that responds over the network the same way. The code under test makes real HTTP or RPC calls; they just go to a stand-in that returns prepared responses. It's the network-level counterpart of an in-code [[Test Double]].

The need arises because real dependencies are inconvenient to test against:

- **Availability.** The service may be down, rate limited, or not built yet.
- **Cost and side effects.** Calls may charge money, send email, or change real data.
- **Control.** It's hard to make a real service return a specific error, a slow response, or an unusual edge case on demand.
- **Speed and stability.** Network calls make tests slow and [[Flaky Test|flaky]].

A simulated service fixes all of these. Tests can run offline and in parallel, and they can exercise failure paths like [[Timeout|timeouts]], malformed responses, and 500 [[HTTP Status Code|errors]] that are almost impossible to trigger against the real thing.

Several approaches exist:

- **Stub servers** like WireMock run as separate processes and match requests to canned responses, configured in code or files.
- **In-process interception** tools such as Mock Service Worker in JavaScript catch outgoing requests inside the test or browser itself, so application code is unchanged.
- **[[Record and Replay|Record and replay]]** captures real traffic once, then serves it back.
- **Commercial virtualization platforms** simulate whole enterprise systems, including mainframes and message queues, with stateful behavior.

The central risk is **drift**. A simulation reflects what someone believed the real service did when it was written. When the real service changes, the simulation doesn't, and tests keep passing against behavior that no longer exists. Strategies to manage drift include:

- **Contract tests**, which check both sides against a shared expectation of requests and responses; see [[Contract Testing]].
- **Schema validation**, generating simulations from an API specification so they can't return impossible shapes; see [[JSON Schema]].
- **Periodic checks** against the real service, at least in a smaller suite or a [[Staging Environment]].

Over-reliance on virtualization can also hide integration problems: authentication, network configuration, serialization quirks, and real latency only appear against the real thing. Most teams combine simulated services for fast, comprehensive tests with a few real end-to-end checks; see [[Integration Test]] and [[End-to-End Test]].

Simulated services also support development, not just testing. Frontend developers can build against a mock API before the backend exists, and demos can run without network access. And they make chaos-style experiments safer: a simulated dependency can inject latency or failures to show how the caller copes; see [[Circuit Breaker]] and [[Chaos Engineering]].

## See also
- [[OpenAPI]]
- [[Dependency Injection]]
