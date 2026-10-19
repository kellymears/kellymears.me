---
aliases:
  - Digital Object Identifier
  - DOI
  - ORCID
  - Handle System
tags:
  - data
summary: A name for a document, dataset, or person that stays the same when its web address changes, resolved through a registry that someone must keep up to date, the scheme behind the DOIs on nearly every scholarly paper.
---
A **persistent identifier** is a long-lasting name for a thing, such as a paper, a dataset, or a person, that keeps working when the thing moves. Web addresses break when sites are reorganized, domains lapse, or publishers merge; see [[Link Rot]]. A persistent identifier adds a layer of indirection: the identifier never changes, and a registry maps it to wherever the thing currently lives.

The best known is the **Digital Object Identifier**, or DOI, introduced around 2000 and now attached to almost every academic article. A DOI has a prefix, always starting with 10 and naming the registering organization, and a suffix the registrant chooses. Turned into a link through the doi.org resolver, it redirects the reader to the current page; see [[URL]] and [[HTTP redirect]]. When a journal moves to a new platform, the publisher updates the registry and old citations keep working.

DOIs run on the **Handle System**, a general resolution service designed by Robert Kahn, one of the inventors of the internet's core protocols. In structure it resembles the [[Domain Name System]]: a global registry delegates prefixes to organizations, which manage their own names.

Other schemes cover other needs:

- **ORCID**, launched in 2012, gives each researcher a number, solving the old problem of telling apart authors who share a name or change it; see [[Entity Resolution]].
- **Archival Resource Keys** are used by libraries and museums, with no registration fee.
- Product and publication numbers such as the ISBN identify editions but don't resolve to a location; see [[ISBN]].

The persistence is not technical. A DOI is only as good as the promise to keep its record current, and DOIs whose publishers vanished resolve to dead pages like any other broken link. Registries charge fees and set rules partly to keep members honest. The identifier is also only useful alongside the descriptive record kept with it, such as title, authors, and date; see [[Metadata]].

Persistent identifiers differ from two related ideas. A random ID gives each record a unique key inside one system but means nothing outside it; see [[Universally Unique Identifier]]. A content address names the exact bytes by their hash, so it cannot follow a corrected or updated version; see [[Content addressing]]. A DOI deliberately names the work itself, through moves and corrections.

They matter most where references must last: citations in research, datasets behind published findings, and records that will be read long after their authors move on; see [[Digital Preservation]] and [[Open Data]]. Identifiers that link papers to authors, funders, and data also make the scholarly record a graph that can be queried; see [[Knowledge Graph]].

## See also
- [[Natural key]]
- [[Linked Data]]
- [[Country Code]]
