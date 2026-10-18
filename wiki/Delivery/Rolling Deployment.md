---
aliases:
  - Rolling update
  - Rolling restart
  - Connection draining
tags:
  - delivery
summary: Replacing a service's instances a few at a time, so a release needs no spare fleet and no downtime, at the cost of running two versions side by side.
---
A **rolling deployment** releases a new version by replacing a service's running instances a few at a time. Take one instance out of the [[Load Balancing]] pool, update it, check it's healthy, put it back, then move on to the next. At every moment most of the fleet is serving traffic, so users see no outage. It's the default strategy in most container orchestrators and one of the standard routes to [[Zero-Downtime Deployment]].

Each step follows the same sequence:

1. **Drain.** Stop sending new requests to the instance and let in-flight ones finish, called **connection draining**. The process should handle the shutdown signal properly and exit once idle; see [[Unix Signal]].
2. **Replace.** Start the new version, typically by launching a new instance from an image rather than updating in place, in keeping with [[Immutable Infrastructure]].
3. **Check.** Wait until a health check passes, ideally one that confirms the instance can actually serve requests rather than merely that the process is running; see [[Failure Detection]].
4. **Return.** Add it back to the pool and continue with the next batch.

Two settings control the pace: how many instances can be down at once, and how many extra can be started above normal capacity. Replacing one at a time is safest but slow on large fleets; replacing a quarter at a time is faster but reduces capacity during the rollout.

Compared with alternatives:

- **[[Blue-Green Deployment]]** runs a whole second environment and switches all traffic at once. Switching back is instant, but it needs double capacity.
- **[[Canary Release]]** sends a small share of traffic to the new version and watches metrics before going further. A rolling deployment that pauses after the first batch is a crude canary.
- **Recreate** stops everything and starts the new version, simple but with downtime.

The main cost of rolling deployments is that two versions run side by side for the duration, and users may hit both within one session. Every change must be compatible in both directions: the new version must handle data and messages the old one writes, and vice versa. Database schema changes need the [[Expand and Contract]] pattern, and API changes need [[Backward Compatibility]]. A rollout that changes a message format in one step can break the requests that land on the other version.

Rolling back is a rolling deployment of the old version, so it takes as long as the rollout itself; see [[Rollback]]. A failed health check should halt the rollout automatically before the bad version spreads. Wiring that decision to error rates and latency as well, rather than health checks alone, turns a rolling deployment into a step toward [[Progressive Delivery]].

## See also
- [[Deployment Pipeline]]
- [[Service Level Objective]]
