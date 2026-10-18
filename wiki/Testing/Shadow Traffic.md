---
aliases:
  - Traffic mirroring
  - Traffic shadowing
  - Dark launch
  - Tap compare
tags:
  - testing
summary: Copying real production requests to a new version of a service, discarding its responses, and comparing them, testing with real traffic before any user depends on it.
---
**Shadow traffic** means sending a copy of real production requests to a new version of a service while the current version keeps serving users. The new version's responses are thrown away, or compared with the old version's, but never returned. It answers a question no staging environment can: how does the new code behave on the full variety of real requests at real volume?

Test environments are an approximation. Real traffic contains odd clients, rare parameter combinations, malformed input, and load patterns nobody thought to script. Shadowing exposes the new version to all of it without risk to users, since it carries no responsibility for answering them.

Variants:

- **Traffic mirroring.** A [[Reverse Proxy]], service mesh, or [[Load Balancing]] layer duplicates requests to the shadow. Envoy, nginx, and Istio support this directly. It is often used to check performance and errors under real load, a realistic complement to synthetic [[Load Testing]].
- **Tap compare.** Both versions' responses are compared, and differences are logged and investigated. Twitter's Diffy tool, released in 2015, also ran two copies of the *old* version to filter out noise such as timestamps and random IDs that differ even when nothing is wrong. This is [[Differential Testing]] on live data, with the old version serving as the [[Test Oracle]].
- **Dark launch.** New code runs in production for real users but invisibly, often behind a [[Feature Flag]]. Facebook used the term in 2008 when it launched chat by having users' pages silently load the chat system for weeks before anyone could see it, testing whether the backend could take the load.

The hard part is side effects. A shadowed request that writes to a database, charges a card, or sends an email does it twice. Shadows must be pointed at separate storage, have writes stubbed out, or be limited to read-only endpoints. Handlers that rely on [[Idempotence]] reduce but don't remove the risk. Shadowing also doubles load on shared dependencies and copies user data into more places, which raises privacy questions.

Shadow traffic fits into a progression of release safety. Shadowing tests with real input and no user exposure. A [[Canary Release]] then exposes a small fraction of users. [[Blue-Green Deployment]] makes switching between versions instant, and a [[Rollback]] undoes a bad release. Each step depends on [[Observability]] to see what the new version is doing. Recording traffic to replay later, as in [[Record and Replay Testing]], is the offline cousin of the same idea.

## See also
- [[Feature Flag]]
- [[Differential Testing]]
- [[Zero-Downtime Deployment]]
