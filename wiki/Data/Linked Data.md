---
aliases:
  - Linked Open Data
  - SPARQL
  - Triple store
tags:
  - data
summary: Publishing structured data on the web so that each thing has its own web address and descriptions link to other datasets, the practical program behind the semantic web, visible today in Wikidata, library catalogs, and search-engine markup.
---
**Linked data** is a way of publishing structured data on the web so that datasets connect to one another the way pages do. Each thing described, whether a person, a city, a book, or a gene, gets its own web address, and descriptions point to the addresses of other things instead of repeating their names as plain text.

Tim Berners-Lee set out the idea in a 2006 design note with four rules. Use web addresses as names for things. Use addresses that can be looked up over HTTP, so anyone can follow them. When someone looks one up, return useful information in a standard format. And include links to other addresses, so the reader can discover more; see [[URL]] and [[Hypertext Transfer Protocol]]. A later five-star scheme rated open datasets from "on the web in any format" up to "linked to other people's data"; see [[Open Data]].

The usual format is RDF, which breaks knowledge into triples of subject, predicate, and object: this city, has population, this number. Because predicates are themselves web addresses, two datasets can agree on what "population" means, or state that their terms are equivalent; see [[Ontology]]. Databases built to store triples are called triple stores, and they're queried with SPARQL, a language standardized by the W3C in 2008 that matches patterns across the graph; see [[Graph Database]].

The Linking Open Data project, started in 2007, turned the idea into a growing cloud of connected datasets. At its center sat DBpedia, which extracted structured facts from Wikipedia's infoboxes. Wikidata later took over much of that role, offering a public SPARQL endpoint over a hundred million items; see [[Wikidata]]. National libraries publish their subject headings and authority files as linked data, giving catalogs worldwide shared identifiers for authors and topics; see [[Library Classification]] and [[Persistent Identifier]].

The most widespread use is quieter. Search engines read linked-data markup embedded in web pages, mostly the schema.org vocabulary written as JSON-LD, to build rich results and knowledge panels; see [[Structured Data]], [[Search Engine Optimization]], and [[Knowledge Graph]].

The grander vision, a web of data that software agents would reason over and act on, has largely not arrived as once promised. Publishing good linked data takes careful modeling, tools have been harder to use than ordinary databases and JSON APIs, and many endpoints have gone offline, leaving dangling identifiers; see [[Link Rot]]. Agreement on shared vocabularies across communities is slow, and data published without upkeep goes stale. Linked data has thrived where institutions already valued shared identifiers and long-term stewardship, such as libraries, museums, life sciences, and government statistics; see [[Metadata]].

## See also
- [[World Wide Web]]
- [[Entity Resolution]]
