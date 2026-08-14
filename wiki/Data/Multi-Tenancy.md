---
aliases:
  - Multi-tenant
  - Tenancy
tags:
  - data
summary: One deployment serving many isolated customers, with tenancy threaded through data, routing, and access.
---
**Multi-tenancy** is serving many customers from one deployment, with each customer's data isolated from the others. The alternative — a separate deployment per customer — is simpler to reason about and vastly more expensive to operate.

Isolation has to be established at several layers, and a gap in any one of them is a data leak. *Storage*: every query must be scoped to a tenant, ideally by a mechanism that cannot be forgotten rather than by convention. *Routing*: a request must resolve to exactly one tenant, usually by [[Domain Name System|subdomain]] or path. *Authorization*: a user's membership of a tenant must be checked, and an administrative role that spans tenants is a specific hazard — a query run as such a role returns rows from *every* tenant, so code that takes the first result gets an arbitrary one.

The operational shape matters too. Shared infrastructure means one tenant's load affects others, and per-tenant customization — a theme, a domain, a configuration — has to be data rather than code, or the "one deployment" property is lost.

Local development for a multi-tenant system needs the same addressing scheme as production, which is why wildcard local domains and matching origin configuration are usually required rather than optional. See [[Same-Origin Policy]].

## See also
- [[Domain Name System]]
- [[Relational Database]]
- [[Feature Flag]]
- [[Headless CMS]]

## Related
- [[Draft and Published]]
- [[Port]]
- [[Virtual Private Network]]
