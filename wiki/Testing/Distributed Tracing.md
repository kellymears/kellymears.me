---
aliases:
  - Tracing
  - Trace
  - Span
  - OpenTelemetry
  - Trace context
tags:
  - testing
summary: Following a single request across every service it touches, recording each step as a timed span, so slow or failing hops in a distributed system can be found.
---
**Distributed tracing** follows a single request as it moves through the many services of a distributed system, recording how long each step took and how the steps relate. In a monolith, a profiler or a stack trace shows where time went. Once a request passes through a gateway, an authentication service, three [[Microservices]], a cache, a queue, and two databases, no single process sees the whole story. Tracing reconstructs it.

The core ideas come from Google's Dapper paper, published in 2010:

- A **trace** represents one request's full journey.
- A **span** represents one unit of work within it, such as an HTTP call, a database query, or a function, with a start time, duration, and metadata.
- Spans form a tree: each has a parent, so the trace shows which call caused which.
- **Context propagation** passes the trace ID and parent span ID along with each request, usually in headers, so every service can attach its spans to the right trace. The W3C Trace Context standard defines the header format.

The result is usually viewed as a waterfall chart, with spans as bars on a timeline. It makes certain problems obvious at a glance:

- **The slow hop.** Which of twenty calls took most of the time.
- **Serial work that could be parallel.** A staircase of calls that each waits for the last.
- **The N+1 problem.** A request making hundreds of tiny database queries.
- **Retries and timeouts.** Hidden repeated calls inflating latency, often visible as gaps or duplicated spans.

Tracing is particularly valuable for [[Tail Latency]], the slow requests at the 99th percentile that averages hide. With [[Remote Procedure Call]] chains, a small delay in one rarely-used dependency can dominate the slowest requests, and only per-request traces reveal it.

**OpenTelemetry**, a vendor-neutral open standard formed in 2019 from the merger of two earlier projects, now defines common APIs and formats for traces, metrics, and logs. Libraries and frameworks can emit traces once, and teams choose where to send them.

Tracing has costs. Recording every span of every request is expensive at scale, so systems **sample**, keeping perhaps one request in a hundred, or keeping all slow and failing ones. Instrumenting code takes effort, though automatic [[Instrumentation]] for common libraries covers much of it. And spans across clock domains can appear out of order because of clock skew, a problem described under [[Logical Clock]].

Tracing complements the other signals of [[Observability]]. [[Logging]] records detail about individual events, and adding the trace ID to log lines links them to their trace. Metrics give aggregate trends cheaply. [[Profiling]] shows where time goes inside a single process; tracing shows where it goes between processes. Together they turn questions during [[Incident Response]] from guesswork into lookups.

## See also
- [[Mars Pathfinder Priority Inversion]]
- [[Service Level Objective]]
- [[Middleware]]
- [[Scientific Debugging]]
