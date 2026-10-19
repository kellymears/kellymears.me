---
aliases:
  - Synthetic check
  - Synthetic checks
  - Uptime check
  - Synthetic transaction
  - Real user monitoring
tags:
  - testing
summary: Running scripted requests and user journeys against production on a schedule, from outside, so an outage is noticed before a user reports it, even at three in the morning.
---
**Synthetic monitoring** runs scripted checks against a live system on a schedule, simulating users to confirm that the service works from the outside. A probe might request a page every minute and expect a 200 response, call an API and validate the result, or drive a [[Headless Browser]] through signing in and searching. If a check fails, someone is alerted.

It complements **real user monitoring**, which measures what actual visitors experience by collecting timings and errors from their browsers. Real user data is richer but depends on traffic. At three in the morning, or for a feature few people use, there may be no users to notice a failure until it is hours old. Synthetic checks run whether or not anyone is visiting, which makes them the earliest warning for a total outage.

Checks range in depth:

- **Uptime checks.** Is the endpoint reachable and returning success? Cheap, frequent, and the basis of most status pages.
- **API checks.** Multi-step calls that create, read, and delete a test record, confirming the system does real work, not just that it answers.
- **Browser journeys.** Scripted user flows, essentially an [[End-to-End Test]] run against production, catching broken front ends that a healthy API would not reveal.
- **Infrastructure checks.** [[Domain Name System]] resolution and [[Transport Layer Security]] certificate expiry, which has caused major outages when nobody renewed in time.

Running checks from several regions matters. A probe from one location cannot tell whether the service is down or that network path is, so most tools require failures from more than one location before alerting, a form of [[Failure Detection]]. Measuring latency from many places also shows what distant users experience, including [[Tail Latency]] that averages hide.

Synthetic checks feed reliability practice. Their success rate and latency can serve as indicators for a [[Service Level Objective]], and a failing check often opens an [[Incident Response]]. After a deploy, a synthetic run works as an extended [[Smoke Test]].

The usual pitfalls:

- **Side effects.** Checks that place orders or send emails must use test accounts and clean up, or they pollute real data and metrics.
- **False alarms.** A flaky probe that pages someone for nothing teaches the team to ignore pages, a case of the alarm fatigue described in [[Habituation]]. Requiring repeated failures and keeping checks simple reduces noise.
- **Checking the wrong thing.** A green homepage check says little if checkout is broken.
- **Synthetic is not real.** Probes follow fixed paths with clean data and miss what real users do. They complement [[Observability]] from real traffic; they do not replace it.

[[Shadow Traffic]] is a related idea in the other direction: real requests sent to an unreleased system, rather than synthetic requests sent to a released one.

## See also
- [[Equifax Data Breach]]
- [[Software Aging]]
- [[Healthcare.gov Launch]]
