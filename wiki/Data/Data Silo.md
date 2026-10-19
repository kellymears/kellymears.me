---
aliases:
  - Information silo
  - Data island
tags:
  - data
summary: A store of data controlled by one team or system and isolated from the rest of an organization, so the same facts are kept in several places that disagree, nobody sees the whole picture, and connecting them becomes a permanent project.
---
A **data silo** is a collection of data held by one department, application or team and cut off from everyone else. The name comes from farm silos, tall separate towers that each hold one crop. Inside a silo the data may be well kept; the trouble is between them.

Silos form naturally. Each department buys or builds the system that fits its own work: sales uses a customer relationship tool, finance an accounting package, support a ticketing system, marketing an email platform. Each holds its own copy of who the customers are, with its own identifiers, spellings and addresses. Organizational structure tends to reproduce itself in software, so separate teams produce separate systems; see [[Conway's Law]]. Mergers add whole duplicate stacks overnight, and integrating them can take years.

The costs show up as contradictions. A customer updates their address with support, but billing keeps sending invoices to the old one. Two reports on the same question give different answers because they draw on different systems with different definitions of an active customer. Matching the same person across databases becomes its own discipline; see [[Master data management]]. Analysts spend much of their time finding and reconciling data rather than analyzing it; see [[Data Cleaning]].

Silos can have graver consequences. The commission that investigated the September 11 attacks criticized US agencies for failing to share information that, combined, might have revealed the plot. Hospitals whose records can't be read by other providers repeat tests and miss allergies. Governments have tried to require data sharing, while privacy law sometimes deliberately keeps data apart; see [[Personal Data]].

The standard responses each have trade-offs. A central warehouse copies data from every system on a schedule, transforming it into a common shape for reporting; see [[ETL Pipeline]] and [[Data warehouse]]. Streaming every change as it happens keeps copies closer to current; see [[Change Data Capture]]. A lake collects raw data first and sorts it out later, risking a new and larger mess; see [[Data Lake]]. Data mesh takes the opposite approach, leaving each domain to own its data but requiring it to publish that data as a documented product, with agreed schemas; see [[Data Mesh]] and [[Data Contract]].

None of these is purely technical. Whoever controls the data controls the definitions, so breaking down silos usually means deciding who owns which facts and settling disputes about what a term means; see [[Data Governance]].

Consumers meet silos too. Photos, contacts and histories locked inside one company's service can't easily move to another, which regulators have tried to address with portability rights; see [[Data Portability]] and [[Walled Garden]].

## See also
- [[Single source of truth]]
- [[Dark Data]]
