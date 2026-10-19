---
aliases:
  - Data stewardship
  - Data steward
tags:
  - data
summary: The policies, roles, and processes that decide who owns an organization's data, who may use it, how good it must be, and how long it's kept, necessary once data matters and notorious for turning into paperwork.
---
**Data governance** is the set of decisions and responsibilities around an organization's data: who owns each dataset, who may see or change it, what quality it must meet, what the terms mean, and when it must be deleted. Where data management is the work of storing and moving data, governance is the agreement about how that work should be done and who answers for it.

The need appears with scale. In a small team, everyone knows where the customer list lives and what "active user" means. In a large organization, three departments compute revenue three ways, nobody knows whether a table is still maintained, and sensitive fields end up in places they shouldn't. Governance tries to replace that confusion with named owners and written rules.

Its usual components:

- **Ownership and stewardship.** Each important dataset has an owner accountable for it and a **data steward** who handles its day-to-day quality and definitions. A dataset everyone uses and nobody owns decays; see [[Bus Factor]].
- **Definitions.** Shared meanings for business terms and fields, recorded where people will find them; see [[Data Dictionary]].
- **Quality standards.** Agreed thresholds for completeness and accuracy, and a process for fixing breaches; see [[Data Cleaning]].
- **Access.** Rules for who may read what, enforced as narrowly as possible; see [[Least Privilege]] and [[Row-Level Security]].
- **Lifecycle.** How long records are kept and how they're destroyed; see [[Data Retention]].
- **Traceability.** Knowing where each dataset came from and what depends on it; see [[Data Lineage]].

Regulation drove much of the field's growth. Accounting scandals in the early 2000s led to United States rules holding executives personally responsible for financial reporting, which in turn meant controls over the data behind the reports. Privacy law added obligations about personal information, including knowing where it's stored, minimizing it, and deleting it on request; see [[GDPR]]. Some laws restrict which countries data may be kept in; see [[Data Sovereignty]]. A breach turns gaps in governance into public costs; see [[Data Breach]].

Governance has a reputation for bureaucracy. Programs launched as committees with sweeping policy documents often produce paperwork without changing how anyone works. More recent approaches push responsibility to the teams that produce data, with central rules kept minimal and enforced by tooling; see [[Data Mesh]]. Agreements between producing and consuming teams, checked automatically, turn policy into something testable; see [[Data Contract]].

A recurring lesson is that data structures follow organizational ones. Datasets fragment along team boundaries, and governance that ignores the org chart tends to fail; see [[Conway's Law]]. Governance works best when it's attached to decisions people already make, such as approving a new data source or granting access, instead of added as a separate review.

## See also
- [[Audit Log]]
- [[Metadata]]
