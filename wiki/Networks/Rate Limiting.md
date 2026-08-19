---
aliases:
  - Request throttling
tags:
  - networks
summary: Rate limiting caps how often a client can act, protecting shared capacity by rejecting or delaying the excess.
---
**Rate limiting** restricts how many requests a client can make in a given window, protecting a service's shared capacity from any single caller — malicious or merely enthusiastic — by rejecting or queuing what's over the limit. It's a policy decision as much as a technical one: someone has to decide what "fair" looks like per API key, per IP, or per user, and what happens to the request that exceeds it (usually an HTTP 429 with a `Retry-After` header).

The two common algorithms behave differently under bursty traffic. A **fixed window** counter resets every, say, 60 seconds — simple, but it allows a burst of double the limit right at the window boundary, since a client can spend its whole allowance in the last second of one window and the first second of the next. A **token bucket** instead refills at a steady rate and lets a client spend saved-up tokens in a burst, which is usually the better model for real traffic: it tolerates a legitimate spike while still capping the long-run average.

Rate limiting is enforced at multiple layers for different reasons. An [[API Gateway]] rate-limits at the edge to protect everything behind it uniformly, cheaply, before a request even reaches application code. A single service might additionally rate-limit a specific expensive endpoint that the gateway's blanket policy doesn't account for. And a client calling a third-party API has to respect *that* API's rate limit or get cut off — which is why well-behaved clients implement their own backoff rather than hammering the limit and hoping.

It's a close cousin of [[Backpressure]], but the direction of control is different: rate limiting is a hard cap imposed from outside a client's control, while backpressure is a signal a struggling receiver sends so a well-behaved sender can slow itself down voluntarily.

## See also
- [[Backpressure]]
- [[API Gateway]]
- [[Circuit Breaker]]
- [[Load Balancing]]
