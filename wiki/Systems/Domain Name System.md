---
aliases:
  - DNS
  - Subdomain
tags:
  - systems
summary: The distributed directory translating names to addresses, and the layer where propagation delays live.
---
The **Domain Name System** is the distributed database that turns names into addresses. A resolver walks from the root through each label to the authoritative server for the zone, caching results for the duration each record specifies.

Caching is the source of nearly every DNS frustration. A record's time-to-live governs how long resolvers may keep it, so a change is not instant and is not uniform — different people see different answers for a while. Lowering the time-to-live *before* a planned change is the standard preparation, and it has to happen before, since the old value is already cached.

The common record types are few: an address record, an alias record pointing one name at another, mail routing, and text records used for verification and policy. Provider-specific variants exist to work around the rule that an alias cannot coexist with other records at a zone's apex.

**Subdomains** are the practically important structure. They are ordinary names under a zone and can point anywhere, which makes them the natural mechanism for multi-tenant systems — each tenant addressed by name, with a wildcard record and a wildcard certificate covering them all. That certificate is usually the part that has to be provisioned deliberately rather than automatically, since proving control of a wildcard requires a DNS-based challenge. See [[Multi-Tenancy]] and [[Same-Origin Policy]].

## See also
- [[Multi-Tenancy]]
- [[Port]]
- [[Same-Origin Policy]]
- [[Cache Invalidation]]
