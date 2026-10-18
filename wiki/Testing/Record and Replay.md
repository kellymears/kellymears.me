---
aliases:
  - VCR
  - HTTP cassette
  - Cassette
  - Recorded fixtures
  - Request recording
tags:
  - testing
summary: Capturing real network responses once and replaying them in later test runs, which makes tests fast and deterministic but lets the recordings drift from the real service.
---
**Record and replay** is a testing technique in which a test's real interactions with an outside service are captured once and played back on later runs. The first time the test runs, requests go to the real API and the responses are saved to a file, often called a *cassette*. Afterward, the test intercepts the same requests and answers them from the file, never touching the network. Ruby's VCR library, released in 2010, popularized the approach and the cassette name, and similar tools exist for most languages.

It sits between two weaker options. Calling the real service in every test is slow, needs credentials and network access, runs into [[Rate Limiting]], and fails whenever the service hiccups, which turns tests into a [[Flaky Test]] for reasons outside the code. Writing a [[Test Double]] by hand is fast and stable but encodes your assumptions about the service, which may be wrong. A recording is real data captured from the real service, replayed with the speed and determinism of a fake.

The benefits:

- **Speed and isolation.** No network calls, so tests run quickly and offline, in line with [[Test Isolation]].
- **Realism.** Responses include the actual fields, headers, and quirks of the service, including ones nobody would think to fake.
- **Determinism.** The same response every time, which also makes recordings work as a kind of [[Golden File Testing]] for integration points.

The problems come from the same source:

- **Drift.** A recording shows how the service behaved on the day it was made. If the provider changes a field, replayed tests keep passing while production breaks. Periodically re-recording, or adding [[Contract Testing]] against the provider, catches this.
- **Secrets.** Recordings capture headers and bodies, including API keys and [[OAuth]] tokens. Tools filter these, but leaked credentials in committed cassettes are a recurring incident.
- **Matching.** Requests with timestamps, random identifiers, or signatures differ on every run, so the tool needs rules for which parts of a request must match.
- **Error paths.** Recording success is easy; capturing a timeout or a 503 [[HTTP Status Code]] from a real service is not, so failures usually still need hand-written fakes.

The same idea appears at other scales. [[Shadow Traffic]] records or mirrors production requests to exercise a new version. Reverse and time-travel features of a [[Debugger]] record a program's execution so it can be stepped backward, invaluable for a [[Heisenbug]]. [[Deterministic Simulation Testing]] makes replay exact by controlling every source of nondeterminism.

Record and replay has found a new use in testing applications built on language models. Model responses are slow, cost money, and vary between calls, so recording them makes a test suite fast, cheap, and repeatable, with the same drift caveat when the model changes.

## See also
- [[Packet Capture]]
- [[Hypertext Transfer Protocol]]
- [[Service Virtualization]]
