---
aliases:
  - Wikibase
tags:
  - data
summary: The free, collaboratively edited knowledge base behind Wikipedia's structured facts, storing statements about over a hundred million items with sources and qualifiers, released into the public domain and queryable by anyone.
---
**Wikidata** is a free knowledge base that anyone can edit, run by the Wikimedia Foundation alongside Wikipedia. Where Wikipedia stores articles written in prose, Wikidata stores facts as structured statements: this person was born on this date, this city is in this country, this chemical has this formula. It launched in October 2012 and has since grown to over a hundred million items.

Every thing in Wikidata is an **item** with a stable identifier, a Q followed by a number. Q42 is the writer Douglas Adams. Items are connected by **properties**, identified by a P and a number, such as "instance of" or "place of birth." A statement links an item, a property, and a value, which may itself be another item. The result is a huge graph of entities and relationships; see [[Knowledge Graph]] and [[Graph Database]].

Statements can carry more than a bare fact:

- **Qualifiers** add context, such as the years a person held an office.
- **References** cite where a claim came from, so the source travels with the data; see [[Provenance]].
- **Ranks** mark one value as preferred when sources disagree or a value has changed, such as a city's population across censuses.

Identifiers are language-neutral. Labels and descriptions exist in hundreds of languages, but Q42 means the same thing in all of them. Wikidata's first major job was to centralize the links between language editions of the same Wikipedia article, which had previously been maintained separately in each one, often by automated bots. It now also feeds infoboxes, the fact panels on Wikipedia articles, so a number corrected once updates everywhere.

The data is released into the public domain, unlike Wikipedia's text, which requires attribution. That choice made it attractive to reuse: search engines, digital assistants, libraries, and researchers draw on it; see [[Open Data]] and [[Public Domain]]. When Google retired its own crowdsourced knowledge base, Freebase, in 2016, much of its content was offered to Wikidata.

Wikidata also serves as a hub connecting other identifier systems. An item for a book or author typically links to library catalogs, national authority files, and other databases, making it a translation layer between them; see [[Persistent Identifier]] and [[Entity Resolution]].

It can be queried with SPARQL, a query language for data stored as subject, property, and value triples, the format of the semantic web. Its property system works as a large, community-maintained schema; see [[Ontology]].

The difficulties are those of any open, collaborative project; see [[Wiki]] and [[Commons-Based Peer Production]]. Coverage reflects what volunteers care about. Bots perform a large share of edits, so errors can spread at scale. And modeling the world in structured statements forces choices about categories that reasonable people dispute; see [[Structured Data]].

## See also
- [[OpenStreetMap]]
- [[Citation Index]]
- [[Linked Data]]
- [[Gazetteer]]
