---
aliases:
  - Service status page
  - Incident communication
tags:
  - delivery
summary: A public page reporting whether a service is working, updated during outages, which helps only if it runs on separate infrastructure and is updated quickly and honestly.
---
A **status page** is a public web page that reports whether a service is working, lists current and past incidents, and lets customers subscribe to updates. Most software companies run one, often on a "status" subdomain, and it is usually the first place customers check when something seems broken.

Its purpose is to answer one question quickly for many people at once: is it them or is it us? During an outage, support teams are flooded with the same report, and engineers are interrupted to confirm what they already know. A clear status update absorbs much of that load and lets responders work; see [[Incident Response]].

A typical page lists each component, such as the API, the dashboard, or payments, with a state like operational, degraded, partial outage, or major outage. Below that sit a timeline of updates for each incident and often a bar of daily uptime for the past few months.

What makes one useful:

- **Separate infrastructure.** A status page hosted on the same servers, network, or [[Domain Name System]] provider as the service goes down with it. During a 2017 Amazon S3 outage, the AWS status dashboard kept showing green because the icons it needed to show trouble were stored in S3; see [[Cascading Failure]].
- **Speed.** The first update matters more than a complete one. "We're investigating elevated errors," posted in five minutes, beats a detailed explanation in an hour.
- **Honesty.** A page that stays green while customers are failing teaches them to ignore it. Companies sometimes hesitate to post because acknowledged outages can trigger credits under a [[Service level agreement]], and customers notice the gap.
- **Plain updates.** Each update says what is affected, what users can do, and when the next update will come, without jargon; see [[Plain Language]].

Many pages are updated by hand, by the incident commander or a communications lead. Some are automated from monitoring, often from probes that act like real users; see [[Synthetic Monitoring]]. Automation is fast but noisy, so teams often let alerts draft an update and keep a human approving it.

Status pages also shape who knows what. Customers can't see a service's internals, so the page is often their only evidence, and third-party sites that aggregate user complaints exist because official pages lag behind; see [[Information Asymmetry]]. After major incidents, many companies publish a written account of what happened and what will change, which can recover some of the trust the outage cost; see [[Blameless Postmortem]].

Internal status pages do the same within large organizations, so a team can check whether a shared database or build service is down before debugging its own code; see [[Observability]].

## See also
- [[Mean Time to Recovery]]
- [[Site Reliability Engineering]]
- [[Dashboard]]
