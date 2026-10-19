---
aliases:
  - Lookup table
  - Code list
tags:
  - data
summary: The small, slowly changing sets of permitted values, such as country codes, currencies, units, and status codes, that other data refers to, often maintained by outside authorities and easy to underestimate until a code changes.
---
**Reference data** is the set of permitted values that other data points to: country and currency codes, units of measure, product categories, order statuses, diagnosis codes, time zones. It's small and changes slowly compared with the records that use it, but nearly every table depends on some of it. In a database it usually lives in **lookup tables**, each holding the valid codes and their descriptions, referenced from other tables by key; see [[Foreign Key]].

Data managers often distinguish three kinds. **Transactional data** records events, like orders and payments. **Master data** describes the core entities a business deals with, like customers and products, and keeping one trusted version of each is a discipline of its own; see [[Entity Resolution]]. **Reference data** classifies both. An order has a status, a customer has a country, and a product has a tax category, each drawn from a fixed list.

Much reference data is set by outside authorities. Countries come from ISO 3166 and currencies from ISO 4217; see [[Country Code]]. Medical systems use international disease classifications, and logistics and trade use their own product and port codes. An organization can't change these lists, only track them, and they do change. Countries split and rename, currencies are replaced, as when the euro arrived in 2002 or Croatia adopted it in 2023, and classification systems are revised every few years. Each change needs a migration and a decision about old records; see [[Database Migration]].

History is where reference data gets hard. An invoice from 1999 in German marks must keep that currency even after the code is retired, and a report comparing years needs to know which categories applied when. Storing effective dates on codes, instead of overwriting them, keeps the past interpretable; see [[Bitemporal Data]] and [[Dimensional Modeling]].

There's a practical choice about where the list lives. A database enumerated type or a constant in code is fast and type-checked but requires a deployment to change. A lookup table can be updated as data but must be loaded into every environment; see [[Seed Data]]. Lists that rarely change are often cached in each application, which works until they diverge; see [[Cache-Aside]].

When systems exchange data, their code lists must agree or be mapped. One system's "shipped" may be another's "dispatched," and mapping tables between vocabularies become critical infrastructure; see [[Data Contract]] and [[Ontology]]. Code lists are therefore a natural focus for governance, with named owners, documented meanings, and a process for changes; see [[Data Governance]] and [[Data Dictionary]].

Teams sometimes smuggle special meaning into codes, such as a status 99 that means "unknown," which later readers misinterpret; see [[Sentinel Value]].

## See also
- [[Gazetteer]]
- [[Data Silo]]
