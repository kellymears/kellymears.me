---
aliases:
  - Meta outage of 2021
tags:
  - testing
summary: The October 2021 outage that took Facebook, Instagram, and WhatsApp offline for about six hours worldwide, after a maintenance command cut the company's backbone network and its own name servers then withdrew themselves from the internet, locking engineers out of the tools needed to fix it.
---
The **Facebook outage of 2021** took Facebook, Instagram, WhatsApp, and Messenger offline worldwide for about six hours on October 4, 2021. Billions of people lost access, along with businesses that relied on the services for sales and communication, and the company's own employees.

It began with routine maintenance. Engineers ran a command meant to assess the capacity of the company's global backbone, the private network linking its data centers. The command unintentionally took down all the backbone's connections at once. The company had a tool designed to audit such commands and block dangerous ones, but a bug in it let this one through; see [[Defensive Programming]].

The second step turned a large outage into a total one. Facebook's name servers, which tell the rest of the internet where to find its sites, were designed to check their connection to the data centers. If they couldn't reach them, they assumed something was wrong with their own location and stopped announcing their routes to the rest of the internet; see [[Border Gateway Protocol]] and [[Health check]]. That behavior is sensible when a single location fails. When the whole backbone went down, every name server reached the same conclusion at once and withdrew. To the outside world, Facebook's domains simply ceased to exist; see [[Domain Name System]].

The outage then blocked its own repair. The internal tools engineers would normally use to diagnose and fix the network depended on the same infrastructure that was down. Reports described employees unable to use their badges or reach internal systems; see [[Circular dependency]]. Engineers had to be sent physically to data centers, where security measures designed to make access difficult did exactly that. Once the backbone was restored, the company brought services back gradually to avoid overloading power systems and caches as traffic surged; see [[Cascading Failure]].

Meanwhile, the outage spread beyond Facebook. Apps and devices around the world kept retrying failed lookups, sharply increasing load on public name resolvers. Other messaging services saw huge influxes of new users.

The incident illustrates several patterns in large-scale failures:

- **Safety mechanisms can amplify failure.** A health check designed to protect against partial failure turned a backbone outage into total invisibility.
- **Recovery tools need independent paths.** Systems for fixing an outage must not depend on the thing that's broken; see [[Incident Response]].
- **Small commands, big effects.** A single action reached the entire network at once; see [[Blast radius]].

It shares its shape with other outages triggered by routine operator actions; see [[Amazon S3 Outage of 2017]] and [[CrowdStrike Outage]]. Testing that deliberately disables parts of a system can expose dependencies like these before they matter; see [[Chaos Engineering]].

## See also
- [[AT&T Network Collapse of 1990]]
- [[Anycast]]
- [[Instant Messaging]]
- [[Internet Shutdown]]
