---
aliases:
  - Versioned API
  - Sunset header
tags:
  - delivery
summary: Letting a network interface change without breaking the programs already calling it, by running versions side by side in the URL, a header, or a dated release, and retiring old ones on a schedule.
---
**API versioning** is how the provider of a network interface changes it without breaking the programs already calling it. A library can ship a new major version and let each user upgrade when ready; see [[Semantic Versioning]]. A web API can't, because every client hits the same server at the same time. So providers run several versions side by side and retire old ones slowly.

The first defense is not needing a new version. Many changes are additive: a new endpoint, a new optional field, a new value in a response. Clients written to ignore what they don't recognize survive them; see [[Postel's Law]]. Changes that remove or rename a field, change a type, or alter behavior are breaking, and those need a version; see [[Backward Compatibility]].

Where the version goes:

- **In the URL**, as in /v1/orders and /v2/orders. It is visible, easy to route and cache, and the most common choice, though purists object that the resource hasn't changed, only its representation.
- **In a header**, either a custom one or the media type of the request, using HTTP [[Content negotiation]]. Addresses stay stable, but versions are invisible in logs and shared links.
- **By date.** Stripe pins each account to the API version current when it signed up and lets it upgrade explicitly. Internally, the server keeps one current implementation and a chain of small transformations that convert each response back into what older dates expected; see [[Calendar Versioning]].

Some styles avoid numbered versions altogether. [[GraphQL]] servers usually evolve one schema continuously, adding fields and marking old ones deprecated, since each client asks only for the fields it uses and the server can see which are still requested. RPC systems built on Protocol Buffers rely on numbered fields that are never reused, so old and new messages can be read by either side; see [[Remote Procedure Call]] and [[Schema Evolution]].

Retiring a version is the hard part. Providers announce a date, notify the clients they can identify, and often send a Sunset header, standardized in 2019, so client tooling can warn developers; see [[Deprecation]]. Usage logs show who is still calling, and some providers run scheduled "brownouts," failing old-version calls for an hour at a time, to flush out integrations nobody remembered. Whatever the policy, someone depends on the old behavior, intended or not; see [[Hyrum's Law]].

Inside one organization, the same problems appear between services. [[Contract Testing]] checks each change against what its consumers actually use, and [[Expand and Contract]] sequences changes so producer and consumer never have to deploy at once. An [[API Gateway]] can route versions to different backends during a migration.

## See also
- [[Webhook]]
- [[Long-Term Support]]
